'use strict';

const Sequelize = require('sequelize');

module.exports = class UserBoard extends Sequelize.Model {

  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER
      },
      boardId: {
        type: Sequelize.INTEGER
      }
    }, {
      sequelize,
      timestamps: false,
      tableName: 'userboards',
      modelName: 'userboard'
    })
  };

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.belongsTo(models.Board, { foreignKey: 'boardId' });
  }

};
