'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('Media', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      score: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      imagePoster: {
        type: Sequelize.STRING,
        allowNull: true
      },
      imageBanner: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tags: {
        type: Sequelize.STRING,
        allowNull: true
      },
      platform: {
        type: Sequelize.STRING,
        allowNull: true
      },
      author: {
        type: Sequelize.STRING,
        allowNull: true
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      synopsis: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cast: {
        type: Sequelize.STRING,
        allowNull: true
      },
      curiosities: {
        type: Sequelize.STRING,
        allowNull: true
      },
      plot: {
        type: Sequelize.STRING,
        allowNull: true
      },
      releaseDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Media');
  }
};
