import { Dispatch } from 'redux';
import Swal from 'sweetalert2';
import { axiosClientWithToken } from '../../helpers/axios';
import {
	GET_PAYROLL,
	PayrollDispatchTypes,
	REGISTER_PAYROLL_LOADING_END,
	REGISTER_PAYROLL_START_LOADING,
} from './payrollActionTypes';

//(POST) Importar Detalle Nomina (REGISTRO VIA EXCEL)
export const importFileDetalleNomina = (formdata: FormData) => {
	return async (dispatch: Dispatch<PayrollDispatchTypes>) => {
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true
		dispatch({
			type: REGISTER_PAYROLL_START_LOADING,
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
						type: REGISTER_PAYROLL_LOADING_END,
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
						type: REGISTER_PAYROLL_LOADING_END,
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
						type: REGISTER_PAYROLL_LOADING_END,
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
						type: REGISTER_PAYROLL_LOADING_END,
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
						type: REGISTER_PAYROLL_LOADING_END,
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
						type: REGISTER_PAYROLL_LOADING_END,
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

//(GET) Obtener Detalle Nomina (By employeeId)
export const getPayrollByEmployeeId = (employeeId: number) => {
	return async (dispatch: Dispatch<PayrollDispatchTypes>) => {
		const token = localStorage.getItem('gersa-tkn') || '';
		//dispatch para cambiar loading a true
		dispatch({
			type: REGISTER_PAYROLL_START_LOADING,
		});
		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`employees/${employeeId}/payRolls`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					dispatch({ type: REGISTER_PAYROLL_LOADING_END });
					dispatch({
						type: GET_PAYROLL,
						payload: { payrollDetail: respuesta.data.data },
					});
					console.log('Payroll OK OK OK ');
				}
			})
			.catch((error) => {
				if (error.response.status === 500) {
					dispatch({
						type: REGISTER_PAYROLL_LOADING_END,
					});
					console.log(error.response.data.message);
				} else if (error.response.status === 400) {
					dispatch({
						type: REGISTER_PAYROLL_LOADING_END,
					});
					console.log(error.response.data.message);
				} else if (error.response.status === 403) {
					dispatch({
						type: REGISTER_PAYROLL_LOADING_END,
					});
					console.log(error.response.data.message);
				} else if (error.response.status === 409) {
					dispatch({
						type: REGISTER_PAYROLL_LOADING_END,
					});
					console.log(error.response.data.message);
				} else {
					dispatch({
						type: REGISTER_PAYROLL_LOADING_END,
					});
					console.log(error.response.data.message);
				}
			});
	};
};
