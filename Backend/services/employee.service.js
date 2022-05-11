const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {models} = require('./../libs/sequelize');
const {Op,DataTypes}=require('sequelize');
const moment = require('moment-timezone');

module.exports = {
   
    create,
    getEmployeeById,
    update,
    updateRequests,
    updateReport,
    updateTimeRequests,
    reviewUser,
    reviewOut,
    validacionNumeroAleatorio,
    checkAccessCode,
    registerCheck,
    registerEvents,
    sendAccessCode,
    getEvents,
    sendInformationByAccessCode,
    createSchedule,
    getEmployeeScheduleById,
    deleteEmployeeScheduleById,
    createRequest,
    createReport,
    createTimeRequest,
    getEmployeesOfJc,
    getTimeRequest,
    getTimeRequestByEmployeeId,
    getReport,
    getRequestByEmployeeId,
    getRequest,
    createHourAcecepted,
    getHourAceptedBy
};

async function updateReport(id, params) {
    const Report = await getReportById(id);

    // validate
    if ( !Report)  throw 'Solicitud no encontrada';

    // copy params to user and save
    Object.assign(Report, params);
    await Report.save();

    return Report;
}

async function getReportById(id) {
    const Report = await models.Reports.findByPk(id);
    
    if ( !Report)  throw 'Solicitud no encontrada';

    return Report;
}  

async function getReport(req,res) {
    try {
        const atributeUser=['firstName','lastName'];
        const atributeEmployeeWorkPlace=['id','supervisor','lugarDeTrabajo'];
        let query;
        if (!req.params.id) {
            if(req.user.rollTypeId != 1){ return res.status(403).json( {message: 'Usuario no autorizado'});}
            query={include:[{model:models.Employee,as: "employee",include:[{model:models.User,as:'User',attributes:atributeUser}],attributes:atributeEmployeeWorkPlace}]};
        }
        if (req.params.id>0){
            query={where:{employeeId:req.params.id},include:[{model:models.Employee,as: "employee",include:[{model:models.User,as:'User',attributes:atributeUser}],attributes:atributeEmployeeWorkPlace}]};
        }
        
        return  await models.Reports.findAll(query);
         

    } catch (error) {
        return res.status(404).json({ message: error.message});
    }
    
}

async function createReport(params, id,next){
    try {
        const fechaCreacion = moment().tz(process.env.TZ).format('YYYY-MM-DD');

        const report = await models.Reports.create({
                                                    employeeId:id,
                                                    fechaCreacion:fechaCreacion,
                                                    descripcionEmpleado:params.descripcionEmpleado,
                                                    asunto:params.asunto,
                                                    anonimo:params.anonimo,
                                                    reportType:params.reportType,
                                                    statusId: 1,
                                                });
        
        return report;
    } catch (error) {
        next(`Error de validación: ${error}`);
    }
        
}
async function createHourAcecepted(params, id,next,res){
    try {
        const fechaCreacion = moment().tz(process.env.TZ).format('YYYY-MM-DD');
        console.log('************COL***'+id+'*****'+params.fechaEvento);
        ///validacion 
        const hourAcepted=await models.hoursAccepted.findAll({where: {employeeId:id,fechaEvento:params.fechaEvento}});
        
        if (hourAcepted.length!=0) {
            const error=null;
            return error;
        }

        const report = await models.hoursAccepted.create({
                                                    employeeId:id,
                                                    fechaCreacion:fechaCreacion,
                                                    horasAceptadas:params.horasAceptadas,
                                                    fechaEvento:params.fechaEvento,
                                                    employeeIdAcepto:params.employeeIdAutorizo
                                                });
        
        return report;
    } catch (error) {
        next(` ${error}`);
    }
     
}

async function getHourAceptedBy(id,fechaInicio,fechaFin,res) {
    try {
        let queryHours="";

        if (!fechaInicio && !fechaFin) {
            queryHours={where:{employeeId:id}};
        }
        else{
            queryHours = {where:{employeeId:id,fechaEvento: {[Op.between]: [fechaInicio,fechaFin]}}};
        }

        const hourAcepted = await models.hoursAccepted.findAll(queryHours);

        if ( !hourAcepted)  throw 'Solicitud de tiempo extra no encontrada';
        
        return hourAcepted;
        
    } catch (error) {
        return res.status(404).json({ message: error.message});
    }
    
}

