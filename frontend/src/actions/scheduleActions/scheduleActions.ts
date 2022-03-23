import { Dispatch } from 'redux';
import Swal from 'sweetalert2';
import { axiosClientWithToken } from '../../helpers/axios';
import {
	iNewSchedule,
	REGISTER_NEW_SCHEDULE_LOADING_END,
	REGISTER_NEW_SCHEDULE_START_LOADING,
	SchedulesDispatchTypes,
} from './scheduleActionsTypes';

export const example = () => {
	console.log('example');
};

//(POST) Registro de nuevo schedule
export const registerNewSchedule = (data: iNewSchedule) => {
	return async (dispatch: Dispatch<SchedulesDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true
		dispatch({ type: REGISTER_NEW_SCHEDULE_START_LOADING });

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.post(`schedules/`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//dispatch para cambiar loading a false
					dispatch({ type: REGISTER_NEW_SCHEDULE_LOADING_END });
					//Mostrar Alerta
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: `¡${respuesta.data.message}!`,
						showConfirmButton: false,
						timer: 2000,
					});
					//Cerrar modal
					const newScheduleModal = document.getElementById('ModalNuevoHorario');
					newScheduleModal?.click();
				}
			})
			.catch((error) => {
				if (error.response.status == 500) {
					// console.log('error500');
					dispatch({ type: REGISTER_NEW_SCHEDULE_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status == 400) {
					// console.log('error400');
					dispatch({ type: REGISTER_NEW_SCHEDULE_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: 'Algo salio mal',
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status == 403) {
					// console.log('error403');
					dispatch({ type: REGISTER_NEW_SCHEDULE_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
					dispatch({ type: REGISTER_NEW_SCHEDULE_LOADING_END });
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
