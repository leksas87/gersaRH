import { iEmpleado } from '../actions/usersActions/usersActionTypes';

//Auth Interfaces
export interface iAuthState {
	id: string;
	firstName: string;
	lastName: string;
	roll: number | null;
	authState: {
		loading: boolean;
		isAutenticated: boolean;
	};
}
export interface iUsuario {
	uid: string;
	name: string | null;
	roll: string;
}
//Interface de Usuario para login
export interface iUser {
	usuario: string;
	contraseña: string;
}
//Interface de registro empleado
export interface iNuevoEmpleado {
	name: string;
	apellidos: string;
	correo: string;
	phone: string;
}
//Interface de usuarios
export interface iUsuariosReducer {
	registerState: {
		loading: boolean;
	};
	empleados: iEmpleado[];
	perfilEmpleado: iEmpleado;
}
//Interface de confirmacion contraseña
export interface iConfirmarContraseña {
	contraseña1: string;
	contraseña2: string;
}
