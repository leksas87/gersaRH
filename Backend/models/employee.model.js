const { Model, DataTypes, Deferrable } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {   
        userId: {type: DataTypes.INTEGER,allowNull:true},
        tipoIdentificacion: { type: DataTypes.STRING, allowNull: true },
        documentoIdentidad: { type: DataTypes.STRING, allowNull: true },
        fechaNacimiento:{type:DataTypes.STRING,allowNull:false},
        genero:{type: DataTypes.STRING,allowNull:false},
        nacionalidad: { type: DataTypes.STRING, allowNull: false },
        lugarDeTrabajo: { type: DataTypes.STRING, allowNull: false  },
        supervisor: { type: DataTypes.STRING, allowNull:false },
        numeroCuentaBancaria:{type: DataTypes.INTEGER,allowNull:true},
        frecuenciaPago:{ type: DataTypes.STRING, allowNull:false },
    };


    return sequelize.define('Employee', attributes);
}
