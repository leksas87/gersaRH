
const { Model, DataTypes, Sequelize } = require('sequelize');

const {USER_TABLE} = require('./user.model');

const EMPLOYEE_TABLE = 'Employees';

const EmployeeSchema = {
  id: {allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  userId: {type: DataTypes.INTEGER,allowNull:true,references:{model:USER_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  tipoIdentificacion: { type: DataTypes.STRING, allowNull: true },
  documentoIdentidad: { type: DataTypes.STRING, allowNull: true },
  fechaNacimiento:{type:DataTypes.DATE,allowNull:true},
  genero:{type: DataTypes.STRING,allowNull:true},
  nacionalidad: { type: DataTypes.STRING, allowNull: true },
  lugarDeTrabajo: { type: DataTypes.STRING, allowNull: true  },
  supervisor: { type: DataTypes.STRING, allowNull:true },
  numeroCuentaBancaria:{type: DataTypes.STRING,allowNull:true},
  swiftBic:{ type: DataTypes.STRING, allowNull:true },
  frecuenciaPago:{ type: DataTypes.STRING, allowNull:true },
  direccion1:{ type:DataTypes.STRING,allowNull:true },
  direccion2:{ type:DataTypes.STRING,allowNull:true },
  ciudad:{type:DataTypes.STRING,allowNull:true},
  codigoPostal:{type:DataTypes.STRING,allowNull:true},
  estadoProvincia:{type:DataTypes.STRING,allowNull:true},
  pais:{type:DataTypes.STRING,allowNull:true},
  emergenciaNombre:{type:DataTypes.STRING,allowNull:true},
  empergenciaTelefono:{type:DataTypes.STRING,allowNull:true},
  rfc:{type:DataTypes.STRING,allowNull:true},
  numeroImms:{type:DataTypes.STRING,allowNull:true},
  curp:{type:DataTypes.STRING,allowNull:true},
  fechaAltaImss:{type:DataTypes.DATE,allowNull:true},
}

class Employee extends Model {
  static associate(models) {
    this.belongsTo(models.User,{as:'user'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLOYEE_TABLE,
      modelName: 'Employee',
      timestamps: false
    }
  }
}


module.exports = { EMPLOYEE_TABLE, EmployeeSchema, Employee }

