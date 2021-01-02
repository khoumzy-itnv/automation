const axios = require('axios');
const CredentialManager = require('../lib/credential-manager');
const pkg = require('../package.json');

const instance = axios.create({
  baseURL: 'https://rmsys.atlassian.net',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  if (config && config.url && !config.url.includes('/createmeta')) {
    const credential = new CredentialManager(`itnv-${pkg.name}`);
    config.headers.Authorization = `Basic ${credential.getAuthorization()}`;
  }

  return config;
}, Promise.reject);

module.exports = instance;
