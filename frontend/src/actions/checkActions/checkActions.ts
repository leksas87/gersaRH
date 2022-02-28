import { Dispatch } from 'react';
import Swal from 'sweetalert2';
import { fetchConTokenCheck } from '../../helpers/fetch';
import { Toast } from '../../helpers/swalAlert';
import {
	CheckDispatchTypes,
	CHECK_IS_USER_ACTIVE,
	CHECK_IS_USER_ACTIVE_FALSE,
	CHECK_LOADING_END,
	CHECK_OPTION,
	CHECK_START_LOADING,
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
