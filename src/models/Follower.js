const { Model, DataTypes } = require('sequelize');

class Follower extends Model {
    static init(sequelize){
        super.init({
            followerId: DataTypes.INTEGER,
            followedId: DataTypes.INTEGER,
        }, { sequelize })
    }
}

module.exports = Follower;