async function getTimeRequestByEmployeeId(id,res) {
    try {
        const atributeUser=['firstName','lastName'];
        //const TimeRequests = await models.TimeRequest.findByPk(id);
        const TimeRequests = await models.TimeRequest.findAll({where:{employeeId:id},include:[{model:models.Employee,as: "employee",include:[{model:models.User,as:'User',attributes:atributeUser}],attributes:['supervisor','lugarDeTrabajo']}]});
        
        if ( !TimeRequests)  throw 'Solicitud de tiempo extra no encontrada';
        
        return TimeRequests;
        
    } catch (error) {
        return res.status(404).json({ message: error.message});
    }
    
}
async function getRequest(req,res) {
    try {
        let Requests;
        const atributeUser=['firstName','lastName'];
        const atributeEmployeeWorkPlace=['id','supervisor','lugarDeTrabajo'];
        const employee= await models.Employee.findOne({where:{userId:req.user.id}});
        switch (req.user.rollTypeId) {
            case 1:
                Requests = await models.Request.findAll({include:[{model:models.Employee,as: "employee",include:[{model:models.User,attributes:atributeUser}],attributes:atributeEmployeeWorkPlace}]});
            break;
            case 2:
                Requests = await models.Request.findAll({where:{employeeId:employee.id},include:[{model:models.Employee,as: "employee",include:[{model:models.User,attributes:atributeUser}],attributes:atributeEmployeeWorkPlace}]});
            break;
            case 3:
                Requests = await models.Request.findAll({include:[{model:models.Employee,as: "employee" ,where:{supervisor:employee.id},attributes:['id']}],include:[{model:models.Employee,as: "employee",include:[{model:models.User,attributes:atributeUser}],attributes:atributeEmployeeWorkPlace}]});
                    
            break;
        
            default:
                break;
        }
        

        if (Requests.length===0)  return res.status(403).json( {message: 'El empleado no tiene solicitudes registradas'});

        return Requests;

    } catch (error) {
        return res.status(404).json({ message: error.message});
    }
    
}
async function getRequestByEmployeeId(id,res) {
    try {
        const atributeUser=['firstName','lastName'];
        const atributeEmployeeWorkPlace=['id','supervisor','lugarDeTrabajo'];
        //const TimeRequests = await models.TimeRequest.findByPk(id);
        const Requests = await models.Request.findAll({where:{employeeId:id},include:[{model:models.Employee,as: "employee",include:[{model:models.User,attributes:atributeUser}],attributes:atributeEmployeeWorkPlace}]});

        console.log(Requests.length); 

        if (Requests.length===0)  return res.status(403).json( {message: 'El empleado no tiene solicitudes registradas'});

        return Requests;

    } catch (error) {
        return res.status(404).json({ message: error.message});
    }
    
}

async function getTimeRequest(req,res) {
    try {
        const atributeUser=['firstName','lastName'];
        const atributeEmployeeWorkPlace=['supervisor','lugarDeTrabajo'];
        console.log(req.user.rollTypeId)
        if(req.user.rollTypeId === 1){
            const TimeRequest = await models.TimeRequest.findAll({include:[{model:models.Employee,as: "employee",include:[{model:models.User,attributes:atributeUser}],attributes:atributeEmployeeWorkPlace}]});
            if (!TimeRequest)  throw new Error('Empleado no encontrado');
            return TimeRequest;
        }else if(req.user.rollTypeId === 2){
            const TimeRequest = await models.TimeRequest.findAll({where:{employeeId:req.user.id},include:[{model:models.Employee,as: "employee",include:[{model:models.User,attributes:atributeUser}],attributes:atributeEmployeeWorkPlace}]});
            if (!TimeRequest)  throw new Error('Empleado no encontrado');
            return TimeRequest;
        }else if(req.user.rollTypeId === 3){
            const TimeRequest = await models.TimeRequest.findAll({where:{employeeIdRequest:req.user.id},include:[{model:models.Employee,as: "employee",include:[{model:models.User,attributes:atributeUser}],attributes:atributeEmployeeWorkPlace}]});
            if (!TimeRequest)  throw new Error('Empleado no encontrado');
            return TimeRequest;
        }


    } catch (error) {
        return res.status(404).json({ message: error.message});
    }
    
}

async function updateTimeRequests(id, params) {
    const TimeRequest = await getTimeRequestById(id);

    // validate
    if ( !TimeRequest)  throw 'Solicitud de tiempo extra no encontrada';

    // copy params to user and save
    Object.assign(TimeRequest, params);
    await TimeRequest.save();

    return TimeRequest;
}

async function getTimeRequestById(id) {
    const TimeRequest = await models.TimeRequest.findByPk(id);
    
    if ( !TimeRequest)  throw 'Solicitud de tiempo extra no encontrada';

    return TimeRequest;
} 

async function createTimeRequest(params, id, res){

        const fechaNow = moment().tz(process.env.TZ).format('YYYY-MM-DD');
     
        
        const timeRequest= await models.TimeRequest.create({
                        employeeId:id,
                        fechaAsignacion:params.fechaAsignacion,
                        horaAsignacion:params.horaAsignacion,
                        LugarApoyo:params.LugarApoyo,
                        statusId:params.statusId,
                        descripcion:params.descripcion,
                        descripcionEmpleado:params.descripcionEmpleado,
                        employeeIdRequest:params.employeeIdRequest,
                        fechaCreacion: fechaNow
                    });

        
        return timeRequest;
    
        
}

