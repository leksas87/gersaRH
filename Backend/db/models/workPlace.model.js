const { Model, DataTypes, Sequelize } = require('sequelize');


const WORKPLACE_TABLE = 'WorkPlace';

const WorkPlaceSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  nameWorkPlace:{type: DataTypes.STRING,allowNull: true,defaultValue:''}
}
class WorkPlace extends Model {


  static config(sequelize) {
    return {
      sequelize,
      tableName: WORKPLACE_TABLE,
      modelName: 'WorkPlace',
      timestamps: false
    }
  }
}

module.exports = { WorkPlace, WorkPlaceSchema, WORKPLACE_TABLE };