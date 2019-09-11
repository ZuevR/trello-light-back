const { User } = require('../models');
const nodemailer = require('nodemailer');
const config = require('../config/mail');

function mail() {

  const transporter = nodemailer.createTransport(config.mailConfig);

  transporter.sendMail({
    from: 'foo@example.com',
    to: 'zuevrg@yandex.ru',
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: '<b>Hello world?</b>'
  });
}

module.exports = {

  async signup(req, res, next) {
    const user = new User(req.body);
    user.setEmail();
    user.setPassword(req.body.password);
    user.generateEmailVerificationToken();
    try {
      const result = await user.save();

      console.log(result);
    } catch (e) {
      return next(e);
    }



    // mail();
    // console.log(user);
    // user.save().then(res => {
    //   console.log(res);
    // }).catch(e => {
    //   console.log(e);
    // });
    // res.send('Auth');
  }
};
