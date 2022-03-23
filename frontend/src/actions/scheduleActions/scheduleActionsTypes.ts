//Types
export const GET_SHCEDULES = 'getSchedules';
export const REGISTER_NEW_SCHEDULE_START_LOADING =
	'registerNewScheduleStartLoading';
export const REGISTER_NEW_SCHEDULE_LOADING_END =
	'registerNewScheduleLoadingEnd';

//Interfaz para nuevoContrato.
export interface iNewSchedule {
	scheduleName: string;
	horaEntrada: string;
	horaSalida: string;
	tiempoDescanso: string;
	tiempoRetraso: string;
	Lunes: boolean;
	Martes: boolean;
	Miercoles: boolean;
	Jueves: boolean;
	Viernes: boolean;
	Sabado: boolean;
	Domingo: boolean;
}

//Register New Schedule Start Loading
export interface RegisterNewScheduleStartLoading {
	type: typeof REGISTER_NEW_SCHEDULE_START_LOADING;
}
//Register New Schedule Loading End
export interface RegisterNewScheduleLoadingEnd {
	type: typeof REGISTER_NEW_SCHEDULE_LOADING_END;
}
//Get Schedules
export interface GetSchedules {
	type: typeof GET_SHCEDULES;
}

//Types para el dispatch
export type SchedulesDispatchTypes =
	| GetSchedules
	| RegisterNewScheduleStartLoading
	| RegisterNewScheduleLoadingEnd;
