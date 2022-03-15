import {
	CLEAN_CONTRACTS,
	CLEAN_CONTRACT_TO_SHOW,
	ContractsDispatchTypes,
	GET_CONTRACTS,
	GET_CONTRACTS_TO_SHOW,
	iContractsReducer,
	REGISTER_NEW_CONTRACT_START_LOADING,
	REGISTER_NEW_COONTRACT_LOADING_END,
} from '../actions/contractsActions/contractsActionTypes';

//Estado inicial
const INITIAL_STATE: iContractsReducer = {
	registerState: {
		loading: false,
	},
	contratosEmpleado: [],
	contractToShow: {
		id: 0,
		userId: 0,
		tipoDeContrato: '',
		puesto: '',
		fechaDeInicio: '',
		fechaDeFinalizacion: '',
		horasLaborales: 0,
		unidadLaborales: '',
		tipoSalario: '',
		cantidadSalario: 0,
		isContractActivide: false,
	},
};
//Reducer
export const ContractsReducer = (
	state: iContractsReducer = INITIAL_STATE,
	action: ContractsDispatchTypes
): iContractsReducer => {
	switch (action.type) {
		case REGISTER_NEW_CONTRACT_START_LOADING:
			return {
				...state,
				registerState: { loading: true },
			};
		case REGISTER_NEW_COONTRACT_LOADING_END:
			return {
				...state,
				registerState: { loading: false },
			};
		case GET_CONTRACTS:
			return {
				...state,
				contratosEmpleado: [...action.payload.contratos],
			};
		case GET_CONTRACTS_TO_SHOW:
			return {
				...state,
				contractToShow: { ...action.payload.contrato },
			};
		case CLEAN_CONTRACTS:
			return {
				...state,
				contratosEmpleado: [],
			};
		case CLEAN_CONTRACT_TO_SHOW:
			return {
				...state,
				contractToShow: INITIAL_STATE.contractToShow,
			};

		default:
			return state;
	}
};
