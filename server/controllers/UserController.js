const { User, Token } = require('../models').models;
const db = require('../models');
const nodemailer = require('nodemailer');

// function mail() {
//
//   const transporter = nodemailer.createTransport(config.mailConfig);
//
//   transporter.sendMail({
//     from: 'foo@example.com',
//     to: 'zuevrg@yandex.ru',
//     subject: 'Hello ✔',
//     text: 'Hello world?',
//     html: '<b>Hello world?</b>'
//   });
// }

module.exports = {

  async signup(req, res, next) {
    const user = new User(req.body);
    user.setPassword(req.body.password);
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const newUser = await user.save({ transaction });
      const verificationToken = new Token({ userId: newUser.id });
      verificationToken.generateEmailVerificationToken();
      console.log(verificationToken);
      await verificationToken.save({ transaction });
      await transaction.commit();
      verificationToken.sendMail(newUser);
    } catch (e) {
      if (transaction) await transaction.rollback();
      next(e);
    }
  }
};
