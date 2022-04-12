import { combineReducers } from 'redux';
import { EventsReducer } from './EventsReducer';
import { ContractsReducer } from './ContractsReducer';
import { LogInReducer } from './LogInReducer';
import { PassReducer } from './PassReducer';
import { UsersReducer } from './UsersReducer';
import { SchedulesReducer } from './SchedulesReducer';
import { RequestReducer } from './RequestReducer';
import { TimeRequestReducer } from './TimeRequestReducer';

//Todos los reducer se unen aquí
export const rootReducer = combineReducers({
	auth: LogInReducer,
	users: UsersReducer,
	pass: PassReducer,
	contracts: ContractsReducer,
	events: EventsReducer,
	schedules: SchedulesReducer,
	request: RequestReducer,
	timeRequest: TimeRequestReducer,
});
