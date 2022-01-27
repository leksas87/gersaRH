import {
	confirmationUser,
	PassDispatchTypes,
	PASSWORD_UPDATED,
	VALIDATION_TOKEN_CLEAN,
	VALIDATION_TOKEN_SUCCESS,
} from '../actions/passwordsActions/passActionsTypes';

//Estado inicial
const INITIAL_STATE: confirmationUser = {
	id: null,
	username: '',
	passworUpdated: false,
};

//Reducer
export const PassReducer = (
	state: confirmationUser = INITIAL_STATE,
	action: PassDispatchTypes
): confirmationUser => {
	switch (action.type) {
		case VALIDATION_TOKEN_SUCCESS:
			return {
				...state,
				id: action.payload.confirmationUser.id,
				username: action.payload.confirmationUser.username,
			};
		case VALIDATION_TOKEN_CLEAN:
			return {
				...state,
				id: null,
				username: '',
			};
		case PASSWORD_UPDATED:
			return {
				...state,
				passworUpdated: true,
			};

		default:
			return state;
	}
};
