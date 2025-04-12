const { Model, DataTypes } = require("sequelize");

class Team extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        shortName: DataTypes.STRING,
        gender: DataTypes.STRING,
        nameCode: DataTypes.STRING,
        country: DataTypes.STRING,
        image: DataTypes.STRING,
        teamColorPrimary: DataTypes.STRING,
        teamColorSecondary: DataTypes.STRING,
        teamColorText: DataTypes.STRING,
        userCount: DataTypes.INTEGER,
      },
      { sequelize }
    );
  }
}

module.exports = Team;
