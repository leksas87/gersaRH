import {
	AuthDispatchTypes,
	AUTH_LOADING_FINISH,
	AUTH_LOGOUT,
	AUTH_START_LOADING,
	AUTH_SUCCESS,
	CLEAN_AVAILABLEDAYS,
	GET_AVAILABLEDAYS,
	GET_EMPLEADO_DATA,
} from '../actions/loginActions/loginActionsTypes';
import { iAuthState } from '../interfaces/interfaces';

//Estado inicial
const INITIAL_STATE: iAuthState = {
	id: '',
	firstName: '',
	lastName: '',
	rollTypeId: null,
	authState: {
		loading: false,
		isAutenticated: false,
	},
	empleadoData: {
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
		numeroEmpleado: '',
		diasDisponiblesFaltas: null,
		fechaIngreso: '',
	},
	availableDays: {
		id: null,
		employeeId: 0,
		availableDays: 0,
		fechaLimite: '',
		status: 0,
	},
};

//Reducer
export const LogInReducer = (
	state: iAuthState = INITIAL_STATE,
	action: AuthDispatchTypes
): iAuthState => {
	switch (action.type) {
		case AUTH_START_LOADING:
			return {
				...state,
				authState: { ...state.authState, loading: true },
			};
		case AUTH_LOADING_FINISH:
			return {
				...state,
				authState: { ...state.authState, loading: false },
			};
		case AUTH_SUCCESS:
			return {
				...state,
				id: action.payload.usuario.id,
				firstName: action.payload.usuario.firstName,
				lastName: action.payload.usuario.lastName,
				rollTypeId: action.payload.usuario.rollTypeId,
				authState: { ...state.authState, isAutenticated: true, loading: false },
			};
		case GET_EMPLEADO_DATA:
			return {
				...state,
				empleadoData: { ...action.payload.empleadoData },
			};
		case AUTH_LOGOUT:
			return {
				...state,
				id: '',
				firstName: '',
				lastName: '',
				rollTypeId: null,
				authState: { ...state.authState, isAutenticated: false },
				empleadoData: INITIAL_STATE.empleadoData,
			};
		case GET_AVAILABLEDAYS:
			return {
				...state,
				availableDays: action.payload.availableDays,
			};
		case CLEAN_AVAILABLEDAYS:
			return {
				...state,
				availableDays: INITIAL_STATE.availableDays,
			};

		default:
			return state;
	}
};
