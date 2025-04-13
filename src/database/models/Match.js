const { Model, DataTypes } = require("sequelize");

class Match extends Model {
  static init(sequelize) {
    super.init(
      {
        slug: DataTypes.STRING,
        status: DataTypes.STRING,
        customId: DataTypes.STRING,
        startTimestamp: DataTypes.BIGINT,
        round: DataTypes.INTEGER,
        winner: DataTypes.INTEGER,
        homeScore: DataTypes.INTEGER,
        awayScore: DataTypes.INTEGER,
        homeTeamId: DataTypes.INTEGER,
        awayTeamId: DataTypes.INTEGER,
      },
      { sequelize }
    );
  }
}

module.exports = Match;
