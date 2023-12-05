Citizen.CreateThreadNow(function()
  local success, result = pcall(MySQL.scalar.await, 'SELECT 1 from cashshop_histories')
  if not success then
    print('Creating cashshop_histories table...')
    MySQL.query([[
      CREATE TABLE IF NOT EXISTS `cashshop_histories` (
        `identifier` varchar(50) DEFAULT NULL,
        `date` bigint(20) DEFAULT NULL,
        `quantity` int(11) DEFAULT NULL,
        `total` int(11) DEFAULT NULL,
        `payment_method` char(50) DEFAULT NULL,
        `item` longtext DEFAULT NULL,
        KEY `identifier` (`identifier`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
    ]])
  end
end)

function isObjectEqual(a, b)
  if a == b then 
    return true
  end
  if a == nil and b == nil then 
    return true
  end
  if a == nil or b == nil then 
    return false
  end
  if type(a) ~= 'table' or type(b) ~= 'table' then 
    return false
  end
  for k, v in pairs(a) do 
    if b[k] ~= v then 
      return false
    end
  end
  for k, v in pairs(b) do 
    if a[k] ~= v then 
      return false
    end
  end
  return true
end

function getConfigItem(item)
  for k, v in ipairs(Config.Items) do
    if v.name == item.name and isObjectEqual(v.metadata, item.metadata) then
      return v
    end
  end
end

function checkMoney(xPlayer, accountName, money)
  if xPlayer.getAccount(accountName).money < money then 
    return false,{
      status = 'error',
      message = 'Bạn không đủ tiền'
    }
  end
  return true, {}
end

function canCarryItem(xPlayer, itemData, count)
  if itemData.category == 'item' or itemData.category == 'weapon' then 
    print(itemData.name, count)
    if not xPlayer.canCarryItem(itemData.name, count) then 
      return false, {
        status = 'error',
        message = 'Kho đồ của bạn đã đầy'
      }
    end
  end
  return true, {}
end

function addItem(xPlayer, itemData, count)
  if itemData.category == 'item' or itemData.category == 'clothes' or itemData.category == 'weapon' then 
    print(json.encode(itemData))
    xPlayer.addInventoryItem(itemData.name, count, itemData.metadata)
    return true, {}
  end
  if itemData.category == 'vehicle' then 
    local result = lib.callback.await('lr_vehicle:getVehicle', xPlayer.source, itemData.name)
    if not result then 
      return false, {
        status = 'error',
        message = 'Không thể tạo phương tiện'
      }
    end
    if result.status == 'error' then 
      return false, result.message
    end
    local plate = result.data.plate
    local vehicle = result.data.vehicle
    local query = [[
      INSERT INTO owned_vehicles (owner, plate, vehicle)
      VALUES (?, ?, ?)
    ]]
    local id = MySQL.insert.await(query, {
      xPlayer.identifier,
      plate,
      json.encode({model = joaat(itemData.name), plate = plate})
    })
    print('created vehicle', id)
  end
  return true, {}
end

function addHistory(xPlayer, itemData, count, paymentMethod)
  local identifier = xPlayer.identifier
  local date = os.time()
  local total = itemData.price[paymentMethod] * count
  local item = itemData.name
  local query = [[
    INSERT INTO cashshop_histories (identifier, date, quantity, total, payment_method, item)
    VALUES (?, ?, ?, ?, ?, ?)
  ]]
  local id = MySQL.insert.await(query, {
    identifier,
    date,
    count,
    total,
    paymentMethod,
    json.encode(itemData)
  })
  print("Inserted history", id)
end

lib.callback.register('lr_cashshop:buyItem', function(source, items)
  local xPlayer = ESX.GetPlayerFromId(source)
  local standardItems = {}
  local sumCoin = 0
  local sumMoney = 0
  for k, v in ipairs(items) do 
    if not v.item then 
      return {
        status = 'error',
        message = 'Dữ liệu không hợp lệ'
      }
    end
    if not v.quantity or v.quantity < 1 then 
      return {
        status = 'error',
        message = 'Số lượng không hợp lệ'
      }
    end
    local itemData = getConfigItem(v.item)
    if not itemData then 
      return {
        status = 'error',
        message = 'Vật phẩm không hợp lệ'
      }
    end
    local paymentMethod = v.paymentMethod
    local price = itemData.price[paymentMethod]
    if price == nil then 
      return {
        status = 'error',
        message = 'Vật phẩm không hợp lệ'
      }
    end
    local totalPrice = price * v.quantity
    local hasMoney, moneyError = checkMoney(xPlayer, paymentMethod, totalPrice)
    if not hasMoney then 
      return moneyError
    end
    local canCarry, carryError = canCarryItem(xPlayer, itemData, v.quantity)
    if not canCarry then 
      return carryError
    end
    local addItem, addItemError = addItem(xPlayer, itemData, v.quantity)
    if not addItem then 
      return addItemError
    end
    xPlayer.removeAccountMoney(paymentMethod, totalPrice, ('%s - %s'):format(itemData.label, paymentMethod))
    addHistory(xPlayer, itemData, v.quantity, paymentMethod)
  end
  return {
    status = 'success',
    message = 'Bạn đã mua thành công'
  }
end)

lib.callback.register('lr_cashshop:fetchHistories', function(source)
  local xPlayer = ESX.GetPlayerFromId(source)
  local identifier = xPlayer.identifier
  local query = [[
    SELECT * FROM cashshop_histories WHERE identifier = ? ORDER BY date DESC LIMIT 50
  ]]
  local histories = MySQL.query.await(query, {identifier})
  return histories
  
end)