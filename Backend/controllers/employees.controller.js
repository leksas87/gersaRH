const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const validateTimeRequest = require('middleware/validate-timeRequest');
const validateRequestHeader = require('middleware/validate-request-header');
const validateRequestParams = require('middleware/validate-request-params');
const validateDays=require('middleware/validateDays');
const validaDias=require('middleware/validaDias');
const validaDiasPatch=require('middleware/validaDiasPatch');
const authorize = require('middleware/authorize');
const forbidden = require('middleware/forbidden');
const forbiddenTimeRequest = require('middleware/forbiddenTimeRequest');
const forbiddenJefeCuadrilla = require('middleware/forbiddenJC');
const forbiddenGet = require('middleware/forbiddenGet');
const forbiddenGetUnique=require('middleware/forbiddenGetUnique');
const employeeService = require('../services/employee.service');
const contractService = require('../services/contract.service');
const payRollService = require('../services/payRoll.service');
const {models} = require('./../libs/sequelize');
const xl = require('excel4node');
const moment = require('moment-timezone');
const {Op}=require('sequelize');
const path = require('path');

// routes
router.get('/auth', registerAccessCodeSchema, sendInformationByAccessCode);
router.post(
	'/check',
	registerAccessCodeSchema,
	registerCheckSchema,
	registerCheck
);
router.get('/check', registerAccessCodeSchema, Check);
router.get('/reportsEmployees',authorize(),getReportsEmployees);
router.get('/reports',authorize(),getReport);
router.get('/timeRequest',authorize(),forbiddenGet(),getTimeRequest);
router.post('/', authorize(), registerSchema, register);
router.get('/request',authorize(),getRequest);
router.get('/', authorize(),forbiddenJefeCuadrilla(),getEmployeesJC);
router.get('/:id', authorize(), forbiddenGet(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.get('/:id/accessCode', authorize(), forbiddenGet(), sendAccessCodeById);
router.get('/:id/events', authorize(), forbiddenGet(), getEvents);
router.post(
	'/:id/events',
	authorize(),
	forbiddenGet(),
	registerEventSchema,
	registerEvents
);
router.get('/:id/schedule', authorize(), forbiddenGet(), getSchedule);
router.delete(
	'/employeeSchedule/:id',
	authorize(),
	forbidden(),
	deleteEmployeeSchedule,
	deleteSchedule
	);
	router.post(
		'/add-schedule',
		authorize(),
		forbidden(),
		addScheduleSchema,
		registerSchedule
		);
router.get('/:id/hoursAccepted', authorize(), forbiddenJefeCuadrilla(), getHourAcepted);
router.post(
	'/:id/hoursAccepted',
	authorize(),
	forbiddenJefeCuadrilla(),
	registerHoursAccepted,
	registerPostHourAcecepted
);

router.post(
	'/:id/contracts',
	authorize(),
	forbidden(),
	registerSchemaContracts,
	registerContracts
);
router.patch(
	'/:id/contracts/:idContract',
	authorize(),
	forbidden(),
	updateSchemaContracts,
	updateContracts
);
router.put(
	'/:id/contracts/:idContract',
	authorize(),
	forbidden(),
	updateSchemaContractsPut,
	updateContracts
);
router.delete(
	'/:id/contracts/:idContract',
	authorize(),
	forbidden(),
	deleteByIdContracts
);

router.patch(
	'/:id/contracts/:idContract',
	authorize(),
	forbidden(),
	updateSchemaContracts,
	updateContracts
);

router.get(
	'/:id/payRolls',
	authorize(),
	forbiddenGet(),
	getPayRoll
);
router.post(
	'/:id/timeRequest',
	authorize(),
	validateTimeRequest(),
	registerSchemaTimeRequest,
	registerTimeRequest
);

router.patch(
	'/timeRequest/:id',
	authorize(),
	forbiddenTimeRequest(),
	updateSchemaTimeRequests,
	updateTimeRequests
);
router.get('/:id/timeRequest',authorize(),forbiddenGet(), getTimeRequestByEmployeeId);


router.get('/:id/contracts', authorize(), forbiddenGet(), getByEmployee);
router.patch(
	'/requests/:id',
	authorize(), 
	forbiddenJefeCuadrilla(), 
	updateSchemaRequests, 
	validaDiasPatch(),
	updateRequests
);

router.post(
	'/:id/request',
	authorize(),
	forbiddenGetUnique(),
	registerSchemaRequest,
	validaDias(),
	registerRequest
	);
	
router.get(
	'/:id/request',
	authorize(),
	forbiddenGetUnique(),
	getRequestByEmployeeId
);

router.post(
	'/:id/reports',
	authorize(),
	registerSchemaReport,
	registerReport
);

router.patch(
	'/reports/:id',
	authorize(), 
	forbiddenGet(),
	updateSchemaReport, 
	updateReport
);

router.get('/:id/reports',authorize(),getReport);
router.get('/:id/availableDays',authorize(),validateDays());

module.exports = router;

async function getReportsEmployees(req, res, next) {

	//Se define la fecha en la que se realiza la petición
	 let semanaNow = moment().tz("America/Mexico_City").format('w');
	 let semanaInicio = moment().isoWeek(semanaNow-2).startOf("isoweek").format('YYYY-MM-DD');
	 let semanaFin = moment().isoWeek(semanaNow-2).startOf("isoweek").format('YYYY-MM-DD');
	//Libro de trabajo
	const wb = new xl.Workbook();
	const reportes = [];
	//Hoja de trabajo
	const ws = wb.addWorksheet('Reporte');
	//Estilo normal
	const style = wb.createStyle({
		font:{
			color: '#040404',
			size: 12
		}
	});

	//Estilo verde
	const greeS = wb.createStyle({
		font:{
			color: '#388813',
			size: 12
		}
	});
	//Se crea el formato`string text ${expression} string text`
	ws.cell(1,1).string(`Reporte empleados Periodo:${semanaInicio} a ${semanaFin}`).style(style)
	ws.cell(3,1).string("Numero Empleado").style(greeS);
	ws.cell(3,2).string("Empleado").style(greeS);
	ws.cell(3,3).string("Lugar de trabajo").style(greeS);
	ws.cell(3,4).string("Horario").style(greeS);
	ws.cell(3,5).string("Fecha").style(greeS);
	ws.cell(3,6).string("Asistencia").style(greeS);
	ws.cell(3,7).string("Hora de Entrada").style(greeS);
	ws.cell(3,8).string("Hora inicio descanso").style(greeS);
	ws.cell(3,9).string("Hora fin descanso").style(greeS);
	ws.cell(3,10).string("Hora de Salida").style(greeS);
	ws.cell(3,11).string("Horas extra").style(greeS);
	ws.cell(3,12).string("Inicio hora extra").style(greeS);
	ws.cell(3,13).string("Fin Hora Extra").style(greeS);

	ws.column(1).setWidth(30);
	ws.column(2).setWidth(30);
	ws.column(3).setWidth(20);
	ws.column(4).setWidth(30);
	ws.column(5).setWidth(25);
	ws.column(6).setWidth(25);
	ws.column(7).setWidth(25);
	ws.column(8).setWidth(25);
	ws.column(9).setWidth(25);
	ws.column(10).setWidth(25);
	ws.column(11).setWidth(25);
	ws.column(12).setWidth(25);
	ws.column(13).setWidth(25);

	//Obtenemos los empleados de la base
	const employees = await models.Employee.findAll();

	//Se recorre el arregle de los empleados para ir recuperando su información
	for (const employeesF of employees) {
		let user = await models.User.findByPk(employeesF.userId);
		let relacion = await models.EmployeeSchedule.findOne({ where: { 
																	employeeId: employeesF.id
																	},
															  order:[['id', 'ASC']]
															});
		if(!relacion){
			let schedule = {scheduleName:"No tiene registro"}	;									
			let userSave = {
					numeroEmpleado: employeesF.numeroEmpleado,
					empleado: user.firstName +" "+ user.lastName,
					lugarTrabajo: schedule.scheduleName,
					horario: schedule.scheduleName,
					dia:schedule.scheduleName,
					asistencia: schedule.scheduleName,
					horaEntrada: schedule.scheduleName,
					horaInicioDescanso: schedule.scheduleName,
					horaFinDescanso: schedule.scheduleName,
					horaSalida: schedule.scheduleName,
					horasExtra: schedule.scheduleName,
					inicioHoraExtra: schedule.scheduleName,
					finHoraExtra: schedule.scheduleName
			};
			if(user.isEmployeeActive)
				reportes.push(userSave);
		}else{
			let schedule = await models.Schedule.findByPk(relacion.scheduleId);		
			for(let i = 0; i < 7; i++){
				let asistencia1 = null;
				let ban = false;
				let day = moment(semanaInicio).add(i, 'days').format('YYYY-MM-DD');
				let dayStart = moment(semanaInicio).add(i, 'days').format('YYYY-MM-DD 00:00:00');
				let dayEnd = moment(semanaInicio).add(i, 'days').format('YYYY-MM-DD 23:59:59');
				let dayNumber = moment(semanaInicio).add(i, 'days').format('d');
				switch (dayNumber) {
					case "0":
						if(!schedule.Domingo){
							ban = true;
							asistencia1 = "Descanso"
						}
						break;
					case "1":
						if(!schedule.Lunes){
							ban = true;
							asistencia1 = "Descanso"
						}
						break;
					case "2":
						if(!schedule.Martes){
							ban = true;
							asistencia1 = "Descanso"
						}
						break;
					case "3":
						if(!schedule.Miercoles){
							ban = true;
							asistencia1 = "Descanso"
						}
						break;
					case "4":
						if(!schedule.Jueves){
							ban = true;
							asistencia1 = "Descanso"
						}
						break;
					case "5":
						if(!schedule.Viernes){
							ban = true;
							asistencia1 = "Descanso"
						}
						break;
					case "6":
						if(!schedule.Sabado){
							ban = true;
							asistencia1 = "Descanso"
						}
						break;
				
					default:
						break;
				}
				if(!ban){
					let request = await models.Request.findOne({
																where:{
																		employeeId: employeesF.id,
																		statusId: 2
																	  },
																order:[['id', 'DESC']]
																});
					
					console.log(request);
					if(request != null){	
						if(moment(day).isSameOrAfter(request.fechaInicio) && moment(day).isSameOrBefore(request.fechaFin)){
							ban = true;
							switch (request.requestTypeId) {
								case 1:
									asistencia1 = "Vacaciones"
									break;
								case 2:
									asistencia1 = "Incapacidad"
									break;
								case 3:
									asistencia1 = "Falta"
									break;
								default:
									break;
							}
						}
					}
				}
				let eventoHoraEntrada =  await models.Event.findOne({ where: { 
																					employeeId: employeesF.id,
																					DateEvent: {[Op.between]: [dayStart,dayEnd]},
																					eventActionTypeId:1
																				  },
																		  order:[['id', 'ASC']]
																		});
				let eventoHoraInicioDescanso =  await models.Event.findOne({ where: { 
																					employeeId: employeesF.id,
																					DateEvent: {[Op.between]: [dayStart,dayEnd]},
																					eventActionTypeId:2
																				  },
																		  order:[['id', 'ASC']]
																		});
	            let eventoHoraFinDescanso =  await models.Event.findOne({ where: { 
																					employeeId: employeesF.id,
																					DateEvent: {[Op.between]: [dayStart,dayEnd]},
																					eventActionTypeId:3
																				  },
																		  order:[['id', 'ASC']]
																		});
				let eventoHoraSalida =  await models.Event.findOne({ where: { 
																					employeeId: employeesF.id,
																					DateEvent: {[Op.between]: [dayStart,dayEnd]},
																					eventActionTypeId:4
																				  },
																		  order:[['id', 'ASC']]
																		});
				let eventoInicioHoraExtra =  await models.Event.findOne({ where: { 
																					employeeId: employeesF.id,
																					DateEvent: {[Op.between]: [dayStart,dayEnd]},
																					eventActionTypeId:5
																				  },
																		  order:[['id', 'ASC']]
																		});
				let eventoFinHoraExtra =  await models.Event.findOne({ where: { 
																					employeeId: employeesF.id,
																					DateEvent: {[Op.between]: [dayStart,dayEnd]},
																					eventActionTypeId:6
																				  },
																		  order:[['id', 'ASC']]
																		});
				let horaEntrada1;
				let horaInicioDescanso1;
				let horaFinDescanso1;
				let horaSalida1;
				let inicioHoraExtra1;
				let finHoraExtra1;
				let horasExtra1;
				if(eventoHoraEntrada === null){
					horaEntrada1 = "No hay registro"
				}else{ 
					horaEntrada1 = moment(eventoHoraEntrada.DateEvent).format('HH:mm:ss');
				}
				if(eventoHoraInicioDescanso === null){
					horaInicioDescanso1 = "No hay registro";
				}else{
					horaInicioDescanso1 = moment(eventoHoraInicioDescanso.DateEvent).format('HH:mm:ss');
				}
				if(eventoHoraFinDescanso === null){
					horaFinDescanso1 = "No hay registro";
				}else{
					horaFinDescanso1 = moment(eventoHoraFinDescanso.DateEvent).format('HH:mm:ss');
				}
				if(eventoHoraSalida === null){
					horaSalida1 = "No hay registro";
				}else{
					horaSalida1 = moment(eventoHoraSalida.DateEvent).format('HH:mm:ss');
				}
				if(eventoInicioHoraExtra === null){
					inicioHoraExtra1 = "No hay registro";
				}else{
					inicioHoraExtra1 = moment(eventoInicioHoraExtra.DateEvent).format('HH:mm:ss');
				}
				if(eventoFinHoraExtra === null){
					finHoraExtra1 = "No hay registro";
				}else{
					finHoraExtra1 = moment(eventoFinHoraExtra.DateEvent).format('HH:mm:ss');
				}
				if(!ban){
					if(eventoHoraEntrada != null && eventoHoraInicioDescanso != null && eventoHoraFinDescanso != null && eventoHoraSalida != null){
						if(eventoHoraEntrada.eventTypeId === 3 || eventoHoraInicioDescanso.eventTypeId === 3 || eventoHoraFinDescanso.eventTypeId === 3 || eventoHoraSalida.eventTypeId === 3){
							ban = true;
							asistencia1 = "Acta administrativa"
						}else if(eventoHoraEntrada.eventTypeId === 2 || eventoHoraInicioDescanso.eventTypeId === 2 || eventoHoraFinDescanso.eventTypeId === 2 || eventoHoraSalida.eventTypeId === 2){
							ban = true;
							asistencia1 = "Retardo"
						}else if(eventoHoraEntrada.eventTypeId === 1 || eventoHoraInicioDescanso.eventTypeId === 1 || eventoHoraFinDescanso.eventTypeId === 1 || eventoHoraSalida.eventTypeId === 1){
							ban = true;
							asistencia1 = "OK"
						}
					}
					if(eventoInicioHoraExtra === null && !ban){
						asistencia1 = "No hay registro";
					}
					if(eventoFinHoraExtra === null && !ban){
						asistencia1 = "No hay registro";
					}
					
				}


				let horasExtra = await models.hoursAccepted.findOne({
																		where:{
																				employeeId: employeesF.id,
																				fechaEvento: {[Op.between]: [dayStart,dayEnd]},
																			},
																		order:[['id', 'DESC']]
																	});
				if(horasExtra === null){
					horasExtra1 = "No hay horas extra"
				}else{
					horasExtra1 = horasExtra.horasAceptadas;
				}
																		
				 let userSave = {
					numeroEmpleado: employeesF.numeroEmpleado,
					empleado: user.firstName +" "+ user.lastName,
					lugarTrabajo: employeesF.lugarDeTrabajo,
					horario: schedule.scheduleName,
					dia:day,
					asistencia: asistencia1,
					horaEntrada: horaEntrada1,
					horaInicioDescanso: horaInicioDescanso1,
					horaFinDescanso: horaFinDescanso1,
					horaSalida: horaSalida1,
					horasExtra: horasExtra1,
					inicioHoraExtra: inicioHoraExtra1,
					finHoraExtra: finHoraExtra1
				};
				if(user.isEmployeeActive)
					reportes.push(userSave);
			}
		
		}
	}
	
	console.log(reportes);
	let cont = 4;
	for (const reportesF of reportes) {
		ws.cell(cont,1).string(reportesF.numeroEmpleado).style(style);
		ws.cell(cont,2).string(reportesF.empleado).style(style);
		ws.cell(cont,3).string(reportesF.lugarTrabajo).style(style);
		ws.cell(cont,4).string(reportesF.horario).style(style);
		ws.cell(cont,5).string(reportesF.dia).style(style);
		ws.cell(cont,6).string(reportesF.asistencia).style(style);
		ws.cell(cont,7).string(reportesF.horaEntrada).style(style);
		ws.cell(cont,8).string(reportesF.horaInicioDescanso).style(style);
		ws.cell(cont,9).string(reportesF.horaFinDescanso).style(style);
		ws.cell(cont,10).string(reportesF.horaSalida).style(style);
		ws.cell(cont,11).string(reportesF.horasExtra).style(style);
		ws.cell(cont,12).string(reportesF.inicioHoraExtra).style(style);
		ws.cell(cont,13).string(reportesF.finHoraExtra).style(style);
		cont++;
	}

	const pathExcel = path.join(__dirname,'excel', 'ReporteSemanalGersa.xlsx');

	 wb.write(pathExcel, function(err,stats){
	 	if(err){
	 		console.log(err);
	 	}else{
	 		function downloadFile(){
				
				res.download(pathExcel);	 
	 		}
	 		downloadFile();
	 		return false
	 	}
	 });
}

function getPayRoll(req,res,next) {
    payRollService.getById(req.params.id)
        .then(payroll => res.json({data:payroll ,message:'Succesful'}))
        .catch(next);
}

function updateReport(req, res, next) {
    employeeService.updateReport(req.params.id, req.body)
        .then(contract => res.json({data:contract ,message:'Succesful'}))
        .catch(next);
}

function updateSchemaReport(req, res, next) {
    //console.log(req.user);
    const schema = Joi.object({
        statusId: Joi.number().integer().required()
    });
    validateRequest(req, next, schema);
}

function getReport(req, res, next) {
	employeeService
		.getReport(req, res)
		.then((user) => res.json({ data: user, message: 'Succesful' }))
		.catch(next);
}

function registerReport(req, res, next) {
	employeeService
		.createReport(req.body, req.params.id, next)
		.then((report) => res.json({data:report,  message: 'Registro exitoso' }))
		.catch(next);
}

function registerSchemaReport(req, res, next) {
	const schema = Joi.object({
		descripcionEmpleado: Joi.string().required(),
		employeeId: Joi.number().integer().required(),
		asunto: Joi.string().required(),
		anonimo: Joi.boolean().required(),
		reportType: Joi.string().required(),
	});
	validateRequest(req, next, schema);
}

function getTimeRequestByEmployeeId(req, res, next) {
	employeeService
		.getTimeRequestByEmployeeId(req.params.id, res)
		.then((user) => res.json({ data: user, message: 'Succesful' }))
		.catch(next);
}
function getRequestByEmployeeId(req, res, next) {
	employeeService
		.getRequestByEmployeeId(req.params.id, res)
		.then((user) => res.json({ data: user, message: 'Succesful' }))
		.catch(next);
}
function getRequest(req, res, next) {
	employeeService
		.getRequest(req, res)
		.then((user) => res.json({ data: user, message: 'Succesful' }))
		.catch(next);
}

function getTimeRequest(req, res, next) {
	employeeService
		.getTimeRequest(req, res)
		.then((user) => res.json({ data: user, message: 'Succesful' }))
		.catch(next);
}

function updateTimeRequests(req, res, next) {
    employeeService.updateTimeRequests(req.params.id, req.body)
        .then(contract => res.json({data:contract ,message:'Succesful'}))
        .catch(next);
}

function updateSchemaTimeRequests(req, res, next) {
    const schema = Joi.object({
        statusId: Joi.number().integer().required(),
        descripcionEmpleado: Joi.string()
    });
    validateRequest(req, next, schema);
}

function registerTimeRequest(req, res, next) {
	employeeService
		.createTimeRequest(req.body, req.params.id)
		.then((request) => res.json({ data:request, message: 'Registro exitoso' }))
		.catch(next);
}

function registerSchemaTimeRequest(req, res, next) {
	const schema = Joi.object({
		employeeId: Joi.number().integer().required(),
		fechaAsignacion: Joi.string().required(),
		horaAsignacion: Joi.string().required(),
		LugarApoyo: Joi.string().required(),
		statusId: Joi.number().integer().required(),
		descripcion: Joi.string().required(),
		descripcionEmpleado: Joi.string(),
		employeeIdRequest: Joi.number().integer().required()
	});
	validateRequest(req, next, schema);
}
function registerHoursAccepted(req, res, next) {
	const schema = Joi.object({
		employeeId: Joi.number().integer().required(),
		fechaEvento: Joi.string().required(),
		horasAceptadas: Joi.string().required(),
		employeeIdAutorizo: Joi.number().integer().required()
	});
	validateRequest(req, next, schema);
}

function updateRequests(req, res, next) {
    employeeService.updateRequests(req.params.id, req.body)
        .then(contract => res.json({data:contract ,message:'Succesful'}))
        .catch(next);
}

function updateSchemaRequests(req, res, next) {
    //console.log(req.user);
    const schema = Joi.object({
        statusId: Joi.number().integer().required(),
        descriptionRespuesta: Joi.string()
    });
    validateRequest(req, next, schema);
}

function getByEmployee(req,res,next) {
    contractService.getByEmployee(req.params.id)
        .then(contracts => res.json({data:contracts ,message:'Succesful'}))
        .catch(next);
}

function registerRequest(req, res, next) {
	employeeService
		.createRequest(req.body, req.params.id,next)
		.then((request) => res.json({ data:request, message: 'Registro exitoso' }))
		.catch(next);
}

function getByEmployee(req, res, next) {
	contractService
		.getByEmployee(req.params.id)
		.then((contracts) =>
			res.json({ data: contracts, message: 'Succesful'})
		)
		.catch(next);
}

function deleteByIdContracts(req, res, next) {
	contractService
		.delete(req.params.idContract)
		.then(() =>
			res.json({ message: 'Contrato eliminado exitosamente'})
		)
		.catch(next);
}

function updateSchemaContractsPut(req, res, next) {
	const schema = Joi.object({
		tipoDeContrato: Joi.string(),
		puesto: Joi.string().required(),
		fechaDeInicio: Joi.date().required(),
		fechaDeFinalizacion: Joi.date(),
		horasLaborales: Joi.number().integer().required(),
		unidadLaborales: Joi.string().required(),
		tipoSalario: Joi.string().required(),
		cantidadSalario: Joi.number().integer().required(),
		isContractActivide: Joi.boolean().required(),
	});
	validateRequest(req, next, schema);
}
function registerSchemaRequest(req, res, next) {
	const requestTypeId=req.body.requestTypeId;
	
	///determinara los campos necesarios segun el tipo de solicitud
	const schema=JoiObject(requestTypeId);
	
	validateRequest(req, next, schema);
}

function JoiObject(requestTypeId) {
	try {
		let schema;
		switch (requestTypeId) {
			case 1:
				//vacaciones
				schema = Joi.object({
					fechaInicio: Joi.string().required(),
					fechaFin: Joi.string().required(),
					descripcionEmpleado: Joi.string().allow(""),
					descriptionRespuesta: Joi.string().allow(""),
					requestTypeId: Joi.number().integer().required(),
					statusId: Joi.number().integer().required(),
					adjunto: Joi.string().allow(""),
				});
				return schema;
				break;
			case 2:
				//incapacidad
				schema = Joi.object({
					fechaInicio: Joi.string().required(),
					fechaFin: Joi.string().required(),
					descripcionEmpleado: Joi.string().required(),
					descriptionRespuesta: Joi.string(),
					requestTypeId: Joi.number().integer().required(),
					statusId: Joi.number().integer().required(),
					adjunto: Joi.string().required(),
				});
				return schema;
				break;
			case 3:
				console.log("caso 3");
				//dia de falta
				schema = Joi.object({
					fechaInicio: Joi.string().required(),
					fechaFin: Joi.string().required(),
					descripcionEmpleado: Joi.string().required(),
					descriptionRespuesta: Joi.string().allow(""),
					requestTypeId: Joi.number().integer().required(),
					statusId: Joi.number().integer().required(),
					adjunto: Joi.string().allow(""),
				});
				return schema;
				break;
			default:
				break;
		}
	} catch (error) {
		
	}
}

function updateContracts(req, res, next) {
	contractService
		.update(req.params.id, req.params.idContract, req.body)
		.then((contract) =>
			res.json({ data: contract, message: 'Succesful' })
		)
		.catch(next);
}

function updateSchemaContracts(req, res, next) {
	const schema = Joi.object({
		tipoDeContrato: Joi.string(),
		puesto: Joi.string(),
		fechaDeInicio: Joi.date(),
		fechaDeFinalizacion: Joi.date(),
		horasLaborales: Joi.number().integer(),
		unidadLaborales: Joi.string(),
		tipoSalario: Joi.string(),
		cantidadSalario: Joi.number().integer(),
		isContractActivide: Joi.boolean(),
	});
	validateRequest(req, next, schema);
}

function registerSchemaContracts(req, res, next) {
	//console.log(req.user);
	const schema = Joi.object({
		userId: Joi.number().integer().required(),
		tipoDeContrato: Joi.string().required(),
		puesto: Joi.string().required(),
		fechaDeInicio: Joi.date().required(),
		fechaDeFinalizacion: Joi.date(),
		horasLaborales: Joi.number().integer().required(),
		unidadLaborales: Joi.string().required(),
		tipoSalario: Joi.string().required(),
		cantidadSalario: Joi.number().integer().required(),
	});
	validateRequest(req, next, schema);
}
function deleteEmployeeSchedule(req, res, next) {
	console.log(req.params.id);
	const schema = Joi.object({
		id: Joi.number().integer().required(),
	});
	validateRequestParams(req, next, schema);
}
function registerContracts(req, res, next) {
	contractService
		.create(req.body, req.params.id)
		.then(() => res.json({ message: 'Registro exitoso'}))
		.catch(next);
}

function registerEvents(req, res, next) {
	employeeService
		.registerEvents(req.body, req.params.id)
		.then(res.json({ message: 'Succesful'}))
		.catch(next);
}

function registerEventSchema(req, res, next) {
	const schema = Joi.object({
		latitudeEvent: Joi.string().required(),
		longitudeEvent: Joi.string().required(),
		EventTypeId: Joi.string().required(),
		eventActionTypeId:Joi.number().required()
	});
	validateRequest(req, next, schema);
}

function sendInformationByAccessCode(req, res, next) {
	employeeService
		.sendInformationByAccessCode(req)
		.then((user) =>
			res.json({ data: user, message: 'Completado con exito'})
		)
		.catch(next);
}

function getEvents(req, res, next) {
	employeeService
		.getEvents(
					req.params.id, 
					req.query.startDate, 
					req.query.endDate, 
					req.query.eventActionTypeId,
					res
		).then(
			(registros) =>{
						res.json({ 
									registros: registros, 
									eventActionTypeId:registros.eventActionTypeId,
									eventTypeId:registros.eventTypeId,
									employeeId:registros.employeeId,
									message: 'Succesful'
								})}
		)
		.catch(next);
}

function sendAccessCodeById(req, res, next) {
	employeeService
		.sendAccessCode(req.params.id)
		.then(() => res.json({ message: 'Succesful'}))
		.catch(next);
}

function registerAccessCodeSchema(req, res, next) {
	console.log('paso');
	const schema = Joi.object({
		accesscode: Joi.number().integer().min(1000).max(9999).required(),
	});
	validateRequestHeader(req, next, schema);
}

function registerCheck(req, res, next) {
	employeeService
		.registerCheck(req.body)
		.then(res.json({ message: 'Succesful' }))
		.catch(next);
}

function Check(req, res, next) {
	employeeService
		.reviewUser(req)
		.then((user) =>
			res.json({ data: user, message: 'Completado con exito' })
		)
		.catch(next);
}

function update(req, res, next) {
	employeeService
		.update(req.params.id, req.body)
		.then((user) => res.json({ data: user, message: 'Succesful' }))
		.catch(next);
}

function registerCheckSchema(req, res, next) {
	const schema = Joi.object({
		latitudeCheck: Joi.string().required(),
		longitudeCheck: Joi.string().required(),
		userId: Joi.number().integer().required(),
		username: Joi.string().required(),
		tipoCheck: Joi.string().required(),
	});
	validateRequest(req, next, schema);
}
function addScheduleSchema(req, res, next) {
	const schema = Joi.object({
		employeeId: Joi.number().integer().required(),
		scheduleId: Joi.number().integer().required(),
	});
	validateRequest(req, next, schema);
}
function updateSchema(req, res, next) {
	const schema = Joi.object({
		tipoIdentificacion: Joi.string().empty(''),
		documentoIdentidad: Joi.string().empty(''),
		fechaNacimiento: Joi.date(),
		genero: Joi.string().empty(''),
		nacionalidad: Joi.string().empty(''),
		lugarDeTrabajo: Joi.string().empty(''),
		supervisor: Joi.string().empty(''),
		numeroCuentaBancaria: Joi.string().empty(''),
		swiftBic: Joi.string().empty(''),
		frecuenciaPago: Joi.string().empty(''),
		direccion1: Joi.string().empty(''),
		direccion2: Joi.string().empty(''),
		ciudad: Joi.string().empty(''),
		codigoPostal: Joi.string().empty(''),
		estadoProvincia: Joi.string().empty(''),
		pais: Joi.string().empty(''),
		emergenciaNombre: Joi.string().empty(''),
		empergenciaTelefono: Joi.string().empty(''),
		rfc: Joi.string().empty(''),
		numeroImms: Joi.string().empty(''),
		curp: Joi.string().empty(''),
		fechaAltaImss: Joi.date(),
		numeroEmpleado: Joi.string().empty(''),
		diasDisponiblesFaltas: Joi.number().integer(),
		fechaIngreso: Joi.date(),
	});
	validateRequest(req, next, schema);
}

function getById(req, res, next) {
	employeeService
		.getEmployeeById(req.params.id)
		.then((user) => res.json({ data: user, message: 'Succesful' }))
		.catch(next);
}
async function getEmployeesJC(req, res, next) {
	console.log(req.user.id);
	employeeService
		// .getEmployeesOfJc(employee.id, res,req.query.name,req.user.rollTypeId)
		.getEmployeesOfJc(req.user.id, res,req)
		.then((employee) => res.json({ employee, message: 'Succesful' }))
		.catch(next);
}

function getSchedule(req, res, next) {
	employeeService
		.getEmployeeScheduleById(req.params.id, res)
		.then((user) => res.json({ data: user, message: 'Succesful' }))
		.catch(next);
}
function getHourAcepted(req, res, next) {
	employeeService
		.getHourAceptedBy(req.params.id,req.query.startDate, req.query.endDate, res)
		.then((user) => res.json({ data: user, message: 'Succesful' }))
		.catch(next);
}
function deleteSchedule(req, res, next) {
	console.log(req.params.id);
	employeeService
		.deleteEmployeeScheduleById(req.params.id, res)
		.then((user) => res.json({ message: 'Horario eliminado correctamente' }))
		.catch(next);
}

function registerSchema(req, res, next) {
	const schema = Joi.object({
		userId: Joi.number().integer().required(),
		fechaNacimiento: Joi.date().required(),
		frecuenciaPago: Joi.string().required(),
	});
	validateRequest(req, next, schema);
}

function register(req, res, next) {
	employeeService
		.create(req.body)
		.then(() => res.json({ message: 'Registro exitoso'}))
		.catch(next);
}

function registerSchedule(req, res, next) {
	employeeService
		.createSchedule(req.body)
		.then(() => res.json({ message: 'Registro exitoso' }))
		.catch(next);
}
function registerPostHourAcecepted(req, res, next) {
	employeeService
		.createHourAcecepted(req.body, req.params.id, next,res)
		.then((report) => {if (report) {
			res.status(201).json({data:report, message: 'Registro exitoso' })
		} else {res.status(422).json({message: 'Registro duplicado' })}})
		.catch(next);
}
