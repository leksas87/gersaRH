//Types
export const REGISTER_USER_START_LOADING = 'regiserUserStartLoading';
export const REGISTER_USER_LOADING_END = 'registerUserLoadingEnd';
export const GET_USERS_SUCCESSFUL = 'getUsersSuccesful';
export const GET_USER_BY_ID = 'getUsersByID';

//Usuario que se recibe del fetch al ahcer logIn
export interface iEmpleado {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	phone: string;
	active: boolean;
	roll: number;
	isEmployeeActive: boolean;
}
//Inicia registro
export interface RegiserUserStartLoading {
	type: typeof REGISTER_USER_START_LOADING;
}
//Termino registro
export interface RegisterUserLoadingEnd {
	type: typeof REGISTER_USER_LOADING_END;
}
//Obtener Usuarios
export interface GetUsersSuccesful {
	type: typeof GET_USERS_SUCCESSFUL;
	payload: {
		empleados: iEmpleado[];
	};
}
//Obtener Usuario por ID
export interface GetUsersByID {
	type: typeof GET_USER_BY_ID;
	payload: {
		empleado: iEmpleado;
	};
}

//Types para el dispatch
export type UsersDispatchTypes =
	| RegiserUserStartLoading
	| RegisterUserLoadingEnd
	| GetUsersSuccesful
	| GetUsersByID;