async function updateRequests(id, params) {
    const Request = await getRequestById(id);

    // validate
    if ( !Request)  throw 'Solicitud no encontrada';

    // copy params to user and save
    Object.assign(Request, params);
    await Request.save();

    return Request;
}

async function getRequestById(id) {
    const Request = await models.Request.findByPk(id);
    
    if ( !Request)  throw 'Solicitud no encontrada';

    return Request;
}  

  
async function createRequest(params, id,next){
    try {
        const fechaCreacion = moment().tz(process.env.TZ).format('YYYY-MM-DD');

        const request= await models.Request.create({employeeId:id,fechaCreacion:fechaCreacion,fechaInicio:params.fechaInicio,fechaFin:params.fechaFin,statusId:params.statusId,descripcionEmpleado:params.descripcionEmpleado,descriptionRespuesta:params.descriptionRespuesta,requestTypeId:params.requestTypeId,adjunto:params.adjunto});
        
        return request;
    } catch (error) {
        next(`Error de validación: ${error}`);
    }
        
}

async function registerEvents(params, id){
    try {
        const employee = await getEmployeeById(id);
        const refId = parseInt(params.EventTypeId, 10);
        const eventType = await models.EventType.findByPk(refId);
        //const eventType = await models.EventType.findOne({where:{nameType:params.EventTypeId}});

        
        const fechaEvent = moment().tz(process.env.TZ).format('YYYY-MM-DD HH:mm:ss');
        
    
        await models.Event.create({
                                    employeeId: employee.id,
                                    eventTypeId: eventType.id, 
                                    DateEvent: fechaEvent, 
                                    longitudeEvent: params.longitudeEvent, 
                                    latitudeEvent: params.latitudeEvent,
                                    eventActionTypeId: params.eventActionTypeId});
        
        
    } catch (error) {
        return res.status(404).json({ message: 'Ya se tiene registro de la hora de entrada',ok:false});
    }
        
}


async function sendInformationByAccessCode(params) {

    const employee=await models.Employee.findOne({where:{accessCode:params.headers['accesscode']}});

    if (!employee) {
        throw 'Empleado no encontrado';
    }
    const atribute=['phone','active','hash','roll','confirmationCode','isEmployeeActive','username','id']
    
    const usuario=await models.User.findOne({where: {
        id:employee.userId
      },
      attributes: {
        exclude: atribute
      }});
      const token = jwt.sign({ sub: employee.userId }, config.secret, { expiresIn: '2h' });
      
      usuario.setDataValue("employeeId",employee.id);
      usuario.setDataValue("token",token);
      //usuario.setDataValue("accessCode",employee.accessCode);
      return usuario;
}

