const { Model, DataTypes, Sequelize } = require('sequelize');

const {EMPLOYEE_TABLE} = require('./employee.model');

const {SCHEDULE_TABLE} = require('./schedule.model');

const EMPLOYEESCHEDULE_TABLE = 'EmployeeSchedule';

const EmployeeScheduleSchema = {
  id: { allowNull: true,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  // employeeId: {type: DataTypes.INTEGER,allowNull:true,references:{model:EMPLOYEE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  // scheduleId: {type: DataTypes.INTEGER,allowNull:true,references:{model:SCHEDULE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
}

class EmployeeSchedule extends Model {
  static associate(models) {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLOYEESCHEDULE_TABLE,
      modelName: 'EmployeeSchedule',
      timestamps: false
    }
  }
}


module.exports = { EMPLOYEESCHEDULE_TABLE, EmployeeScheduleSchema, EmployeeSchedule }