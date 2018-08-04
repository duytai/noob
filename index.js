const yargs = require('yargs')
const { Forever } = require('./src')

const forver = new Forever()
yargs
  .usage('$0 <cmd> [args]')
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
