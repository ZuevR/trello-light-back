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
      await verificationToken.save({ transaction });
      await transaction.commit();
      verificationToken.sendMail(newUser);
      res.status(201).send(newUser);
    } catch (e) {
      if (transaction) await transaction.rollback();
      next(e);
    }
  },

  async signin(req, res, next) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user.status) return res.status(404).send({ errors: [{ message: 'Registration has not been confirmed' }] });
      if (!user) return res.status(404).send({ errors: [{ message: 'User with this email does not exist' }] });
      if (!user.validatePassword(req.body.password)) return res.status(401).send({ errors: [{ message: 'Wrong password' }] });
      await user.setAuthKey();
      res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  },

  async confirm(req, res, next) {
    const { confirmationToken, userId } = req.query;
    let status = 'false';
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
        status = result.status;
      }
      return res.status(301).redirect(`http://localhost:4200/auth/signin?status=${ status }&userId=${ userId }`);
    } catch (e) {
      next(e);
    }
  },

  async sendNewVerificationEmail(req, res, next) {
    const { id } = req.body;
    try {
      const user = await User.findByPk(id);
      if (user) {
        const verificationToken = await Token.findOne({ where: { userId: id } });
        await verificationToken.updateEmailVerificationToken();
        verificationToken.sendMail(user);
        res.status(200).send(user)
      }
    } catch (e) {
      next(e);
    }
  },

  async socialAuth(req, res, next) {
    try {
      const email = req.body.email;
      let user = await User.findOne({ where: { email } });
      if (!user) {
        user = await User.create({
          username: req.body.name,
          email,
          password: 'GOOGLE_AUTH',
          status: true
        });
      }
      await user.setAuthKey();
      return res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  },

  async getIdentity(req, res, next) {
    const userId = req._userId;
    try {
      const user = await User.findByPk(userId);
      res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  },

  async logout(req, res, next) {
    const userId = req._userId;
    try {
      const user = await User.findByPk(userId);
      await user.update({ auth_key: null });
      res.status(200).send(null);
    } catch (e) {
      next(e);
    }

  }
};
