//Auth Interfaces
export interface iAuthState {
	id: string;
	firstName: string | null;
	lastName: string | null;
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
export interface iEmpleado {
	name: string;
	apellidos: string;
	correo: string;
}
