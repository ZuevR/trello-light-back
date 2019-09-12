'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tokens', {
      verification_token: {
        type: Sequelize.STRING(50),
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      expire: {
        type: Sequelize.INTEGER
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tokens');
  }
};
