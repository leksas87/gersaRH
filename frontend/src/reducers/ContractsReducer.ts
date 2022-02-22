import {
	ContractsDispatchTypes,
	iContractsReducer,
	REGISTER_NEW_COONTRACT_LOADING_END,
} from '../actions/contractsActions/contractsActionTypes';

//Estado inicial
const INITIAL_STATE: iContractsReducer = {
	registerState: {
		loading: false,
	},
};
//Reducer
export const UsersReducer = (
	state: iContractsReducer = INITIAL_STATE,
	action: ContractsDispatchTypes
): iContractsReducer => {
	switch (action.type) {
		case REGISTER_NEW_COONTRACT_LOADING_END:
			return {
				...state,
				registerState: { loading: true },
			};
		case REGISTER_NEW_COONTRACT_LOADING_END:
			return {
				...state,
				registerState: { loading: false },
			};

		default:
			return state;
	}
};
