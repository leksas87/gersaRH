import { combineReducers } from 'redux';
import { LogInReducer } from './LogInReducer';

//Todos los reducer se unen aquí
export const rootReducer = combineReducers({
	auth: LogInReducer,
});
