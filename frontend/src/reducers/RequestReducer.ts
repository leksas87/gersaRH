import {
	CLEAN_REQUEST_LIST,
	GET_REQUEST_LIST,
	GET_REQUEST_LOADING_END,
	GET_REQUEST_START_LOADING,
	iRequestReducer,
	REGISTER_NEW_REQUEST_LOADING_END,
	REGISTER_NEW_REQUEST_START_LOADING,
	RequestDispatchTypes,
} from '../actions/requestActions/requestActionTypes';

//Estado inicial
const INITIAL_STATE: iRequestReducer = {
	registerState: {
		loading: false,
	},
	getRequestState: {
		loading: false,
	},
	requestList: [],
};

//Reducer
export const RequestReducer = (
	state: iRequestReducer = INITIAL_STATE,
	action: RequestDispatchTypes
): iRequestReducer => {
	switch (action.type) {
		case REGISTER_NEW_REQUEST_START_LOADING:
			return {
				...state,
				registerState: {
					loading: true,
				},
			};
		case REGISTER_NEW_REQUEST_LOADING_END:
			return {
				...state,
				registerState: {
					loading: false,
				},
			};
		case GET_REQUEST_START_LOADING:
			return {
				...state,
				getRequestState: {
					loading: true,
				},
			};
		case GET_REQUEST_LOADING_END:
			return {
				...state,
				getRequestState: {
					loading: false,
				},
			};
		case GET_REQUEST_LIST:
			return {
				...state,
				requestList: [...action.payload.requestList],
			};
		case CLEAN_REQUEST_LIST:
			return {
				...state,
				requestList: INITIAL_STATE.requestList,
			};

		default:
			return state;
	}
};
