const { Model, DataTypes, Sequelize } = require('sequelize');


const ROLLTYPE_TABLE = 'RollType';

const RollTypeSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  nameRollType:{type: DataTypes.STRING,allowNull: true,defaultValue:''}
}
class RollType extends Model {


  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLLTYPE_TABLE,
      modelName: 'RollType',
      timestamps: false
    }
  }
}

module.exports = { RollType, RollTypeSchema, ROLLTYPE_TABLE };