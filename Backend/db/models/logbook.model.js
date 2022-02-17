const { Model, DataTypes, Sequelize } = require('sequelize');

const { EMPLOYEE_TABLE } = require('./employee.model');

const LOGBOOK_TABLE = 'Logbook';

const LogbookSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  longitude: { type: DataTypes.STRING,allowNull: false,},
  latitude: {type: DataTypes.STRING,allowNull: false,},
  dateCheck: {type: 'TIMESTAMP',allowNull: false,defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),},
  initHour: {type: DataTypes.TIME,allowNull: false,},
  endHour: {type: DataTypes.TIME,allowNull: false,},
  employeeId: {field: 'employeeId',allowNull: true,type: DataTypes.INTEGER,
    references: {
      model: EMPLOYEE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}


class Logbook extends Model {

  static associate(models) {
    this.belongsTo(models.Employee, { as: 'employee' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LOGBOOK_TABLE,
      modelName: 'Logbook',
      timestamps: false
    }
  }
}

module.exports = { Logbook, LogbookSchema, LOGBOOK_TABLE };