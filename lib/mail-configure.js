const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');

const fs = require('fs');
const path = require('path');
const mjml2html = require('mjml');
const mustache = require('mustache');

const API_KEY = '376650fbf1232056b59514b3eb19528c-c50a0e68-c0712c43';
const DOMAIN = 'sandboxeccbd173455f4cd7a5d8e91033ab3f52.mailgun.org';

const auth = {
  auth: {
    api_key: API_KEY,
    domain: DOMAIN,
  },
};

function loadHtmlTemplate(params) {
  const mjmlTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'delivery.mjml'), 'utf8');
  const { html: htmlTemplate } = mjml2html(mjmlTemplate);

  return mustache.render(htmlTemplate, params);
}

const transporter = nodemailer.createTransport(mailgun(auth));

const data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'khoumamohamet@gmail.com',
  subject: 'Hello world',
  html: loadHtmlTemplate({
    environment: 'acceptance',
    production: true,
    version: '3.1.1',
    tickets: [
      { key: 'LAND-1001', summary: 'Summary LAND-1001' },
      { key: 'LAND-1002', summary: 'Summary LAND-1002' },
      { key: 'LAND-1003', summary: 'Summary LAND-1003' },
    ],
  }),
};

transporter.sendMail(data, (error, info) => {
  if (!error) {
    console.log('Mail sent 👌🏾');
    console.log(info);
  } else {
    console.log('Ooops ! Error 😩', error);
  }
});
