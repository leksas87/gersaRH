import { Dispatch } from 'redux';
import Swal from 'sweetalert2';
import { axiosClientWithToken } from '../../helpers/axios';
import { getUserById } from '../usersActions/usersActions';
import {
	CLEAN_EMPLOYEES_BY_PARAMS,
	CLEAN_EMPLOYEE_LISTINVITATION,
	GET_EMPLOYEES_BY_PARAMS,
	GET_EMPLOYEES_BY_PARAMS_LOADING_END,
	GET_EMPLOYEES_BY_PARAMS_START_LOADING,
	GET_EMPLOYEE_LISTINVITATION,
	REGISTER_TIME_REQUEST_LOADING_END,
	REGISTER_TIME_REQUEST_START_LOADING,
	TimeRequestDispatchTypes,
} from './timeRequestActionTypes';

//(GET) Array de EmpleadosByParams
export const getEmployeesByParams = (busqueda: string) => {
	return async (dispatch: Dispatch<TimeRequestDispatchTypes>) => {
		//dispatch para limpiar el reducer
		dispatch({ type: CLEAN_EMPLOYEES_BY_PARAMS });
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true
		dispatch({ type: GET_EMPLOYEES_BY_PARAMS_START_LOADING });

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`employees?name=${busqueda}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//dispatch para cambiar loading a false
					dispatch({ type: GET_EMPLOYEES_BY_PARAMS_LOADING_END });

					dispatch({
						type: GET_EMPLOYEES_BY_PARAMS,
						payload: { employeesParams: respuesta.data.employee },
					});
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					// console.log('error500');
					dispatch({ type: GET_EMPLOYEES_BY_PARAMS_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 400) {
					// console.log('error400');
					dispatch({ type: GET_EMPLOYEES_BY_PARAMS_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: 'Algo salio mal',
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 403) {
					// console.log('error403');
					dispatch({ type: GET_EMPLOYEES_BY_PARAMS_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 404) {
					// console.log('error404');
					dispatch({ type: GET_EMPLOYEES_BY_PARAMS_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
					dispatch({ type: GET_EMPLOYEES_BY_PARAMS_LOADING_END });
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

//(POST) Array de Schedules
export const registerNewTimeRequest = (
	data: {
		employeeId: number;
		fechaAsignacion: string;
		horaAsignacion: string;
		LugarApoyo: string;
		statusId: number;
		descripcion: string;
		employeeIdRequest: number;
	},
	employeeId: number
) => {
	return async (dispatch: Dispatch<TimeRequestDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true
		dispatch({ type: REGISTER_TIME_REQUEST_START_LOADING });

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.post(`employees/${employeeId}/timeRequest`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//dispatch para cambiar loading a false
					dispatch({ type: REGISTER_TIME_REQUEST_LOADING_END });

					dispatch<any>(getEmployeeForEmployeeListById(employeeId));
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: `¡${respuesta.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					// console.log('error500');
					dispatch({ type: REGISTER_TIME_REQUEST_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 400) {
					// console.log('error400');
					dispatch({ type: REGISTER_TIME_REQUEST_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: 'Algo salio mal',
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 403) {
					// console.log('error403');
					dispatch({ type: REGISTER_TIME_REQUEST_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 404) {
					// console.log('error404');
					dispatch({ type: REGISTER_TIME_REQUEST_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
					dispatch({ type: REGISTER_TIME_REQUEST_LOADING_END });
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

//(GET) Array de EmpleadosByParams
export const getUserForEmployeeListById = (id: number) => {
	return async (dispatch: Dispatch<TimeRequestDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`users/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					dispatch({
						type: GET_EMPLOYEE_LISTINVITATION,
						payload: { employeeListInvitation: respuesta.data.data },
					});
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					// console.log('error500');
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 400) {
					// console.log('error400');
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: 'Algo salio mal',
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 403) {
					// console.log('error403');
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 404) {
					// console.log('error404');
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
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
//(GET) Array de EmpleadosByParams
export const getEmployeeForEmployeeListById = (id: number) => {
	return async (dispatch: Dispatch<TimeRequestDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`employees/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					dispatch<any>(getUserForEmployeeListById(respuesta.data.data.userId));
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					// console.log('error500');
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 400) {
					// console.log('error400');
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: 'Algo salio mal',
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 403) {
					// console.log('error403');
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 404) {
					// console.log('error404');
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
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
// Limpiar EmployeeList
export const cleanEmployeeList = () => {
	return async (dispatch: Dispatch<TimeRequestDispatchTypes>) => {
		dispatch({ type: CLEAN_EMPLOYEE_LISTINVITATION });
	};
};
