'use strict';

const Sequelize = require('sequelize');
const nodemailer = require('nodemailer');

const { StringHelper, MailHelper } = require('../helpers');
const config = require('../config/smtp');

module.exports = class Token extends Sequelize.Model {

  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      expire: {
        type: Sequelize.STRING
      },
      verification_token: {
        type: Sequelize.STRING,
        primaryKey: true
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
    this.verification_token = StringHelper.generateRandomString(50);
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
