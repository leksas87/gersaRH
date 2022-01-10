import {
	AuthDispatchTypes,
	AUTH_LOGOUT,
	AUTH_START_LOADING,
	AUTH_SUCCESS,
} from '../actions/loginActionsTypes';
import { iAuthState } from '../interfaces/interfaces';

//Estado inicial
const INITIAL_STATE: iAuthState = {
	uid: '',
	nombre: '',
	apellido: '',
	roll: '',
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
				uid: action.payload.usuario.uid,
				nombre: action.payload.usuario.nombre,
				apellido: action.payload.usuario.apellido,
				roll: action.payload.usuario.roll,
				authState: { ...state.authState, isAutenticated: true, loading: false },
			};
		case AUTH_LOGOUT:
			return {
				...state,
				uid: '',
				nombre: '',
				apellido: '',
				roll: '',
				authState: { ...state.authState, isAutenticated: false },
			};

		default:
			return state;
	}
};
