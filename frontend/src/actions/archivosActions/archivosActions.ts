import { Dispatch } from 'redux';
import Swal from 'sweetalert2';
import { axiosClientWithToken } from '../../helpers/axios';
import {
	CLEAN_FILES_LIST,
	FilesDispatchTypes,
	GET_FILES_LIST,
	GET_FILES_LOADING_END,
	GET_FILES_START_LOADING,
	REGISTER_NEW_FILE_LOADING_END,
	REGISTER_NEW_FILE_START_LOADING,
} from './archivosActionTypes';

//(POST) Registro de archivos
export const registerNewFile = (
	data: {},
	modalId: string,
	employeeId: number,
	tipoDocumento: number,
	ubicacionCarpeta: string
) => {
	return async (dispatch: Dispatch<FilesDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true
		dispatch({ type: REGISTER_NEW_FILE_START_LOADING });
		// console.log('recibiendo', data, employeeId);
		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.post(`files`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//dispatch para cambiar loading a false
					dispatch({ type: REGISTER_NEW_FILE_LOADING_END });
					//Mostrar Alerta
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: `¡Archivo guardado exitosamente!`,
						showConfirmButton: false,
						timer: 2000,
					});
					// Cerrar modal
					const asignScheduleModal = document.getElementById(modalId);
					asignScheduleModal?.click();

					setTimeout(() => {
						if (ubicacionCarpeta === 'empresa') {
							dispatch<any>(getFilesEmpresa());
							console.log('ArchivoOKOKEmpresa');
						} else {
							dispatch<any>(
								getFilesByParams(employeeId, tipoDocumento, ubicacionCarpeta)
							);
							console.log('ArchivoOKOK');
						}
					}, 2000);
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					// console.log('error500');
					dispatch({ type: REGISTER_NEW_FILE_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 400) {
					// console.log('error400');
					dispatch({ type: REGISTER_NEW_FILE_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 403) {
					// console.log('error403');
					dispatch({ type: REGISTER_NEW_FILE_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
					dispatch({ type: REGISTER_NEW_FILE_LOADING_END });
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

//(GET) Archivos by Params
export const getFilesByParams = (
	employeeId: number,
	tipoDocumento: number,
	ubicacionCarpeta: string
) => {
	return async (dispatch: Dispatch<FilesDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true
		dispatch({ type: GET_FILES_START_LOADING });
		//Se limpia la lsita de requests
		dispatch({ type: CLEAN_FILES_LIST });
		// console.log('recibiendo', data, employeeId);
		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(
				`files/?employeeId=${employeeId}&tipoDocumento=${tipoDocumento}&ubicacionCarpeta=${ubicacionCarpeta}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//dispatch para cambiar loading a false
					dispatch({ type: GET_FILES_LOADING_END });
					dispatch({
						type: GET_FILES_LIST,
						payload: { filesList: respuesta.data.data },
					});
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					// console.log('error500');
					dispatch({ type: GET_FILES_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 400) {
					console.log('error400');
					dispatch({ type: GET_FILES_LOADING_END });
				} else if (error.response.status === 403) {
					console.log('error403');
					dispatch({ type: GET_FILES_LOADING_END });
				} else {
					dispatch({ type: GET_FILES_LOADING_END });
				}
			});
	};
};
//(GET) Archivos by Params
export const getFilesEmpresa = () => {
	return async (dispatch: Dispatch<FilesDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true
		dispatch({ type: GET_FILES_START_LOADING });
		//Se limpia la lsita de requests
		dispatch({ type: CLEAN_FILES_LIST });
		// console.log('recibiendo', data, employeeId);
		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`files/?ubicacionCarpeta=empresa`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//dispatch para cambiar loading a false
					dispatch({ type: GET_FILES_LOADING_END });
					dispatch({
						type: GET_FILES_LIST,
						payload: { filesList: respuesta.data.data },
					});
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					// console.log('error500');
					dispatch({ type: GET_FILES_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 400) {
					console.log('error400');
					dispatch({ type: GET_FILES_LOADING_END });
				} else if (error.response.status === 403) {
					console.log('error403');
					dispatch({ type: GET_FILES_LOADING_END });
				} else {
					dispatch({ type: GET_FILES_LOADING_END });
				}
			});
	};
};

//(PATCH) Patch de archivos
export const eliminarArchivo = (
	fileId: number,
	modalId: string,
	employeeId: number,
	tipoDocumento: number,
	ubicacionCarpeta: string
) => {
	return async (dispatch: Dispatch<FilesDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true
		dispatch({ type: REGISTER_NEW_FILE_START_LOADING });
		//Peticion Axios a la API
		axiosClientWithToken
			.patch(
				`files/${fileId}`,
				{
					isFileActive: false,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//dispatch para cambiar loading a false
					dispatch({ type: REGISTER_NEW_FILE_LOADING_END });
					//Mostrar Alerta
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: `¡Se eliminó el archivo!`,
						showConfirmButton: false,
						timer: 2000,
					});
					// Cerrar modal
					const asignScheduleModal = document.getElementById(modalId);
					asignScheduleModal?.click();

					setTimeout(() => {
						if (ubicacionCarpeta === 'empresa') {
							dispatch<any>(getFilesEmpresa());
						} else {
							dispatch<any>(
								getFilesByParams(employeeId, tipoDocumento, ubicacionCarpeta)
							);
						}
					}, 2000);
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					// console.log('error500');
					dispatch({ type: REGISTER_NEW_FILE_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡Error en el servido!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 400) {
					// console.log('error400');
					dispatch({ type: REGISTER_NEW_FILE_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'warning',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else if (error.response.status === 403) {
					// console.log('error403');
					dispatch({ type: REGISTER_NEW_FILE_LOADING_END });
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: `¡${error.response.data.message}!`,
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
					dispatch({ type: REGISTER_NEW_FILE_LOADING_END });
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
