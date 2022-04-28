import {
	CLEAN_EMPLOYEES_BY_PARAMS,
	CLEAN_EMPLOYEE_LISTINVITATION,
	CLEAN_TIME_REQUEST,
	GET_EMPLOYEES_BY_PARAMS,
	GET_EMPLOYEES_BY_PARAMS_LOADING_END,
	GET_EMPLOYEES_BY_PARAMS_START_LOADING,
	GET_EMPLOYEE_LISTINVITATION,
	GET_TIME_REQUEST,
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
	timeRequestList: [],
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
		case GET_TIME_REQUEST:
			return {
				...state,
				timeRequestList: [...action.payload.timeRequestList],
			};
		case CLEAN_TIME_REQUEST:
			return {
				...state,
				timeRequestList: INITIAL_STATE.timeRequestList,
			};

		default:
			return state;
	}
};
