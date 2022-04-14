import {
	iAdministrador,
	iEmpleado,
	iEmployeeData,
	iSupervisor,
} from '../actions/usersActions/usersActionTypes';

//Auth Interfaces
export interface iAuthState {
	id: string;
	firstName: string;
	lastName: string;
	rollTypeId: number | null;
	authState: {
		loading: boolean;
		isAutenticated: boolean;
	};
	empleadoData: iEmployeeData;
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
	perfilUsuario: iEmpleado;
	perfilEmpleado: iEmployeeData;
	tablePath: string;
	supervisores: iSupervisor[];
	administradores: iAdministrador[];
}
//Interface de confirmacion contraseña
export interface iConfirmarContraseña {
	contraseña1: string;
	contraseña2: string;
}
