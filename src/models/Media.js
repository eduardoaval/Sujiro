const { Model, DataTypes } = require('sequelize');

class Media extends Model {
    static init(sequelize){
        super.init({
              title: DataTypes.STRING,
              description: DataTypes.STRING,
              score: DataTypes.DECIMAL,
              imagePoster: DataTypes.STRING,
              imageBanner: DataTypes.STRING,
              tags: DataTypes.STRING,
              platform: DataTypes.STRING,
              author: DataTypes.STRING,
              year: DataTypes.INTEGER,
              synopsis: DataTypes.STRING,
              cast: DataTypes.STRING,
              curiosities: DataTypes.STRING,
              plot: DataTypes.STRING,
              releaseDate: DataTypes.DATE,
              type: DataTypes.STRING
        }, { sequelize })
    }
}

module.exports = Media;