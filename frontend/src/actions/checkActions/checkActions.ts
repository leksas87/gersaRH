import { Dispatch } from 'react';
import Swal from 'sweetalert2';
import {
	fetchConToken,
	fetchConTokenCheck,
	fetchConTokenCheckconData,
} from '../../helpers/fetch';
import { Toast } from '../../helpers/swalAlert';
import {
	CheckDispatchTypes,
	CHECK_IS_USER_ACTIVE,
	CHECK_IS_USER_ACTIVE_FALSE,
	CHECK_LOADING_END,
	CHECK_OPTION,
	CHECK_START_LOADING,
	RESEND_ACCESS_CODE,
	SEND_ACCESS_CODE,
} from './checkActionTypes';

export const sendAccessCodeCheck = (accessCode: number, checkValue: string) => {
	return async (dispatch: Dispatch<CheckDispatchTypes>) => {
		//Peticion Fetch a la API para hacer CheckIn
		try {
			dispatch({
				type: CHECK_START_LOADING,
			});

			const respuesta = await fetchConTokenCheck(
				`employees/${checkValue}`,
				accessCode,
				'GET'
			);
			//.json() a la respuesta
			const body = await respuesta?.json();

			//Condicion si existe un id
			if (body.ok) {
				console.log('Axeso', body);

				//Se asigna el cuerpo de la respuesta a userConfirmation
				// const usuario: Usuario = body.data;
				//dispatch que guarda al usuario obtenido en el reducer
				dispatch({
					type: SEND_ACCESS_CODE,
					payload: { userConfirmation: body.data },
				});
				dispatch({
					type: CHECK_IS_USER_ACTIVE,
				});
				dispatch({
					type: CHECK_LOADING_END,
				});
			} else {
				dispatch({
					type: CHECK_LOADING_END,
				});
				//Mensaje de error proveniente de la API
				if (
					body.message ===
					'Validation error: "accesscode" must be greater than or equal to 1000'
				) {
					Swal.fire('Error', 'El código de acceso debe ser numérico', 'error');
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: `¡El código de acceso debe ser numérico!`,
						showConfirmButton: false,
						timer: 2000,
					});
					console.log('mal');
				} else {
					// Swal.fire('Error', body.message, 'error');
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: `¡${body.message}!`,
						showConfirmButton: false,
						timer: 2000,
					});
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

//Cambiar el valor del check (checkIn o CheckOut)
export const changeCheckValue = (checkValue: string) => {
	// console.log('Ejecutando getUsers');
	return async (dispatch: Dispatch<CheckDispatchTypes>) => {
		dispatch({ type: CHECK_OPTION, payload: { checkOption: checkValue } });
	};
};
//Cambiar el valor del check (checkIn o CheckOut)
export const changecheckIsUserActiveFalse = () => {
	// console.log('Ejecutando getUsers');
	return async (dispatch: Dispatch<CheckDispatchTypes>) => {
		console.log('entra a false');
		dispatch({ type: CHECK_IS_USER_ACTIVE_FALSE });
	};
};

//(POST) Guardar informacion del check
export const sendAccessCodeDataCheck = (
	checkValue: string,
	accessCode: number,
	data: {}
) => {
	return async (dispatch: Dispatch<CheckDispatchTypes>) => {
		//Peticion Fetch a la API para hacer CheckIn
		try {
			dispatch({
				type: CHECK_START_LOADING,
			});

			const respuesta = await fetchConTokenCheckconData(
				`employees/${checkValue}`,
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
						type: CHECK_LOADING_END,
					});
					dispatch({
						type: CHECK_IS_USER_ACTIVE_FALSE,
					});
				}, 2000);
			} else {
				dispatch({
					type: CHECK_LOADING_END,
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
	return async (dispatch: Dispatch<CheckDispatchTypes>) => {
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
