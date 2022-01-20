import { Dispatch } from 'redux';
import {
	AuthDispatchTypes,
	AUTH_LOADING_FINISH,
	AUTH_LOGOUT,
	AUTH_START_LOADING,
	AUTH_SUCCESS,
	Usuario,
} from './loginActionsTypes';
import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../../helpers/fetch';
import { Toast } from '../../helpers/swalAlert';

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
				const time = new Date().getTime();
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
			} else {
				//Mensaje de error proveniente de la API
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
				const time = new Date().getTime();
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
