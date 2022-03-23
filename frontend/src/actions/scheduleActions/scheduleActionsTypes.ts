//Types
export const GET_SCHEDULES = 'getSchedules';
export const REGISTER_NEW_SCHEDULE_START_LOADING =
	'registerNewScheduleStartLoading';
export const REGISTER_NEW_SCHEDULE_LOADING_END =
	'registerNewScheduleLoadingEnd';
export const CHARGING_SCHEDULE_START_LOADING = 'chargingScheduleStartLoading';
export const CHARGING_SCHEDULE_LOADING_END = 'chargingScheduleLoadingEnd';

//Interfaz para nuevoSchedule.
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
//Interfaz para arrayDeSchedule.
export interface iSchedules {
	id: number;
	scheduleName: string;
	horaEntrada: string;
	horaSalida: string;
	tiempoDescanso: number;
	tiempoRetraso: number;
	Lunes: boolean;
	Martes: boolean;
	Miercoles: boolean;
	Jueves: boolean;
	Viernes: boolean;
	Sabado: boolean;
	Domingo: boolean;
}
//Interfaz para schedule reducer.
export interface iSchedulesReducer {
	registerState: {
		loading: boolean;
	};
	getSchedulesState: {
		loading: boolean;
	};
	schedulesArray: iSchedules[];
}

//Charging Schedule Start Loading
export interface ChargingScheduleStartLoading {
	type: typeof CHARGING_SCHEDULE_START_LOADING;
}
//Charging  Schedule Loading End
export interface ChargingScheduleLoadingEnd {
	type: typeof CHARGING_SCHEDULE_LOADING_END;
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
	type: typeof GET_SCHEDULES;
	payload: {
		schedules: iSchedules[];
	};
}

//Types para el dispatch
export type SchedulesDispatchTypes =
	| GetSchedules
	| RegisterNewScheduleStartLoading
	| RegisterNewScheduleLoadingEnd
	| ChargingScheduleStartLoading
	| ChargingScheduleLoadingEnd;
