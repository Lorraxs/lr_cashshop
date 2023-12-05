Main = {}

function Main:Init()
  local o = {}
  setmetatable(o, {__index = Main})
  o.isOpen = false
  o.PlayerData = ESX.GetPlayerData()
  o.histories = {}
  o:InitConfig()
  o:RegisterNuiHandlers()
  o:RegisterCommands()
  o:RegisterEventHandlers()
  o:RegisterCallbacks()
  o:UpdateAccount()
  return o
end

function Main:RegisterNuiHandlers()
  RegisterNUICallback("onClose", function(data, cb)
    cb("ok")
    if data == 'App' then 
      self:Close()
    end
  end)
  RegisterNUICallback('buyItem', function(data, cb)
    print(json.encode(data))
    local result = lib.callback.await('lr_cashshop:buyItem', false, data)
    cb(result)
  end)
  RegisterNUICallback('fetchHistories', function(data, cb)
    local result = lib.callback.await('lr_cashshop:fetchHistories', false)
    self.histories = {}
    for k, v in ipairs(result) do
      local itemData = json.decode(v.item)
      local item = {
        date = v.date,
        quantity = v.quantity,
        total = v.total,
        paymentMethod = v.payment_method,
        item = itemData
      }
      table.insert(self.histories, item)
    end
    cb(self.histories)
  end)
end

function Main:InitConfig()
  SendReactMessage("setCategories", Config.Categories)
  SendReactMessage("setItems", Config.Items)
  SendReactMessage("setBankAccounts", Config.DonateData)
end

function Main:GetUserMoney(accountName)
  local c = 0;
  for k, v in ipairs(self.PlayerData.accounts) do
    if v.name == accountName then
      c = v.money
      break
    end
  end
  return c
end

function Main:UpdateAccount()
  local user = {
    id = LocalPlayer.state.id or '0',
    name = LocalPlayer.state.name or 'Unknown',
    money = self:GetUserMoney('money'),
    coin = self:GetUserMoney('coin'),
    histories = self.histories
  }
  SendReactMessage('setUser', user)
end

function Main:Open()
  if self.isOpen then return end
  self.isOpen = true
  SetNuiFocus(true, true)
  SendReactMessage('show', 'App')
end

function Main:Close()
  if not self.isOpen then return end
  self.isOpen = false
  SetNuiFocus(false, false)
  SendReactMessage('hide', 'App')
end

function Main:RegisterCommands()
  RegisterCommand('cashshop', function()
    self:Open()
  end)
end

function Main:RegisterEventHandlers()
  RegisterNetEvent('esx:setAccountMoney', function(account)
    for k, v in ipairs(self.PlayerData.accounts) do
      if v.name == account.name then
        self.PlayerData.accounts[k].money = account.money
        break
      end
    end
    self:UpdateAccount()
  end)
end

function Main:RegisterCallbacks()
  lib.callback.register('lr_vehicle:getVehicle', function(vehicleName)
    local modelHash = GetHashKey(vehicleName)
    RequestModel(modelHash)
    if not IsModelValid(modelHash) then
      return {
        status = 'error',
        message = 'Không tìm thấy phương tiện'
      }
    end
    while not HasModelLoaded(modelHash) do
      Wait(0)
    end
    local playerPed = PlayerPedId()
    local playerCoords = GetEntityCoords(playerPed)
    self.vehicle = CreateVehicle(modelHash, playerCoords.x, playerCoords.y, playerCoords.z, 0.0, false, false)
    SetModelAsNoLongerNeeded(modelHash)
    local plate = GeneratePlate()
    print(plate)
    SetVehicleNumberPlateText(self.vehicle, plate)
    local vehicleProps = ESX.Game.GetVehicleProperties(self.vehicle)
    DeleteVehicle(self.vehicle)
    return {
      status = 'success',
      message = 'Tạo phương tiện thành công',
      data = {
        plate = plate,
        vehicle = vehicleProps
      }
    }
  end)
end