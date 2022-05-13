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
	CLEAN_SUPERVISORES,
	GET_SUPERVISORES,
	CLEAN_ADMINISTRADORES,
	GET_ADMINISTRADORES,
	CLEAN_WORKPLACES,
	GET_WORKPLACES,
	CLEAN_DIASDISPONIBLES,
	GET_DIASDISPONIBLES,
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
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`employees/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//Se guarda los usuarios obtenidos en el Reducer
					dispatch({
						type: GET_EMPLOYEE_BY_ID,
						payload: { empleadoData: respuesta.data.data },
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
					console.log('error403-');
					// Swal.fire({
					// 	position: 'top-end',
					// 	icon: 'error',
					// 	title: `¡${error.response.data.message}!`,
					// 	showConfirmButton: false,
					// 	timer: 1500,
					// });
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

		//Peticion Fetch a la API para obtener los usuarios
		// const respuesta = await fetchConToken(`employees/${id}`, {}, 'GET');
		// //.json() a la respuesta
		// const body = await respuesta?.json();

		// if (body.ok) {
		// 	//Se guarda los usuarios obtenidos en el Reducer
		// 	dispatch({ type: GET_EMPLOYEE_BY_ID, payload: { empleadoData: body.data } });
		// } else {
		// 	console.log('Algo salio mal');
		// 	console.log(body.message);
		// }
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
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.put(`employees/${id}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					dispatch({
						type: GET_EMPLOYEE_BY_ID,
						payload: { empleadoData: respuesta.data.data },
					});
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: '¡Registro exitoso!',
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
//(PUT -users ) Modificar datos del usuario
export const updateUserById = (id: number, formData: {}) => {
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		const token = localStorage.getItem('gersa-tkn') || '';
		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.patch(`users/${id}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//Se hace la modificacion del usuario en el Reducer
					dispatch({
						type: GET_USER_BY_ID,
						payload: { empleado: respuesta.data.data },
					});
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: '¡Registro exitoso!',
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

//(GET - Employee-> Roll 3  ) Obtener empleados con el roll 3 administrador
export const getEmployeeByRollType = (rollTypeId: number) => {
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//Se Limpia el reducer el Reducer
		dispatch({ type: CLEAN_SUPERVISORES });
		dispatch({ type: CLEAN_ADMINISTRADORES });
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`employees?tipo=${rollTypeId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					if (rollTypeId === 3) {
						//Se guarda la respuesta en el Reducer
						dispatch({
							type: GET_SUPERVISORES,
							payload: { supervisores: respuesta.data.employee },
						});
					} else if (rollTypeId === 1) {
						//Se guarda la respuesta en el Reducer
						dispatch({
							type: GET_ADMINISTRADORES,
							payload: { administradores: respuesta.data.employee },
						});
					}
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

//(GET) Obtener WorkPlaces
export const getWorkPlaces = () => {
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//Limpiar Lista
		dispatch({ type: CLEAN_WORKPLACES });
		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`workPlaces`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//dispatch para cambiar loading a false
					dispatch({
						type: GET_WORKPLACES,
						payload: { workPlaces: respuesta.data.data },
					});

					// setTimeout(() => {
					// 	dispatch<any>(getRequestsByEmployeeId(employeeId));
					// }, 2000);
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
						title: `¡${error.response.data.message}!`,
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

//(POST) Importar Detalle Nomina (REGISTRO VIA EXCEL)
export const importFileDetalleNomina = (formdata: FormData) => {
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true
		dispatch({
			type: REGISTER_USER_START_LOADING,
		});
		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.post(`payRolls/registerFile/`, formdata, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					dispatch({
						type: REGISTER_USER_LOADING_END,
					});
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: `¡${respuesta.data.message}!`,
						showConfirmButton: false,
						timer: 2000,
					});

					//Cerrar modal
					const importNominaModal = document.getElementById(
						'ModalImportarNominaExcel'
					);
					importNominaModal?.click();
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					dispatch({
						type: REGISTER_USER_LOADING_END,
					});
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 400) {
					dispatch({
						type: REGISTER_USER_LOADING_END,
					});
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 403) {
					dispatch({
						type: REGISTER_USER_LOADING_END,
					});
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 409) {
					dispatch({
						type: REGISTER_USER_LOADING_END,
					});
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
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
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
	};
};

//(GET) Obtener DiasDisponibles de faltas
export const getEmployeeavailableDays = (id: number) => {
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		dispatch({ type: CLEAN_DIASDISPONIBLES });
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`employees/${id}/availableDays`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//Se guarda los usuarios obtenidos en el Reducer
					dispatch({
						type: GET_DIASDISPONIBLES,
						payload: { diasDisponibles: respuesta.data.data },
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
					console.log('error403-');
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
//(PATCH) Obtener DiasDisponibles de faltas
export const patchEmployeeavailableDays = (id: number, data: {}) => {
	return async (dispatch: Dispatch<UsersDispatchTypes>) => {
		dispatch({ type: CLEAN_DIASDISPONIBLES });
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.patch(`availableDays/${id}`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					// Se guarda los usuarios obtenidos en el Reducer
					dispatch({
						type: GET_DIASDISPONIBLES,
						payload: { diasDisponibles: respuesta.data.data },
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
					console.log('error403-');
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
