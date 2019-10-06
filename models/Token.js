'use strict';

const Sequelize = require('sequelize');
const nodemailer = require('nodemailer');

const { SecureHelper, MailHelper } = require('../helpers');
const config = require('../config/smtp');

module.exports = class Token extends Sequelize.Model {

  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      expire: {
        type: Sequelize.INTEGER,
        defaultValue: Math.floor(Date.now() / 1000) + (3600 * 24)
      },
      verification_token: {
        type: Sequelize.STRING
      }
    }, {
      sequelize,
      timestamps: false,
      tableName: 'tokens',
      modelName: 'token'
    })
  };

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
  }

  generateEmailVerificationToken() {
    this.verification_token = SecureHelper.generateRandomString(50);
  }

  updateEmailVerificationToken() {
    return this.update({
      verification_token: SecureHelper.generateRandomString(50),
      expire: Math.floor(Date.now() / 1000) + (3600 * 24)
    })
  }

  sendMail(user) {
    let transporter = nodemailer.createTransport(config.mailConfig);
    transporter.sendMail({
      from: 'do-not-reply@trello.com',
      to: user.email,
      subject: 'Trello Account Verification ✔',
      text: 'Hello world?',
      html: MailHelper.layout(user.id, this.verification_token)
    });
  }

};
