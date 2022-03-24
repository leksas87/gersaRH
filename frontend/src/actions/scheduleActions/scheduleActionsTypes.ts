//Types
export const GET_SCHEDULES = 'getSchedules';
export const DELETE_SCHEDULES = 'deleteSchedules';
export const UPDATED_SCHEDULES = 'updatedSchedules';
export const CLEAN_UPDATED_SCHEDULES = 'cleanUpdatedSchedules';
export const DELETE_SCHEDULE_FROM_STATE = 'deleteScheduleFromState';
export const REGISTER_NEW_SCHEDULE_START_LOADING =
	'registerNewScheduleStartLoading';
export const REGISTER_NEW_SCHEDULE_LOADING_END =
	'registerNewScheduleLoadingEnd';
export const CHARGING_SCHEDULE_START_LOADING = 'chargingScheduleStartLoading';
export const CHARGING_SCHEDULE_LOADING_END = 'chargingScheduleLoadingEnd';

//Interfaz para schedule reducer.
export interface iSchedulesReducer {
	registerState: {
		loading: boolean;
	};
	getSchedulesState: {
		loading: boolean;
	};
	schedulesArray: iSchedules[];
	schedulesToDelete: iScheduleToDelete;
	schedulesToEdited: iSchedules;
}

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
//Interfaz para nuevoSchedule.
export interface iupdateSchedule {
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
export interface iScheduleToDelete {
	id: number;
	scheduleName: string;
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
//Delete Schedules
export interface DeleteSchedules {
	type: typeof DELETE_SCHEDULES;
	payload: {
		schedule: iScheduleToDelete;
	};
}
//Delete Schedules
export interface DeleteScheduleFromState {
	type: typeof DELETE_SCHEDULE_FROM_STATE;
	payload: {
		scheduleId: number;
	};
}
//Updated Schedule
export interface UpdatedSchedule {
	type: typeof UPDATED_SCHEDULES;
	payload: {
		schedule: iSchedules;
	};
}
//Clean Updated Schedule
export interface CleanUpdatedSchedule {
	type: typeof CLEAN_UPDATED_SCHEDULES;
}

//Types para el dispatch
export type SchedulesDispatchTypes =
	| GetSchedules
	| DeleteSchedules
	| DeleteScheduleFromState
	| UpdatedSchedule
	| CleanUpdatedSchedule
	| RegisterNewScheduleStartLoading
	| RegisterNewScheduleLoadingEnd
	| ChargingScheduleStartLoading
	| ChargingScheduleLoadingEnd;
