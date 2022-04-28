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
	GET_EMPLOYEE_BY_ID,
	CHANGE_ROLL_TO_USER_BY_ID,
	GET_SUPERVISORES,
	CLEAN_SUPERVISORES,
	GET_ADMINISTRADORES,
	CLEAN_ADMINISTRADORES,
	GET_WORKPLACES,
	CLEAN_WORKPLACES,
} from '../actions/usersActions/usersActionTypes';
import { iUsuariosReducer } from '../interfaces/interfaces';

//Estado inicial
const INITIAL_STATE: iUsuariosReducer = {
	registerState: {
		loading: false,
	},
	empleados: [],
	perfilUsuario: {
		id: 0,
		firstName: '',
		lastName: '',
		username: '',
		phone: '',
		roll: 0,
		rollTypeId: 0,
		active: false,
		isEmployeeActive: true,
	},
	perfilEmpleado: {
		id: null,
		userId: null,
		tipoIdentificacion: '',
		documentoIdentidad: '',
		fechaNacimiento: '',
		genero: '',
		nacionalidad: '',
		lugarDeTrabajo: '',
		supervisor: '',
		numeroCuentaBancaria: '',
		swiftBic: '',
		frecuenciaPago: '',
		direccion1: '',
		direccion2: '',
		ciudad: '',
		codigoPostal: '',
		estadoProvincia: '',
		pais: '',
		emergenciaNombre: '',
		empergenciaTelefono: '',
		rfc: '',
		numeroImms: '',
		curp: '',
		fechaAltaImss: '',
	},
	tablePath: '',
	supervisores: [],
	administradores: [],
	workPlaces: [],
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
				perfilUsuario: { ...action.payload.empleado },
			};
		case DELETE_ACCESS_TO_USER_BY_ID:
			return {
				...state,
				perfilUsuario: { ...state.perfilUsuario, active: false },
			};
		case MAKE_ADMIN_USER_BY_ID:
			return {
				...state,
				//roll:1 (Administrador)
				perfilUsuario: { ...state.perfilUsuario, roll: 1 },
			};
		case REMOVE_ADMIN_USER_BY_ID:
			return {
				...state,
				//roll:2 (Empleado)
				perfilUsuario: { ...state.perfilUsuario, roll: 2 },
			};
		case CHANGE_ROLL_TO_USER_BY_ID:
			return {
				...state,
				perfilUsuario: {
					...state.perfilUsuario,
					roll: action.payload.rollTypeId,
					rollTypeId: action.payload.rollTypeId,
				},
			};
		case TERMINATE_USER_BY_ID:
			return {
				...state,
				perfilUsuario: {
					...state.perfilUsuario,
					active: false,
					isEmployeeActive: false,
				},
			};
		case CHANGE_TABLE_PATH:
			return {
				...state,
				tablePath: action.payload,
			};
		case GET_EMPLOYEE_BY_ID:
			return {
				...state,
				perfilEmpleado: { ...action.payload.empleadoData },
			};
		case GET_SUPERVISORES:
			return {
				...state,
				supervisores: [...action.payload.supervisores],
			};
		case CLEAN_SUPERVISORES:
			return {
				...state,
				supervisores: INITIAL_STATE.supervisores,
			};
		case GET_ADMINISTRADORES:
			return {
				...state,
				administradores: [...action.payload.administradores],
			};
		case CLEAN_ADMINISTRADORES:
			return {
				...state,
				administradores: INITIAL_STATE.administradores,
			};
		case GET_WORKPLACES:
			return {
				...state,
				workPlaces: [...action.payload.workPlaces],
			};
		case CLEAN_WORKPLACES:
			return {
				...state,
				workPlaces: INITIAL_STATE.workPlaces,
			};

		default:
			return state;
	}
};
