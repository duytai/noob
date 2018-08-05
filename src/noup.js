const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const BaseNoup = require('./baseNoup')

class Noup extends BaseNoup {
  logs(name, pid) {
    const { name: appName } = this.getApp() 
    const { host } = this.workerByName(name)
    this.runScriptInServer({
      host,
      script: this.LOGS_SCRIPT,
      env: {
        APP_NAME: appName,
        APP_PID: pid,
        NODE_VERSION: this.getNodeVersion(),
      },
    })
  }

  status(name) {
    const { name: appName } = this.getApp() 
    switch (name) {
      case 'all': {
        const workers = this.allWorkers()
        workers.forEach(({ host, instances }) => {
          this.runScriptInServer({
            host,
            script: this.STATUS_SCRIPT,
            env: {
              APP_NAME: appName,
              INSTANCES: instances,
              NODE_VERSION: this.getNodeVersion(),
            },
          })
        })
        break
      }
      default: {
        const { host, instances } = this.workerByName(name)
        this.runScriptInServer({
          host,
          script: this.STATUS_SCRIPT,
          env: {
            APP_NAME: appName,
            INSTANCES: instances,
            NODE_VERSION: this.getNodeVersion(),
          },
        })
      }
    }
  }

  start(name) {
    const { name: appName } = this.getApp() 
    switch (name) {
      case 'all': {
        const workers = this.allWorkers()
        workers.forEach(({ host, instances }) => {
          this.runScriptInServer({
            host,
            script: this.START_SCRIPT,
            env: {
              APP_NAME: appName,
              INSTANCES: instances,
              NODE_VERSION: this.getNodeVersion(),
            },
          })
        })
        break
      }
      default: {
        const { host, instances } = this.workerByName(name)
        this.runScriptInServer({
          host,
          script: this.START_SCRIPT,
          env: {
            APP_NAME: appName,
            INSTANCES: instances,
            NODE_VERSION: this.getNodeVersion(),
          },
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
          this.runScriptInServer({
            host,
            script: this.STOP_SCRIPT,
            env: {
              APP_NAME: appName,
              INSTANCES: instances,
              NODE_VERSION: this.getNodeVersion(),
            },
          })
        })
        break
      }
      default: {
        const { host, instances } = this.workerByName(name)
        this.runScriptInServer({
          host,
          script: this.STOP_SCRIPT,
          env: {
            APP_NAME: appName,
            INSTANCES: instances,
            NODE_VERSION: this.getNodeVersion(),
          },
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
          this.runScriptInServer({
            host,
            script: this.DEPLOY_SCRIPT,
            env: {
              ...Object.assign({}, appEnv, env),
              TAR_FILE: `${appName}.tar.gz`,
              APP_NAME: appName,
              INSTANCES: instances,
              NODE_VERSION: this.getNodeVersion(),
            },
          })
        })
        break
      }
      default: {
        const { host, instances, env } = this.workerByName(name)
        shell.exec(`scp ${appTarPath} ${host}:~`)
        this.runScriptInServer({
          host,
          script: this.DEPLOY_SCRIPT,
          env: {
            ...Object.assign({}, appEnv, env),
            TAR_FILE: `${appName}.tar.gz`,
            APP_NAME: appName,
            INSTANCES: instances,
            NODE_VERSION: this.getNodeVersion(),
          },
        })
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
          this.runScriptInServer({
            host,
            script: this.SETUP_SCRIPT,
            env: {
              NODE_VERSION: this.getNodeVersion(),
            }
          })
        })
        break
      }
      default: {
        const { host } = this.workerByName(name)
        this.runScriptInServer({
          host,
          script: this.SETUP_SCRIPT,
          env: {
            NODE_VERSION: this.getNodeVersion(),
          }
        })
      }
    }
  }
}

module.exports = Noup 
