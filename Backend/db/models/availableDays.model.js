const { Model, DataTypes, Sequelize } = require('sequelize');

const {EMPLOYEE_TABLE} = require('./employee.model');

const AVAILABLEDAYS_TABLE = 'AvailableDays';

const AvailableDaysSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  employeeId:{ type: DataTypes.INTEGER,allowNull:true,references:{model:EMPLOYEE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
  avaibleDays: { allowNull: false,type: DataTypes.INTEGER},
  fechaLimite: { allowNull: false,type: DataTypes.STRING},
  status: { allowNull: false,type: DataTypes.INTEGER},
}
class AvailableDays extends Model {
    static associate(models) {  
        AvailableDays.belongsTo(models.Employee,{foreignKey:'employeeId'});
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: AVAILABLEDAYS_TABLE,
            modelName: 'AvailableDays',
            timestamps: false
        }
    }
}

module.exports = { AvailableDays, AvailableDaysSchema, AVAILABLEDAYS_TABLE };