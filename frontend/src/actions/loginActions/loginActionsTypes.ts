import { iEmployeeData } from '../usersActions/usersActionTypes';

//Types
export const AUTH_START_LOADING = 'authStartLoading';
export const AUTH_LOADING_FINISH = 'authLoadingFinish';
export const AUTH_LOGOUT = 'authLogOut';
export const AUTH_SUCCESS = 'authSuccess';
export const GET_EMPLEADO_DATA = 'getEmpleadoData';

//Usuario que se recibe del fetch al ahcer logIn
export type Usuario = {
	id: string;
	firstName: string;
	lastName: string;
	rollTypeId: number;
	token: string;
};
//Cargando
export interface AuthStartLoading {
	type: typeof AUTH_START_LOADING;
}
//CargandoFinalizado
export interface AuthLoadingFinish {
	type: typeof AUTH_LOADING_FINISH;
}
//LogOut
export interface AuthLogOut {
	type: typeof AUTH_LOGOUT;
}

//Login
export interface AuthSuccess {
	type: typeof AUTH_SUCCESS;
	payload: {
		usuario: Usuario;
	};
}
//get empleadoData
export interface GetEmpleadoData {
	type: typeof GET_EMPLEADO_DATA;
	payload: {
		empleadoData: iEmployeeData;
	};
}

//Types para el dispatch
export type AuthDispatchTypes =
	| AuthSuccess
	| AuthStartLoading
	| AuthLoadingFinish
	| GetEmpleadoData
	| AuthLogOut;
