export const REGISTER_NEW_REPORT_START_LOADING =
	'registerNewReportStartLoading';
export const REGISTER_NEW_REPORT_LOADING_END = 'registerNewReportLoadingEnd';
export const GET_REPORTS_START_LOADING = 'getReportsStartLoading';
export const GET_REPORTS_LOADING_END = 'getReportsLoadingEnd';
export const GET_REPORTS_LIST = 'getReportsList';
export const CLEAN_REPORTS_LIST = 'cleanReportsList';

//Interfaz para reportsReducer.
export interface iReportsReducer {
	registerState: {
		loading: boolean;
	};
	getReportsState: {
		loading: boolean;
	};
	reportsList: iReportsList[];
}
//Interfaz para requestList.
export interface iReportsList {
	id: number | null;
	employeeId: number | null;
	fechaCreacion: string;
	descripcionEmpleado: string;
	asunto: string;
	anonimo: boolean;
	statusId: number;
	employee: {
		id: number;
		supervisor: string;
		lugarDeTrabajo: string;
		User: {
			firstName: string;
			lastName: string;
		};
	};
	reportType: string | null;
}

//Charging Report Start Loading
export interface GetReportsStartLoading {
	type: typeof GET_REPORTS_START_LOADING;
}
//Charging  Reports Loading End
export interface GetReportsLoadingEnd {
	type: typeof GET_REPORTS_LOADING_END;
}
//Charging Report Start Loading
export interface RegisterNewReportStartLoading {
	type: typeof REGISTER_NEW_REPORT_START_LOADING;
}
//Charging  Report Loading End
export interface RegisterNewReportLoadingEnd {
	type: typeof REGISTER_NEW_REPORT_LOADING_END;
}
//Obtener RequestList
export interface GetReportsList {
	type: typeof GET_REPORTS_LIST;
	payload: {
		reportsList: iReportsList[];
	};
}
//Limpiar RequestList
export interface CleanReportsList {
	type: typeof CLEAN_REPORTS_LIST;
}

//Types para el dispatch
export type ReportsDispatchTypes =
	| CleanReportsList
	| GetReportsList
	| RegisterNewReportLoadingEnd
	| RegisterNewReportStartLoading
	| GetReportsLoadingEnd
	| GetReportsStartLoading;
