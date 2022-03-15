import {
	EventsDispatchTypes,
	EVENTS_IS_USER_ACTIVE,
	EVENTS_IS_USER_ACTIVE_FALSE,
	EVENTS_LOADING_END,
	EVENTS_OPTION,
	EVENTS_START_LOADING,
	iEventsReducerState,
	SEND_ACCESS_CODE,
} from '../actions/eventsActions/eventsActionTypes';

//Estado inicial
const INITIAL_STATE: iEventsReducerState = {
	userConfirmation: {
		id: null,
		accessCode: 0,
		username: '',
		firstName: '',
		lastName: '',
	},
	eventsState: {
		loading: false,
		eventIsUserConfirm: false,
		eventOption: '',
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
		case EVENTS_OPTION:
			return {
				...state,
				eventsState: {
					...state.eventsState,
					eventOption: action.payload.checkOption,
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

		default:
			return state;
	}
};
