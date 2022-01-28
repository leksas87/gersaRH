import { Dispatch } from 'redux';
import Swal from 'sweetalert2';
import { fetchSinToken } from '../../helpers/fetch';
import {
	PassDispatchTypes,
	confirmationUser,
	VALIDATION_TOKEN_SUCCESS,
	PASSWORD_UPDATED,
} from './passActionsTypes';

//Validar token recibido por mail
export const validationToken = (token: any) => {
	return async (dispatch: Dispatch<PassDispatchTypes>) => {
		//Peticion Fetch a la API para hacer login
		try {
			const respuesta = await fetchSinToken(`users/confirmation/${token}`, {});
			//.json() a la respuesta
			const body = await respuesta?.json();

			//Condicion si existe un id
			if (body.ok) {
				//Se asugna el cuerpo de la respuesta a usuario
				const confirmationUser: confirmationUser = body.data;
				//dispatch que guarda al usuario obtenido en el reducer
				dispatch({
					type: VALIDATION_TOKEN_SUCCESS,
					payload: { confirmationUser },
				});
			} else {
				//Mensaje de error proveniente de la API
				console.log('OKFALSE');
				console.log(body.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//Envio de confirmacion de Contraseña o Nueva Contraseña
export const sendPassword = (
	tkn: string,
	userName: string,
	password: string
) => {
	return async (dispatch: Dispatch<PassDispatchTypes>) => {
		//Peticion Fetch a la API para hacer login
		try {
			const respuesta = await fetchSinToken(
				`users/confirmation/`,
				{
					username: userName,
					token: tkn,
					password: password,
				},
				'POST'
			);
			//.json() a la respuesta
			const body = await respuesta?.json();

			//Condicion si existe un id
			if (body.ok) {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: `¡Registro Exitoso!`,
					showConfirmButton: false,
					timer: 2000,
				});
				setTimeout(() => {
					dispatch({ type: PASSWORD_UPDATED });
				}, 2000);
			} else {
				//Mensaje de error proveniente de la API
				Swal.fire({
					position: 'bottom',
					icon: 'error',
					title: `Algo salió mal, por favor inténtelo de nuevo`,
					showConfirmButton: false,
					timer: 2000,
				});
				console.log(body.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//Solicitud de nueva contraseña
export const passwordRequestNew = (userName: string) => {
	return async (dispatch: Dispatch<PassDispatchTypes>) => {
		//Peticion Fetch a la API para hacer login
		try {
			const respuesta = await fetchSinToken(
				`users/recuperacion/`,
				{ username: userName },
				'POST'
			);
			//.json() a la respuesta
			const body = await respuesta?.json();

			//Condicion si existe un id
			if (body.ok) {
				console.log('Solicitud detectada');
			} else {
				console.log('Solicitud detectada');
				//Mensaje de error proveniente de la API
				// console.log(body.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
};
