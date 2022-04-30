const { Model, DataTypes, Sequelize } = require('sequelize');

const SCHEDULE_TABLE = 'Schedules';

const ScheduleSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  scheduleName: { type: DataTypes.STRING, allowNull: false,unique: true, defaultValue:'' },
  horaEntrada: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
  horaSalida: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
  tiempoDescanso: { type:DataTypes.INTEGER,allowNull:true, defaultValue: 0},
  tiempoRetraso: { type:DataTypes.INTEGER,allowNull:true, defaultValue: 0},
  Lunes: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue:false },
  Martes: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue:false },
  Miercoles: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue:false },
  Jueves: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue:false },
  Viernes: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue:false },
  Sabado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue:false },
  Domingo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue:false }
}

class Schedule extends Model {
  static associate(models) {
    this.belongsToMany(models.Users, {
      as: 'userS',
      through: models.EmployeeSchedule,
      foreignKey: 'scheduleId'
    });
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SCHEDULE_TABLE,
      modelName: 'Schedule',
      timestamps: false
    }
  }
}


module.exports = { SCHEDULE_TABLE, ScheduleSchema, Schedule }