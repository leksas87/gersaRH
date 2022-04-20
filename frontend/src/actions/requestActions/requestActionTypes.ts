export const REGISTER_NEW_REQUEST_START_LOADING =
	'registerNewRequestStartLoading';
export const REGISTER_NEW_REQUEST_LOADING_END = 'registerNewRequestLoadingEnd';
export const GET_REQUEST_START_LOADING = 'getRequestStartLoading';
export const GET_REQUEST_LOADING_END = 'getRequestLoadingEnd';
export const REGISTER_NEW_REQUEST = 'registerNewRequest';
export const GET_REQUEST_LIST = 'getRequestList';
export const CLEAN_REQUEST_LIST = 'cleanRequestList';

//Interfaz para request reducer.
export interface iRequestReducer {
	registerState: {
		loading: boolean;
	};
	getRequestState: {
		loading: boolean;
	};
	requestList: iRequestList[];
}
//Interfaz para requestList.
export interface iRequestList {
	adjunto: string;
	descripcionEmpleado: string;
	descriptionRespuesta: string;
	employee: {
		User: { firstName: string; lastName: string };
		id: number | null;
		supervisor: string;
		lugarDeTrabajo: string;
	};
	employeeId: number | null;
	fechaCreacion: string;
	fechaFin: string;
	fechaInicio: string;
	id: number | null;
	requestTypeId: number | null;
	statusId: number | null;
}
//Charging Request Start Loading
export interface GetRequestStartLoading {
	type: typeof GET_REQUEST_START_LOADING;
}
//Charging  Request Loading End
export interface GetRequestLoadingEnd {
	type: typeof GET_REQUEST_LOADING_END;
}
//Charging Request Start Loading
export interface RegisterNewRequestStartLoading {
	type: typeof REGISTER_NEW_REQUEST_START_LOADING;
}
//Charging  Request Loading End
export interface RegisterNewRequestLoadingEnd {
	type: typeof REGISTER_NEW_REQUEST_LOADING_END;
}
//Register new Request
export interface registerNewRequest {
	type: typeof REGISTER_NEW_REQUEST;
}
//Obtener RequestList
export interface GetRequestList {
	type: typeof GET_REQUEST_LIST;
	payload: {
		requestList: iRequestList[];
	};
}
//Limpiar RequestList
export interface CleanRequestList {
	type: typeof CLEAN_REQUEST_LIST;
}

//Types para el dispatch
export type RequestDispatchTypes =
	| GetRequestStartLoading
	| GetRequestLoadingEnd
	| RegisterNewRequestStartLoading
	| RegisterNewRequestLoadingEnd
	| CleanRequestList
	| GetRequestList
	| registerNewRequest;
