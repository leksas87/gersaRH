import {
	UsersDispatchTypes,
	REGISTER_FAIL,
	REGISTER_START_LOADING,
	REGISTER_SUCCESS,
} from '../actions/usersActions/usersActionTypes';
import { iEmpleado } from '../interfaces/interfaces';

//Estado inicial
const INITIAL_STATE: iEmpleado = {
	name: '',
	apellidos: '',
	correo: '',
	phone: '',
};

//Reducer
export const UsersReducer = (
	state = INITIAL_STATE,
	action: UsersDispatchTypes
): iEmpleado => {
	switch (action.type) {
		case REGISTER_START_LOADING:
			return {
				...state,
			};
		case REGISTER_SUCCESS:
			return {
				...state,
			};
		case REGISTER_FAIL:
			return {
				...state,
			};

		default:
			return state;
	}
};
