const path = require('path')
const shell = require('shelljs')
const BaseForever = require('./baseForever')

class Forever extends BaseForever {
  setup(name) {
    switch (name) {
      case 'all': {
        const workers = this.allWorkers()
        workers.forEach(({ host }) => {
          this.runScriptInServer(host, this.SETUP_SCRIPT)
        })
        break
      }
      default: {
        const { host } = this.workerByName(name)
        this.runScriptInServer(host, this.SETUP_SCRIPT)
      }
    }
  }
}

module.exports = Forever
