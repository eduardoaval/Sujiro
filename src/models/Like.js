const { Model, DataTypes } = require('sequelize');

class Like extends Model {
    static init(sequelize){
        super.init({
            userId: DataTypes.INTEGER,
            reviewId: DataTypes.INTEGER,
        }, { sequelize })
    }
}

module.exports = Like;