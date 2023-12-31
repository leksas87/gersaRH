const { Model, DataTypes, Sequelize } = require('sequelize');

const REPORTS_TABLE = 'Reports';

const {EMPLOYEE_TABLE} = require('./employee.model');
const { STATUS_TABLE } = require('./status.model');

const ReportSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  employeeId: {type: DataTypes.INTEGER,allowNull:true,references:{model:EMPLOYEE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  fechaCreacion: {type:DataTypes.STRING,allowNull:false },
  descripcionEmpleado: {type:DataTypes.STRING,allowNull:true },
  asunto: {type:DataTypes.STRING,allowNull:true },
  anonimo:{type: DataTypes.BOOLEAN,allowNull:false,defaultValue:true},
  statusId: {type: DataTypes.INTEGER,allowNull:true,references:{model:STATUS_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  reportType: {type:DataTypes.STRING,allowNull:true },
}

class Reports extends Model {
  static associate(models) {
    this.belongsTo(models.Employee,{as:'employee'});
    this.belongsTo(models.Status,{as:'status'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REPORTS_TABLE,
      modelName: 'Reports',
      timestamps: false
    }
  }
}


module.exports = { REPORTS_TABLE, ReportSchema, Reports }