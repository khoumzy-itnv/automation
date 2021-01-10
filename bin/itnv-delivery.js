const pkg = require('../package.json');
const { program } = require('commander');
const { delivery } = require('../commands/delivery');

program.version(pkg.version);

program
  .command('test')
  .description('Deploy in test environment')
  .action(async () => await delivery('CODE REVIEW'));

program
  .command('prod')
  .description('Deploy in prod environment')
  .action(async () => await delivery('DONE'));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
