import { Dispatch } from 'redux';
import {
	UsersDispatchTypes,
	REGISTER_USER_START_LOADING,
	REGISTER_USER_LOADING_END,
	GET_USERS_SUCCESSFUL,
	GET_USER_BY_ID,
} from './usersActionTypes';
import Swal from 'sweetalert2';
import { fetchConToken } from '../../helpers/fetch';
import axios from 'axios';
// import * as bootstrap from 'bootstrap';

//Registro de nuevo Usuario (REGISTRO INDIVIDUAL)
export const registerNewUser = (
	name: string,
	apellidos: string,
	correo: string,
	phone: string,
	sendInvitation: boolean
) => {
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
				sendInvitation: sendInvitation,
			},
			'POST'
		);
		//.json() a la respuesta
		const body = await respuesta?.json();

		//Mensajes de Confirmación o Error
		if (body.ok) {
			dispatch({
				type: REGISTER_USER_LOADING_END,
			});
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: `¡${body.message}!`,
				showConfirmButton: false,
				timer: 2000,
			});
			//obtiene nuevamente los usuarios.
			dispatch<any>(getUsers());
			//Cerrar modal
			const miExampleModal = document.getElementById('exampleModal');
			miExampleModal?.click();

			// if (miExampleModal) {
			// 	const modal = bootstrap.Modal.getInstance(miExampleModal);
			// 	modal?.hide();
			// }
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
	// console.log('Ejecutando getUsers');
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//Peticion Fetch a la API para hacer obtener los usuarios
		const respuesta = await fetchConToken('users', {}, 'GET');
		//.json() a la respuesta
		const body = await respuesta?.json();

		if (body.ok) {
			//Se guarda los usuarios obtenidos en el Reducer
			dispatch({ type: GET_USERS_SUCCESSFUL, payload: { empleados: body.data } });
		} else {
			console.log('Algo salio mal');
			console.log(body.message);
		}
	};
};

//Obtener usuarios.
export const getUserById = (id: string) => {
	// console.log('Ejecutando getUsers');
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//Peticion Fetch a la API para hacer obtener los usuarios
		const respuesta = await fetchConToken(`users/${id}`, {}, 'GET');
		//.json() a la respuesta
		const body = await respuesta?.json();

		if (body.ok) {
			//Se guarda los usuarios obtenidos en el Reducer
			dispatch({ type: GET_USER_BY_ID, payload: { empleado: body.data } });
		} else {
			console.log('Algo salio mal');
			console.log(body.message);
		}
	};
};

//Descargar Plantilla Excel
export const downloadTamplateExcel = () => {
	try {
		axios({
			url: '',
			method: 'GET',
			responseType: 'blob',
		})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'plantilla.xlsx');
				document.body.appendChild(link);
				link.click();
			})
			.catch(function (error) {
				console.log(error);
			});
	} catch (error) {
		console.log(error);
	}
};
