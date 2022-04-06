import { Dispatch } from 'redux';
import {
	UsersDispatchTypes,
	REGISTER_USER_START_LOADING,
	REGISTER_USER_LOADING_END,
	GET_USERS_SUCCESSFUL,
	GET_USER_BY_ID,
	DELETE_ACCESS_TO_USER_BY_ID,
	TERMINATE_USER_BY_ID,
	CHANGE_TABLE_PATH,
	GET_EMPLOYEE_BY_ID,
	CHANGE_ROLL_TO_USER_BY_ID,
} from './usersActionTypes';
import Swal from 'sweetalert2';
import {
	fetchConToken,
	fetchMultipartFormDataConToken,
} from '../../helpers/fetch';
import axios from 'axios';
import { axiosClientWithToken } from '../../helpers/axios';
// import { axiosClient } from '../../helpers/axios';
// import * as bootstrap from 'bootstrap';

//(POST) Registro de nuevo Usuario (REGISTRO INDIVIDUAL)
export const registerNewUser = (
	name: string,
	apellidos: string,
	correo: string,
	phone: string,
	sendInvitation: boolean
) => {
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

//(GET) Obtener todos usuarios.
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

//Obtener usuario por ID
export const getUserById = (id: string) => {
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//Peticion Fetch a la API para obtener los usuarios
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
//(GET) Obtener Empleado por ID
export const getEmployeeById = (id: string) => {
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//Peticion Fetch a la API para obtener los usuarios
		const respuesta = await fetchConToken(`employees/${id}`, {}, 'GET');
		//.json() a la respuesta
		const body = await respuesta?.json();

		if (body.ok) {
			//Se guarda los usuarios obtenidos en el Reducer
			dispatch({ type: GET_EMPLOYEE_BY_ID, payload: { empleadoData: body.data } });
		} else {
			console.log('Algo salio mal');
			console.log(body.message);
		}
	};
};

//Descargar Plantilla Excel desde Servidor
export const downloadTamplateExcelFromServer = () => {
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

//Descargar Plantilla Excel desde Front
export const downloadTamplateExcel = () => {
	const downloadInstance = document.createElement('a');
	downloadInstance.href =
		'http://localhost:3000/assets/tamplates/PlantillaEmpleadosGersaRH.xlsx';
	downloadInstance.target = '_blank';
	downloadInstance.download = 'plantillaImportarEmpleadosGersaRH';

	document.body.appendChild(downloadInstance);
	downloadInstance.click();
	document.body.removeChild(downloadInstance);
};

// (GET) Reenviar Invitacion individual by username
export const resendInvitationByuserName = (correo: string) => {
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//Peticion Fetch a la API para enviar la invitación al mail
		const respuesta = await fetchConToken(
			`users/sendinvitation/${correo}`,
			{},
			'GET'
		);
		//.json() a la respuesta
		const body = await respuesta?.json();

		//Mensajes de Confirmación o Error
		if (body.ok) {
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: `¡${body.message}!`,
				showConfirmButton: false,
				timer: 2000,
			});
		} else {
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

//(PUT -users )Eliminar acceso a usuario por ID
export const deleteAccestoUserById = (id: number) => {
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//Peticion Fetch a la API para modificar el accesso
		const respuesta = await fetchConToken(
			`users/${id}`,
			{ active: false },
			'PATCH'
		);
		//.json() a la respuesta
		const body = await respuesta?.json();

		if (body.ok) {
			//Se hace la modificacion del usuario en el Reducer
			dispatch({ type: DELETE_ACCESS_TO_USER_BY_ID });
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: '¡Listo!',
				showConfirmButton: false,
				timer: 2000,
			});
			//Cerrar modal
			const miExampleModal = document.getElementById('ModalEliminarAcceso');
			miExampleModal?.click();
		} else {
			console.log(body.message);
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: body.message,
				showConfirmButton: false,
				timer: 1500,
			});
			//Cerrar modal
			const miExampleModal = document.getElementById('ModalEliminarAcceso');
			miExampleModal?.click();
		}
	};
};

