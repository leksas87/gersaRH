const { Model, DataTypes, Sequelize } = require('sequelize');


const {EVENTTYPE_TABLE} = require('./eventType.model');
const {EVENTACTIONTYPE_TABLE} = require('./eventActionType.model');

const {EMPLOYEE_TABLE} = require('./employee.model');
const { TIMESTAMP } = require('mysql2/lib/constants/types');

const EVENT_TABLE = 'Event';

const EventSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  employeeId:{ type: DataTypes.INTEGER,allowNull:true,references:{model:EMPLOYEE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  eventTypeId: {type: DataTypes.INTEGER,allowNull:true,references:{model:EVENTTYPE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  DateEvent: {type:DataTypes.STRING,allowNull:false },
  latitudeEvent:{type: DataTypes.STRING,allowNull: true,defaultValue:''},
  longitudeEvent:{type: DataTypes.STRING,allowNull: true,defaultValue:''},
  eventActionTypeId: {type: DataTypes.INTEGER,allowNull:true,references:{model:EVENTACTIONTYPE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'}, 
  url: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
}
class Event extends Model {

  static associate(models) {
    this.belongsTo(models.Employee, { as: 'employee' });
    this.belongsTo(models.EventType,{as:'eventType'});
    this.belongsTo(models.EventActionType,{as:'eventActionType'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EVENT_TABLE,
      modelName: 'Event',
      timestamps: false
    }
  }
}

module.exports = { Event, EventSchema, EVENT_TABLE };