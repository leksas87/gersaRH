import { Dispatch } from 'react';
import Swal from 'sweetalert2';
import { axiosClientWithToken } from '../../helpers/axios';
import {
	fetchConToken,
	fetchConTokenCheck,
	fetchCheckconData,
} from '../../helpers/fetch';
import { Toast } from '../../helpers/swalAlert';
import {
	EventsDispatchTypes,
	EVENTS_IS_USER_ACTIVE,
	EVENTS_IS_USER_ACTIVE_FALSE,
	EVENTS_LOADING_END,
	EVENTS_OPTION,
	EVENTS_START_LOADING,
	RESEND_ACCESS_CODE,
	SEND_ACCESS_CODE,
} from './eventsActionTypes';

// (GET) Envío de AccessCode por headers
export const sendAccessCodeCheck = (accessCode: number) => {
	return async (dispatch: Dispatch<EventsDispatchTypes>) => {
		dispatch({ type: EVENTS_START_LOADING });
		//Peticion al API
		axiosClientWithToken
			.get(`employees/auth`, { headers: { accessCode: accessCode } })
			.then((respuesta) => {
				if (respuesta.status === 200) {
					dispatch({
						type: SEND_ACCESS_CODE,
						payload: { userConfirmation: respuesta.data.data },
					});
					dispatch({
						type: EVENTS_IS_USER_ACTIVE,
					});
					dispatch({ type: EVENTS_LOADING_END });
				}
			})
			.catch((error) => {
				if (error.response.status === 400) {
					dispatch({ type: EVENTS_LOADING_END });
					// console.log('error400');
					console.log(error.response.data.message);
					if (
						error.response.data.message ===
						'Validation error: "accesscode" must be greater than or equal to 1000'
					) {
						Swal.fire({
							position: 'top-end',
							icon: 'error',
							title: 'El código de acceso debe ser numérico',
							showConfirmButton: false,
							timer: 1500,
						});
					} else {
						Swal.fire({
							position: 'top-end',
							icon: 'error',
							title: 'Empleado no encontrado',
							showConfirmButton: false,
							timer: 1500,
						});
					}
				} else if (error.response.status === 404) {
					dispatch({ type: EVENTS_LOADING_END });
					// console.log('error404');

					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: 'El código de acceso es incorrecto',
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 500) {
					dispatch({ type: EVENTS_LOADING_END });
					// console.log('error500');
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
					dispatch({ type: EVENTS_LOADING_END });
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

//Cambiar el valor del check (checkIn o CheckOut)
export const changecheckIsUserActiveFalse = () => {
	// console.log('Ejecutando getUsers');
	return async (dispatch: Dispatch<EventsDispatchTypes>) => {
		console.log('entra a false');
		dispatch({ type: EVENTS_IS_USER_ACTIVE_FALSE });
	};
};

//(POST) Guardar informacion del check
export const sendAccessCodeDataCheck = (accessCode: number, data: {}) => {
	return async (dispatch: Dispatch<EventsDispatchTypes>) => {
		//Peticion Fetch a la API para hacer CheckIn

		try {
			dispatch({
				type: EVENTS_START_LOADING,
			});

			const respuesta = await fetchCheckconData(
				'employees/check',
				accessCode,
				data,
				'POST'
			);
			//.json() a la respuesta
			const body = await respuesta?.json();

			//Condicion si existe un id
			if (body.ok) {
				console.log('SAVEDATA', body);

				Swal.fire({
					position: 'center',
					icon: 'success',
					title: `¡Registro Exitoso!`,
					showConfirmButton: false,
					timer: 2000,
				});
				setTimeout(() => {
					dispatch({
						type: EVENTS_LOADING_END,
					});
					dispatch({
						type: EVENTS_IS_USER_ACTIVE_FALSE,
					});
				}, 2000);
			} else {
				dispatch({
					type: EVENTS_LOADING_END,
				});
				//Mensaje de error proveniente de la API
				if (
					body.message ===
					'Validation error: "accesscode" must be greater than or equal to 1000'
				) {
					Swal.fire('Error', 'El código de acceso debe ser numérico', 'error');
					console.log('mal');
				} else {
					Swal.fire('Error', body.message, 'error');
					console.log('mal');
				}
				// dispatch({ type: AUTH_LOADING_FINISH });
			}
		} catch (error) {
			console.log(error);
			Toast.fire({
				icon: 'error',
				title: '¡Ups! Algo salió mal. <br/> Por favor, Intenta de nuevo!',
			});
			// dispatch({ type: AUTH_LOADING_FINISH });
		}
	};
};

//(GET) Reenviar codigo de Acceso al empleado
export const reSendAccessCode = (userId: number) => {
	return async (dispatch: Dispatch<EventsDispatchTypes>) => {
		//Peticion Fetch a la API para hacer CheckIn
		try {
			const respuesta = await fetchConToken(
				`employees/${userId}/accessCode`,
				{},
				'GET'
			);
			//.json() a la respuesta
			const body = await respuesta?.json();

			//Condicion si existe un id
			if (body.ok) {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: `¡Código de acceso, Reenviado!`,
					showConfirmButton: false,
					timer: 2000,
				});
				dispatch({ type: RESEND_ACCESS_CODE });
			} else {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: `¡${body.message}!`,
					showConfirmButton: false,
					timer: 2000,
				});
			}
		} catch (error) {
			console.log(error);
			Toast.fire({
				icon: 'error',
				title: '¡Ups! Algo salió mal. <br/> Por favor, Intenta de nuevo!',
			});
			// dispatch({ type: AUTH_LOADING_FINISH });
		}
	};
};

// (GET) Obtener eventos del empleado by employeeId
export const getUserEvents = (employeeId: number) => {
	return async (dispatch: Dispatch<EventsDispatchTypes>) => {
		dispatch({ type: EVENTS_START_LOADING });
		//Peticion al API
		axiosClientWithToken
			.get(`employees/${employeeId}/events`)
			.then((respuesta) => {
				if (respuesta.status === 200) {
					console.log(respuesta.status);
					// dispatch({
					// 	type: SEND_ACCESS_CODE,
					// 	payload: { userConfirmation: respuesta.data.data },
					// });
					dispatch({ type: EVENTS_LOADING_END });
				}
			})
			.catch((error) => {
				if (error.response.status === 400) {
					dispatch({ type: EVENTS_LOADING_END });
					// console.log('error400');
					console.log(error.response.data.message);
					if (
						error.response.data.message ===
						'Validation error: "accesscode" must be greater than or equal to 1000'
					) {
						Swal.fire({
							position: 'top-end',
							icon: 'error',
							title: 'El código de acceso debe ser numérico',
							showConfirmButton: false,
							timer: 1500,
						});
					} else {
						Swal.fire({
							position: 'top-end',
							icon: 'error',
							title: 'Empleado no encontrado',
							showConfirmButton: false,
							timer: 1500,
						});
					}
				} else if (error.response.status === 404) {
					dispatch({ type: EVENTS_LOADING_END });
					// console.log('error404');

					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: 'El código de acceso es incorrecto',
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 500) {
					dispatch({ type: EVENTS_LOADING_END });
					// console.log('error500');
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
					dispatch({ type: EVENTS_LOADING_END });
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
