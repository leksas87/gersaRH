const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const validateTimeRequest = require('middleware/validate-timeRequest');
const validateRequestHeader = require('middleware/validate-request-header');
const validateRequestParams = require('middleware/validate-request-params');
const authorize = require('middleware/authorize');
const forbidden = require('middleware/forbidden');
const forbiddenJefeCuadrilla = require('middleware/forbiddenJC');
const forbiddenGet = require('middleware/forbiddenGet');
const forbiddenGetUnique=require('middleware/forbiddenGetUnique');
const employeeService = require('../services/employee.service');
const contractService = require('../services/contract.service');
//const { forbidden } = require('joi');

// routes
router.get('/auth', registerAccessCodeSchema, sendInformationByAccessCode);
router.post(
	'/check',
	registerAccessCodeSchema,
	registerCheckSchema,
	registerCheck
);
router.get('/check', registerAccessCodeSchema, Check);
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
	forbiddenGet(),
	updateSchemaTimeRequests,
	updateTimeRequests
);
router.get('/:id/timeRequest',authorize(),forbiddenGet(), getTimeRequestByEmployeeId);


router.get('/:id/contracts', authorize(), forbiddenGet(), getByEmployee);
router.patch(
	'/requests/:id',
	authorize(), 
	forbiddenGet(), 
	updateSchemaRequests, 
	updateRequests
);

router.post(
	'/:id/request',
	authorize(),
	forbiddenGetUnique(),
	registerSchemaRequest,
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




module.exports = router;

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
		.then(() => res.json({  message: 'Registro exitoso' }))
		.catch(next);
}

function registerSchemaReport(req, res, next) {
	const schema = Joi.object({
		descripcionEmpleado: Joi.string().required(),
		employeeId: Joi.number().integer().required(),
		asunto: Joi.string().required(),
		anonimo: Joi.boolean().required(),
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
	console.log('funcion get request');
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
		EventType: Joi.string().required(),
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
		.getEvents(req.params.id, req.query.startDate, req.query.endDate)
		.then((registros) =>
			res.json({ registros: registros, message: 'Succesful'})
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
	const employee = await employeeService.getEmployeeById(req.user.id, res)
	console.log(employee.id);
	employeeService
		// .getEmployeesOfJc(employee.id, res,req.query.name,req.user.rollTypeId)
		.getEmployeesOfJc(employee.id, res,req)
		.then((employee) => res.json({ employee, message: 'Succesful' }))
		.catch(next);
}

function getSchedule(req, res, next) {
	employeeService
		.getEmployeeScheduleById(req.params.id, res)
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
