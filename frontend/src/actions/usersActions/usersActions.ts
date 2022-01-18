import { Dispatch } from 'redux';
import {
	UsersDispatchTypes,
	REGISTER_USER_START_LOADING,
	REGISTER_USER_LOADING_END,
	GET_USERS_SUCCESSFUL,
} from './usersActionTypes';
import Swal from 'sweetalert2';
import { fetchConToken } from '../../helpers/fetch';

//Registro de nuevo Usuario
export const registerNewUser = (
	name: string,
	apellidos: string,
	correo: string,
	phone: string
) => {
	console.log(name, apellidos, correo, phone, 'RECIBIENDO');
	//Falta el async al return (Agregar cuando se haga la peticion a la api)
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//dispatch para cambiar loading a true
		dispatch({
			type: REGISTER_USER_START_LOADING,
		});

		//Peticion Fetch a la API para hacer login
		const respuesta = await fetchConToken(
			'users/register',
			{
				firstName: name,
				lastName: apellidos,
				username: correo,
				phone: phone,
			},
			'POST'
		);
		//.json() a la respuesta
		const body = await respuesta.json();

		//Mensajes de Confirmación o Error
		if (body.message === 'Registro exitoso') {
			dispatch({
				type: REGISTER_USER_LOADING_END,
			});
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: '¡Registro exitoso!',
				showConfirmButton: false,
				timer: 1500,
			});
		} else {
			dispatch({
				type: REGISTER_USER_LOADING_END,
			});
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: body.message,
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};
};

//Obtener usuarios.
export const getUsers = () => {
	console.log('Ejecutando getUsers');
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//Peticion Fetch a la API para hacer obtener los usuarios
		const respuesta = await fetchConToken('users', {}, 'GET');
		//.json() a la respuesta
		const body = await respuesta.json();

		console.log(body);
		//Agregar condicion sí (body.ok){}else{}

		//Se guarda los usuarios obtenidos en el Reducer
		dispatch({ type: GET_USERS_SUCCESSFUL, payload: { empleados: body } });
	};
};
