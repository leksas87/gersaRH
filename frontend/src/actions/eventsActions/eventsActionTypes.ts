export const SEND_ACCESS_CODE = 'send_access_code';
export const RESEND_ACCESS_CODE = 'resend_access_code';
export const EVENTS_START_LOADING = 'events_start_loading';
export const EVENTS_LOADING_END = 'events_loading_end';
export const EVENTS_IS_USER_ACTIVE = 'events_Is_User_Active';
export const EVENTS_IS_USER_ACTIVE_FALSE = 'events_Is_User_Active_False';
export const EVENTS_OPTION = 'events_Option';
export const GET_EMPLOYEE_EVENTS = 'get_employee_events';
export const CLEAN_EMPLOYEE_EVENTS = 'clean_employee_events';
export const GET_EMPLOYEE_HOURS_ACCEPTED = 'get_employee_hours_accepted';
export const CLEAN_EMPLOYEE_HOURS_ACCEPTED = 'clean_employee_hours_accepted';
export const GET_SERVER_TIME = 'get_server_time';
export const CLEAN_SERVER_TIME = 'clean_server_time';
export const GET_SERVER_DAY = 'get_server_day';
export const CLEAN_SERVER_DAY = 'clean_server_day';
export const GET_EVENT_VALIDATION = 'get_event_validation';
export const CLEAN_EVENT_VALIDATION = 'clean_event_validation';
export const GET_EMPLOYEE_PHOTOUUID = 'get_employee_photouuid';
export const CLEAN_EMPLOYEE_PHOTOUUID = 'clean_employee_photouuid';

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
	eventValidation: iEventValidation;
	employeeHoursAccepted: iEmployeeHoursAccepted[];
	employeePhotoUuid: string;
}
//Interfaz para eventos del empleado.
export interface iEmployeeEvent {
	id: number | null;
	employeeId: number | null;
	eventTypeId: string;
	DateEvent: string;
	longitudeEvent: string;
	latitudeEvent: string;
	eventActionTypeId: string | number;
	url:string;
}
export interface iEmployeeHoursAccepted {
	id: number | null;
	fechaCreacion: string;
	employeeid: number | null;
	fechaEvento: string;
	horasAceptadas: string;
	employeeIdAutorizo: number | null;
}
//Interfaz para confirmacion de usuario.
export interface iEventValidation {
	eventActionTypeId: number | null;
	eventTypeId: number | null;
	employeeId: number | null;
	message: string;
	employeeWorksToday: boolean;
}
//Interfaz para confirmacion de usuario.
export interface iUserConfirmation {
	employeeId: number | null;
	firstName: string;
	lastName: string;
	token: string;
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
//Obtener las horas aceptadas del empleado
export interface Get_employee_hours_accepted {
	type: typeof GET_EMPLOYEE_HOURS_ACCEPTED;
	payload: {
		employeeHoursAccepted: iEmployeeHoursAccepted[];
	};
}
//Limpiar las horas aceptadas del empleado
export interface Clean_employee_hours_accepted {
	type: typeof CLEAN_EMPLOYEE_HOURS_ACCEPTED;
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
//Obtener el timpo del servidor
export interface Get_event_validation {
	type: typeof GET_EVENT_VALIDATION;
	payload: {
		eventValidation: iEventValidation;
	};
}
//Limpiar el timpo del servidor
export interface Clean_event_validation {
	type: typeof CLEAN_EVENT_VALIDATION;
}
//Obtener el uuid del la foto de AWS
export interface Get_employee_photouuid {
	type: typeof GET_EMPLOYEE_PHOTOUUID;
	payload: {
		employeePhotoUuid: string;
	};
}
//Limpiar el timpo del servidor
export interface Clean_employee_photouuid {
	type: typeof CLEAN_EMPLOYEE_PHOTOUUID;
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
	| Clean_server_day
	| Get_event_validation
	| Clean_event_validation
	| Get_employee_hours_accepted
	| Clean_employee_hours_accepted
	| Get_employee_photouuid
	| Clean_employee_photouuid;
