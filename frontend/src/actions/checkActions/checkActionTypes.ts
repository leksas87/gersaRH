export const SEND_ACCESS_CODE = 'send_access_code';
export const RESEND_ACCESS_CODE = 'resend_access_code';
export const CHECK_START_LOADING = 'check_start_loading';
export const CHECK_LOADING_END = 'check_loading_end';
export const CHECK_IS_USER_ACTIVE = 'check_Is_User_Active';
export const CHECK_IS_USER_ACTIVE_FALSE = 'check_Is_User_Active_False';
export const CHECK_OPTION = 'check_Option';

//Interfaz para confirmacion de usuario.
export interface iCheckReducerState {
	userConfirmation: iUserConfirmation;
	checkState: {
		loading: boolean;
		checkIsUserConfirm: boolean;
		checkOption: string;
	};
}
//Interfaz para confirmacion de usuario.
export interface iUserConfirmation {
	userId: number | null;
	username: string;
	accessCode: number;
}

//Obtener contrato para mostrar
export interface Check_Option {
	type: typeof CHECK_OPTION;
	payload: {
		checkOption: string;
	};
}
//Obtener contrato para mostrar
export interface Send_access_code {
	type: typeof SEND_ACCESS_CODE;
	payload: {
		userConfirmation: iUserConfirmation;
	};
}
//Cambia el estado del checkisUserConfirm a true
export interface Check_Is_User_Active {
	type: typeof CHECK_IS_USER_ACTIVE;
}
//Cambia el estado del checkisUserConfirm a false
export interface Check_Is_User_Active_False {
	type: typeof CHECK_IS_USER_ACTIVE_FALSE;
}
//Cambia el estado del checkLoading a true
export interface Check_start_loading {
	type: typeof CHECK_START_LOADING;
}
//Cambia el estado del checkLoading a false
export interface Check_loading_end {
	type: typeof CHECK_LOADING_END;
}
//Reenviar el codigo de acceso al empleado
export interface Resend_access_code {
	type: typeof RESEND_ACCESS_CODE;
}

//Types para el dispatch
export type CheckDispatchTypes =
	| Send_access_code
	| Check_Option
	| Check_Is_User_Active
	| Check_Is_User_Active_False
	| Check_start_loading
	| Resend_access_code
	| Check_loading_end;