async function getEmployeesOfJc(id, res,req) {
    try {
        const atribute=['firstName','lastName']
        const atributeEmployee=['id']
        const name=req.query.name;
        const roll=req.user.rollTypeId;
        const tipo=req.query.tipo

        let params;

        params={include:[{model:models.User,as:'User',attributes:atribute,where:{rollTypeId:tipo}}],attributes:atributeEmployee};

        if (typeof (tipo) === 'undefined') {
            
            switch (roll) {
                case 1:
                    params={include:[{model:models.User,as:'User',attributes:atribute,where:{[Op.or]:[{firstName:{[Op.like]:''+name+'%'}},{lastName:{[Op.like]:''+name+'%'}}]}}],attributes:atributeEmployee};
                    if (typeof (name) === 'undefined') {
                        params={include:[{model:models.User,as:'User',attributes:atribute}],attributes:atributeEmployee};
                    }
                    break;
                case 3:
                    params={where:{supervisor:id},include:[{model:models.User,as:'User',attributes:atribute,where:{[Op.or]:[{firstName:{[Op.like]:''+name+'%'}},{lastName:{[Op.like]:''+name+'%'}}]}}],attributes:atributeEmployee};
                    if (typeof (name) === 'undefined') {
                        params={where:{supervisor:id},include:[{model:models.User,as:'User',attributes:atribute}],attributes:atributeEmployee};
                    }
                break;
                default:
                    break;
            }
            
            
        }

        const employeesJC= await models.Employee.findAll(params);
        return employeesJC;
  
    } catch (error) {
        throw error;
    }
}
async function getEvents(id, fechaInicio, fechaFin, eventActionTypeId, res) {

    let refEventTypeId = 1;

    if(eventActionTypeId){
            const fechaHoraCreacion = moment().tz(process.env.TZ).format('YYYY-MM-DD HH:mm:ss');
            const fechaCreacion = moment(fechaHoraCreacion).format('YYYY-MM-DD')
            const employeeSchedules = await models.EmployeeSchedule.findAll({where:{employeeId:id}}); 

            if(employeeSchedules.length===0) return res.status(202).json({message: 'Horario no encontrado'});    

            switch (eventActionTypeId) {
                case "1":

                        for (const employeeSchedul of employeeSchedules) {

                            const schedule = await models.Schedule.findByPk(employeeSchedul.scheduleId);
                            let day = moment(fechaCreacion).format('d');
                            if(!schedule) return res.status(202).json({message: 'Horario no encontrado'});    
                            switch (day) {
                                case '0':
                                        if(schedule.Domingo){

                                            const fechaEntrada = fechaCreacion.concat(' ', schedule.horaEntrada);
                                            const diferencia = moment(fechaHoraCreacion).diff(fechaEntrada, 'seconds');
                                            //Se agrega 60 segundos de tolerancia
                                            const segundos = (schedule.tiempoRetraso*60) + 60;

                                            if(diferencia<60){
                                                refEventTypeId = 1;
                                            }else if(diferencia >= 60 && diferencia < segundos ){
                                                    refEventTypeId = 2;
                                            }else if(diferencia >= segundos ){
                                                    refEventTypeId = 3;
                                            }
                                        }else{
                                            return res.status(202).json({message: 'Día no laboral.'}); 
                                        }
                                    break;
                                case '1':
                                        if(schedule.Lunes){

                                            const fechaEntrada = fechaCreacion.concat(' ', schedule.horaEntrada);
                                            const diferencia = moment(fechaHoraCreacion).diff(fechaEntrada, 'seconds');
                                            const segundos = (schedule.tiempoRetraso*60) + 60;

                                            if(diferencia<60){
                                                refEventTypeId = 1;
                                            }else if(diferencia >= 60 && diferencia < segundos ){
                                                    refEventTypeId = 2;
                                            }else if(diferencia >= segundos ){
                                                    refEventTypeId = 3;
                                            }
                                        }
                                        else{
                                            return res.status(202).json({message: 'Día no laboral.'}); 
                                        }
                                    break;
                                case '2':
                                        if(schedule.Martes){
                                            
                                            const fechaEntrada = fechaCreacion.concat(' ', schedule.horaEntrada);
                                            const diferencia = moment(fechaHoraCreacion).diff(fechaEntrada, 'seconds');
                                            const segundos = (schedule.tiempoRetraso*60) + 60;

                                            if(diferencia<60){
                                                refEventTypeId = 1;
                                            }else if(diferencia >= 60 && diferencia < segundos ){
                                                    refEventTypeId = 2;
                                            }else if(diferencia >= segundos ){
                                                    refEventTypeId = 3;
                                            }
                                        }
                                        else{
                                            return res.status(202).json({message: 'Día no laboral.'}); 
                                        }
                                    break;
                                case '3':
                                        if(schedule.Miercoles){
                                            
                                            const fechaEntrada = fechaCreacion.concat(' ', schedule.horaEntrada);
                                            const diferencia = moment(fechaHoraCreacion).diff(fechaEntrada, 'seconds');
                                            const segundos = (schedule.tiempoRetraso*60) + 60;

                                            if(diferencia<60){
                                                refEventTypeId = 1;
                                            }else if(diferencia >= 60 && diferencia < segundos ){
                                                    refEventTypeId = 2;
                                            }else if(diferencia >= segundos ){
                                                    refEventTypeId = 3;
                                            }
                                        }
                                        else{
                                            return res.status(202).json({message: 'Día no laboral.'});  
                                        }
                                    break;
                                case '4':
                                        if(schedule.Jueves){
                                            
                                            const fechaEntrada = fechaCreacion.concat(' ', schedule.horaEntrada);
                                            const diferencia = moment(fechaHoraCreacion).diff(fechaEntrada, 'seconds');
                                            const segundos = (schedule.tiempoRetraso*60) + 60;

                                            if(diferencia<60){
                                                refEventTypeId = 1;
                                            }else if(diferencia >= 60 && diferencia < segundos ){
                                                    refEventTypeId = 2;
                                            }else if(diferencia >= segundos ){
                                                    refEventTypeId = 3;
                                            }
                                        }
                                        else{
                                            return res.status(202).json({message: 'Día no laboral.'}); 
                                        }
                                    break;
                                case '5':
                                        if(schedule.Viernes){
                                            
                                            const fechaEntrada = fechaCreacion.concat(' ', schedule.horaEntrada);
                                            const diferencia = moment(fechaHoraCreacion).diff(fechaEntrada, 'seconds');
                                            const segundos = (schedule.tiempoRetraso*60) + 60;

                                            if(diferencia<60){
                                                refEventTypeId = 1;
                                            }else if(diferencia >= 60 && diferencia < segundos ){
                                                    refEventTypeId = 2;
                                            }else if(diferencia >= segundos ){
                                                    refEventTypeId = 3;
                                            }
                                        }
                                        else{
                                            return res.status(202).json({message: 'Día no laboral.'}); 
                                        }
                                    break;
                                case '6':
                                        if(schedule.Sabado){
                                            
                                            const fechaEntrada = fechaCreacion.concat(' ', schedule.horaEntrada);
                                            const diferencia = moment(fechaHoraCreacion).diff(fechaEntrada, 'seconds');
                                            const segundos = (schedule.tiempoRetraso*60) + 60;

                                            if(diferencia<60){
                                                refEventTypeId = 1;
                                            }else if(diferencia >= 60 && diferencia < segundos ){
                                                    refEventTypeId = 2;
                                            }else if(diferencia >= segundos ){
                                                    refEventTypeId = 3;
                                            }
                                        }
                                        else{
                                            return res.status(202).json({message: 'Día no laboral.'}); 
                                        }
                                    break;
                                
                                default:
                                    break;
                            }
                        }
                    break;

                case "2":
                        
                    for (const employeeSchedul of employeeSchedules) {
                        
                        const schedule = await models.Schedule.findByPk(employeeSchedul.scheduleId);
                        let day = moment(fechaCreacion).format('d');
                        if(!schedule) return res.status(202).json({message: 'Horario no encontrado'});    
                        
                        switch (day) {
                            case '0':
                                    if(!schedule.Domingo){
                                        return res.status(202).json({message: 'Día no laboral.'}); 
                                    }
                                break;
                            case '1':
                                    if(!schedule.Lunes){
                                        return res.status(202).json({message: 'Día no laboral.'}); 
                                    }
                                break;
                            case '2':
                                    if(!schedule.Martes){
                                        return res.status(202).json({message: 'Día no laboral.'}); 
                                    }
                                break;
                            case '3':
                                    if(!schedule.Miercoles){
                                        return res.status(202).json({message: 'Día no laboral.'}); 
                                    }
                                break;
                            case '4':
                                    if(!schedule.Jueves){
                                        return res.status(202).json({message: 'Día no laboral.'}); 
                                    }
                                break;
                            case '5':
                                    if(!schedule.Viernes){
                                        return res.status(202).json({message: 'Día no laboral.'}); 
                                    }
                                break;
                            case '6':
                                    if(!schedule.Sabado){
                                        return res.status(202).json({message: 'Día no laboral.'}); 
                                    }
                                break;
                            
                            default:
                                break;
                        }
                    }
                    break;

                case "3":
                        for (const employeeSchedul of employeeSchedules) {
                            const fechaInicioPre = moment().tz(process.env.TZ).format('YYYY-MM-DD 00:00:00');
                            const fechaFinPre = moment().tz(process.env.TZ).format('YYYY-MM-DD 23:59:59');
                            const schedule = await models.Schedule.findByPk(employeeSchedul.scheduleId);
                            const eventsPre = await models.Event.findAll({where:{
                                                                                employeeId:employeeSchedul.employeeId,
                                                                                DateEvent: {[Op.between]: [fechaInicioPre,fechaFinPre]}
                                                                                },
                                                                        order:[['DateEvent', 'DESC']]
                                                                        });
            
                            if ( eventsPre.length === 0) res.status(202).json({message: 'Empleado no tiene registros de salida a comer'});
                             
                            let day = moment(fechaCreacion).format('d');

                            //if(eventsPre.length > 2) throw 'Empleado tiene más de un registro de salida a comer';
                            if(eventsPre.length > 2) return res.status(202).json({message: 'Empleado tiene más de un registro de salida a comer'});
                            //if(!schedule) throw 'Horario no encontrado';
                            if(!schedule) return res.status(202).json({message: 'Horario no encontrado'});
                            // se agregara la fecha de entrada y revisara validacion
                            switch (day) {
                                case '0':
                                        if(schedule.Domingo){
                                            
                                            const diferencia = moment(fechaHoraCreacion).diff(eventsPre[0].DateEvent, 'seconds');
                                            const segundos = (schedule.tiempoDescanso*60);
                                            const segundos2 = segundos + (schedule.tiempoRetraso * 60);
                                            
                                            if(diferencia < segundos ){
                                                refEventTypeId = 1;
                                            }else if(diferencia >= segundos && diferencia < segundos2 ){
                                                    refEventTypeId = 2;
                                            }else if(diferencia >= segundos2 ){
                                                    refEventTypeId = 3;
                                            }
                                        }
                                        else{
                                            return res.status(202).json({message: 'Día no laboral.'}); 
                                        }
                                    break;
                                case '1':
                                        if(schedule.Lunes){
                                            
                                            const diferencia = moment(fechaHoraCreacion).diff(eventsPre[0].DateEvent, 'seconds');
                                            const segundos = (schedule.tiempoDescanso*60);
                                            const segundos2 = segundos + (schedule.tiempoRetraso * 60);

                                            if(diferencia < segundos ){
                                                refEventTypeId = 1;
                                            }else if(diferencia >= segundos && diferencia < segundos2 ){
                                                    refEventTypeId = 2;
                                            }else if(diferencia >= segundos2 ){
                                                    refEventTypeId = 3;
                                            }
                                        }
                                        else{
                                            return res.status(202).json({message: 'Día no laboral.'}); 
                                        }
                                    break;
                                case '2':
                                        if(schedule.Martes){

                                            const diferencia = moment(fechaHoraCreacion).diff(eventsPre[0].DateEvent, 'seconds');
                                            const segundos = (schedule.tiempoDescanso*60);
                                            const segundos2 = segundos + (schedule.tiempoRetraso * 60);
                                            

                                            if(diferencia < segundos ){
                                                refEventTypeId = 1;
                                            }else if(diferencia >= segundos && diferencia < segundos2 ){
                                                    refEventTypeId = 2;
                                            }else if(diferencia >= segundos2 ){
                                                    refEventTypeId = 3;
                                            }
                                        }
                                        else{
                                            return res.status(202).json({message: 'Día no laboral.'}); 
                                        }
                                    break;
                                case '3':
                                        if(schedule.Miercoles){
                                            
                                            const diferencia = moment(fechaHoraCreacion).diff(eventsPre[0].DateEvent, 'seconds');
                                            const segundos = (schedule.tiempoDescanso*60);
                                            const segundos2 = segundos + (schedule.tiempoRetraso * 60);
                                            
                                            if(diferencia < segundos ){
                                                refEventTypeId = 1;
                                            }else if(diferencia >= segundos && diferencia < segundos2 ){
                                                    refEventTypeId = 2;
                                            }else if(diferencia >= segundos2 ){
                                                    refEventTypeId = 3;
                                            }
                                        }
                                        else{
                                            return res.status(202).json({message: 'Día no laboral.'}); 
                                        }
                                    break;
                                case '4':
                                        if(schedule.Jueves){
                                            
                                            const diferencia = moment(fechaHoraCreacion).diff(eventsPre[0].DateEvent, 'seconds');
                                            const segundos = (schedule.tiempoDescanso*60);
                                            const segundos2 = segundos + (schedule.tiempoRetraso * 60);
                                            
                                            if(diferencia < segundos ){
                                                refEventTypeId = 1;
                                            }else if(diferencia >= segundos && diferencia < segundos2 ){
                                                    refEventTypeId = 2;
                                            }else if(diferencia >= segundos2 ){
                                                    refEventTypeId = 3;
                                            }
                                        }
                                        else{
                                            return res.status(202).json({message: 'Día no laboral.'}); 
                                        }
                                    break;
                                case '5':
                                        if(schedule.Viernes){
                                            
                                            const diferencia = moment(fechaHoraCreacion).diff(eventsPre[0].DateEvent, 'seconds');
                                            const segundos = (schedule.tiempoDescanso*60);
                                            const segundos2 = segundos + (schedule.tiempoRetraso * 60);
                                            
                                            if(diferencia < segundos ){
                                                refEventTypeId = 1;
                                            }else if(diferencia >= segundos && diferencia < segundos2 ){
                                                    refEventTypeId = 2;
                                            }else if(diferencia >= segundos2 ){
                                                    refEventTypeId = 3;
                                            }
                                        }
                                        else{
                                            return res.status(202).json({message: 'Día no laboral.'}); 
                                        }
                                    break;
                                case '6':
                                        if(schedule.Sabado){
                                            
                                            const diferencia = moment(fechaHoraCreacion).diff(eventsPre[0].DateEvent, 'seconds');
                                            const segundos = (schedule.tiempoDescanso*60);
                                            const segundos2 = segundos + (schedule.tiempoRetraso * 60);
                                            
                                            if(diferencia < segundos ){
                                                refEventTypeId = 1;
                                            }else if(diferencia >= segundos && diferencia < segundos2 ){
                                                    refEventTypeId = 2;
                                            }else if(diferencia >= segundos2 ){
                                                    refEventTypeId = 3;
                                            }
                                        }
                                        else{
                                            return res.status(202).json({message: 'Día no laboral.'}); 
                                        }
                                    break;
                                
                                default:
                                    break;
                            }
                            
                        }
                    break;

                case "4":
                    for (const employeeSchedul of employeeSchedules) {

                        const schedule = await models.Schedule.findByPk(employeeSchedul.scheduleId);
                        let day = moment(fechaCreacion).format('d');
                        if(!schedule) return res.status(202).json({message: 'Horario no encontrado'});    
                        switch (day) {
                            case '0':
                                    if(!schedule.Domingo){
                                        return res.status(202).json({message: 'Día no laboral.'}); 
                                    }
                                break;
                            case '1':
                                    if(!schedule.Lunes){
                                        return res.status(202).json({message: 'Día no laboral.'}); 
                                    }
                                break;
                            case '2':
                                    if(!schedule.Martes){
                                        return res.status(202).json({message: 'Día no laboral.'}); 
                                    }
                                break;
                            case '3':
                                    if(!schedule.Miercoles){
                                        return res.status(202).json({message: 'Día no laboral.'}); 
                                    }
                                break;
                            case '4':
                                    if(!schedule.Jueves){
                                        return res.status(202).json({message: 'Día no laboral.'}); 
                                    }
                                break;
                            case '5':
                                    if(!schedule.Viernes){
                                        return res.status(202).json({message: 'Día no laboral.'}); 
                                    }
                                break;
                            case '6':
                                    if(!schedule.Sabado){
                                        return res.status(202).json({message: 'Día no laboral.'}); 
                                    }
                                break;
                            
                            default:
                                break;
                        }
                    }
                    break;
                        //Agregar fecha 
                case "5":
                    
                    const employeeTimeRequests = await models.TimeRequest.findAll({where:{
                                                                                        employeeId:id,
                                                                                        statusId:2,
                                                                                        fechaAsignacion:fechaCreacion,
                                                                                }}); 
                                                                                                                           
                    if ( employeeTimeRequests.length === 0) return res.status(202).json({message: 'Empleado no tiene horas extra'}); 

                    for (const employeeTimeRequest of employeeTimeRequests) {

                        const fechaEntrada = employeeTimeRequest.fechaAsignacion.concat(' ', employeeTimeRequest.horaAsignacion);
                        const diferencia = moment(fechaHoraCreacion).diff(fechaEntrada, 'seconds');
                        //se agrega 360 por que por default 5 minutos de retardo antes que acta
                        const segundos =  360;

                                    if(diferencia<60){
                                            refEventTypeId = 1;
                                    }else if(diferencia >= 60 && diferencia < segundos ){
                                            refEventTypeId = 2;
                                    }else if(diferencia >= segundos ){
                                            refEventTypeId = 3;
                                    }
                    }
                break;

                case "6":
                    const fechaInicioPre = moment().tz(process.env.TZ).format('YYYY-MM-DD 00:00:00');
                    const fechaFinPre = moment().tz(process.env.TZ).format('YYYY-MM-DD 23:59:59');
                    const eventsPre = await models.Event.findAll({where:{
                                                                                employeeId:id,
                                                                                eventActionTypeId:5,
                                                                                DateEvent: {[Op.between]: [fechaInicioPre,fechaFinPre]}
                                                                                },
                                                                        order:[['DateEvent', 'DESC']]
                                                                        });

                    if ( eventsPre.length === 0)  return res.status(202).json({message: 'Empleado no tiene registros de entrada a hora extra'});

                     const employeeTimeRequests1 = await models.TimeRequest.findAll({where:{
                                                                                        employeeId:id,
                                                                                        statusId:2,
                                                                                        fechaAsignacion:fechaCreacion,
                                                                                }}); 

                    if ( employeeTimeRequests1.length === 0) return res.status(202).json({message: 'Empleado no tiene horas extra'});
                    break;

                default:
                    break;
            }}

    if(!fechaInicio && !fechaFin){
        const fechaInicio = moment().tz(process.env.TZ).format('YYYY-MM-DD 00:00:00');
        const fechaFin = moment().tz(process.env.TZ).format('YYYY-MM-DD 23:59:59');

        const events = await models.Event.findAll({where:{
                                                        employeeId:id,
                                                        DateEvent: {[Op.between]: [fechaInicio,fechaFin]}
                                                        },
                                                    order:[['DateEvent', 'DESC']]
                                                });
    
        if ( !events)  throw 'Empleado no encontrado';
        events.eventActionTypeId = parseInt(eventActionTypeId, 10);
        events.eventTypeId = refEventTypeId;
        events.employeeId = parseInt(id, 10);
        return events;

    }else{
        const events = await models.Event.findAll({where:{
                                                        employeeId:id,
                                                        DateEvent: {[Op.between]: [fechaInicio,fechaFin]}
                                                        },
                                                    order:[['DateEvent', 'DESC']]
                                                });
    
        if ( !events)  throw 'Empleado no encontrado';
        events.eventActionTypeId = parseInt(eventActionTypeId, 10);
        events.eventTypeId = refEventTypeId;
        events.employeeId = parseInt(id, 10);
        return events;
    }
}

