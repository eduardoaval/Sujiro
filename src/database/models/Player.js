const { Model, DataTypes } = require("sequelize");

class Player extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        image: DataTypes.STRING,
        teamId: DataTypes.INTEGER,
        rating: DataTypes.FLOAT,
        userCount: DataTypes.INTEGER,
      },
      { sequelize }
    );
  }
}

module.exports = Player;
