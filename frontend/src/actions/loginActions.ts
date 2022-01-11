import { Dispatch } from 'redux';
import {
	AuthDispatchTypes,
	AUTH_LOGOUT,
	AUTH_START_LOADING,
	AUTH_SUCCESS,
	Usuario,
} from './loginActionsTypes';
import Swal from 'sweetalert2';
import { fetchSinToken } from '../helpers/fetch';

//Login
export const startLogin = (email: string, password: string) => {
	//Falta el async al return (Agregar cuando se haga la peticion a la api)
	return async (dispatch: Dispatch<AuthDispatchTypes>) => {
		//dispatch para cambiar loading a true
		dispatch({
			type: AUTH_START_LOADING,
		});
		//Peticion Fetch a la API para hacer login
		const respuesta = await fetchSinToken(
			'users/authenticate',
			{ username: email, password: password },
			'POST'
		);
		//.json() a la respuesta
		const body = await respuesta.json();

		//Condicion si existe un id
		if (body.id) {
			//Se guarda el token en localStorage como gersa-tkn
			localStorage.setItem('gersa-tkn', body.token);
			const time = new Date().getTime();
			//Se guarda el tiempo en el que se guardo el token en localStorage como gersa-tkn-init-date
			localStorage.setItem('gersa-tkn-init-date', time.toString());
			//Se asugna el cuerpo de la respuesta a usuario
			const usuario: Usuario = body;
			//dispatch que guarda al usuario obtenido en el reducer
			dispatch({
				type: AUTH_SUCCESS,
				payload: { usuario },
			});
		} else {
			//Mensaje de error proveniente de la API
			Swal.fire('Error', body.message, 'error');
		}
	};
};

//LogOut
export const logOut = () => ({
	type: AUTH_LOGOUT,
});
