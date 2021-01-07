const inquirer = require('inquirer');
const pkg = require('../package.json');
const utils = require('../lib/util');
const Services = require('../lib/service');
const CredentialManager = require('../lib/credential-manager');
const chalk = require('chalk');

const jiraConfigure = {
  async configure() {
    const credentials = new CredentialManager(`itnv-${pkg.name}`);

    let { email, token } = await inquirer.prompt([
      { type: 'input', name: 'email', message: 'What is your Jira email ?', validate: utils.isEmailValid },
      { type: 'password', name: 'token', message: 'What is your Jira API-Token ?', validate: utils.isEmpty },
    ]);

    try {
      const { data: user } = await Services.getCurrentUser(email, token);

      const { data } = await Services.getAllProject(email, token);

      const projects = data.values;

      let { projectName } = await inquirer.prompt([
        {
          type: 'list',
          name: 'projectName',
          message: 'What project are you working on?',
          choices: projects.map((pr) => pr.name),
        },
      ]);

      const project = projects.find((pr) => pr.name === projectName);

      const { data: boards } = await Services.getAllBoard(email, token);

      const board = boards.values
        .filter((b) => b.type === 'scrum' && b.location.projectId.toString() === project.id)
        .shift();

      const userConfig = {
        accountId: user.accountId,
        name: user.name,
        projectId: project.id,
        projectKey: project.key,
        projetName: project.name,
        boardId: board.id,
      };

      await credentials.set(email, token, userConfig);

      console.log(chalk.green('Account succesfully configured. Bravo !!!'));
    } catch (error) {
      console.log(error);
      console.log(chalk.red('An expected error occurs. Check your email and API-token and try again.'));
    }
  },
};

module.exports = jiraConfigure;
