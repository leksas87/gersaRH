
const { Model, DataTypes, Sequelize } = require('sequelize');
//const { Check } = require('./check.model');

const {USER_TABLE} = require('./user.model');

const EMPLOYEE_TABLE = 'Employees';

const EmployeeSchema = {
  id: {allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  userId: {type: DataTypes.INTEGER,allowNull:true,references:{model:USER_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  tipoIdentificacion: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
  documentoIdentidad: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
  fechaNacimiento:{type:DataTypes.DATE,allowNull:true, defaultValue: DataTypes.NOW},
  genero:{type: DataTypes.STRING,allowNull:true, defaultValue:''},
  nacionalidad: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
  lugarDeTrabajo: { type: DataTypes.STRING, allowNull: true, defaultValue:''  },
  supervisor: { type: DataTypes.STRING, allowNull:true, defaultValue:'' },
  numeroCuentaBancaria:{type: DataTypes.STRING,allowNull:true, defaultValue:''},
  swiftBic:{ type: DataTypes.STRING, allowNull:true, defaultValue:'' },
  frecuenciaPago:{ type: DataTypes.STRING, allowNull:true, defaultValue:'' },
  direccion1:{ type:DataTypes.STRING,allowNull:true, defaultValue:'' },
  direccion2:{ type:DataTypes.STRING,allowNull:true, defaultValue:'' },
  ciudad:{type:DataTypes.STRING,allowNull:true, defaultValue:''},
  codigoPostal:{type:DataTypes.STRING,allowNull:true, defaultValue:''},
  estadoProvincia:{type:DataTypes.STRING,allowNull:true, defaultValue:''},
  pais:{type:DataTypes.STRING,allowNull:true, defaultValue:''},
  emergenciaNombre:{type:DataTypes.STRING,allowNull:true, defaultValue:''},
  empergenciaTelefono:{type:DataTypes.STRING,allowNull:true, defaultValue:''},
  rfc:{type:DataTypes.STRING,allowNull:true, defaultValue:''},
  numeroImms:{type:DataTypes.STRING,allowNull:true, defaultValue:''},
  curp:{type:DataTypes.STRING,allowNull:true, defaultValue:''},
  fechaAltaImss:{type:DataTypes.DATE,allowNull:true, defaultValue: DataTypes.NOW},
  accessCode: {type: DataTypes.INTEGER,allowNull:false,defaultValue: 0}
}

class Employee extends Model {
  static associate(models) {
    this.belongsTo(models.User,{as:'user'});
    this.belongsToMany(models.Schedule, {
      as: 'schedule',
      through: models.EmployeeSchedule,
      foreignKey: 'employeeId',
      otherKey:'scheduleId'
    });
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

