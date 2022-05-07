const express = require('express');
const router = express.Router();
const Joi = require('joi');
const forbiddenJefeCuadrilla = require('middleware/forbiddenJC');
const upload = require("../middleware/upload");
const authorize = require('middleware/authorize');
const readXlsxFile = require('read-excel-file/node');
const payRollService = require('../services/payRoll.service');
const {models} = require('./../libs/sequelize');
const validateRequest = require('middleware/validate-request');


router.get('/', authorize(),forbiddenJefeCuadrilla(), getPayRolls);
router.post('/registerFile/',authorize(), forbiddenJefeCuadrilla(),upload.single("uploadfile"),registerFile);
router.patch('/:id', authorize(), forbiddenJefeCuadrilla(), updateSchema, update);
router.get('/:id', authorize(), forbiddenJefeCuadrilla(), getPayRoll);


module.exports = router;

function update(req, res, next) {
    payRollService.update(req.params.id, req.body)
        .then(payroll => res.json({data:payroll ,message:'Succesful'}))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        numeroEmpleado: Joi.string(),
        nombreEmpleado: Joi.string(),
        semana: Joi.number(),
        periodo: Joi.string(),
        diasTrabajados: Joi.number(),
        retardos: Joi.number(),
        permisos: Joi.number(),
        horasExtra: Joi.number(),
        sueldo: Joi.number(),
        tiempoExtra: Joi.number(),
        bonoAsistencia: Joi.number(),
        descuentoLaboral: Joi.number(),
        festLab: Joi.number(),
        primaDom: Joi.number(),
        primaVacacional: Joi.number(),
        aclaraciones: Joi.number(),
        infonavit: Joi.number(),
        cajaAhorro: Joi.number(),
        dcoExt: Joi.number(),
        permisosHrs: Joi.number(),
        prestamos: Joi.number(),
        solidaridad: Joi.number(),
        descuentoPensionAlimenticia: Joi.number(),
        descuentoPorFiesta: Joi.number()
    });
    validateRequest(req, next, schema);
}

function getPayRoll(req,res,next) {
    payRollService.getById(req.params.id, res)
        .then(payroll => res.json({data:payroll ,message:'Succesful'}))
        .catch(next);
}

function getPayRolls(req,res,next) {
    payRollService.getAll(req, res)
        .then(payrolls => res.json({data:payrolls ,message:'Succesful'}))
        .catch(next);
}

async function registerFile(req, res) {
    const usersNames = [];
    console.log(req.file.filename)
    const URL=`${__basedir}/uploads/${req.file.filename}`;

    try {
        await readXlsxFile(URL).then((rows) => {
            rows.forEach((row,i) => {
                if (i > 2 ) {
                
                    let user = {
                        numeroEmpleado: row[0],
                        nombreEmpleado: row[1],
                        semana: row[2],
                        periodo: row[3],
                        diasTrabajados:row[4],
                        retardos:row[5],
                        permisos:row[6],
                        horasExtra:row[7],
                        sueldo:row[8],
                        tiempoExtra:row[9],
                        bonoAsistencia:row[10],
                        descuentoLaboral:row[11],
                        festLab:row[12],
                        primaDom:row[13],
                        primaVacacional:row[14],
                        aclaraciones:row[15],
                        infonavit:row[16],
                        cajaAhorro:row[17],
                        dcoExt:row[18],
                        permisosHrs:row[19],
                        prestamos:row[20],
                        solidaridad:row[21],
                        descuentoPensionAlimenticia:row[22],
                        descuentoPorFiesta:row[23]
                    };
                    if (usersNames.find(element=>element.numeroEmpleado === user.numeroEmpleado)) {
                    
                        throw 'Error, se encontró un numero de empleado repetido';
                        
                    }

                    if( user.numeroEmpleado === null ) { user.numeroEmpleado = ""; } 
                    if( user.nombreEmpleado === null ) { user.nombreEmpleado = ""; }
                    if( user.semana === null ) { user.semana = 0; }
                    if( user.periodo === null ) { user.periodo = ""; }
                    if( user.diasTrabajados === null ) { user.diasTrabajados = 0; }             
                    if( user.retardos === null ) { user.retardos = 0; }
                    if( user.permisos === null ) { user.permisos = 0; }
                    if( user.horasExtra === null ) { user.horasExtra = 0; }
                    if( user.sueldo === null ) { user.sueldo = 0; }
                    if( user.tiempoExtra === null ) { user.tiempoExtra = 0; }
                    if( user.bonoAsistencia === null ) { user.bonoAsistencia = 0; }
                    if( user.descuentoLaboral === null ) { user.descuentoLaboral = 0; }
                    if( user.festLab === null ) { user.festLab = 0; }
                    if( user.primaDom === null ) { user.primaDom = 0; }
                    if( user.primaVacacional === null ) { user.primaVacacional = 0; }
                    if( user.aclaraciones === null ) { user.aclaraciones = 0; }
                    if( user.infonavit === null ) { user.infonavit = 0; }
                    if( user.cajaAhorro === null ) { user.cajaAhorro = 0; }
                    if( user.dcoExt === null ) { user.dcoExt = 0; }
                    if( user.permisosHrs === null ) { user.permisosHrs = 0; }
                    if( user.prestamos === null ) { user.prestamos = 0; }
                    if( user.solidaridad === null ) { user.solidaridad = fechaNow; }  
                    if( user.descuentoPensionAlimenticia === null ) { user.descuentoPensionAlimenticia = 0; } 
                    if( user.descuentoPorFiesta === null ) { user.descuentoPorFiesta = 0; } 
                    
                    usersNames.push(user);
                }
                
                          
            });
            rows.shift();
        })
    } catch (error) {
        if (error==='Error, se encontró un correo repetido') {
            return res.status(400).json({ message:'Error, se encontró un correo repetido'})
        }    
        
    }


    try {

        for (const userF of usersNames) {
            let empleado = await models.Employee.findOne({ where: { numeroEmpleado: userF.numeroEmpleado } });
            

            if(!empleado){
                return res.status(400).json({ message:'Error, no se encontro un empleado registrado con ese numero de empleado: "' + userF.numeroEmpleado + '"'})
            }

            if (await models.Payroll.findOne({ where: { employeeId: empleado.id, semana:userF.semana}})){
                    return res.status(409).json({ message:'Error,se encontro un registro de nomina repetido en la misma semana '})
            }
            userF.employeeId = empleado.id;
            await models.Payroll.create(userF);            
        }

        console.log('Proceso de validacion de usuario no repetido en la base de datos finalizado!!!!');
        
    } catch (error) {
        
        console.log(error);
        return res.status(400).json({ message:error})
        
    }
    
    return res.status(200).json({ message:'Usuarios almacenados correctamente en la base de datos'})

}
