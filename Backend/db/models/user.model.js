
const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'Users';

const UserSchema = {
  id: {allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  phone:{type:DataTypes.STRING,allowNull:false},
  active:{type: DataTypes.BOOLEAN,allowNull:false,defaultValue:false},
  hash: { type: DataTypes.STRING, allowNull: false ,defaultValue:''},
  roll: { type: DataTypes.INTEGER, allowNull: false ,defaultValue:2 },
  confirmationCode: { type: DataTypes.STRING, unique: true },
  isEmployeeActive:{type: DataTypes.BOOLEAN,allowNull:false,defaultValue:true},
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

