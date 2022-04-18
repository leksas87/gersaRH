import { Dispatch } from 'redux';
import Swal from 'sweetalert2';
import { axiosClientWithToken } from '../../helpers/axios';
import {
	CLEAN_REPORTS_LIST,
	GET_REPORTS_LIST,
	GET_REPORTS_LOADING_END,
	GET_REPORTS_START_LOADING,
	REGISTER_NEW_REPORT_LOADING_END,
	REGISTER_NEW_REPORT_START_LOADING,
	ReportsDispatchTypes,
} from './reportsActionTypes';

//(POST) Registro de nuevo report
export const registerNewReport = (
	data: {},
	employeeId: number,
	modalId: string
) => {
	return async (dispatch: Dispatch<ReportsDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true
		dispatch({ type: REGISTER_NEW_REPORT_START_LOADING });
		// console.log('recibiendo', data, employeeId);
		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.post(`employees/${employeeId}/reports`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					console.log(respuesta.data);
					//dispatch para cambiar loading a false
					dispatch({ type: REGISTER_NEW_REPORT_LOADING_END });
					//Mostrar Alerta
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: `¡Registro exitoso!`,
						showConfirmButton: false,
						timer: 2000,
					});
					// Cerrar modal
					const asignScheduleModal = document.getElementById(modalId);
					asignScheduleModal?.click();

					if (modalId === 'modalNuevoReporteAdministrativo') {
						setTimeout(() => {
							dispatch<any>(getReportList());
						}, 2000);
					} else if (modalId === 'modalNuevoReporteEmpleado') {
						setTimeout(() => {
							dispatch<any>(getReportListByEmployeeId(employeeId));
						}, 2000);
					}
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					// console.log('error500');
					dispatch({ type: REGISTER_NEW_REPORT_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 400) {
					// console.log('error400');
					dispatch({ type: REGISTER_NEW_REPORT_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 403) {
					// console.log('error403');
					dispatch({ type: REGISTER_NEW_REPORT_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
					dispatch({ type: REGISTER_NEW_REPORT_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
	};
};
//(GET) obtenerReportsList
export const getReportList = () => {
	return async (dispatch: Dispatch<ReportsDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true
		dispatch({ type: GET_REPORTS_START_LOADING });
		dispatch({ type: CLEAN_REPORTS_LIST });
		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`employees/reports`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//dispatch para cambiar loading a false
					dispatch({ type: GET_REPORTS_LOADING_END });
					dispatch({
						type: GET_REPORTS_LIST,
						payload: { reportsList: respuesta.data.data },
					});

					// setTimeout(() => {
					// 	dispatch<any>(getRequestsByEmployeeId(employeeId));
					// }, 2000);
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					// console.log('error500');
					dispatch({ type: GET_REPORTS_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 400) {
					// console.log('error400');
					dispatch({ type: GET_REPORTS_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 403) {
					// console.log('error403');
					dispatch({ type: GET_REPORTS_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
					dispatch({ type: GET_REPORTS_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
	};
};
//(GET) obtenerReportsListByEmployeeId
export const getReportListByEmployeeId = (employeeId: number) => {
	return async (dispatch: Dispatch<ReportsDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true
		dispatch({ type: GET_REPORTS_START_LOADING });
		dispatch({ type: CLEAN_REPORTS_LIST });
		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`employees/${employeeId}/reports`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//dispatch para cambiar loading a false
					dispatch({ type: GET_REPORTS_LOADING_END });
					dispatch({
						type: GET_REPORTS_LIST,
						payload: { reportsList: respuesta.data.data },
					});

					// setTimeout(() => {
					// 	dispatch<any>(getRequestsByEmployeeId(employeeId));
					// }, 2000);
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					// console.log('error500');
					dispatch({ type: GET_REPORTS_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 400) {
					// console.log('error400');
					dispatch({ type: GET_REPORTS_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 403) {
					// console.log('error403');
					dispatch({ type: GET_REPORTS_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
					dispatch({ type: GET_REPORTS_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
	};
};
//(PATCH) updateReportByID
export const patchReportListById = (reportId: number, data: {}) => {
	return async (dispatch: Dispatch<ReportsDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true
		dispatch({ type: GET_REPORTS_START_LOADING });
		// dispatch({ type: CLEAN_REPORTS_LIST });
		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.patch(`employees/reports/${reportId}`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//dispatch para cambiar loading a false
					dispatch({ type: GET_REPORTS_LOADING_END });
					console.log(respuesta.data);
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: `¡Cambio de estado exitoso!`,
						showConfirmButton: false,
						timer: 2000,
					});

					setTimeout(() => {
						dispatch<any>(getReportList());
					}, 2000);
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					// console.log('error500');
					dispatch({ type: GET_REPORTS_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 400) {
					// console.log('error400');
					dispatch({ type: GET_REPORTS_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 403) {
					// console.log('error403');
					dispatch({ type: GET_REPORTS_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
					dispatch({ type: GET_REPORTS_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
	};
};
