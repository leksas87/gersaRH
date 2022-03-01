const { Model, DataTypes, Sequelize } = require('sequelize');

const {EMPLOYEE_TABLE} = require('./employee.model');

const CHECK_TABLE = 'Check';

const CheckSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  employeeId:{ type: DataTypes.INTEGER,allowNull:true,references:{model:EMPLOYEE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  DateCheck: {type:DataTypes.DATE,allowNull:true},
  latitudeCheck:{type: DataTypes.STRING,allowNull: true,defaultValue:''},
  longitudeCheck:{type: DataTypes.STRING,allowNull: true,defaultValue:''},
  tipoCheck:{type: DataTypes.STRING,allowNull: true,defaultValue:''},
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