async function sendAccessCode(id) {
    const employee = await models.Employee.findOne({where:{userId:id}});
    const user = await models.User.findByPk(id)

    if ( !employee)  throw 'Empleado no encontrado';
    if ( !user)  throw 'Usuario no encontrado';

    const sgMail = require('@sendgrid/mail');

    const API_KEY=process.env.SENDGRID_API_KEY;

    sgMail.setApiKey(API_KEY)

    const msg2 = {
        to: user.username,
        from: {email:process.env.EMAIL,name:process.env.NAME,},
        subject:'Código de asistencia',
        templateId: process.env.TEMPLETEACCESSCODE,
        dynamic_template_data: {
            codigo: employee.accessCode,
        },
    };  
    await sgMail.send(msg2)
}

async function update(id, params) {
    const employee = await getEmployeeById(id);

    // validate
    if ( !employee)  throw 'Empleado no encontrado';

    // copy params to user and save
    Object.assign(employee, params);
    await employee.save();

    return employee;
}

async function validacionNumeroAleatorio() {
    const maximo=9999;
    const minimo=1000
    let numeroLibre=true;

    do {
        var num =  Math.floor(Math.random() * ((maximo+1) - minimo) + minimo);

        const accessCode=await models.Employee.findOne({where:{accessCode:num}});

        if (accessCode) {
            numeroLibre=false;
        }
    } while (!numeroLibre);

    return num;
}

