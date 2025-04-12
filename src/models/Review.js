const { Model, DataTypes } = require('sequelize');

class Review extends Model {
    static init(sequelize){
        super.init({
            userId: DataTypes.INTEGER,
            mediaId: DataTypes.INTEGER,
            description: DataTypes.STRING,
            score: DataTypes.DECIMAL,
        }, { sequelize })
    }
}

module.exports = Review;