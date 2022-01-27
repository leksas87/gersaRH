
const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'Users';

const UserSchema = {
  id: {allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  userId: {type: DataTypes.INTEGER,allowNull:true},
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

class User extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}


module.exports = { USER_TABLE, UserSchema, User }

