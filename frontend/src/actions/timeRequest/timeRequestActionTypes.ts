export const GET_EMPLOYEES_BY_PARAMS = 'getEmployeesByParams';
export const CLEAN_EMPLOYEES_BY_PARAMS = 'cleanEmployeesByParams';
export const GET_EMPLOYEES_BY_PARAMS_START_LOADING =
	'getEmployeesByParamsStartLoading';
export const GET_EMPLOYEES_BY_PARAMS_LOADING_END =
	'getEmployeesByParamsLoadingEnd';
export const REGISTER_TIME_REQUEST_START_LOADING =
	'registerTimeRequestStartLoading';
export const REGISTER_TIME_REQUEST_LOADING_END =
	'registerTimeRequestLoadingEnd';
export const GET_EMPLOYEE_LISTINVITATION = 'getEmployeeListInvitation';
export const CLEAN_EMPLOYEE_LISTINVITATION = 'cleanEmployeeListInvitation';
export const GET_TIME_REQUEST = 'getTimeRequest';
export const CLEAN_TIME_REQUEST = 'cleanTimeRequest';

//Interfaz para EmployeesParams reducer.
export interface iTimeRequestReducer {
	registerState: {
		loading: boolean;
	};
	getEmployeesState: {
		loading: boolean;
	};
	timeRequestList: iTimeRequest[];
	employeesParams: iEmployeeParams[];
	employeesListInvitation: iEmployeeListInvitation[];
}

//Interfaz para nuevo employeeParams.
export interface iEmployeeParams {
	id: number;
	User: {
		firstName: string;
		lastName: string;
	};
}
//Interfaz para nuevo employeeParams.
export interface iEmployeeListInvitation {
	firstName: string;
	lastName: string;
	username: string;
}
//Interfaz para timeRequest
export interface iTimeRequest {
	id: number;
	employeeId: number;
	fechaAsignacion: string;
	horaAsignacion: string;
	LugarApoyo: string;
	statusId: number;
	descripcion: string;
	employeeIdRequest: number;
	descripcionEmpleado: string;
	fechaCreacion: string;
	employee: {
		supervisor: string;
		lugarDeTrabajo: string;
		User: {
			firstName: string;
			lastName: string;
		};
	};
}

//GET employeeByParams Start Loading
export interface GetEmployeesByParamsStartLoading {
	type: typeof GET_EMPLOYEES_BY_PARAMS_START_LOADING;
}
//GET employeeByParams Loading End
export interface GetEmployeesByParamsLoadingEnd {
	type: typeof GET_EMPLOYEES_BY_PARAMS_LOADING_END;
}
//POST register timeRequest Start Loading
export interface RegisterTimeRequestStartLoading {
	type: typeof REGISTER_TIME_REQUEST_START_LOADING;
}
//POST register timeRequest Loading End
export interface RegisterTimeRequestLoadingEnd {
	type: typeof REGISTER_TIME_REQUEST_LOADING_END;
}
//Get employeesParams
export interface GetEmployeesByParams {
	type: typeof GET_EMPLOYEES_BY_PARAMS;
	payload: {
		employeesParams: iEmployeeParams[];
	};
}
//Clean employeesParams
export interface CleanEmployeesByParams {
	type: typeof CLEAN_EMPLOYEES_BY_PARAMS;
}
//Get employeesListInvitation
export interface GetEmployeeListInvitation {
	type: typeof GET_EMPLOYEE_LISTINVITATION;
	payload: {
		employeeListInvitation: iEmployeeListInvitation;
	};
}
//Clean employeesParams
export interface CleanEmployeeListInvitation {
	type: typeof CLEAN_EMPLOYEE_LISTINVITATION;
}
//Get timeRequestList
export interface GetTimeRequest {
	type: typeof GET_TIME_REQUEST;
	payload: {
		timeRequestList: iTimeRequest[];
	};
}
//Clean timeRequestList
export interface CleanTimeRequest {
	type: typeof CLEAN_TIME_REQUEST;
}

//Types para el dispatch
export type TimeRequestDispatchTypes =
	| GetEmployeesByParamsStartLoading
	| GetEmployeesByParamsLoadingEnd
	| RegisterTimeRequestStartLoading
	| RegisterTimeRequestLoadingEnd
	| GetEmployeesByParams
	| CleanEmployeesByParams
	| GetEmployeeListInvitation
	| CleanEmployeeListInvitation
	| GetTimeRequest
	| CleanTimeRequest;
