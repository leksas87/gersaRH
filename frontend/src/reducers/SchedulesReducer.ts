import {
	CHARGING_SCHEDULE_LOADING_END,
	CHARGING_SCHEDULE_START_LOADING,
	CLEAN_UPDATED_SCHEDULES,
	DELETE_SCHEDULES,
	DELETE_SCHEDULE_FROM_STATE,
	GET_SCHEDULES,
	iSchedulesReducer,
	REGISTER_NEW_SCHEDULE_LOADING_END,
	REGISTER_NEW_SCHEDULE_START_LOADING,
	SchedulesDispatchTypes,
	UPDATED_SCHEDULES,
} from '../actions/scheduleActions/scheduleActionsTypes';

//Estado inicial
const INITIAL_STATE: iSchedulesReducer = {
	registerState: {
		loading: false,
	},
	getSchedulesState: {
		loading: false,
	},
	schedulesArray: [],
	schedulesToDelete: {
		id: 0,
		scheduleName: '',
	},
	schedulesToEdited: {
		id: 0,
		scheduleName: '',
		horaEntrada: '',
		horaSalida: '',
		tiempoDescanso: 0,
		tiempoRetraso: 0,
		Lunes: false,
		Martes: false,
		Miercoles: false,
		Jueves: false,
		Viernes: false,
		Sabado: false,
		Domingo: false,
	},
};

//Reducer
export const SchedulesReducer = (
	state: iSchedulesReducer = INITIAL_STATE,
	action: SchedulesDispatchTypes
): iSchedulesReducer => {
	switch (action.type) {
		case REGISTER_NEW_SCHEDULE_START_LOADING:
			return {
				...state,
				registerState: { loading: true },
			};
		case REGISTER_NEW_SCHEDULE_LOADING_END:
			return {
				...state,
				registerState: { loading: false },
			};
		case CHARGING_SCHEDULE_START_LOADING:
			return {
				...state,
				getSchedulesState: { loading: true },
			};
		case CHARGING_SCHEDULE_LOADING_END:
			return {
				...state,
				getSchedulesState: { loading: false },
			};
		case GET_SCHEDULES:
			return {
				...state,
				schedulesArray: [...action.payload.schedules],
			};
		case DELETE_SCHEDULES:
			return {
				...state,
				schedulesToDelete: { ...action.payload.schedule },
			};
		case DELETE_SCHEDULE_FROM_STATE:
			return {
				...state,
				schedulesArray: state.schedulesArray.filter(
					(schedule) => schedule.id !== action.payload.scheduleId
				),
			};
		case UPDATED_SCHEDULES:
			return {
				...state,
				schedulesToEdited: { ...action.payload.schedule },
			};
		case CLEAN_UPDATED_SCHEDULES:
			return {
				...state,
				schedulesToEdited: INITIAL_STATE.schedulesToEdited,
			};

		default:
			return state;
	}
};
