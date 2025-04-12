'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      shortName: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      nameCode: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      teamColorPrimary: {
        type: Sequelize.STRING
      },
      teamColorSecondary: {
        type: Sequelize.STRING
      },
      teamColorText: {
        type: Sequelize.STRING
      },
      userCount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Teams');
  }
};