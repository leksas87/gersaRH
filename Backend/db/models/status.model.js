const { Model, DataTypes, Sequelize } = require('sequelize');


const STATUS_TABLE = 'Status';

const StatusSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  nameStatus:{type: DataTypes.STRING,allowNull: true,defaultValue:''}
}
class Status extends Model {


  static config(sequelize) {
    return {
      sequelize,
      tableName: STATUS_TABLE,
      modelName: 'Status',
      timestamps: false
    }
  }
}

module.exports = { Status, StatusSchema, STATUS_TABLE };