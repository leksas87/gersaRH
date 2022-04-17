import {
	CLEAN_REPORTS_LIST,
	GET_REPORTS_LIST,
	GET_REPORTS_LOADING_END,
	GET_REPORTS_START_LOADING,
	iReportsReducer,
	REGISTER_NEW_REPORT_LOADING_END,
	REGISTER_NEW_REPORT_START_LOADING,
	ReportsDispatchTypes,
} from '../actions/reportsActions/reportsActionTypes';

//Estado inicial
const INITIAL_STATE: iReportsReducer = {
	registerState: {
		loading: false,
	},
	getReportsState: {
		loading: false,
	},
	reportsList: [],
};

//Reducer
export const ReportsReducer = (
	state: iReportsReducer = INITIAL_STATE,
	action: ReportsDispatchTypes
): iReportsReducer => {
	switch (action.type) {
		case REGISTER_NEW_REPORT_START_LOADING:
			return {
				...state,
				registerState: {
					loading: true,
				},
			};
		case REGISTER_NEW_REPORT_LOADING_END:
			return {
				...state,
				registerState: {
					loading: false,
				},
			};
		case GET_REPORTS_START_LOADING:
			return {
				...state,
				getReportsState: {
					loading: true,
				},
			};
		case GET_REPORTS_LOADING_END:
			return {
				...state,
				getReportsState: {
					loading: false,
				},
			};
		case GET_REPORTS_LIST:
			return {
				...state,
				reportsList: [...action.payload.reportsList],
			};
		case CLEAN_REPORTS_LIST:
			return {
				...state,
				reportsList: INITIAL_STATE.reportsList,
			};

		default:
			return state;
	}
};
