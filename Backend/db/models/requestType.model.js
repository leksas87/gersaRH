const { Model, DataTypes, Sequelize } = require('sequelize');


const REQUESTTYPE_TABLE = 'RequestType';

const RequestTypeSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  nameRequestType:{type: DataTypes.STRING,allowNull: true,defaultValue:''}
}
class RequestType extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: REQUESTTYPE_TABLE,
      modelName: 'RequestType',
      timestamps: false
    }
  }
}

module.exports = { RequestType, RequestTypeSchema, REQUESTTYPE_TABLE };