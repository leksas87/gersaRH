const { Model, DataTypes, Sequelize } = require('sequelize');

const {EMPLOYEE_TABLE} = require('./employee.model');

const LOGBOOK_TABLE = 'Logbook';

const LogbookSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  employeeId:{ type: DataTypes.INTEGER,allowNull:true,references:{model:EMPLOYEE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  longitude: { type: DataTypes.STRING,allowNull: true,defaultValue:''},
  latitude: {type: DataTypes.STRING,allowNull: true,defaultValue:''},
  dateCheck: {type:DataTypes.DATEONLY,allowNull:true,defaultValue: DataTypes.NOW('yyyy-mm-dd'),},
  initHour: {type: DataTypes.TIME,allowNull: true,defaultValue:DataTypes.NOW},
  endHour: {type: DataTypes.TIME,allowNull: true,defaultValue:'00:00:00'},
}


class Logbook extends Model {

  static associate(models) {
    this.belongsTo(models.Employee, { as: 'employee' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LOGBOOK_TABLE,
      modelName: 'Logbook',
      timestamps: false
    }
  }
}

module.exports = { Logbook, LogbookSchema, LOGBOOK_TABLE };