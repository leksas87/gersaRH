import {
	UsersDispatchTypes,
	REGISTER_USER_START_LOADING,
	REGISTER_USER_LOADING_END,
	GET_USERS_SUCCESSFUL,
	GET_USER_BY_ID,
	DELETE_ACCESS_TO_USER_BY_ID,
	MAKE_ADMIN_USER_BY_ID,
	REMOVE_ADMIN_USER_BY_ID,
	TERMINATE_USER_BY_ID,
	CHANGE_TABLE_PATH,
} from '../actions/usersActions/usersActionTypes';
import { iUsuariosReducer } from '../interfaces/interfaces';

//Estado inicial
const INITIAL_STATE: iUsuariosReducer = {
	registerState: {
		loading: false,
	},
	empleados: [],
	perfilEmpleado: {
		id: 0,
		firstName: '',
		lastName: '',
		username: '',
		phone: '',
		roll: 0,
		active: false,
		isEmployeeActive: true,
	},
	tablePath: '',
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
		case GET_USER_BY_ID:
			return {
				...state,
				perfilEmpleado: { ...action.payload.empleado },
			};
		case DELETE_ACCESS_TO_USER_BY_ID:
			return {
				...state,
				perfilEmpleado: { ...state.perfilEmpleado, active: false },
			};
		case MAKE_ADMIN_USER_BY_ID:
			return {
				...state,
				//roll:1 (Administrador)
				perfilEmpleado: { ...state.perfilEmpleado, roll: 1 },
			};
		case REMOVE_ADMIN_USER_BY_ID:
			return {
				...state,
				//roll:2 (Empleado)
				perfilEmpleado: { ...state.perfilEmpleado, roll: 2 },
			};
		case TERMINATE_USER_BY_ID:
			return {
				...state,
				perfilEmpleado: {
					...state.perfilEmpleado,
					active: false,
					isEmployeeActive: false,
				},
			};
		case CHANGE_TABLE_PATH:
			return {
				...state,
				tablePath: action.payload,
			};

		default:
			return state;
	}
};
