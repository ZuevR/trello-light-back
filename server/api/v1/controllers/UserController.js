// const { User } = require('../models');
// const { TokenHelper, FormHelper, ResponseHelper } = require('../helpers');
const nodemailer = require('nodemailer');
const config = require('../../../config');

function mail() {

  let transporter = nodemailer.createTransport(config.mailConfig);

  let info = transporter.sendMail({
    from: 'foo@example.com',
    to: 'zuevrg@yandex.ru',
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: '<b>Hello world?</b>'
  });
}

module.exports = {
  signup(req, res) {
    mail()
      .then(res => console.log(res))
      .catch(e => console.log(e));
    console.log(process.env.tte);
    res.send('Auth');
  }
};
