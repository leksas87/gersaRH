import {
	CLEAN_EMPLOYEES_BY_PARAMS,
	CLEAN_EMPLOYEE_LISTINVITATION,
	GET_EMPLOYEES_BY_PARAMS,
	GET_EMPLOYEES_BY_PARAMS_LOADING_END,
	GET_EMPLOYEES_BY_PARAMS_START_LOADING,
	GET_EMPLOYEE_LISTINVITATION,
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
	employeesListInvitation: [],
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
		case GET_EMPLOYEE_LISTINVITATION:
			return {
				...state,
				employeesListInvitation: [
					...state.employeesListInvitation,
					action.payload.employeeListInvitation,
				],
			};
		case CLEAN_EMPLOYEE_LISTINVITATION:
			return {
				...state,
				employeesListInvitation: INITIAL_STATE.employeesListInvitation,
			};

		default:
			return state;
	}
};
