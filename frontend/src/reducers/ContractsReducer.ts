import {
	CLEAN_CONTRACTS,
	ContractsDispatchTypes,
	GET_CONTRACTS,
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
		case CLEAN_CONTRACTS:
			return {
				...state,
				contratosEmpleado: [],
			};

		default:
			return state;
	}
};
