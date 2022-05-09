export const REGISTER_NEW_FILE_START_LOADING = 'registerNewFileStartLoading';
export const REGISTER_NEW_FILE_LOADING_END = 'registerNewFileLoadingEnd';

export const GET_FILES_START_LOADING = 'getFilesStartLoading';
export const GET_FILES_LOADING_END = 'getFilesLoadingEnd';

export const GET_FILES_LIST = 'getFilesList';
export const CLEAN_FILES_LIST = 'cleanFilesList';

//Interfaz para archivos reducer.
export interface iArchivosReducer {
	registerFileState: {
		loading: boolean;
	};
	getFilesState: {
		loading: boolean;
	};
	filesList: iFileList[];
}
//Interfaz para requestList.
export interface iFileList {
	id: number;
	employeeId: number;
	employeeIdUpload: number;
	isFileActive: boolean;
	fechaCreacion: string;
	nombreArchivo: string;
	ubicacionCarpeta: string;
	url: string;
	tipoDocumento: number;
}

//Charging Files Start Loading
export interface GetFilesStartLoading {
	type: typeof GET_FILES_START_LOADING;
}
//Charging  Files Loading End
export interface GetFilesLoadingEnd {
	type: typeof GET_FILES_LOADING_END;
}
//Charging File Start Loading
export interface RegisterNewFileStartLoading {
	type: typeof REGISTER_NEW_FILE_START_LOADING;
}
//Charging  File Loading End
export interface RegisterNewFileLoadingEnd {
	type: typeof REGISTER_NEW_FILE_LOADING_END;
}

//Obtener RequestList
export interface GetFilesList {
	type: typeof GET_FILES_LIST;
	payload: {
		filesList: iFileList[];
	};
}
//Limpiar RequestList
export interface CleanFilesList {
	type: typeof CLEAN_FILES_LIST;
}

//Types para el dispatch
export type FilesDispatchTypes =
	| GetFilesStartLoading
	| GetFilesLoadingEnd
	| RegisterNewFileStartLoading
	| RegisterNewFileLoadingEnd
	| GetFilesList
	| CleanFilesList;