async function create(params) {
    
    params.accessCode=await validacionNumeroAleatorio();
    await models.Employee.create(params);

}
async function createSchedule(params) {
    const newSchedule=await models.EmployeeSchedule.create(params);
    return newSchedule;
}

async function getEmployeeById(id) {
    const employee = await models.Employee.findOne({where:{userId:id}});
    
    if ( !employee)  throw 'Empleado no encontrado';

    return employee;
}

async function getEmployeeScheduleById(id,res) {
    try {
        
        const employee = await models.Employee.findOne({where:{id:id},include:'schedule'});
    
        if (!employee)  throw new Error('Empleado no encontrado');

        if (employee.schedule.length==0) throw new Error('Empleado sin registro de horario');

        return employee.schedule;

    } catch (error) {
        return res.status(404).json({ message: error.message});
    }
    
}
async function deleteEmployeeScheduleById(id,res) {
    try {
        const employeeSchedule = await models.EmployeeSchedule.findOne({where:{id:id}});
        
        console.log(employeeSchedule);

        if (!employeeSchedule)  throw new Error('Empleado sin horarios asignados');

        employeeSchedule.destroy();

    } catch (error) {
        return res.status(404).json({ message: error.message});
    }
    
}

function checkAccessCode() {
    return[
        async (req,res,next)=>{
            const employee=await models.Employee.findOne({ where: { accessCode: req.headers['accesscode'] } })

            if(!employee)
                return res.status(404).json({ message: 'Código de acceso no encontrado',ok:false});

            // req.headers=employee.id;
            next();
        }
    ];
}

