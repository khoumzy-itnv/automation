const api = require('./api');

const getCurrentUser = (email, token) =>
  api.get('/rest/api/2/myself', {
    headers: { Authorization: `Basic ${Buffer.from(email + ':' + token).toString('base64')}` },
  });

module.exports = { getCurrentUser };
