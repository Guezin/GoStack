'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      password_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },

      privade: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      created_at: {
        type: Sequelize.STRING,
        allowNull: false
      },

      updated_at: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: queryInterface => queryInterface.dropTable('users')
};
