const yargs = require('yargs')
const { Noup } = require('./src')

const noup = new Noup()
yargs
  .usage('$0 <cmd> [args]')
  .command('logs <name> [pid]', 'Show worker logs', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      describe: 'name of worker'
    })
    yargs.positional('pid', {
      type: 'string',
      default: 'all',
      describe: 'name of worker'
    })
  }, ({ name, pid }) => {
    noup.logs(name, pid)
  })
  .command('status [name]', 'Show worker status', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'all',
      describe: 'name of worker'
    })
  }, (argv) => {
    noup.status(argv.name)
  })
  .command('start [name]', 'Start worker', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'all',
      describe: 'name of worker'
    })
  }, (argv) => {
    noup.start(argv.name)
  })
  .command('stop [name]', 'Stop worker', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'all',
      describe: 'name of worker'
    })
  }, (argv) => {
    noup.stop(argv.name)
  })
  .command('deploy [name]', 'Deploy workers', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'all',
      describe: 'name of worker'
    })
  }, (argv) => {
    noup.deploy(argv.name)
  })
  .command('setup [name]', 'Setup worker enviroment', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'all',
      describe: 'name of worker'
    })
  }, (argv) => {
    noup.setup(argv.name)
  })
  .help()
  .argv
