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
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }

    }, {
      sequelize,
      timestamps: false,
      tableName: 'boards'
    })
  };

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' })
  }

};
