const { Model, DataTypes, Sequelize } = require('sequelize');

const {EMPLOYEE_TABLE} = require('./employee.model');

const CHECK_TABLE = 'Check';

const CheckSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  employeeId:{ type: DataTypes.INTEGER,allowNull:true,references:{model:EMPLOYEE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  longitude: { type: DataTypes.STRING,allowNull: true,defaultValue:''},
  latitude: {type: DataTypes.STRING,allowNull: true,defaultValue:''},
  dateCheckIn: {type:DataTypes.DATE,allowNull:false},
  dateCheckOut: {type: DataTypes.DATE,allowNull: true},
}
class Check extends Model {

  static associate(models) {
    this.belongsTo(models.Employee, { as: 'employee' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CHECK_TABLE,
      modelName: 'Check',
      timestamps: false
    }
  }
}

module.exports = { Check, CheckSchema, CHECK_TABLE };