fx_version "cerulean"

description "Cash shop for FiveM"
author "Lorraxs"
version '1.0.0'
repository 'https://github.com/Lorraxs/lr_cashshop'

dependencies {
  '/server:6116',
  '/onesync',
  'oxmysql',
  'ox_lib',
}

lua54 'yes'

games {
  "gta5",
  "rdr3"
}

shared_scripts {
  '@ox_lib/init.lua',
  '@es_extended/imports.lua',
}

ui_page 'web/build/index.html'
--[[ ui_page 'http://localhost:5174/' ]]

client_scripts {
  "config.lua",
  "editable-client.lua",
  "client/**/*"
}
server_script {
  'connectApi.js',
  '@oxmysql/lib/MySQL.lua',
  "config.lua",
  "server/**/*"
}

files {
  'web/build/index.html',
  'web/build/**/*',
}
