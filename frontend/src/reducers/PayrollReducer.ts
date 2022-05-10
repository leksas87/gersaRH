import {
	CLEAN_PAYROLL,
	CLEAN_PAYROLL_LIST,
	GET_PAYROLL,
	GET_PAYROLL_LIST,
	GET_PAYROLL_LOADING_END,
	GET_PAYROLL_START_LOADING,
	iPayrollReducer,
	PayrollDispatchTypes,
	REGISTER_PAYROLL_LOADING_END,
	REGISTER_PAYROLL_START_LOADING,
} from '../actions/payrollActions/payrollActionTypes';

//Estado inicial
const INITIAL_STATE: iPayrollReducer = {
	registerPayrollState: {
		loading: false,
	},
	getPayrollState: {
		loading: false,
	},
	payrollDetailList: [],
	payrollDetail: {
		id: null,
		employeeId: null,
		numeroEmpleado: '',
		nombreEmpleado: '',
		periodo: '',
		semana: 0,
		diasTrabajados: 0,
		retardos: 0,
		permisos: 0,
		horasExtra: 0,
		sueldo: 0,
		tiempoExtra: 0,
		bonoAsistencia: 0,
		descuentoLaboral: 0,
		festLab: 0,
		primaDom: 0,
		primaVacacional: 0,
		aclaraciones: 0,
		infonavit: 0,
		cajaAhorro: 0,
		dcoExt: 0,
		permisosHrs: 0,
		prestamos: 0,
		solidaridad: 0,
		descuentoPensionAlimenticia: 0,
		descuentoPorFiesta: 0,
	},
};

//Reducer
export const PayrollReducer = (
	state: iPayrollReducer = INITIAL_STATE,
	action: PayrollDispatchTypes
): iPayrollReducer => {
	switch (action.type) {
		case REGISTER_PAYROLL_START_LOADING:
			return {
				...state,
				registerPayrollState: {
					loading: true,
				},
			};
		case REGISTER_PAYROLL_LOADING_END:
			return {
				...state,
				registerPayrollState: {
					loading: false,
				},
			};
		case GET_PAYROLL_START_LOADING:
			return {
				...state,
				getPayrollState: {
					loading: true,
				},
			};
		case GET_PAYROLL_LOADING_END:
			return {
				...state,
				getPayrollState: {
					loading: false,
				},
			};
		case GET_PAYROLL:
			return {
				...state,
				payrollDetail: action.payload.payrollDetail,
			};
		case CLEAN_PAYROLL:
			return {
				...state,
				payrollDetail: INITIAL_STATE.payrollDetail,
			};
		case GET_PAYROLL_LIST:
			return {
				...state,
				payrollDetailList: [...action.payload.payrollDetailList],
			};
		case CLEAN_PAYROLL_LIST:
			return {
				...state,
				payrollDetailList: INITIAL_STATE.payrollDetailList,
			};

		default:
			return state;
	}
};
