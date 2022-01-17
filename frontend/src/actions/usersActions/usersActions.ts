import { Dispatch } from 'redux';
import {
	UsersDispatchTypes,
	REGISTER_FAIL,
	REGISTER_START_LOADING,
	REGISTER_SUCCESS,
	Usuario,
} from './usersActionTypes';
import Swal from 'sweetalert2';
import { fetchConToken } from '../../helpers/fetch';

//Login

export const startRegister = (
	name: string,
	apellidos: string,
	correo: string,
	phone: string
) => {
	//Falta el async al return (Agregar cuando se haga la peticion a la api)
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//dispatch para cambiar loading a true
		dispatch({
			type: REGISTER_START_LOADING,
		});
		//Peticion Fetch a la API para hacer login
		const respuesta = await fetchConToken(
			'users/register',
			{
				firstName: name,
				lastName: apellidos,
				userName: correo,
				phone: phone,
			},
			'POST'
		);
		//.json() a la respuesta
		const body = await respuesta.json();

		/*
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
		}*/
	};
};
