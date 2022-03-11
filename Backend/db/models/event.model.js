const { Model, DataTypes, Sequelize } = require('sequelize');

const {EMPLOYEE_TABLE} = require('./employee.model');

const EVENT_TABLE = 'Event';

const EventSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  employeeId:{ type: DataTypes.INTEGER,allowNull:true,references:{model:EMPLOYEE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  DateEvent: {type:DataTypes.DATE,allowNull:true},
  latitudeEvent:{type: DataTypes.STRING,allowNull: true,defaultValue:''},
  longitudeEvent:{type: DataTypes.STRING,allowNull: true,defaultValue:''},
  tipoCheck:{type: DataTypes.STRING,allowNull: true,defaultValue:''},
}
class Event extends Model {

  static associate(models) {
    this.belongsTo(models.Employee, { as: 'employee' });
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