---@alias ProcessingPlayer { [number]: {code: string, source: number, amount:number} }
---@alias DonateHistory { transactionID: string, amount: number, description: string, transactionDate: string, identifier: string, status: "INVALID_AMOUNT" | "INVALID_PLAYER" | "SUCCESS" }
Api = {}

local charset = {}
do -- [0-9a-zA-Z]
  for c = 48, 57 do table.insert(charset, string.char(c)) end
end

local function randomString(length)
  if not length or length <= 0 then return '' end
  return randomString(length - 1) .. charset[math.random(1, #charset)]
end


function Api:Init()
  local o = {}
  setmetatable(o, { __index = Api })
  o:Constructor()

  return o
end

function Api:Constructor()
  ---@type ProcessingPlayer
  self.processingPlayers = {
    {
      code = "LR123456",
      source = 2,
      amount = 2
    }
  }
  ---@type DonateHistory[]
  self.donateHistories = {}
  self.usedCodes = {}
  self:FetchDonateHistories()
  self:RegisterEvents()
  TriggerEvent("lr_cashshop:startApi", Config.ApiToken)
end

function Api:FetchDonateHistories()
  local query = [[
    SELECT * FROM cashshop_donate_histories
  ]]
  local result = MySQL.query.await(query)
  self.donateHistories = result
end

function Api:GenerateCode()
  local code = Config.CodePrefix .. randomString(10)
  while self.usedCodes[code] do
    code = Config.CodePrefix .. randomString(10)
  end
  print(code)
  self.usedCodes[code] = true
  return code
end

function Api:RegisterEvents()
  lib.callback.register('lr_cashshop:api:getCode', function(source, amount)
    return self:AddOrder(source, amount)
  end)

  AddEventHandler("sepay:onMessage", function(payload)
    local amount = tonumber(payload.transferAmount)
    local transactionDate = payload.transactionDate
    local transactionID = payload.referenceCode
    local type = payload.transferType
    local code = payload.code
    if code and type == "in" then
      if not self:IsTransactionProcessed(transactionID) then
        local order = self:GetProcessingOrderByCode(code)
        if order then
          print("Processing order", transactionID, amount, code, order.source, order.amount, order.code)
          if amount / 1000 >= order.amount then
            local xPlayer = ESX.GetPlayerFromId(order.source)
            if xPlayer then
              xPlayer.addAccountMoney("coin", order.amount)
              self:InsertDonateHistory(transactionID, amount, code, transactionDate, xPlayer.identifier,
                "SUCCESS")
              TriggerClientEvent("lr_cashshop:client:donateStatus", order.source, "SUCCESS")
            else
              print("Người chơi không tồn tại", transactionID, order.source)
              self:InsertDonateHistory(transactionID, amount, code, transactionDate, "UNKNOWN",
                "INVALID_PLAYER")
              TriggerClientEvent("lr_cashshop:client:donateStatus", order.source, "INVALID_PLAYER")
            end
          else
            print("Số tiền nạp không hợp lệ", transactionID, amount, order.amount)
            self:InsertDonateHistory(transactionID, amount, code, transactionDate, "UNKNOWN",
              "INVALID_AMOUNT")
            TriggerClientEvent("lr_cashshop:client:donateStatus", order.source, "INVALID_AMOUNT")
          end
        end
      end
    end
  end)
end

function Api:AddOrder(source, amount)
  local code = self:GenerateCode()
  self.processingPlayers[source] = {
    code = code,
    source = source,
    amount = amount
  }
  return self.processingPlayers[source]
end

function Api:GetTransactionHistories()
  local p = promise:new()
  PerformHttpRequest("https://my.sepay.vn/userapi/transactions/list",
    function(status, body, headers, errorData)
      if status == 200 then
        p:resolve(json.decode(body))
      else
        p:resolve(nil)
      end
    end, "GET", "", {
      Authorization = ("Bearer %s"):format(Config.SepayApiToken)
    })
  return Citizen.Await(p)
end

function Api:IsTransactionProcessed(transactionID)
  for k, v in ipairs(self.donateHistories) do
    if v.transactionID == transactionID then
      return true
    end
  end
  return false
end

function Api:GetProcessingOrderByCode(code)
  for k, v in ipairs(self.processingPlayers) do
    if code == v.code then
      return v
    end
  end
  return nil
end

function Api:InsertDonateHistory(transactionID, amount, description, transactionDate, identifier, status)
  local query = [[
    INSERT INTO cashshop_donate_histories (transactionID, amount, description, transactionDate, identifier, status)
    VALUES (?,?,?,?,?,?)
  ]]
  MySQL.insert.await(query, {
    transactionID,
    amount,
    description,
    transactionDate,
    identifier,
    status
  })
  table.insert(self.donateHistories, {
    transactionID = transactionID,
    amount = amount,
    description = description,
    transactionDate = transactionDate,
    identifier = identifier,
    status = status
  })
end

--[[ function Api:RequestThread()
  Citizen.CreateThread(function()
    while true do
      Wait(5000)
      local histories = self:GetTransactionHistories()
      if not histories then
        print("Không thể lấy lịch sử giao dịch")
        goto next
      end
      local transactions = histories.transactions
      for k, v in ipairs(transactions) do
        local amount = tonumber(v.amount_in)
        local description = v.transaction_content
        local transactionDate = v.transaction_date
        local transactionID = v.reference_number
        local type = v.type
        local code = v.code
        if code then
          if not self:IsTransactionProcessed(transactionID) then
            local order = self:GetProcessingOrderByDescription(code)
            if order then
              print("Processing order", transactionID, amount, description, order.source, order.amount, order.code)
              if amount / 1000 >= order.amount then
                local xPlayer = ESX.GetPlayerFromId(order.source)
                if xPlayer then
                  xPlayer.addAccountMoney("coin", order.amount)
                  self:InsertDonateHistory(transactionID, amount, description, transactionDate, xPlayer.identifier,
                    "SUCCESS")
                  TriggerClientEvent("lr_cashshop:client:donateStatus", order.source, "SUCCESS")
                else
                  print("Người chơi không tồn tại", transactionID, order.source)
                  self:InsertDonateHistory(transactionID, amount, description, transactionDate, "UNKNOWN",
                    "INVALID_PLAYER")
                  TriggerClientEvent("lr_cashshop:client:donateStatus", order.source, "INVALID_PLAYER")
                end
              else
                print("Số tiền nạp không hợp lệ", transactionID, amount, order.amount)
                self:InsertDonateHistory(transactionID, amount, description, transactionDate, "UNKNOWN",
                  "INVALID_AMOUNT")
                TriggerClientEvent("lr_cashshop:client:donateStatus", order.source, "INVALID_AMOUNT")
              end
            end
          end
        end
      end
      ::next::
    end
  end)
end ]]

Citizen.CreateThread(function()
  Api:Init()
end)
