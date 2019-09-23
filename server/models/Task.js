'use strict';

const Sequelize = require('sequelize');

module.exports = class Task extends Sequelize.Model {

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
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      boardId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }

    }, {
      sequelize,
      timestamps: false,
      tableName: 'tasks'
    })
  };

  static associate(models) {
    this.belongsTo(models.Board, { foreignKey: 'boardId', as: 'board' });
  }

};