//(PATCH) Cambiar roll a empleado
export const changeRollToUser = (userId: number, rollTypeId: number) => {
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.patch(
				`users/${userId}`,
				{ rollTypeId: rollTypeId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((respuesta) => {
				if (respuesta.status === 200) {
					dispatch({
						type: CHANGE_ROLL_TO_USER_BY_ID,
						payload: { rollTypeId: respuesta.data.data.rollTypeId },
					});
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: '¡Listo!',
						showConfirmButton: false,
						timer: 2000,
					});
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					// console.log('error500');
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
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
					// console.log('error403');
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
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
	};
};

//(PATCH -users ) Finalizar a usuario por ID
export const terminateUserById = (id: number) => {
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//Peticion Fetch a la API para modificar el accesso
		const respuesta = await fetchConToken(
			`users/${id}`,
			{
				isEmployeeActive: false,
				active: false,
			},
			'PATCH'
		);
		//.json() a la respuesta
		const body = await respuesta?.json();

		if (body.ok) {
			//Se hace la modificacion del usuario en el Reducer
			dispatch({ type: TERMINATE_USER_BY_ID });
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: '¡Listo!',
				showConfirmButton: false,
				timer: 2000,
			});
			//Cerrar modal
			const miExampleModal = document.getElementById('ModalFinalizarEmpleado');
			miExampleModal?.click();
		} else {
			console.log(body.message);
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: body.message,
				showConfirmButton: false,
				timer: 1500,
			});
			//Cerrar modal
			const miExampleModal = document.getElementById('ModalFinalizarEmpleado');
			miExampleModal?.click();
		}
	};
};

//Cambiar tablePath
export const changePath = (path: string) => {
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//Se hace la modificacion del tablePath en el Reducer
		dispatch({ type: CHANGE_TABLE_PATH, payload: path });
	};
};

//(POST) Importar Usuarios (REGISTRO VIA EXCEL) Enviando Invitaciones al Mail
export const registerNewUsersSend = (formdata: FormData, endpoint: string) => {
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//dispatch para cambiar loading a true
		dispatch({
			type: REGISTER_USER_START_LOADING,
		});

		//Peticion Fetch a la API para hacer login
		const respuesta = await fetchMultipartFormDataConToken(
			// 'users/registerFile/donotsend',
			`users/registerFile/${endpoint}`,
			formdata,
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
			const miExampleModal = document.getElementById('ModalSeleccionarExcel');
			miExampleModal?.click();
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

//(GET )Enviar invitacion a todos los pendientes.
export const sendInvitationsMassive = () => {
	// console.log('Ejecutando getUsers');
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//Peticion Fetch a la API para hacer obtener los usuarios
		const respuesta = await fetchConToken('users/sendinvitation', {}, 'GET');
		//.json() a la respuesta
		const body = await respuesta?.json();

		if (body.ok) {
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: `¡${body.message}!`,
				showConfirmButton: false,
				timer: 2000,
			});
		} else {
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

//(PUT -Employee ) Modificar datos del usuario
export const updateEmployeeById = (id: number, formData: {}) => {
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//Peticion Fetch a la API para modificar el accesso
		const respuesta = await fetchConToken(`employees/${id}`, formData, 'PUT');
		//.json() a la respuesta
		const body = await respuesta?.json();

		if (body.ok) {
			//Se hace la modificacion del usuario en el Reducer
			dispatch({ type: GET_EMPLOYEE_BY_ID, payload: { empleadoData: body.data } });
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: '¡Registro exitoso!',
				showConfirmButton: false,
				timer: 2000,
			});
		} else {
			console.log(body.message);
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
//(PUT -users ) Modificar datos del usuario
export const updateUserById = (id: number, formData: {}) => {
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//Peticion Fetch a la API para modificar el accesso
		const respuesta = await fetchConToken(`users/${id}`, formData, 'PUT');
		//.json() a la respuesta
		const body = await respuesta?.json();

		if (body.ok) {
			//Se hace la modificacion del usuario en el Reducer
			dispatch({ type: GET_USER_BY_ID, payload: { empleado: body.data } });
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: '¡Registro exitoso!',
				showConfirmButton: false,
				timer: 2000,
			});
		} else {
			console.log(body.message);
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
