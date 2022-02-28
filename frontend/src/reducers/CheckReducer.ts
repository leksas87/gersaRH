import {
	CheckDispatchTypes,
	CHECK_IS_USER_ACTIVE,
	CHECK_IS_USER_ACTIVE_FALSE,
	CHECK_LOADING_END,
	CHECK_OPTION,
	CHECK_START_LOADING,
	iCheckReducerState,
	SEND_ACCESS_CODE,
} from '../actions/checkActions/checkActionTypes';

//Estado inicial
const INITIAL_STATE: iCheckReducerState = {
	userConfirmation: {
		userId: null,
		accessCode: 0,
		username: '',
	},
	checkState: {
		loading: false,
		checkIsUserConfirm: false,
		checkOption: '',
	},
};

//Reducer
export const CheckReducer = (
	state: iCheckReducerState = INITIAL_STATE,
	action: CheckDispatchTypes
): iCheckReducerState => {
	switch (action.type) {
		case CHECK_IS_USER_ACTIVE:
			return {
				...state,
				checkState: {
					...state.checkState,
					checkIsUserConfirm: true,
				},
			};
		case CHECK_IS_USER_ACTIVE_FALSE:
			return {
				...state,
				checkState: {
					...state.checkState,
					checkIsUserConfirm: false,
				},
			};
		case CHECK_OPTION:
			return {
				...state,
				checkState: {
					...state.checkState,
					checkOption: action.payload.checkOption,
				},
			};
		case CHECK_START_LOADING:
			return {
				...state,
				checkState: {
					...state.checkState,
					loading: true,
				},
			};
		case CHECK_LOADING_END:
			return {
				...state,
				checkState: {
					...state.checkState,
					loading: false,
				},
			};

		case SEND_ACCESS_CODE:
			return {
				...state,
				userConfirmation: { ...action.payload.userConfirmation },
			};

		default:
			return state;
	}
};
