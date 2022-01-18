import { iUser } from '../../interfaces/interfaces';

//Types
export const REGISTER_USER_START_LOADING = 'regiserUserStartLoading';
export const REGISTER_USER_LOADING_END = 'registerUserLoadingEnd';
export const GET_USERS_SUCCESSFUL = 'getUsersSuccesful';

//Usuario que se recibe del fetch al ahcer logIn
export type iEmpleado = {
	active: boolean;
	firstName: string;
	id: number;
	lastName: string;
	phone: string;
	roll: number;
	username: string;
};
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

//Types para el dispatch
export type UsersDispatchTypes =
	| RegiserUserStartLoading
	| RegisterUserLoadingEnd
	| GetUsersSuccesful;
