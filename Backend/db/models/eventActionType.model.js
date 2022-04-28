const { Model, DataTypes, Sequelize } = require('sequelize');


const EVENTACTIONTYPE_TABLE = 'EventActionType';

const EventActionTypeSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  nameEventActionType:{type: DataTypes.STRING,allowNull: true,defaultValue:''}
}
class EventActionType extends Model {


  static config(sequelize) {
    return {
      sequelize,
      tableName: EVENTACTIONTYPE_TABLE,
      modelName: 'EventActionType',
      timestamps: false
    }
  }
}

module.exports = { EventActionType, EventActionTypeSchema, EVENTACTIONTYPE_TABLE };