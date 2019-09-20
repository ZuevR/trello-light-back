'use strict';

const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {

  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.NUMBER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING
      },
      ownerId: {
        type: Sequelize.INTEGER
      }

    }, {
      sequelize,
      timestamps: false,
      tableName: 'boards'
    })
  };

  static associate(models) {
    this.belongsToMany(models.User, {
      through: { model: models.UserBoard },
      foreignKey: 'boardId',
      as: 'users'
    })
  }

};
