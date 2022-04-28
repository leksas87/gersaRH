import {
	AuthDispatchTypes,
	AUTH_LOADING_FINISH,
	AUTH_LOGOUT,
	AUTH_START_LOADING,
	AUTH_SUCCESS,
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

		default:
			return state;
	}
};
