const path = require('path')
const shell = require('shelljs')

describe('# Tool', () => {
  before(() => {
    const envPath = path.join(__dirname, './env')
    shell.cd(envPath)
  })
  
  it('# deploy', () => {
    shell.exec('node ../../index.js deploy')
    shell.exec('node ../../index.js deploy one')
  })

  return
  it('# setup', () => {
    shell.exec('node ../../index.js setup')
    shell.exec('node ../../index.js setup one')
  })

})
