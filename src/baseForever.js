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
    this.SETUP_SCRIPT = path.join(__dirname, '../scripts/setup.sh')
  }

  runScriptInServer(host, script) {
    console.log(`✓ Host ${host}`)
    shell.exec(`ssh ${host} "bash -s" < ${script}`)
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
}

module.exports = BaseForever
