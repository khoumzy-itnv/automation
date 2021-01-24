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
  .option('-r, --release', 'Deploy all tickets in one release')
  .action(async options => await delivery('DONE', options.release));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
