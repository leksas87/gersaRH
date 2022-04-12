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
