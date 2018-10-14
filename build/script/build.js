var shell = require('shelljs')
var path = require('path')
var fs = require('fs')
var { promisify } = require('util')
var readdirSync = promisify(fs.readdir)

var env = process.argv[2]

readdirSync(path.resolve(__dirname, '../../dist/dll')).then(files => {
  if (files.length < 2) {
    shell.exec(`npm run build:dll; npm run build:${env}`)
  } else {
    shell.exec(`npm run build:${env}`)
  }
}).catch(error => {
  shell.exec(`npm run build:dll; npm run build:${env}`)
})