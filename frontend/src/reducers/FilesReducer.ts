import {
	CLEAN_FILES_LIST,
	FilesDispatchTypes,
	GET_FILES_LIST,
	GET_FILES_LOADING_END,
	GET_FILES_START_LOADING,
	iArchivosReducer,
	REGISTER_NEW_FILE_LOADING_END,
	REGISTER_NEW_FILE_START_LOADING,
} from '../actions/archivosActions/archivosActionTypes';

//Estado inicial
const INITIAL_STATE: iArchivosReducer = {
	registerFileState: {
		loading: false,
	},
	getFilesState: {
		loading: false,
	},
	filesList: [],
};

//Reducer
export const FilesReducer = (
	state: iArchivosReducer = INITIAL_STATE,
	action: FilesDispatchTypes
): iArchivosReducer => {
	switch (action.type) {
		case REGISTER_NEW_FILE_START_LOADING:
			return {
				...state,
				registerFileState: {
					loading: true,
				},
			};
		case REGISTER_NEW_FILE_LOADING_END:
			return {
				...state,
				registerFileState: {
					loading: false,
				},
			};
		case GET_FILES_START_LOADING:
			return {
				...state,
				getFilesState: {
					loading: true,
				},
			};
		case GET_FILES_LOADING_END:
			return {
				...state,
				getFilesState: {
					loading: false,
				},
			};
		case GET_FILES_LIST:
			return {
				...state,
				filesList: [...action.payload.filesList],
			};
		case CLEAN_FILES_LIST:
			return {
				...state,
				filesList: INITIAL_STATE.filesList,
			};

		default:
			return state;
	}
};
