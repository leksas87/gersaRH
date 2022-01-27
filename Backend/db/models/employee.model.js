
const { Model, DataTypes, Sequelize } = require('sequelize');

const {USER_TABLE} = require('./user.model');

const EMPLOYEE_TABLE = 'Employees';

const EmployeeSchema = {
  id: {allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  userId: {type: DataTypes.INTEGER,allowNull:true,references:{model:USER_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  tipoIdentificacion: { type: DataTypes.STRING, allowNull: true },
  documentoIdentidad: { type: DataTypes.STRING, allowNull: true },
  fechaNacimiento:{type:DataTypes.STRING,allowNull:false},
  genero:{type: DataTypes.STRING,allowNull:false},
  nacionalidad: { type: DataTypes.STRING, allowNull: false },
  lugarDeTrabajo: { type: DataTypes.STRING, allowNull: false  },
  supervisor: { type: DataTypes.STRING, allowNull:false },
  numeroCuentaBancaria:{type: DataTypes.INTEGER,allowNull:true},
  frecuenciaPago:{ type: DataTypes.STRING, allowNull:false },
  direccion1:{ type:DataTypes.STRING,allowNull:false },
  direccion2:{ type:DataTypes.STRING,allowNull:true },
  ciudad:{type:DataTypes.STRING,allowNull:false},
  codigoPostal:{type:DataTypes.INTEGER,allowNull:false},
  estadoProvincia:{type:DataTypes.STRING,allowNull:false},
  pais:{type:DataTypes.STRING,allowNull:false},
  emergenciaNombre:{type:DataTypes.STRING,allowNull:true},
  empergenciaTelefono:{type:DataTypes.STRING,allowNull:true},
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

