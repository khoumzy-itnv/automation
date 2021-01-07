const chalk = require('chalk');
const inquirer = require('inquirer');
const { getAllBoard, getSprintsByBoard, getAllProject } = require('../lib/service');

const list = {
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

module.exports = list;
