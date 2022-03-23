import {
	CHARGING_SCHEDULE_LOADING_END,
	CHARGING_SCHEDULE_START_LOADING,
	GET_SCHEDULES,
	iSchedulesReducer,
	REGISTER_NEW_SCHEDULE_LOADING_END,
	REGISTER_NEW_SCHEDULE_START_LOADING,
	SchedulesDispatchTypes,
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

		default:
			return state;
	}
};
