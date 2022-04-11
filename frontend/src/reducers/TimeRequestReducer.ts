import {
	CHARGING_SCHEDULE_LOADING_END,
	CHARGING_SCHEDULE_START_LOADING,
	CLEAN_EMPLOYEE_SCHEDULES,
	CLEAN_UPDATED_SCHEDULES,
	DELETE_EMPLOYEE_SCHEDULE,
	DELETE_SCHEDULES,
	DELETE_SCHEDULE_FROM_STATE,
	GET_EMPLOYEE_SCHEDULES,
	GET_SCHEDULES,
	iSchedulesReducer,
	REGISTER_NEW_SCHEDULE_LOADING_END,
	REGISTER_NEW_SCHEDULE_START_LOADING,
	SchedulesDispatchTypes,
	UPDATED_SCHEDULES,
} from '../actions/scheduleActions/scheduleActionsTypes';
import {
	CLEAN_EMPLOYEES_BY_PARAMS,
	GET_EMPLOYEES_BY_PARAMS,
	GET_EMPLOYEES_BY_PARAMS_LOADING_END,
	GET_EMPLOYEES_BY_PARAMS_START_LOADING,
	iTimeRequestReducer,
	TimeRequestDispatchTypes,
} from '../actions/timeRequest/timeRequestActionTypes';

//Estado inicial
const INITIAL_STATE: iTimeRequestReducer = {
	registerState: {
		loading: false,
	},
	getEmployeesState: {
		loading: false,
	},
	employeesParams: [],
};

//Reducer
export const TimeRequestReducer = (
	state: iTimeRequestReducer = INITIAL_STATE,
	action: TimeRequestDispatchTypes
): iTimeRequestReducer => {
	switch (action.type) {
		case GET_EMPLOYEES_BY_PARAMS_START_LOADING:
			return {
				...state,
				getEmployeesState: { loading: true },
			};
		case GET_EMPLOYEES_BY_PARAMS_LOADING_END:
			return {
				...state,
				getEmployeesState: { loading: false },
			};
		case GET_EMPLOYEES_BY_PARAMS:
			return {
				...state,
				employeesParams: [...action.payload.employeesParams],
			};
		case CLEAN_EMPLOYEES_BY_PARAMS:
			return {
				...state,
				employeesParams: INITIAL_STATE.employeesParams,
			};

		default:
			return state;
	}
};
