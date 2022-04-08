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
    createTimeRequest,
    getEmployeesOfJc
};

async function createTimeRequest(params, id, res){
    
     
        
        
        const timeRequest= await models.TimeRequest.create({
                        employeeId:id,
                        fechaAsignacion:params.fechaAsignacion,
                        horaAsignacion:params.horaAsignacion,
                        LugarApoyo:params.LugarApoyo,
                        statusId:params.statusId,
                        description:params.descripcion,
                        employeeIdRequest:params.employeeIdRequest
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

        const eventType = await models.EventType.findOne({where:{nameType:params.EventType}});

        
        const fechaEvent = moment().tz(process.env.TZ).format('YYYY-MM-DD HH:mm:ss');
        
    
        await models.Event.create({employeeId: employee.id ,eventTypeId: eventType.id, DateEvent: fechaEvent, longitudeEvent: params.longitudeEvent, latitudeEvent: params.latitudeEvent});
        
        
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

async function getEmployeesOfJc(id, res,name) {
    try {
        const atribute=['firstName','lastName']
        const atributeEmployee=['id']
        console.log(name);
        const employeesJC= await models.Employee.findAll({where:{supervisor:id},include:[{model:models.User,attributes:atribute,where:{[Op.or]:[{firstName:{[Op.like]:''+name+'%'}},{lastName:{[Op.like]:''+name+'%'}}]}}],attributes:atributeEmployee});
        return employeesJC;
    } catch (error) {
        throw error;
    }
}
async function getEvents(id, fechaInicio, fechaFin) {

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
        
        return events;

    }else{
        const events = await models.Event.findAll({where:{
                                                        employeeId:id,
                                                        DateEvent: {[Op.between]: [fechaInicio,fechaFin]}
                                                        },
                                                    order:[['DateEvent', 'DESC']]
                                                });
    
        if ( !events)  throw 'Empleado no encontrado';
        
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
        const employee = await models.Employee.findOne({where:{userId:id},include:'schedule'});
    
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