const yargs = require('yargs')
const { Forever } = require('./src')

const forver = new Forever()
yargs
  .usage('$0 <cmd> [args]')
  .command('start [name]', 'Start worker', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'all',
      describe: 'name of worker'
    })
  }, (argv) => {
    forver.start(argv.name)
  })
  .command('stop [name]', 'Stop worker', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'all',
      describe: 'name of worker'
    })
  }, (argv) => {
    forver.stop(argv.name)
  })
  .command('deploy [name]', 'Deploy workers', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'all',
      describe: 'name of worker'
    })
  }, (argv) => {
    forver.deploy(argv.name)
  })
  .command('setup [name]', 'Setup worker enviroment', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'all',
      describe: 'name of worker'
    })
  }, (argv) => {
    forver.setup(argv.name)
  })
  .help()
  .argv
