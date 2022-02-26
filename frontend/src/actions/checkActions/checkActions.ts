import { Dispatch } from 'react';
import Swal from 'sweetalert2';
import { fetchConTokenCheck } from '../../helpers/fetch';
import { Toast } from '../../helpers/swalAlert';
import { CheckDispatchTypes } from './checkActionTypes';

export const sendAccessCodeCheckIn = (accessCode: number) => {
	return async (dispatch: Dispatch<CheckDispatchTypes>) => {
		//Peticion Fetch a la API para hacer CheckIn
		try {
			const respuesta = await fetchConTokenCheck(
				'employees/checkIn',
				accessCode,
				'GET'
			);
			//.json() a la respuesta
			const body = await respuesta?.json();

			//Condicion si existe un id
			if (body.ok) {
				console.log('Axeso', body.data);

				//Se asugna el cuerpo de la respuesta a usuario
				// const usuario: Usuario = body.data;
				//dispatch que guarda al usuario obtenido en el reducer
				// dispatch({
				// 	type: AUTH_SUCCESS,
				// 	payload: { usuario },
				// });
			} else {
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
