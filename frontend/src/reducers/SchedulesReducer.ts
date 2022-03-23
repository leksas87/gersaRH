import {
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

		default:
			return state;
	}
};
