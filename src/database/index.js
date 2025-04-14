const { Sequelize } = require("sequelize");
const config = require("./config/database");

const Team = require("./models/Team");
const Player = require("./models/Player");
const Match = require("./models/Match");
const SeasonRating = require("./models/SeasonRating");

const connection = new Sequelize(config);

Team.init(connection);
Player.init(connection);
Match.init(connection);
SeasonRating.init(connection);

/*
(async () => {
  await connection.sync({ force: true });
})();
*/
// Uncomment the above code to force sync the database and drop all tables.

module.exports = connection;
