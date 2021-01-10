const { getListIssues } = require('./list');
const inquirer = require('inquirer');

const delivery = async status => {
  const issues = await getListIssues(status);

  let { selectedIssues } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedIssues',
      message: 'Which tickets do you want to deliver?',
      choices: issues.map(issue => issue.key),
    },
  ]);

  const selected = issues.filter(issue => selectedIssues.includes(issue.key));

  if (status === 'DONE') {
    let { version } = await inquirer.prompt([
      { type: 'input', name: 'version', message: 'Which version do you want to deliver?' },
    ]);
    console.log(version);
  }

  // here send mail
};

module.exports = { delivery };
