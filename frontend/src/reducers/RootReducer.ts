import { combineReducers } from 'redux';
import { LogInReducer } from './LogInReducer';
import { UsersReducer } from './UsersReducer';

//Todos los reducer se unen aquí
export const rootReducer = combineReducers({
	auth: LogInReducer,
	users: UsersReducer,
});
