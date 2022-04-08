const {models} = require('./../libs/sequelize');
const moment = require('moment-timezone');

module.exports = validateTimeRequest;

function validateTimeRequest() {
    return [

        // Validacion de horarios
        async (req, res, next) => {
                //Se obtiene las relaciones que tiene ese empleado con horarios
                const employeeSchedules = await models.EmployeeSchedule.findAll({where:{employeeId:req.params.id}}); 

                if(!schedule) throw 'Horario no asignado';
               
                //Se recorre todos los horarios que tenga ese empleado
                for (const employeeSchedul of employeeSchedules) {

                        const schedule = await models.Schedule.findByPk(employeeSchedul.scheduleId);
                        let day = moment(req.body.fechaAsignacion).format('d');

                        if(!schedule) throw 'Horario no encontrado';

                        switch (day) {
                            case '0':
                                    if(schedule.Domingo){
                                        const fechaAsig = req.body.fechaAsignacion.concat(' ', req.body.horaAsignacion);
                                        const fechaEntrada = req.body.fechaAsignacion.concat(' ', schedule.horaEntrada);
                                        const fechaSalida = req.body.fechaAsignacion.concat(' ', schedule.horaSalida);
                                        
                                        //regresa verdadero si la fechaAsig esta entre las fechas entrada y salida
                                        if(moment(fechaAsig).isBetween(fechaEntrada, fechaSalida, 'hours')){
                                            return res.status(409).json( {message: 'Conflicto entre horarios'});
                                        }
                                    }
                                break;
                            case '1':
                                    if(schedule.Lunes){
                                        const fechaAsig = req.body.fechaAsignacion.concat(' ', req.body.horaAsignacion);
                                        const fechaEntrada = req.body.fechaAsignacion.concat(' ', schedule.horaEntrada);
                                        const fechaSalida = req.body.fechaAsignacion.concat(' ', schedule.horaSalida);
            
                                        if(moment(fechaAsig).isBetween(fechaEntrada, fechaSalida, 'hours')){
                                            return res.status(409).json( {message: 'Conflicto entre horarios'});
                                        }
                                    }
                                break;
                            case '2':
                                    if(schedule.Martes){
                                        const fechaAsig = req.body.fechaAsignacion.concat(' ', req.body.horaAsignacion);
                                        const fechaEntrada = req.body.fechaAsignacion.concat(' ', schedule.horaEntrada);
                                        const fechaSalida = req.body.fechaAsignacion.concat(' ', schedule.horaSalida);
            
                                        if(moment(fechaAsig).isBetween(fechaEntrada, fechaSalida, 'hours')){
                                            return res.status(409).json( {message: 'Conflicto entre horarios'});
                                        }
                                    }
                                break;
                            case '3':
                                    if(schedule.Miercoles){
                                        const fechaAsig = req.body.fechaAsignacion.concat(' ', req.body.horaAsignacion);
                                        const fechaEntrada = req.body.fechaAsignacion.concat(' ', schedule.horaEntrada);
                                        const fechaSalida = req.body.fechaAsignacion.concat(' ', schedule.horaSalida);
            
                                        if(moment(fechaAsig).isBetween(fechaEntrada, fechaSalida, 'hours')){
                                            return res.status(409).json( {message: 'Conflicto entre horarios'});
                                        }
                                    }
                                break;
                            case '4':
                                    if(schedule.Jueves){
                                        const fechaAsig = req.body.fechaAsignacion.concat(' ', req.body.horaAsignacion);
                                        const fechaEntrada = req.body.fechaAsignacion.concat(' ', schedule.horaEntrada);
                                        const fechaSalida = req.body.fechaAsignacion.concat(' ', schedule.horaSalida);
            
                                        if(moment(fechaAsig).isBetween(fechaEntrada, fechaSalida, 'hours')){
                                            return res.status(409).json( {message: 'Conflicto entre horarios'});
                                        }
                                    }
                                break;
                            case '5':
                                    if(schedule.Viernes){
                                        const fechaAsig = req.body.fechaAsignacion.concat(' ', req.body.horaAsignacion);
                                        const fechaEntrada = req.body.fechaAsignacion.concat(' ', schedule.horaEntrada);
                                        const fechaSalida = req.body.fechaAsignacion.concat(' ', schedule.horaSalida);
            
                                        if(moment(fechaAsig).isBetween(fechaEntrada, fechaSalida, 'hours')){
                                            return res.status(409).json( {message: 'Conflicto entre horarios'});
                                        }
                                    }
                                break;
                            case '6':
                                    if(schedule.Sabado){
                                        const fechaAsig = req.body.fechaAsignacion.concat(' ', req.body.horaAsignacion);
                                        const fechaEntrada = req.body.fechaAsignacion.concat(' ', schedule.horaEntrada);
                                        const fechaSalida = req.body.fechaAsignacion.concat(' ', schedule.horaSalida);
            
                                        if(moment(fechaAsig).isBetween(fechaEntrada, fechaSalida, 'hours')){
                                            return res.status(409).json( {message: 'Conflicto entre horarios'});
                                        }
                                    }
                                break;
                            
                            default:
                                break;
                        }
                }
                
            next();
        }
    ];
}