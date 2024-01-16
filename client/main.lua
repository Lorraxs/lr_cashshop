local isReady = false
RegisterNUICallback('setAppReady', function(data, cb)
  isReady = true
  cb('ok')
end)

Citizen.CreateThread(function()
  while not ESX do 
    Wait(0)
  end
  while not ESX.IsPlayerLoaded() do
    Wait(0)
  end
  while not isReady do
    Wait(0)
  end
  Main:Init()
end)

