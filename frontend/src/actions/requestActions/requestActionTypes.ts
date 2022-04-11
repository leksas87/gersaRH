export const REGISTER_NEW_REQUEST_START_LOADING =
	'registerNewRequestStartLoading';
export const REGISTER_NEW_REQUEST_LOADING_END = 'registerNewRequestLoadingEnd';
export const GET_REQUEST_START_LOADING = 'getRequestStartLoading';
export const GET_REQUEST_LOADING_END = 'getRequestLoadingEnd';
export const REGISTER_NEW_REQUEST = 'registerNewRequest';

//Interfaz para request reducer.
export interface iRequestReducer {
	registerState: {
		loading: boolean;
	};
	getRequestState: {
		loading: boolean;
	};
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

//Types para el dispatch
export type RequestDispatchTypes =
	| GetRequestStartLoading
	| GetRequestLoadingEnd
	| RegisterNewRequestStartLoading
	| RegisterNewRequestLoadingEnd
	| registerNewRequest;
