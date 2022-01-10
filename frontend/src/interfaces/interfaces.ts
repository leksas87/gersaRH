//Auth Interfaces
export interface iAuthState {
	uid: string;
	nombre: string | null;
	apellido: string | null;
	roll: string;
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
