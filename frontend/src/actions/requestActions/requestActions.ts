import { Dispatch } from 'redux';
import Swal from 'sweetalert2';
import { axiosClientWithToken } from '../../helpers/axios';
import {
	CLEAN_REQUEST_LIST,
	GET_REQUEST_LIST,
	GET_REQUEST_LOADING_END,
	GET_REQUEST_START_LOADING,
	REGISTER_NEW_REQUEST_LOADING_END,
	REGISTER_NEW_REQUEST_START_LOADING,
	RequestDispatchTypes,
} from './requestActionTypes';

//(POST) Registro de nuevo request
export const registerNewRequest = (
	data: {},
	employeeId: number,
	modalId: string
) => {
	return async (dispatch: Dispatch<RequestDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true
		dispatch({ type: REGISTER_NEW_REQUEST_START_LOADING });
		// console.log('recibiendo', data, employeeId);
		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.post(`employees/${employeeId}/request`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					// obtener lista Request
					// dispatch<any>(getSchedules());
					// dispatch<any>(getSchedulesByUserId(data.employeeId));
					// console.log(respuesta.data);

					//dispatch para cambiar loading a false
					dispatch({ type: REGISTER_NEW_REQUEST_LOADING_END });
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

					setTimeout(() => {
						dispatch<any>(getRequestsByEmployeeId(employeeId));
					}, 2000);
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					// console.log('error500');
					dispatch({ type: REGISTER_NEW_REQUEST_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 400) {
					// console.log('error400');
					dispatch({ type: REGISTER_NEW_REQUEST_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 403) {
					// console.log('error403');
					dispatch({ type: REGISTER_NEW_REQUEST_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
					dispatch({ type: REGISTER_NEW_REQUEST_LOADING_END });
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
//(GET) Registros de request byEmployeeId
export const getRequestsByEmployeeId = (employeeId: number) => {
	return async (dispatch: Dispatch<RequestDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true
		dispatch({ type: GET_REQUEST_START_LOADING });
		//Se limpia la lsita de requests
		dispatch({ type: CLEAN_REQUEST_LIST });
		// console.log('recibiendo', data, employeeId);
		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`employees/${employeeId}/request`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//dispatch para cambiar loading a false
					dispatch({ type: GET_REQUEST_LOADING_END });
					dispatch({
						type: GET_REQUEST_LIST,
						payload: { requestList: respuesta.data.data },
					});
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					// console.log('error500');
					dispatch({ type: GET_REQUEST_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 400) {
					console.log('error400');
					dispatch({ type: GET_REQUEST_LOADING_END });
				} else if (error.response.status === 403) {
					console.log('error403');
					dispatch({ type: GET_REQUEST_LOADING_END });
				} else {
					dispatch({ type: GET_REQUEST_LOADING_END });
				}
			});
	};
};
