const { Model, DataTypes, Sequelize } = require('sequelize');

const TIMEREQUEST_TABLE = 'TimeRequests';

const {EMPLOYEE_TABLE} = require('./employee.model');
const { STATUS_TABLE } = require('./status.model');

const TimeRequestSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  employeeId: {type: DataTypes.INTEGER,allowNull:true,references:{model:EMPLOYEE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  fechaAsignacion: {type:DataTypes.STRING,allowNull:false },
  horaAsignacion: {type:DataTypes.STRING,allowNull:false },
  LugarApoyo: {type:DataTypes.STRING,allowNull:true },
  statusId: {type: DataTypes.INTEGER,allowNull:true,references:{model:STATUS_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  descripcion: {type:DataTypes.STRING,allowNull:true },
  employeeIdRequest: { type:DataTypes.INTEGER,allowNull:true, defaultValue: 0}
}

class TimeRequest extends Model {
  static associate(models) {
    this.belongsTo(models.Employee,{as:'employee'});
    this.belongsTo(models.Status,{as:'status'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIMEREQUEST_TABLE,
      modelName: 'TimeRequest',
      timestamps: false
    }
  }
}


module.exports = { TIMEREQUEST_TABLE, TimeRequestSchema, TimeRequest }