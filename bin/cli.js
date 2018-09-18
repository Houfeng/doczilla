#!/usr/bin/env node

const cmdline = require('cmdline');
const path = require('path');
const console = require('console3');
const pkg = require('../package');
const Generator = require('../');

function onError(err) {
  if (process.env.DEBUG) {
    console.error(err);
  } else {
    console.error(err.message);
  }
  process.exit(1);
}

cmdline
  .version(pkg.version)
  .help(path.normalize(`@${__dirname}/help.txt`))
  .error(onError)

  .root.command(['i', 'init'])
  .action(async function () {
    try {
      const generator = new Generator('./');
      await generator.init();
    } catch (err) {
      onError(err);
    }
  }, false)

  .root.command(['b', 'build'])
  .option(['-c', '--config'], 'string')
  .action(async function (config) {
    try {
      const generator = new Generator(config || './');
      await generator.build();
    } catch (err) {
      onError(err);
    }
  }, false)

  .ready();
