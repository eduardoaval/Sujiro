const { Model, DataTypes } = require('sequelize');

class Watched extends Model {
    static init(sequelize){
        super.init({
            userId: DataTypes.INTEGER,
            mediaId: DataTypes.INTEGER,
        }, { sequelize, tableName: 'Watched' })
    }
}

module.exports = Watched;