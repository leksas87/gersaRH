//Types
export const REGISTER_NEW_CONTRACT_START_LOADING =
	'regiserNewContractStartLoading';
export const REGISTER_NEW_COONTRACT_LOADING_END =
	'registerNewContractLoadingEnd';
export const GET_CONTRACTS = 'getContracts';
export const GET_CONTRACTS_TO_SHOW = 'getContractToShow';
export const CLEAN_CONTRACTS = 'cleantContracts';
export const CLEAN_CONTRACT_TO_SHOW = 'cleantContractToShow';

//Interfaz para reducer de Contracts
export interface iContractsReducer {
	registerState: {
		loading: boolean;
	};
	contratosEmpleado: iContract[];
	contractToShow: iContract;
}
//Interfaz para nuevoContrato.
export interface iNewContract {
	userId: number;
	puesto: string;
	fechaDeInicio: string;
	fechaDeFinalizacion?: string;
	horasLaborales: number;
	unidadLaborales: string;
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
	fechaDeFinalizacion?: string | null;
	horasLaborales: number;
	unidadLaborales: string;
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
//Obtener contrato para mostrar
export interface GetContractToShow {
	type: typeof GET_CONTRACTS_TO_SHOW;
	payload: {
		contrato: iContract;
	};
}
//Limpiar arreglo de contratos
export interface CleanContracts {
	type: typeof CLEAN_CONTRACTS;
}
//Limpiar contrato to show
export interface CleantContractToShow {
	type: typeof CLEAN_CONTRACT_TO_SHOW;
}

//Types para el dispatch
export type ContractsDispatchTypes =
	| RegiserNewContractStartLoading
	| GetContracts
	| GetContractToShow
	| CleanContracts
	| CleantContractToShow
	| RegisterNewContractLoadingEnd;
