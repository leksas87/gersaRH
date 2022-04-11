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

//Interfaz para EmployeesParams reducer.
export interface iTimeRequestReducer {
	registerState: {
		loading: boolean;
	};
	getEmployeesState: {
		loading: boolean;
	};
	employeesParams: iEmployeeParams[];
}

//Interfaz para nuevo employeeParams.
export interface iEmployeeParams {
	id: number;
	User: {
		firstName: string;
		lastName: string;
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

//Types para el dispatch
export type TimeRequestDispatchTypes =
	| GetEmployeesByParamsStartLoading
	| GetEmployeesByParamsLoadingEnd
	| RegisterTimeRequestStartLoading
	| RegisterTimeRequestLoadingEnd
	| GetEmployeesByParams
	| CleanEmployeesByParams;
