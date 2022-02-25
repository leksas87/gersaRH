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
    reviewUser,
    reviewOut,
    validacionNumeroAleatorio,
    checkAccessCode,
    registerCheckIn
};

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

async function getEmployeeById(id) {
    const employee = await models.Employee.findOne({where:{userId:id}});
    
    if ( !employee)  throw 'Empleado no encontrado';

    return employee;
}

function checkAccessCode() {
    return[
        async (req,res,next)=>{
            const employee=await models.Employee.findOne({ where: { accessCode: req.headers['accesscode'] } })

            if(!employee)
                return res.status(404).json({ message: 'Código de acceso no encontrado',ok:false});

            req.headers=employee;
            next();
        }
    ];
}

async function registerCheckIn(params){
    const employee=await models.Employee.findOne({ where: { userId: params.userId} })
    const fechaCheck = moment().tz(process.env.TZ).format('YYYY-MM-DD HH:mm:ss');
    const fechaInicio = moment().tz(process.env.TZ).format('YYYY-MM-DD 00:00:00');
    const fechaFin = moment().tz(process.env.TZ).format('YYYY-MM-DD 23:59:59');

    // const registroEntradaEmpleado=await models.Check.findOne({ where: {employeeid:employee.id,dateCheckIn: {[Op.between]: [fechaInicio,fechaFin]}}});

    // if (registroEntradaEmpleado) {
    //     throw 'Ya existe una entrada registrada';
    // } 

    await models.Check.create({employeeId: employee.id,dateCheckIn: fechaCheck,longitudeCheckIn: params.longitude,latitudeCheckIn: params.latitude});

    
}

async function reviewUser(employee) {
    
    const fechaInicio = moment().tz(process.env.TZ).format('YYYY-MM-DD 00:00:00');
    const fechaFin = moment().tz(process.env.TZ).format('YYYY-MM-DD 23:59:59');

    registroEntradaEmpleado=await models.Check.findOne({ where: {employeeid:employee.id,dateCheckIn: {[Op.between]: [fechaInicio,fechaFin]}}});

    if (registroEntradaEmpleado) {
        throw 'Ya existe una entrada registrada';
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