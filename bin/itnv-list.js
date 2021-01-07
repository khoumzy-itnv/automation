const pkg = require('../package.json');
const { program } = require('commander');
const { getBoards, getProjects } = require('../commands/list');

program.version(pkg.version);

program
  .command('board')
  .description('List all boards')
  .action(async () => await getBoards());

program
  .command('project')
  .description('List all projects')
  .action(async () => await getProjects());

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
