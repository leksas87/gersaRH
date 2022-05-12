const jwt = require('express-jwt');
const { secret } = require('config.json');
const {models} = require('./../libs/sequelize');
const { AvailableDays } = require('../db/models/availableDays.model');
const { Employee } = require('../db/models/employee.model');
const moment = require('moment-timezone');

module.exports = validaDias;

function validaDias() {
    return [
        // attach full user record to request object
        async (req, res, next) => {
            
            //verificamos que tenga registro de fecha de ingreso
            const employee=await models.Employee.findOne({where:{id:req.params.id}});
            
            if(!employee.fechaIngreso){return res.status(400).json({message: "El empleado no tiene fecha de ingreso"})}
            
            // verificamos que exista registro de dias
            const avaibleDays=await models.AvailableDays.findOne(({where:{employeeId:employee.id}}));

            if(!avaibleDays){
                //comparamos las fechas
                var fechaActual = moment().tz(process.env.TZ);
                var fechaIngreso = moment(employee.fechaIngreso);
                //años de antiguedad
                let diff=fechaActual.diff(fechaIngreso, 'years'); 

                let years=await evaluateYear(diff)
                //fecha limite para uso de los dias
                var fechaLimite=moment(employee.fechaIngreso).add(diff+1,'year');

                const day =await models.AvailableDays.create({employeeId:employee.id,avaibleDays:years,fechaLimite:moment(fechaLimite).format('YYYY-MM-DD'),status:1});
                
                next();
                return res.status(201).json({data:day,message:"Registro nuevo de días , favor de reintentar..."})
            }

            if(avaibleDays.fechaLimite){
                
                var fechaActual = moment().tz(process.env.TZ);

                if (fechaActual>moment(avaibleDays.fechaLimite,'YYYY-MM-DD')) {
                    console.log('recalculo');
                    //comparamos las fechas
                    var fechaActual = moment().tz(process.env.TZ);
                    var fechaIngreso = moment(employee.fechaIngreso);

                    let diff=fechaActual.diff(fechaIngreso, 'years'); 

                    let years=await evaluateYear(diff)
                    //fecha limite para uso de los dias
                    var fechaLimite=moment(employee.fechaIngreso).add(diff+1,'year');

                    let params={avaibleDays:years,fechaLimite:moment(fechaLimite).format('YYYY-MM-DD')}

                    Object.assign(avaibleDays, params);
                    await avaibleDays.save();

                    return res.status(201).json({data:avaibleDays,message:'Se ha recalculado los días disponibles'});
                    
                }
                else{
                    var fechaInicio = moment(req.body.fechaInicio);
                    var fechaFin = moment(req.body.fechaFin);
                    
                    let resta=fechaFin.diff(fechaInicio,'days');

                    if (resta>avaibleDays.avaibleDays) {
                        return res.status(400).json({data:avaibleDays,message:'Sin suficientes días'});
                    }

                    // let restas=avaibleDays.avaibleDays-resta

                    // let params={avaibleDays:restas}

                    // Object.assign(avaibleDays, params);
                    // await avaibleDays.save();
                }
            }

            next();
        }
    ];
}
async function evaluateYear(years) {
    
    if (years==0) {
        return 0; 
    }
    if (years==1) {
        return 6; 
    }
    if (years==2) {
        return 8; 
    }
    if (years==3) {
        return 11; 
    }
    if (years==4) {
        return 13; 
    }
    if (years>4 && years < 10) {
        return 15; 
    }
    if (years>9 && years < 15) {
        return 17; 
    }
    if (years>14 && years < 20) {
        return 19; 
    }
    if (years>19 && years < 25) {
        return 21; 
    }
    if (years>24 && years < 30) {
        return 22; 
    }
    return 0;
}