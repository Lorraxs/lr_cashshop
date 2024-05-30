---@alias ProcessingPlayer { [number]: {code: string, source: number, amount:number} }
---@alias DonateHistory { transactionID: string, amount: number, description: string, transactionDate: string, identifier: string, status: "INVALID_AMOUNT" | "INVALID_PLAYER" | "SUCCESS" }
Api = {}

local charset = {}
do -- [0-9a-zA-Z]
  for c = 48, 57 do table.insert(charset, string.char(c)) end
  for c = 65, 90 do table.insert(charset, string.char(c)) end
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
      code = "O76E7V",
      source = 2,
      amount = 5
    }
  }
  ---@type DonateHistory[]
  self.donateHistories = {}
  self.usedCodes = {}
  self:FetchDonateHistories()
  self:RegisterEvents()
  self:RequestThread()
end

function Api:FetchDonateHistories()
  local query = [[
    SELECT * FROM cashshop_donate_histories
  ]]
  local result = MySQL.query.await(query)
  self.donateHistories = result
end

function Api:GenerateCode()
  local code = randomString(6)
  while self.usedCodes[code] do
    code = randomString(6)
  end
  self.usedCodes[code] = true
  return code
end

function Api:RegisterEvents()
  lib.callback.register('lr_cashshop:api:getCode', function(source, amount)
    local data = {
      code = self:GenerateCode(),
      source = source,
      amount = amount
    }
    self.processingPlayers[source] = data
    print(json.encode(data))
    return data
  end)
end

function Api:GetTransactionHistories()
  local p = promise:new()
  PerformHttpRequest("https://api.web2m.com/historyapiacbv3/M@ilong1812/523041/D29407A5-4A99-3AFC-A5A5-5A5CFFBBAC02",
    function(status, body, headers, errorData)
      if status == 200 then
        p:resolve(json.decode(body))
      else
        p:resolve(nil)
      end
    end, "GET", "", {})
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

function Api:GetProcessingOrderByDescription(description)
  for k, v in ipairs(self.processingPlayers) do
    if string.find(description, v.code) then
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

function Api:RequestThread()
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
        local transactionID = tostring(v.transactionID)
        local amount = v.amount
        local description = v.description
        local transactionDate = v.transactionDate
        local type = v.type
        if type == "IN" then
          if not self:IsTransactionProcessed(transactionID) then
            local order = self:GetProcessingOrderByDescription(description)
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
end

Citizen.CreateThread(function()
  Api:Init()
end)
