//Types
export const REGISTER_NEW_CONTRACT_START_LOADING =
	'regiserNewContractStartLoading';
export const REGISTER_NEW_COONTRACT_LOADING_END =
	'registerNewContractLoadingEnd';
export const GET_CONTRACTS = 'getContracts';
export const CLEAN_CONTRACTS = 'cleantContracts';

//Interfaz para reducer de Contracts
export interface iContractsReducer {
	registerState: {
		loading: boolean;
	};
	contratosEmpleado: iContract[];
}
//Interfaz para nuevoContrato.
export interface iNewContract {
	userId: number;
	puesto: string;
	fechaDeInicio: string;
	fechaDeFinalizacion?: string;
	horasLaborales: number;
	unidadLaborales: string;
	lunes: boolean;
	martes: boolean;
	miercoles: boolean;
	jueves: boolean;
	viernes: boolean;
	sabado: boolean;
	domingo: boolean;
	tipoSalario: string;
	cantidadSalario: number;
	tipoDeContrato: string;
}
//Interfaz contrato
export interface iContract {
	id: number;
	userId: number;
	tipoDeContrato: string;
	puesto: string;
	fechaDeInicio: string;
	fechaDeFinalizacion: string | null;
	horasLaborales: number;
	unidadLaborales: string;
	lunes: boolean;
	martes: boolean;
	miercoles: boolean;
	jueves: boolean;
	viernes: boolean;
	sabado: boolean;
	domingo: boolean;
	tipoSalario: string;
	cantidadSalario: number;
	isContractActivide: boolean;
}

//Inicia registro
export interface RegiserNewContractStartLoading {
	type: typeof REGISTER_NEW_CONTRACT_START_LOADING;
}
//Termino registro
export interface RegisterNewContractLoadingEnd {
	type: typeof REGISTER_NEW_COONTRACT_LOADING_END;
}
//Obtener contratos by userId
export interface GetContracts {
	type: typeof GET_CONTRACTS;
	payload: {
		contratos: iContract[];
	};
}
//Termino registro
export interface CleanContracts {
	type: typeof CLEAN_CONTRACTS;
}

//Types para el dispatch
export type ContractsDispatchTypes =
	| RegiserNewContractStartLoading
	| GetContracts
	| CleanContracts
	| RegisterNewContractLoadingEnd;
