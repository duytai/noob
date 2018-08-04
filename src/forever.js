const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const BaseForever = require('./baseForever')

class Forever extends BaseForever {
  start(name) {
    const { name: appName } = this.getApp() 
    switch (name) {
      case 'all': {
        const workers = this.allWorkers()
        workers.forEach(({ host, instances }) => {
          this.runScriptInServer(host, this.START_SCRIPT, {
            APP_NAME: appName,
            INSTANCES: instances,
          })
        })
        break
      }
      default: {
        const { host, instances } = this.workerByName(name)
        this.runScriptInServer(host, this.START_SCRIPT, {
          APP_NAME: appName,
          INSTANCES: instances,
        })
      }
    }
  }

  stop(name) {
    const { name: appName } = this.getApp() 
    switch (name) {
      case 'all': {
        const workers = this.allWorkers()
        workers.forEach(({ host, instances }) => {
          this.runScriptInServer(host, this.STOP_SCRIPT, {
            APP_NAME: appName,
            INSTANCES: instances,
          })
        })
        break
      }
      default: {
        const { host, instances } = this.workerByName(name)
        this.runScriptInServer(host, this.STOP_SCRIPT, {
          APP_NAME: appName,
          INSTANCES: instances,
        })
      }
    }
  }

  deploy(name) {
    const app = this.getApp()
    const appEnv = this.getEnv()
    const { name: appName, path: appPath } = app
    const appGitPath = path.join(appPath, '.git')
    if (!fs.existsSync(appPath)) throw new Error(`No path ${appPath}`)
    if (!fs.existsSync(appGitPath)) throw new Error(`Must be git project ${appPath}`)
    const pwd = shell.pwd().toString()
    const copyOfAppPath = path.join(pwd, appName)
    const appTarPath = path.join(pwd, `${appName}.tar.gz`)
    const copyOfAppGitPath = path.join(copyOfAppPath, '.git')
    if (fs.existsSync(appTarPath)) {
      shell.exec(`rm -rf ${appTarPath}`)
    }
    if (fs.existsSync(copyOfAppPath)) {
      shell.exec(`rm -rf ${copyOfAppPath}`) 
    }
    shell.exec(`git clone ${appPath} ${copyOfAppPath} &> /dev/null`)
    shell.exec(`rm -rf ${copyOfAppGitPath}`)
    shell.exec(`tar -zcvf ${appTarPath} ${appName} &> /dev/null`)
    switch (name) {
      case 'all': {
        const workers = this.allWorkers()
        workers.forEach(({ host, env = {}, instances }) => {
          shell.exec(`scp ${appTarPath} ${host}:~`)
          this.runScriptInServer(
            host,
            this.DEPLOY_SCRIPT,
            {
              ...Object.assign({}, appEnv, env),
              TAR_FILE: `${appName}.tar.gz`,
              APP_NAME: appName,
              INSTANCES: instances,
            },
          )
        })
        break
      }
      default: {
        const { host, instances, env } = this.workerByName(name)
        shell.exec(`scp ${appTarPath} ${host}:~`)
        this.runScriptInServer(
          host,
          this.DEPLOY_SCRIPT,
          {
            ...Object.assign({}, appEnv, env),
            TAR_FILE: `${appName}.tar.gz`,
            APP_NAME: appName,
            INSTANCES: instances,
          },
        )
      }
    }
    shell.exec(`rm -rf ${copyOfAppPath}`)
    shell.exec(`rm -rf ${appTarPath}`)
  }

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
