const chalk = require('chalk');
const inquirer = require('inquirer');
const { getAllBoard, getSprintsByBoard, getAllProject, getAllIssues } = require('../lib/service');
const CredentialManager = require('../lib/credential-manager');
const pkg = require('../package.json');

const credential = new CredentialManager(`itnv-${pkg.name}`);
const list = {
  async getListIssues(status) {
    try {
      // we need the active sprint first.
      let activeSprint = null;
      const { boardId } = credential.getUserInfo();

      let [lastPage, start, index] = [false, 0, 1];

      do {
        const { data } = await getSprintsByBoard(boardId, start);

        const item = data.values.find((sprint) => sprint.state === 'active');

        if (item) {
          activeSprint = item;
          break;
        }

        const { isLast, maxResults } = data;
        [lastPage, start] = [isLast, index * maxResults];
        index += 1;
      } while (!lastPage);

      if (!activeSprint) {
        console.log(chalk('An unexcepted error occurs. Try later.'));
      }

      return await getListIssues(boardId, activeSprint.id, status);
    } catch (error) {
      console.log(error);
    }
  },
  async getBoards() {
    try {
      const { data } = await getAllBoard();

      // we suppose that we work in scrum model
      const boards = data.values.filter((board) => board.type === 'scrum');

      const { data: sprints } = await getSprintsByBoard(7);

      console.log(boards);
    } catch (error) {
      console.log(error);
    }
  },

  async getProjects() {
    try {
      const { data } = await getAllProject();

      const projects = data.values.map((project) => project.name);

      for (let name of projects) {
        console.log(`> ${chalk.green(name)}`);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

async function getListIssues(boardId, sprintId, status) {
  try {
    let issues = [];
    let [lastPage, start, index] = [false, 0, 1];

    do {
      const { data } = await getAllIssues(boardId, sprintId, start);

      const items = data.issues
        .filter((issue) => issue.fields.status.name.toUpperCase() === status)
        .map((issue) => ({
          key: issue.key,
          id: issue.id,
          summary: issue.fields.summary,
        }));

      issues = [...issues, ...items];

      const { total, maxResults } = data;
      [lastPage, start] = [total <= maxResults, index * maxResults];
      index += 1;
    } while (!lastPage);

    return issues;
  } catch (error) {
    console.log(error);
  }
}

module.exports = list;
