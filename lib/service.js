const api = require('./api');

const getCurrentUser = (email, token) =>
  api.get('/rest/api/2/myself', {
    headers: { Authorization: `Basic ${Buffer.from(email + ':' + token).toString('base64')}` },
  });

const getAllBoard = (email, token) =>
  api.get(`/rest/agile/1.0/board`, {
    headers: { Authorization: `Basic ${Buffer.from(email + ':' + token).toString('base64')}` },
  });

const getSprintsByBoard = (boardId, startAt) => api.get(`/rest/agile/1.0/board/${boardId}/sprint?startAt=${startAt}`);

const getAllIssues = (boardId, sprintId, startAt) =>
  api.get(`/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue?startAt=${startAt}`);

const getAllProject = (email, token) =>
  api.get(`/rest/api/2/project/search`, {
    headers: { Authorization: `Basic ${Buffer.from(email + ':' + token).toString('base64')}` },
  });

module.exports = { getCurrentUser, getAllBoard, getSprintsByBoard, getAllProject, getAllIssues };
