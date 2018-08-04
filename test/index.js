const path = require('path')
const shell = require('shelljs')

it('# setup', () => {
  const envPath = path.join(__dirname, './env')
  shell.cd(envPath)
  shell.exec('node ../../index.js setup')
  shell.exec('node ../../index.js setup one')
})
