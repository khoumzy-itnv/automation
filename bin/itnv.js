#! /usr/bin/env node
const pkg = require('../package.json');
const { program } = require('commander');

program
  .version(pkg.version)
  .command('configure', 'configure Jira credentials')
  .command('list', 'List jira issues')
  .parse(process.argv);
