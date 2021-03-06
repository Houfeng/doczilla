#!/usr/bin/env node

const path = require('path');
const console = require('console3');
const pkg = require('../package');
const Generator = require('../');
const { cmdline } = require('cmdline');

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
  .option(['-p', '--path'], 'string')
  .option(['-t', '--type'], 'string')
  .action(async function (path, type) {
    try {
      const generator = new Generator(path);
      await generator.create(type);
    } catch (err) {
      onError(err);
    }
  }, false)

  .root.command(['d', 'dev'])
  .option(['-p', '--path'], 'string')
  .action(async function (path) {
    try {
      const generator = new Generator(path, 'dev');
      await generator.clean();
      await generator.dev();
    } catch (err) {
      onError(err);
    }
  }, false)

  .root.command(['b', 'build'])
  .option(['-p', '--path'], 'string')
  .action(async function (path) {
    try {
      const generator = new Generator(path);
      await generator.clean();
      await generator.build();
    } catch (err) {
      onError(err);
    }
  }, false)

  .ready();
