const { Sequelize } = require("sequelize");
const config = require("./config/database");

const Team = require("./models/Team");

const connection = new Sequelize(config);

Team.init(connection);

module.exports = connection;
