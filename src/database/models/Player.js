const { Model, DataTypes } = require("sequelize");

class Player extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        image: DataTypes.STRING,
        position: DataTypes.STRING,
        positionSimple: DataTypes.STRING,
        accurateCrosses: DataTypes.INTEGER,
        accurateCrossesPercentage: DataTypes.FLOAT,
        accurateLongBalls: DataTypes.INTEGER,
        accurateLongBallsPercentage: DataTypes.FLOAT,
        accuratePasses: DataTypes.INTEGER,
        accuratePassesPercentage: DataTypes.FLOAT,
        aerialDuelsWon: DataTypes.INTEGER,
        assists: DataTypes.INTEGER,
        bigChancesCreated: DataTypes.INTEGER,
        bigChancesMissed: DataTypes.INTEGER,
        blockedShots: DataTypes.INTEGER,
        cleanSheet: DataTypes.INTEGER,
        dribbledPast: DataTypes.INTEGER,
        errorLeadToGoal: DataTypes.INTEGER,
        expectedAssists: DataTypes.FLOAT,
        expectedGoals: DataTypes.FLOAT,
        goals: DataTypes.INTEGER,
        goalsAssistsSum: DataTypes.INTEGER,
        goalsConceded: DataTypes.INTEGER,
        interceptions: DataTypes.INTEGER,
        keyPasses: DataTypes.INTEGER,
        minutesPlayed: DataTypes.INTEGER,
        passToAssist: DataTypes.INTEGER,
        redCards: DataTypes.INTEGER,
        saves: DataTypes.INTEGER,
        shotsOnTarget: DataTypes.INTEGER,
        successfulDribbles: DataTypes.INTEGER,
        tackles: DataTypes.INTEGER,
        totalShots: DataTypes.INTEGER,
        yellowCards: DataTypes.INTEGER,
        totalRating: DataTypes.FLOAT,
        totalLongBalls: DataTypes.INTEGER,
        totalCross: DataTypes.INTEGER,
        totalPasses: DataTypes.INTEGER,
        shotsFromInsideTheBox: DataTypes.INTEGER,
        appearances: DataTypes.INTEGER,
        attacking: DataTypes.INTEGER,
        technical: DataTypes.INTEGER,
        tactical: DataTypes.INTEGER,
        defending: DataTypes.INTEGER,
        creativity: DataTypes.INTEGER,
        teamId: DataTypes.INTEGER,
        rating: DataTypes.FLOAT,
        userCount: DataTypes.INTEGER,
      },
      { sequelize }
    );
  }
}

module.exports = Player;
