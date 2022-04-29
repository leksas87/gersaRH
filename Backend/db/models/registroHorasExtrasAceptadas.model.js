const { Model, DataTypes, Sequelize } = require('sequelize');

const REGISTRO_HORAS_TABLE = 'RegistroHoras';

const {EMPLOYEE_TABLE} = require('./employee.model');

const RegistroHorasSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  fechaCreacion: {type:DataTypes.STRING,allowNull:false },
  employeeId: {type: DataTypes.INTEGER,allowNull:true,references:{model:EMPLOYEE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  fechaEvento: {type:DataTypes.STRING,allowNull:false },
  horasAceptadas: {type:DataTypes.STRING,allowNull:true },
  employeeIdAcepto: {type: DataTypes.INTEGER,allowNull:true}
}

class RegistroHoras extends Model {
  static associate(models) {
    this.belongsTo(models.Employee,{as:'employee'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REGISTRO_HORAS_TABLE,
      modelName: 'RegistroHoras',
      timestamps: false
    }
  }
}


module.exports = { REGISTRO_HORAS_TABLE, RegistroHorasSchema, RegistroHoras }