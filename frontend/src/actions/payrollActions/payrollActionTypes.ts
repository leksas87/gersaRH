export const REGISTER_PAYROLL_START_LOADING = 'registerPayrollStartLoading';
export const REGISTER_PAYROLL_LOADING_END = 'registerPayrollLoadingEnd';

export const GET_PAYROLL_START_LOADING = 'getPayrollStartLoading';
export const GET_PAYROLL_LOADING_END = 'getPayrollLoadingEnd';

export const GET_PAYROLL_LIST = 'getPayrollList';
export const CLEAN_PAYROLL_LIST = 'cleanPayrollList';

export const GET_PAYROLL = 'getPayroll';
export const CLEAN_PAYROLL = 'cleanPayroll';

//Interfaz para  reducer.
export interface iPayrollReducer {
	registerPayrollState: {
		loading: boolean;
	};
	getPayrollState: {
		loading: boolean;
	};
	payrollDetail: iPayrollDetail;
	payrollDetailList: iPayrollDetail[];
}
export interface iPayrollDetail {
	id: number | null;
	employeeId: number | null;
	numeroEmpleado: string;
	nombreEmpleado: string;
	periodo: string;
	semana: number;
	diasTrabajados: number;
	retardos: number;
	permisos: number;
	horasExtra: number;
	sueldo: number;
	tiempoExtra: number;
	bonoAsistencia: number;
	descuentoLaboral: number;
	festLab: number;
	primaDom: number;
	primaVacacional: number;
	aclaraciones: number;
	infonavit: number;
	cajaAhorro: number;
	dcoExt: number;
	permisosHrs: number;
	prestamos: number;
	solidaridad: number;
	descuentoPensionAlimenticia: number;
	descuentoPorFiesta: number;
}

export interface RegisterPayrollStartLoading {
	type: typeof REGISTER_PAYROLL_START_LOADING;
}
export interface RegisterPayrollLoadingEnd {
	type: typeof REGISTER_PAYROLL_LOADING_END;
}

export interface GetPayrollStartLoading {
	type: typeof GET_PAYROLL_START_LOADING;
}
export interface GetPayrollLoadingEnd {
	type: typeof GET_PAYROLL_LOADING_END;
}

export interface GetPayrollList {
	type: typeof GET_PAYROLL_LIST;
	payload: {
		payrollDetailList: iPayrollDetail[];
	};
}
export interface CleanPayrollList {
	type: typeof CLEAN_PAYROLL_LIST;
}

export interface GetPayroll {
	type: typeof GET_PAYROLL;
	payload: {
		payrollDetail: iPayrollDetail;
	};
}
export interface CleanPayroll {
	type: typeof CLEAN_PAYROLL;
}

//Types para el dispatch
export type PayrollDispatchTypes =
	| RegisterPayrollStartLoading
	| RegisterPayrollLoadingEnd
	| GetPayrollStartLoading
	| GetPayrollLoadingEnd
	| GetPayrollList
	| CleanPayrollList
	| GetPayroll
	| CleanPayroll;
