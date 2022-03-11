const { Model, DataTypes, Sequelize } = require('sequelize');


const EVENTTYPE_TABLE = 'EventType';

const EventTypeSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  nameType:{type: DataTypes.STRING,allowNull: true,defaultValue:''}
}
class EventType extends Model {


  static config(sequelize) {
    return {
      sequelize,
      tableName: EVENTTYPE_TABLE,
      modelName: 'EventType',
      timestamps: false
    }
  }
}

module.exports = { EventType, EventTypeSchema, EVENTTYPE_TABLE };