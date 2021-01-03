const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');

const API_KEY = '376650fbf1232056b59514b3eb19528c-c50a0e68-c0712c43';
const DOMAIN = 'sandboxeccbd173455f4cd7a5d8e91033ab3f52.mailgun.org';

const auth = {
  auth: {
    api_key: API_KEY,
    domain: DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mailgun(auth));

const data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'khoumamohamet@gmail.com',
  subject: 'Hello world',
  text: 'Testing some Mailgun awesomeness!',
};

transporter.sendMail(data, (error, info) => {
  if (!error) {
    console.log('Mail sent 👌🏾');
    console.log(info);
  } else {
    console.log('Ooops ! Error 😩', error);
  }
});
