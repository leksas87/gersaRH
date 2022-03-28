export const SEND_ACCESS_CODE = 'send_access_code';
export const RESEND_ACCESS_CODE = 'resend_access_code';
export const EVENTS_START_LOADING = 'events_start_loading';
export const EVENTS_LOADING_END = 'events_loading_end';
export const EVENTS_IS_USER_ACTIVE = 'events_Is_User_Active';
export const EVENTS_IS_USER_ACTIVE_FALSE = 'events_Is_User_Active_False';
export const EVENTS_OPTION = 'events_Option';
export const GET_EMPLOYEE_EVENTS = 'get_employee_events';
export const CLEAN_EMPLOYEE_EVENTS = 'clean_employee_events';
export const GET_SERVER_TIME = 'get_server_time';
export const CLEAN_SERVER_TIME = 'clean_server_time';
export const GET_SERVER_DAY = 'get_server_day';
export const CLEAN_SERVER_DAY = 'clean_server_day';

//Interfaz para confirmacion de usuario.
export interface iEventsReducerState {
	userConfirmation: iUserConfirmation;
	eventsState: {
		loading: boolean;
		eventIsUserConfirm: boolean;
	};
	eventServerTime: string;
	eventServerDay: string;
	employeeEvents: iEmployeeEvent[];
}
//Interfaz para eventos del empleado.
export interface iEmployeeEvent {
	id: number | null;
	employeeId: number | null;
	eventType: string;
	dateEvent: string;
	longitudeEvent: string;
	latitudeEvent: string;
}
//Interfaz para confirmacion de usuario.
export interface iUserConfirmation {
	employeeId: number | null;
	firstName: string;
	lastName: string;
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
//Obtener los eventos del empleado
export interface Get_employee_events {
	type: typeof GET_EMPLOYEE_EVENTS;
	payload: {
		employeeEvents: iEmployeeEvent[];
	};
}
//Limpiar eventos del empleado
export interface Clean_employee_events {
	type: typeof CLEAN_EMPLOYEE_EVENTS;
}
//Obtener el timpo del servidor
export interface Get_server_time {
	type: typeof GET_SERVER_TIME;
	payload: {
		serverTime: string;
	};
}
//Limpiar el timpo del servidor
export interface Clean_server_time {
	type: typeof CLEAN_SERVER_TIME;
}
//Obtener el timpo del servidor
export interface Get_server_day {
	type: typeof GET_SERVER_DAY;
	payload: {
		serverDay: string;
	};
}
//Limpiar el timpo del servidor
export interface Clean_server_day {
	type: typeof CLEAN_SERVER_DAY;
}

//Types para el dispatch
export type EventsDispatchTypes =
	| Send_access_code
	| Event_Option
	| Events_Is_User_Active
	| Events_Is_User_Active_False
	| Events_start_loading
	| Resend_access_code
	| Events_loading_end
	| Get_employee_events
	| Clean_employee_events
	| Get_server_time
	| Clean_server_time
	| Get_server_day
	| Clean_server_day;
