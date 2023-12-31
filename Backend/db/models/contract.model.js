const { Model, DataTypes, Sequelize } = require('sequelize');

  const {USER_TABLE} = require('./user.model');

  const CONTRACT_TABLE = 'Contracts';

  const ContractSchema = {
    id: { allowNull: false,autoIncrement: true,primaryKey: true,type: DataTypes.INTEGER},
    userId: { type: DataTypes.INTEGER,allowNull:true,references:{model:USER_TABLE,key:'id'},onUpdate:'CASCADE',onDelete:'SET NULL'},
    tipoDeContrato: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
    puesto: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
    fechaDeInicio: { type:DataTypes.DATE,allowNull:true, defaultValue: DataTypes.NOW},
    fechaDeFinalizacion: { type:DataTypes.DATE,allowNull:true, defaultValue: null},
    horasLaborales : {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    unidadLaborales: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
    tipoSalario: { type: DataTypes.STRING, allowNull: true, defaultValue:'' },
    cantidadSalario : {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    isContractActivide: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue:true }
  }

  class Contract extends Model {
    static associate(models) {
      this.belongsTo(models.User,{as:'user'});
    }

    static config(sequelize) {
      return {
        sequelize,
        tableName: CONTRACT_TABLE,
        modelName: 'Contract',
        timestamps: false
      }
    }
  }


  module.exports = { CONTRACT_TABLE, ContractSchema, Contract }