async function registerCheck(params){
    try {
        const employee = await getEmployeeById(params.userId);
        
        const fechaCheck = moment().tz(process.env.TZ).format('YYYY-MM-DD HH:mm:ss');

        
        

        await models.Check.create({employeeId: employee.id,DateCheck: fechaCheck,longitudeCheck: params.longitudeCheck,latitudeCheck: params.latitudeCheck,tipoCheck: params.tipoCheck});
        
        
    } catch (error) {
        return res.status(404).json({ message: 'Ya se tiene registro de la hora de entrada',ok:false});
    }
        
}

async function reviewUser(params) {

    const employee=await models.Employee.findOne({where:{accessCode:params.headers['accesscode']}});

    if (!employee) {
        throw 'Empleado no encontrado';
    }
    const atribute=['phone','active','hash','roll','confirmationCode','isEmployeeActive']

    const usuario=await models.User.findOne({where: {
        id:employee.userId
      },
      attributes: {
        exclude: atribute
      }});

      usuario.setDataValue("accessCode",employee.accessCode);

      return usuario;
}




async function reviewOut(employee) {

    const fechaInicio = moment().tz(process.env.TZ).format('YYYY-MM-DD 00:00:00');
    const fechaFin = moment().tz(process.env.TZ).format('YYYY-MM-DD 23:59:59');

    registroEntradaEmpleado=await models.Check.findOne({ where: {employeeid:employee.id,dateCheckIn: {[Op.between]: [fechaInicio,fechaFin]}}});

    if (!registroEntradaEmpleado) {
        throw 'Aún no registras una entrada el día de hoy';
    } 

    registroSalidaEmpleado=await models.Check.findOne({ where: {employeeid:employee.id,dateCheckOut: {[Op.between]: [fechaInicio,fechaFin]}}});

    if (registroSalidaEmpleado) {
        throw 'Ya registraste tu salida el día de hoy'
    }

    const atribute=['firstName','lastName','phone','active','hash','roll','confirmationCode','isEmployeeActive']
    const usuario=await models.User.findOne({where: {
        id:employee.userId
      },
      attributes: {
        exclude: atribute
      }});
    
    usuario.setDataValue("accessCode",employee.accessCode);
    
    return usuario;

}