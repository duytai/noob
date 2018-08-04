const path = require('path')
const shell = require('shelljs')

describe('# Tool', () => {
  before(() => {
    const envPath = path.join(__dirname, './env')
    shell.cd(envPath)
  })

  it('start', () => {
    shell.exec('node ../../index.js start')
    shell.exec('node ../../index.js start one')
  })
  return
  it('stop', () => {
    shell.exec('node ../../index.js stop')
    shell.exec('node ../../index.js stop one')
  })  

  it('# deploy', () => {
    shell.exec('node ../../index.js deploy')
    shell.exec('node ../../index.js deploy one')
  })

  it('# setup', () => {
    shell.exec('node ../../index.js setup')
    shell.exec('node ../../index.js setup one')
  })

})
