import { Dispatch } from 'react';
import Swal from 'sweetalert2';
import { axiosClientWithToken } from '../../helpers/axios';
import { fetchConToken, fetchCheckconData } from '../../helpers/fetch';
import { Toast } from '../../helpers/swalAlert';
import moment from 'moment';
import {
	CLEAN_EMPLOYEE_EVENTS,
	CLEAN_EVENT_VALIDATION,
	EventsDispatchTypes,
	EVENTS_IS_USER_ACTIVE,
	EVENTS_IS_USER_ACTIVE_FALSE,
	EVENTS_LOADING_END,
	EVENTS_START_LOADING,
	GET_EMPLOYEE_EVENTS,
	GET_EVENT_VALIDATION,
	GET_SERVER_DAY,
	GET_SERVER_TIME,
	RESEND_ACCESS_CODE,
	SEND_ACCESS_CODE,
} from './eventsActionTypes';

// (GET) Envío de AccessCode por headers
export const sendAccessCodeCheck = (accessCode: number) => {
	return async (dispatch: Dispatch<EventsDispatchTypes>) => {
		//Loading true
		dispatch({ type: EVENTS_START_LOADING });
		//Peticion al API
		axiosClientWithToken
			.get(`employees/auth`, { headers: { accessCode: accessCode } })
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//Guardar la información
					dispatch({
						type: SEND_ACCESS_CODE,
						payload: { userConfirmation: respuesta.data.data },
					});
					//isUserActive = true
					dispatch({
						type: EVENTS_IS_USER_ACTIVE,
					});
					//Loading false
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

//Cambiar el valor del isUserActive
export const changecheckIsUserActiveFalse = () => {
	// console.log('Ejecutando getUsers');
	return async (dispatch: Dispatch<EventsDispatchTypes>) => {
		//isUserActive = false
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

//(GET) employee Events
export const getEmployeeEvents = (employeeId: number, token: string) => {
	return async (dispatch: Dispatch<EventsDispatchTypes>) => {
		//LimpiarEmployeeEvents
		dispatch({ type: CLEAN_EMPLOYEE_EVENTS });

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`employees/${employeeId}/events`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					// console.log(respuesta.data.registros);
					// const reverseArray = respuesta.data.registros.reverse();
					// console.log('arrayAlreves', reverseArray);
					dispatch({
						type: GET_EMPLOYEE_EVENTS,
						payload: { employeeEvents: respuesta.data.registros },
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

//(GET) Server Time
export const getServerTime = () => {
	return async (dispatch: Dispatch<EventsDispatchTypes>) => {
		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`schedules/time`)
			.then((respuesta) => {
				if (respuesta.status === 200) {
					dispatch({
						type: GET_SERVER_TIME,
						payload: { serverTime: respuesta.data.data },
					});
					if (moment(respuesta.data.data).format('dddd') === 'Sunday') {
						dispatch({
							type: GET_SERVER_DAY,
							payload: { serverDay: 'Domingo' },
						});
					} else if (moment(respuesta.data.data).format('dddd') === 'Monday') {
						dispatch({
							type: GET_SERVER_DAY,
							payload: { serverDay: 'Lunes' },
						});
					} else if (moment(respuesta.data.data).format('dddd') === 'Tuesday') {
						dispatch({
							type: GET_SERVER_DAY,
							payload: { serverDay: 'Martes' },
						});
					} else if (moment(respuesta.data.data).format('dddd') === 'Wednesday') {
						dispatch({
							type: GET_SERVER_DAY,
							payload: { serverDay: 'Miercoles' },
						});
					} else if (moment(respuesta.data.data).format('dddd') === 'Thursday') {
						dispatch({
							type: GET_SERVER_DAY,
							payload: { serverDay: 'Jueves' },
						});
					} else if (moment(respuesta.data.data).format('dddd') === 'Friday') {
						dispatch({
							type: GET_SERVER_DAY,
							payload: { serverDay: 'Viernes' },
						});
					} else if (moment(respuesta.data.data).format('dddd') === 'Saturday') {
						dispatch({
							type: GET_SERVER_DAY,
							payload: { serverDay: 'Sabado' },
						});
					} else {
						dispatch({
							type: GET_SERVER_DAY,
							payload: { serverDay: '' },
						});
					}
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

//(POST) employee Events
export const sendEmployeeEvent = (
	data: {},
	employeeId: number,
	token: string
) => {
	return async (dispatch: Dispatch<EventsDispatchTypes>) => {
		//Peticion Axios a la API para Registrar nuevo Event
		console.log(data);
		axiosClientWithToken
			.post(`employees/${employeeId}/events`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: `¡Registro exitoso!`,
						showConfirmButton: false,
						timer: 1500,
					});
					setTimeout(() => {
						dispatch({ type: EVENTS_IS_USER_ACTIVE_FALSE });
					}, 1500);
				} else if (respuesta.status === 204) {
					// console.log('error404');
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${respuesta.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
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
					console.log(error.response);
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

//(GET) employee Events by Dates
export const getEmployeeEventsByDates = (
	employeeId: number,
	startDate: string,
	endDate: string
) => {
	return async (dispatch: Dispatch<EventsDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';

		//LimpiarEmployeeEvents
		dispatch({ type: CLEAN_EMPLOYEE_EVENTS });

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(
				`employees/${employeeId}/events?startDate=${startDate}&endDate=${endDate}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((respuesta) => {
				if (respuesta.status === 200) {
					console.log(respuesta.data);
					const reverseArray = respuesta.data.registros.reverse();

					dispatch({
						type: GET_EMPLOYEE_EVENTS,
						payload: { employeeEvents: reverseArray },
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

//(GET) employeeEventValidation
export const employeeEventValidation = (
	employeeId: number,
	eventActionTypeId: number,
	token: string
) => {
	return async (dispatch: Dispatch<EventsDispatchTypes>) => {
		//LimpiarEmployeeEvents
		dispatch({ type: CLEAN_EVENT_VALIDATION });

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(
				`employees/${employeeId}/events?eventActionTypeId=${eventActionTypeId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((respuesta) => {
				if (respuesta.status === 200) {
					console.log('RespuestaValidacion200->', respuesta.data);

					// console.log(respuesta.data.registros);
					// const reverseArray = respuesta.data.registros.reverse();
					// console.log('arrayAlreves', reverseArray);
					dispatch({
						type: GET_EVENT_VALIDATION,
						payload: {
							eventValidation: {
								eventActionTypeId: respuesta.data.eventActionTypeId,
								eventTypeId: respuesta.data.eventTypeId,
								employeeId: respuesta.data.employeeId,
								employeeWorksToday: true,
								message: respuesta.data.message,
							},
						},
					});
				} else if (respuesta.status === 202) {
					console.log('RespuestaValidacion 202->', respuesta.data);

					dispatch({
						type: GET_EVENT_VALIDATION,
						payload: {
							eventValidation: {
								eventActionTypeId: null,
								eventTypeId: null,
								employeeId: null,
								employeeWorksToday: false,
								message: '202',
							},
						},
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
				} else if (error.response.status === 204) {
					// console.log('error404');
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡No se encontro un horario asignado!`,
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
