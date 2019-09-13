'use strict';

const Sequelize = require('sequelize');

const { SecureHelper } = require('../helpers');

module.exports = class User extends Sequelize.Model {

  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.NUMBER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Name is required' },
          notNull: { msg: 'Name is required' },
          len: { args: [2, 30], msg: 'Please enter the name with at least 2 chars but no more than 30' }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Password is required' },
          notNull: { msg: 'Password is required' },
          len: { args: [6, 60], msg: 'Please enter the Password with at least 6 chars but no more than 60' }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: 'Incorrect email address' },
          notEmpty: { msg: 'Email is required' },
          notNull: { msg: 'Email is required' },
        },
        unique: { msg: 'Email address already in use!' }
      },
      auth_key: {
        type: Sequelize.JSON,
        defaultValue: null
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    }, {
      sequelize,
      timestamps: false,
      tableName: 'users',
      hooks: {
        beforeValidate: user => {
          if (user.username) user.username = user.username.trim();
          if (user.email) user.email = user.email.trim().toLowerCase()
        }
      }
    })
  };

  static associate(models) {
    this.hasOne(models.Token, { foreignKey: 'userId', as: 'token' });
  }

  setPassword(password) {
    if (password) {
      this.password = SecureHelper.generatePasswordHash(password);
    }
  }

  validatePassword(password) {
    return SecureHelper.comparePassword(password, this.password);
  }

  setAuthKey() {
    const token = SecureHelper.generateToken(this);
    return this.update({ auth_key: token });
  }

  removeAuthKey() {
    return this.update({ auth_key: null });
  }

};
