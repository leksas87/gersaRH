const { Model, DataTypes, Sequelize } = require('sequelize');


const DOCUMENTTYPE_TABLE = 'DocumentType';

const DocumentTypeSchema = {
  id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
  nombre:{type: DataTypes.STRING,allowNull: true,defaultValue:''}
}
class DocumentType extends Model {


  static config(sequelize) {
    return {
      sequelize,
      tableName: DOCUMENTTYPE_TABLE,
      modelName: 'DocumentType',
      timestamps: false
    }
  }
}

module.exports = { DocumentType, DocumentTypeSchema, DOCUMENTTYPE_TABLE };