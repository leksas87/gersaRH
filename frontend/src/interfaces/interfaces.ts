//Auth Interfaces
export interface iAuthState {
	uid: string;
	name: string | null;
	authState: {
		loading: boolean;
		msgError: string | null;
	};
}
export interface iUsuario {
	uid: string;
	name: string | null;
}
//Interface de Usuario
export interface iUser {
	usuario: string;
	contraseña: string;
}
