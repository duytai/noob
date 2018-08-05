/* 
 * all commands require forever.json file
 * this class verify and parse
 */
const shell = require('shelljs')
const path = require('path')
const fs = require('fs')

class BaseForever {
  constructor() {
    const pwd = shell.pwd().toString()
    const configPath = path.join(pwd, 'forever.json')
    if (!fs.existsSync(configPath)) throw new Error('No forever.json file')
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    this.workers = config.workers
    this.app = config.app
    this.env = config.env || {}
    this.SETUP_SCRIPT = path.join(__dirname, '../scripts/setup.sh')
    this.DEPLOY_SCRIPT = path.join(__dirname, '../scripts/deploy.sh')
    this.STOP_SCRIPT = path.join(__dirname, '../scripts/stop.sh')
    this.START_SCRIPT = path.join(__dirname, '../scripts/start.sh')
    this.STATUS_SCRIPT = path.join(__dirname, '../scripts/status.sh')
    this.LOGS_SCRIPT = path.join(__dirname, '../scripts/logs.sh')
  }
  
  runScriptInServer({ host, script, env = {} }) {
    console.log(`✓ Host ${host}`)
    const envStr = Object.keys(env).reduce((r, n) => {
      r += `${n}="${env[n]}" `
      return r
    }, '')
    shell.exec(`ssh ${host} ${envStr} "bash -s" < ${script}`)
    console.log('\n')
  }

  allWorkers() {
    return Object.values(this.workers)
  }

  workerByName(name) {
    const worker = this.workers[name]
    if (!worker) throw new Error(`No worker name ${name}`)
    return worker
  }

  getEnv() {
    return this.env
  }

  getApp() {
    return this.app 
  }
}

module.exports = BaseForever
