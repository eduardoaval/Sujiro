const { Model, DataTypes } = require("sequelize");

class SeasonRating extends Model {
  static init(sequelize) {
    super.init(
      {
        rating: DataTypes.FLOAT,
        isHome: DataTypes.BOOLEAN,
        matchId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        playerId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
      },
      { sequelize }
    );
  }
}

module.exports = SeasonRating;
