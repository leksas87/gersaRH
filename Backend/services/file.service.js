const { date } = require('joi');
const {models} = require('../libs/sequelize');
const { Op } = require("sequelize");
const moment = require('moment-timezone');

module.exports = {
    create,
    update,
    getFile1,
    delete: _delete,
};

async function _delete(id) {
    const user = await models.File.findByPk(id);
        if (!user) throw 'Usuario no encontrado';
    await user.destroy();
}

async function getFile1(req,res) {
    console.log("Entro archivo");

    if( req.query.employeeId && req.query.tipoDocumento && req.query.ubicacionCarpeta){
        if(req.query.employeeId){
            const user = await models.User.findByPk(parseInt(req.query.employeeId));
            if(!user) throw 'Empleado no encontrado';
        }
        const files = await models.File.findAll({where:{
                employeeId: parseInt(req.query.employeeId),
                ubicacionCarpeta: req.query.ubicacionCarpeta,
                tipoDocumento: parseInt(req.query.tipoDocumento),
                isFileActive:true
                }
            });
        if ( !files)  throw 'Empleado no encontrado';
        return files;
    }else if(req.query.ubicacionCarpeta && req.user.rollTypeId === 1){
        if(req.query.employeeId){
            const user = await models.User.findByPk(parseInt(req.query.employeeId));
            if(!user) throw 'Empleado no encontrado';
        }
        const files = await models.File.findAll({where:{
            ubicacionCarpeta: req.query.ubicacionCarpeta.substring(0, req.query.ubicacionCarpeta.length - 0),
            isFileActive:true
            }
        });
        if ( !files)  throw 'Empleado no encontrado';
        return files;
    }else if(req.query.ubicacionCarpeta){
        if(req.query.employeeId){
            const user = await models.User.findByPk(parseInt(req.query.employeeId));
            if(!user) throw 'Empleado no encontrado';
        }
        const files = await models.File.findAll({where:{
            employeeId: req.user.id,
            ubicacionCarpeta: req.query.ubicacionCarpeta.substring(0, req.query.ubicacionCarpeta.length - 0),
            isFileActive:true
            }
        });
        if ( !files)  throw 'Empleado no encontrado';
        return files;
    }

}

async function getFile(id) {
    const file = await models.File.findByPk(id);
    if (!file) throw 'Archivo no encontrado';
    return file;
}

async function update( idFile, params) {
    const file = await getFile(idFile);

    if (!file) throw 'Archivo no encontrado'

    

    // copy params to user and save
    Object.assign(file, params);
    await file.save();

    return file.get();
}

async function create(params, res) {
    params.fechaCreacion = moment().tz("America/Mexico_City").format('YYYY-MM-DD');

    try {
        await models.File.create(params);
    } catch (error) {
        console.log(error.message);
    }
    
}