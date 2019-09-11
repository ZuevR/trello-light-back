'use strict';
const Sequelize = require('sequelize');

const { StringHelper } = require('../helpers');

module.exports = class User extends Sequelize.Model {

  constructor(data) {
    super();
    this.username = data.username;
    this.email = data.email;
  }

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
      verification_token: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN,
        default: false
      }
    }, {
      sequelize,
      timestamps: false,
      tableName: 'users'
    })
  };

  static associate(models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Task.belongsTo(models.User);

    // this.hasMany(models.Post, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });

    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Task.belongsTo(models.User);

    // this.hasMany(models.Comment, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  }

  static save() {
    return this.create(this);
  }

  setPassword(password) {
    if (password) {
      this.password = StringHelper.generatePasswordHash(password);
    }
  }

  setEmail() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
  }

  generateEmailVerificationToken() {
    this.verification_token = StringHelper.generateRandomString(50);
  }

  sendEmail() {

  }

  serialize() {
    return {
      id: this.get('id'),
      username: this.get('username'),
      email: this.get('email')
    };
  }

};
