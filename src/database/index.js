const { Sequelize } = require("sequelize");
const config = require("./config/database");

const Team = require("./models/Team");
const Player = require("./models/Player");
const Match = require("./models/Match");

const connection = new Sequelize(config);

Team.init(connection);
Player.init(connection);
Match.init(connection);

module.exports = connection;
