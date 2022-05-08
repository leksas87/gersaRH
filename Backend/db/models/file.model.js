'use strict';
const { Model, DataTypes } = require('sequelize');

const {EMPLOYEE_TABLE} = require('./employee.model');
const {DOCUMENTTYPE_TABLE} = require('./documentType.model');

const FILE_TABLE = 'File';

  const FileSchema = {
    id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
    employeeId: { type: DataTypes.INTEGER,allowNull:true,references:{model:EMPLOYEE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
    employeeIdUpload: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    isFileActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue:true },
    fechaCreacion: { type:DataTypes.STRING,allowNull:true,  defaultValue:''},
    nombreArchivo: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
    ubicacionCarpeta: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
    url: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
    tipoDocumento: {type:DataTypes.INTEGER,allowNull:true,references:{model:DOCUMENTTYPE_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'}
  }

  class File extends Model {
    static associate(models) {
      this.belongsTo(models.Employee,{as:'employee'});
      this.belongsTo(models.DocumentType,{as:'documentType',foreignKey:'tipoDocumento'});
    }

    static config(sequelize) {
      return {
        sequelize,
        tableName: FILE_TABLE,
        modelName: 'File',
        timestamps: false
      }
    }
  }


  module.exports = { FILE_TABLE, FileSchema, File }

 