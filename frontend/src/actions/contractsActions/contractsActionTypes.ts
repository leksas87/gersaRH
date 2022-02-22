//Types
export const REGISTER_NEW_CONTRACT_START_LOADING =
	'regiserNewContractStartLoading';
export const REGISTER_NEW_COONTRACT_LOADING_END =
	'registerNewContractLoadingEnd';

//Interfaz para reducer de Contracts
export interface iContractsReducer {
	registerState: {
		loading: boolean;
	};
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

//Inicia registro
export interface RegiserNewContractStartLoading {
	type: typeof REGISTER_NEW_CONTRACT_START_LOADING;
}
//Termino registro
export interface RegisterNewContractLoadingEnd {
	type: typeof REGISTER_NEW_COONTRACT_LOADING_END;
}

//Types para el dispatch
export type ContractsDispatchTypes =
	| RegiserNewContractStartLoading
	| RegisterNewContractLoadingEnd;
