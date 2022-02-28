import { combineReducers } from 'redux';
import { CheckReducer } from './CheckReducer';
import { ContractsReducer } from './ContractsReducer';
import { LogInReducer } from './LogInReducer';
import { PassReducer } from './PassReducer';
import { UsersReducer } from './UsersReducer';

//Todos los reducer se unen aquí
export const rootReducer = combineReducers({
	auth: LogInReducer,
	users: UsersReducer,
	pass: PassReducer,
	contracts: ContractsReducer,
	check: CheckReducer,
});
