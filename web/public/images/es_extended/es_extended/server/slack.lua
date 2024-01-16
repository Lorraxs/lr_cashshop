local Webhooks = {
    ['default'] = 'https://hooks.slack.com/services/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', -- done
    ['additem'] = 'https://hooks.slack.com/services/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', -- done
    ['removeitem'] = 'https://hooks.slack.com/services/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', -- done
    ['money'] = 'https://hooks.slack.com/services/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',  -- done
    ['buycar'] = 'https://hooks.slack.com/services/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', -- done 2/3
    ['donateshop'] = 'https://hooks.slack.com/services/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', -- done
    ['death'] = 'https://hooks.slack.com/services/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',
    ['joinleave'] = 'https://hooks.slack.com/services/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',
    ['chat'] = 'https://hooks.slack.com/services/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',
    ['giamtu'] = 'https://hooks.slack.com/services/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', -- done 
    ['copxe'] = 'https://hooks.slack.com/services/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', -- skip
    ['bossmenu'] = 'https://hooks.slack.com/services/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', -- done
    ['chatme'] = 'https://hooks.slack.com/services/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', -- skip
    ['robbery'] = 'https://hooks.slack.com/services/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', -- skip
    ['stash'] = 'https://hooks.slack.com/services/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', -- skip
    ['quayhom'] = 'https://hooks.slack.com/services/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', -- done
    ['weapons'] = 'https://hooks.slack.com/services/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', -- done
    ['craft'] = 'https://hooks.slack.com/services/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',

}


RegisterNetEvent('esx_log:server:CreateLog', function(name, message)
    local webHook = Webhooks[name] or Webhooks['default']

    PerformHttpRequest(webHook, function() end, 'POST', json.encode({text = message}), { ['Content-Type'] = 'application/json' })
end)