export const SEND_ACCESS_CODE = 'send_access_code';

//Interfaz para confirmacion de usuario.
export interface iUserConfirmation {
	userId: number;
	username: string;
	accessCode: number;
}

//Obtener contrato para mostrar
export interface Send_access_code {
	type: typeof SEND_ACCESS_CODE;
	payload: {
		userConfirmation: iUserConfirmation;
	};
}

//Types para el dispatch
export type CheckDispatchTypes = Send_access_code;
