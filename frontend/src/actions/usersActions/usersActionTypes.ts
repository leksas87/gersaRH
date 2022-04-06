//Types
export const REGISTER_USER_START_LOADING = 'regiserUserStartLoading';
export const REGISTER_USER_LOADING_END = 'registerUserLoadingEnd';
export const GET_USERS_SUCCESSFUL = 'getUsersSuccesful';
export const GET_USER_BY_ID = 'getUsersByID';
export const GET_EMPLOYEE_BY_ID = 'getEmployeesByID';
export const DELETE_ACCESS_TO_USER_BY_ID = 'deleteAccesToUsersByID';
export const MAKE_ADMIN_USER_BY_ID = 'makeAdminUsersByID';
export const REMOVE_ADMIN_USER_BY_ID = 'removeAdminUsersByID';
export const CHANGE_ROLL_TO_USER_BY_ID = 'changeRollToUsersByID';
export const TERMINATE_USER_BY_ID = 'terminateUsersByID';
export const CHANGE_TABLE_PATH = 'changeTablePath';

//Usuario que se recibe del fetch al ahcer logIn
//En realidad esta interfaz es usuario
export interface iEmpleado {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	phone: string;
	active: boolean;
	roll: number;
	rollTypeId: number;
	isEmployeeActive: boolean;
}
export interface iEmployeeData {
	ciudad: string;
	codigoPostal: string;
	curp: string;
	direccion1: string;
	direccion2: string | null;
	documentoIdentidad: string;
	emergenciaNombre: string;
	empergenciaTelefono: string;
	estadoProvincia: string;
	fechaAltaImss: string;
	fechaNacimiento: string;
	frecuenciaPago: string;
	genero: string;
	id: number | null;
	lugarDeTrabajo: string;
	nacionalidad: string;
	numeroCuentaBancaria: string;
	numeroImms: string;
	pais: string;
	rfc: string;
	supervisor: string;
	swiftBic: string;
	tipoIdentificacion: string;
	userId: number | null;
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
//Obtener EmpleadoData por ID
export interface GetEmployeesByID {
	type: typeof GET_EMPLOYEE_BY_ID;
	payload: {
		empleadoData: iEmployeeData;
	};
}
//Cambiar Roll a empleado por ID
export interface ChangeRollToUsersByID {
	type: typeof CHANGE_ROLL_TO_USER_BY_ID;
	payload: {
		rollTypeId: number;
	};
}
//Eliminar accesso a Empleado
export interface DeleteAccesToUsersByID {
	type: typeof DELETE_ACCESS_TO_USER_BY_ID;
}
//Hacer Administrador a Empleado
export interface MakeAdminUsersByID {
	type: typeof MAKE_ADMIN_USER_BY_ID;
}
//Remover Admin a Empleado
export interface RemoveAdminUsersByID {
	type: typeof REMOVE_ADMIN_USER_BY_ID;
}
//Finalizar a Empleado
export interface TerminateUsersByID {
	type: typeof TERMINATE_USER_BY_ID;
}
//Cambiar el path de la tabla empleados
export interface ChangeTablePath {
	type: typeof CHANGE_TABLE_PATH;
	payload: string;
}

//Types para el dispatch
export type UsersDispatchTypes =
	| RegiserUserStartLoading
	| RegisterUserLoadingEnd
	| GetUsersSuccesful
	| DeleteAccesToUsersByID
	| MakeAdminUsersByID
	| RemoveAdminUsersByID
	| TerminateUsersByID
	| ChangeRollToUsersByID
	| ChangeTablePath
	| GetEmployeesByID
	| GetUsersByID;
