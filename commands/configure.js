const inquirer = require('inquirer');
const pkg = require('../package.json');
const utils = require('../lib/util');
const services = require('../lib/service');
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
      const { data } = await services.getCurrentUser(email, token);

      await credentials.set(email, token);

      console.log(chalk.green('Successfully connected to your Jira account.'));
    } catch (error) {
      console.log(chalk.red('An expected error occurs. Check your email and token and try again.'));
    }
  },
};

module.exports = jiraConfigure;
