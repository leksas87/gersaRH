import {
	UsersDispatchTypes,
	REGISTER_USER_START_LOADING,
	REGISTER_USER_LOADING_END,
	GET_USERS_SUCCESSFUL,
} from '../actions/usersActions/usersActionTypes';
import { iUsuariosReducer } from '../interfaces/interfaces';

//Estado inicial
const INITIAL_STATE: iUsuariosReducer = {
	registerState: {
		loading: false,
	},
	empleados: [],
};

//Reducer
export const UsersReducer = (
	state: iUsuariosReducer = INITIAL_STATE,
	action: UsersDispatchTypes
): iUsuariosReducer => {
	switch (action.type) {
		case REGISTER_USER_START_LOADING:
			return {
				...state,
				registerState: { loading: true },
			};
		case REGISTER_USER_LOADING_END:
			return {
				...state,
				registerState: { loading: false },
			};
		case GET_USERS_SUCCESSFUL:
			return {
				...state,
				empleados: [...action.payload.empleados],
			};

		default:
			return state;
	}
};
