#!/usr/bin/env node

const yargs = require('yargs')
const { Noup, NoNoup } = require('./src')

yargs
  .usage('$0 <cmd> [args]')
  .command('init', 'create sample noup.json file', () => {
    const noNoup = new NoNoup()
    noNoup.init()
  })
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
    const noup = new Noup()
    noup.logs(name, pid)
  })
  .command('status [name]', 'Show worker status', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'all',
      describe: 'name of worker'
    })
  }, (argv) => {
    const noup = new Noup()
    noup.status(argv.name)
  })
  .command('start [name]', 'Start worker', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'all',
      describe: 'name of worker'
    })
  }, (argv) => {
    const noup = new Noup()
    noup.start(argv.name)
  })
  .command('stop [name]', 'Stop worker', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'all',
      describe: 'name of worker'
    })
  }, (argv) => {
    const noup = new Noup()
    noup.stop(argv.name)
  })
  .command('deploy [name]', 'Deploy workers', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'all',
      describe: 'name of worker'
    })
  }, (argv) => {
    const noup = new Noup()
    noup.deploy(argv.name)
  })
  .command('setup [name]', 'Setup worker enviroment', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'all',
      describe: 'name of worker'
    })
  }, (argv) => {
    const noup = new Noup()
    noup.setup(argv.name)
  })
  .help()
  .argv
