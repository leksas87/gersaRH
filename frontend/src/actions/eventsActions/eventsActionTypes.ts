export const SEND_ACCESS_CODE = 'send_access_code';
export const RESEND_ACCESS_CODE = 'resend_access_code';
export const EVENTS_START_LOADING = 'events_start_loading';
export const EVENTS_LOADING_END = 'events_loading_end';
export const EVENTS_IS_USER_ACTIVE = 'events_Is_User_Active';
export const EVENTS_IS_USER_ACTIVE_FALSE = 'events_Is_User_Active_False';
export const EVENTS_OPTION = 'events_Option';

//Interfaz para confirmacion de usuario.
export interface iEventsReducerState {
	userConfirmation: iUserConfirmation;
	eventsState: {
		loading: boolean;
		eventIsUserConfirm: boolean;
		eventOption: string;
	};
}
//Interfaz para confirmacion de usuario.
export interface iUserConfirmation {
	accessCode: number;
	firstName: string;
	id: number | null;
	lastName: string;
	username: string;
}

//Obtener contrato para mostrar
export interface Event_Option {
	type: typeof EVENTS_OPTION;
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
export interface Events_Is_User_Active {
	type: typeof EVENTS_IS_USER_ACTIVE;
}
//Cambia el estado del checkisUserConfirm a false
export interface Events_Is_User_Active_False {
	type: typeof EVENTS_IS_USER_ACTIVE_FALSE;
}
//Cambia el estado del checkLoading a true
export interface Events_start_loading {
	type: typeof EVENTS_START_LOADING;
}
//Cambia el estado del checkLoading a false
export interface Events_loading_end {
	type: typeof EVENTS_LOADING_END;
}
//Reenviar el codigo de acceso al empleado
export interface Resend_access_code {
	type: typeof RESEND_ACCESS_CODE;
}

//Types para el dispatch
export type EventsDispatchTypes =
	| Send_access_code
	| Event_Option
	| Events_Is_User_Active
	| Events_Is_User_Active_False
	| Events_start_loading
	| Resend_access_code
	| Events_loading_end;
