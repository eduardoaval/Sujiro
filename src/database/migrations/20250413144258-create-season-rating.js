"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SeasonRatings", {
      rating: {
        type: Sequelize.FLOAT,
      },
      isHome: {
        type: Sequelize.BOOLEAN,
      },
      matchId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      playerId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SeasonRatings");
  },
};
