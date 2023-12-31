import { Dispatch } from 'redux';
import {
	AuthDispatchTypes,
	AUTH_LOADING_FINISH,
	AUTH_LOGOUT,
	AUTH_START_LOADING,
	AUTH_SUCCESS,
	CLEAN_AVAILABLEDAYS,
	GET_AVAILABLEDAYS,
	GET_EMPLEADO_DATA,
	Usuario,
} from './loginActionsTypes';
import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../../helpers/fetch';
import { Toast } from '../../helpers/swalAlert';
import { axiosClientWithToken } from '../../helpers/axios';
import moment from 'moment';

//Login
export const startLogin = (email: string, password: string) => {
	//Falta el async al return (Agregar cuando se haga la peticion a la api)
	return async (dispatch: Dispatch<AuthDispatchTypes>) => {
		//dispatch para cambiar loading a true
		dispatch({ type: AUTH_START_LOADING });
		//Peticion Fetch a la API para hacer login

		try {
			const respuesta = await fetchSinToken(
				'users/authenticate',
				{ username: email, password: password },
				'POST'
			);
			//.json() a la respuesta
			const body = await respuesta?.json();

			//Condicion si existe un id
			if (body.ok) {
				//Se guarda el token en localStorage como gersa-tkn
				localStorage.setItem('gersa-tkn', body.data.token);
				//se obtiene fecha actual
				const time = moment().format('YYYY-MM-DD HH:mm:ss');
				// const time = new Date().getTime();

				//Se guarda el tiempo en el que se guardo el token en localStorage como gersa-tkn-init-date
				localStorage.setItem('gersa-tkn-init-date', time);
				localStorage.setItem('gersaUserName', body.data.username);
				//Se asugna el cuerpo de la respuesta a usuario
				const usuario: Usuario = body.data;

				//dispatch que guarda al usuario obtenido en el reducer
				dispatch({
					type: AUTH_SUCCESS,
					payload: { usuario },
				});

				dispatch<any>(getEmployeeDataById(body.data.id));
			} else {
				//Mensaje de error proveniente de la API
				console.log(body.message);
				Swal.fire('Error', body.message, 'error');
				dispatch({ type: AUTH_LOADING_FINISH });
			}
		} catch (error) {
			console.log(error);
			Toast.fire({
				icon: 'error',
				title: '¡Ups! Algo salió mal. <br/> Por favor, Intenta de nuevo!',
			});
			dispatch({ type: AUTH_LOADING_FINISH });
		}
	};
};

//RenovarToken
export const startChecking = () => {
	// const gersaUserName = localStorage.getItem('gersaUserName') || '';
	return async (dispatch: Dispatch<AuthDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const respuesta = await fetchConToken('users/renew', {}, 'GET');
		const body = await respuesta?.json();

		if (body) {
			//Condicion si existe un id
			if (body.ok) {
				//Se guarda el token en localStorage como gersa-tkn
				localStorage.setItem('gersa-tkn', body.data.token);
				//se obtiene fecha actual
				const time = moment().format('YYYY-MM-DD HH:mm:ss');
				// const time = new Date().getTime();
				//Se guarda el tiempo en el que se guardo el token en localStorage como gersa-tkn-init-date
				localStorage.setItem('gersa-tkn-init-date', time.toString());
				localStorage.setItem('gersaUserName', body.data.username);
				//Se asugna el cuerpo de la respuesta a usuario
				const usuario: Usuario = body.data;
				//dispatch que guarda al usuario obtenido en el reducer
				dispatch({
					type: AUTH_SUCCESS,
					payload: { usuario },
				});
				dispatch<any>(getEmployeeDataById(body.data.id));
			} else {
				//Mensaje de error proveniente de la API
				console.log(body.message);
				dispatch({ type: AUTH_LOADING_FINISH });
				//Limpia localStorage para cerrar la sesion si el toquen no fue valido
				localStorage.clear();
				dispatch({ type: AUTH_LOGOUT });
			}
		} else return;
	};
};

//LogOut
export const logOut = () => ({
	type: AUTH_LOGOUT,
});

//(GET) Obtener Empleado por ID
export const getEmployeeDataById = (id: number) => {
	return async (dispatch: Dispatch<AuthDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`employees/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//Se guarda los usuarios obtenidos en el Reducer
					dispatch({
						type: GET_EMPLEADO_DATA,
						payload: { empleadoData: respuesta.data.data },
					});
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					console.log('error500');
					// Swal.fire({
					// 	position: 'top-end',
					// 	icon: 'warning',
					// 	title: `¡Error en el servido!`,
					// 	showConfirmButton: false,
					// 	timer: 1500,
					// });
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
					console.log('error403');
					// Swal.fire({
					// 	position: 'top-end',
					// 	icon: 'error',
					// 	title: `¡${error.response.data.message}!`,
					// 	showConfirmButton: false,
					// 	timer: 1500,
					// });
				} else {
					console.log(error.response.data.message);
					// Swal.fire({
					// 	position: 'top-end',
					// 	icon: 'error',
					// 	title: `¡${error.response.data.message}!`,
					// 	showConfirmButton: false,
					// 	timer: 1500,
					// });
				}
			});
	};
};

//
//(GET) Obtener DiasDisponibles de faltas
export const getMyAvailableDays = (id: number) => {
	return async (dispatch: Dispatch<AuthDispatchTypes>) => {
		dispatch({ type: CLEAN_AVAILABLEDAYS });
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`employees/${id}/availableDays`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				// console.log(respuesta);
				if (respuesta.status === 200) {
					//Se guarda los usuarios obtenidos en el Reducer
					dispatch({
						type: GET_AVAILABLEDAYS,
						payload: { availableDays: respuesta.data.data },
					});
				}
				if (respuesta.status === 201) {
					console.log('201');
					console.log(respuesta.data);
					//Se guarda los usuarios obtenidos en el Reducer
					dispatch({
						type: GET_AVAILABLEDAYS,
						payload: { availableDays: respuesta.data.data },
					});
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					console.log('error500');
					// Swal.fire({
					// 	position: 'top-end',
					// 	icon: 'warning',
					// 	title: `¡Error en el servido!`,
					// 	showConfirmButton: false,
					// 	timer: 1500,
					// });
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
					console.log('error403-');
					// Swal.fire({
					// 	position: 'top-end',
					// 	icon: 'error',
					// 	title: `¡${error.response.data.message}!`,
					// 	showConfirmButton: false,
					// 	timer: 1500,
					// });
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

		//Peticion Fetch a la API para obtener los usuarios
		// const respuesta = await fetchConToken(`employees/${id}`, {}, 'GET');
		// //.json() a la respuesta
		// const body = await respuesta?.json();

		// if (body.ok) {
		// 	//Se guarda los usuarios obtenidos en el Reducer
		// 	dispatch({ type: GET_EMPLOYEE_BY_ID, payload: { empleadoData: body.data } });
		// } else {
		// 	console.log('Algo salio mal');
		// 	console.log(body.message);
		// }
	};
};
