import {
	AuthDispatchTypes,
	AUTH_LOGOUT,
	AUTH_START_LOADING,
	AUTH_SUCCESS,
} from '../actions/loginActionsTypes';
import { iAuthState } from '../interfaces/interfaces';

//Estado inicial
const INITIAL_STATE: iAuthState = {
	id: '',
	firstName: '',
	lastName: '',
	roll: null,
	authState: {
		loading: false,
		isAutenticated: false,
	},
};

//Reducer
export const LogInReducer = (
	state = INITIAL_STATE,
	action: AuthDispatchTypes
): iAuthState => {
	switch (action.type) {
		case AUTH_START_LOADING:
			return {
				...state,
				authState: { ...state.authState, loading: true },
			};
		case AUTH_SUCCESS:
			return {
				...state,
				id: action.payload.usuario.id,
				firstName: action.payload.usuario.firstName,
				lastName: action.payload.usuario.lastName,
				roll: action.payload.usuario.roll,
				authState: { ...state.authState, isAutenticated: true, loading: false },
			};
		case AUTH_LOGOUT:
			return {
				...state,
				id: '',
				firstName: '',
				lastName: '',
				roll: null,
				authState: { ...state.authState, isAutenticated: false },
			};

		default:
			return state;
	}
};