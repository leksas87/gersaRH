'use strict';
const { Model, DataTypes } = require('sequelize');

const {EMPLOYEE_TABLE} = require('./employee.model');


const PAYROLL_TABLE = 'Payroll';

  const PayrollSchema = {
    id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
    employeeId: { type: DataTypes.INTEGER,allowNull:true,references:{model:EMPLOYEE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
    numeroEmpleado: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
    nombreEmpleado: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
    semana: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    periodo: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
    diasTrabajados: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    retardos: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    permisos: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    horasExtra: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    sueldo: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    tiempoExtra: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    bonoAsistencia: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    descuentoLaboral: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    festLab: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    primaDom: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    primaVacacional: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    aclaraciones: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    infonavit: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    cajaAhorro: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    dcoExt: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    permisosHrs: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    prestamos : {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    solidaridad : {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    descuentoPensionAlimenticia : {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    descuentoPorFiesta : {type:DataTypes.INTEGER,allowNull:true,defaultValue:0}
  }

  class Payroll extends Model {
    static associate(models) {
      this.belongsTo(models.Employee,{as:'employee'});
    }

    static config(sequelize) {
      return {
        sequelize,
        tableName: PAYROLL_TABLE,
        modelName: 'Payroll',
        timestamps: false
      }
    }
  }


  module.exports = { PAYROLL_TABLE, PayrollSchema, Payroll }