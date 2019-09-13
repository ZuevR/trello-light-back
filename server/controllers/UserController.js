const { User, Token } = require('../models').models;
const db = require('../models');

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
      // verificationToken.sendMail(newUser);
      res.status(201).send(newUser);
    } catch (e) {
      if (transaction) await transaction.rollback();
      next(e);
    }
  },

  async confirm(req, res, next) {
    const { confirmationToken, userId } = req.query;
    try {
      const user = await User.findOne({
        where: { id: userId, status: false },
        include: [{
          model: Token,
          as: 'token',
          where: { verification_token: confirmationToken }
        }]
      });
      if (!user) {
        return res.status(404).send('not exist')
      }
      if (user.token.expire > Date.now() / 1000) {
        const result = await user.update({ status: true });
        return res.status(200).send(result);
      }
      return res.status(400).send(user);
    } catch (e) {
      next(e);
    }
  },

  sendVerificationEmail(req, res, next) {

  }

};
