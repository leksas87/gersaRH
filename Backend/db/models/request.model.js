const { Model, DataTypes, Sequelize } = require('sequelize');

const REQUEST_TABLE = 'Requests';

const {EMPLOYEE_TABLE} = require('./employee.model');
const { STATUS_TABLE } = require('./status.model');

const RequestSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  employeeId: {type: DataTypes.INTEGER,allowNull:true,references:{model:EMPLOYEE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  fechaCreacion: {type:DataTypes.STRING,allowNull:false },
  fechaInicio: {type:DataTypes.STRING,allowNull:false },
  fechaFin: {type:DataTypes.STRING,allowNull:true },
  statusId: {type: DataTypes.INTEGER,allowNull:true,references:{model:STATUS_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
//   descripcionEmpleado: {type:DataTypes.STRING,allowNull:true },
//   descriptionRespuesta: {type:DataTypes.STRING,allowNull:true },
//   requestTypeId: {type: DataTypes.INTEGER,allowNull:true,references:{model:EMPLOYEE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
//   adjunto: {type:DataTypes.STRING,allowNull:true },
}

class Request extends Model {
  static associate(models) {
    this.belongsTo(models.Employee,{as:'employee'});
    this.belongsTo(models.Status,{as:'status'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REQUEST_TABLE,
      modelName: 'Request',
      timestamps: false
    }
  }
}


module.exports = { REQUEST_TABLE, RequestSchema, Request }