import {
	CLEAN_EMPLOYEE_EVENTS,
	CLEAN_EVENT_VALIDATION,
	CLEAN_SERVER_DAY,
	CLEAN_SERVER_TIME,
	EventsDispatchTypes,
	EVENTS_IS_USER_ACTIVE,
	EVENTS_IS_USER_ACTIVE_FALSE,
	EVENTS_LOADING_END,
	EVENTS_START_LOADING,
	GET_EMPLOYEE_EVENTS,
	GET_EVENT_VALIDATION,
	GET_SERVER_DAY,
	GET_SERVER_TIME,
	iEventsReducerState,
	SEND_ACCESS_CODE,
} from '../actions/eventsActions/eventsActionTypes';

//Estado inicial
const INITIAL_STATE: iEventsReducerState = {
	userConfirmation: {
		employeeId: null,
		firstName: '',
		lastName: '',
		token: '',
	},
	eventsState: {
		loading: false,
		eventIsUserConfirm: false,
	},
	eventServerTime: '',
	eventServerDay: '',
	employeeEvents: [],
	eventValidation: {
		eventActionTypeId: null,
		eventTypeId: null,
		employeeId: null,
		message: 'null',
	},
};

//Reducer
export const EventsReducer = (
	state: iEventsReducerState = INITIAL_STATE,
	action: EventsDispatchTypes
): iEventsReducerState => {
	switch (action.type) {
		case EVENTS_IS_USER_ACTIVE:
			return {
				...state,
				eventsState: {
					...state.eventsState,
					eventIsUserConfirm: true,
				},
			};
		case EVENTS_IS_USER_ACTIVE_FALSE:
			return {
				...state,
				eventsState: {
					...state.eventsState,
					eventIsUserConfirm: false,
				},
			};
		case EVENTS_START_LOADING:
			return {
				...state,
				eventsState: {
					...state.eventsState,
					loading: true,
				},
			};
		case EVENTS_LOADING_END:
			return {
				...state,
				eventsState: {
					...state.eventsState,
					loading: false,
				},
			};

		case SEND_ACCESS_CODE:
			return {
				...state,
				userConfirmation: { ...action.payload.userConfirmation },
			};
		case GET_EMPLOYEE_EVENTS:
			return {
				...state,
				employeeEvents: [...action.payload.employeeEvents],
			};
		case CLEAN_EMPLOYEE_EVENTS:
			return {
				...state,
				employeeEvents: INITIAL_STATE.employeeEvents,
			};
		case GET_SERVER_TIME:
			return {
				...state,
				eventServerTime: action.payload.serverTime,
			};
		case CLEAN_SERVER_TIME:
			return {
				...state,
				eventServerTime: INITIAL_STATE.eventServerTime,
			};
		case GET_SERVER_DAY:
			return {
				...state,
				eventServerDay: action.payload.serverDay,
			};
		case CLEAN_SERVER_DAY:
			return {
				...state,
				eventServerDay: INITIAL_STATE.eventServerDay,
			};
		case GET_EVENT_VALIDATION:
			return {
				...state,
				eventValidation: action.payload.eventValidation,
			};
		case CLEAN_EVENT_VALIDATION:
			return {
				...state,
				eventValidation: INITIAL_STATE.eventValidation,
			};

		default:
			return state;
	}
};
