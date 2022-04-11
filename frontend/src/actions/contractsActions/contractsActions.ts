import { Dispatch } from 'redux';
import Swal from 'sweetalert2';
import { axiosClientWithToken } from '../../helpers/axios';
import { fetchConToken } from '../../helpers/fetch';
import {
	CLEAN_CONTRACTS,
	CLEAN_CONTRACT_TO_SHOW,
	ContractsDispatchTypes,
	GET_CONTRACTS,
	GET_CONTRACTS_TO_SHOW,
	iContract,
	iNewContract,
	REGISTER_NEW_CONTRACT_START_LOADING,
	REGISTER_NEW_COONTRACT_LOADING_END,
} from './contractsActionTypes';
// import * as bootstrap from 'bootstrap';

//(GET) Obtener lsita de contratos by userID
export const getContracts = (userId: string) => {
	// console.log('Ejecutando getUsers');
	return async (dispatch: Dispatch<ContractsDispatchTypes>) => {
		//Se recupera el token guardado el localStorage
		const token = localStorage.getItem('gersa-tkn') || '';
		//se limpia el array de contratos.
		dispatch<any>(cleanContracts());
		dispatch<any>(cleanContractToshow());
		//Peticion Fetch a la API para hacer obtener los contratos
		// const respuesta = await fetchConToken(`contracts/${userId}`, {}, 'GET');

		//Peticion Axios a la API para Registrar nuevo schedule
		axiosClientWithToken
			.get(`employees/${userId}/contracts`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((respuesta) => {
				if (respuesta.status === 200) {
					//Se guarda los contratos obtenidos en el Reducer
					dispatch({
						type: GET_CONTRACTS,
						payload: { contratos: respuesta.data.data },
					});

					//Buscar contrato activo
					const found = respuesta.data.data.find(
						(elemento: iContract) => elemento.isContractActivide === true
					);
					// Guardar contrato activo
					dispatch<any>(getContractToShow(found));
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

		// --------------------------
		// const respuesta = await fetchConToken(
		// 	`employees/${userId}/contracts`,
		// 	{},
		// 	'GET'
		// );
		// //.json() a la respuesta
		// const body = await respuesta?.json();
		// console.log(body);

		// if (body.ok) {
		// 	//Se guarda los contratos obtenidos en el Reducer
		// 	dispatch({ type: GET_CONTRACTS, payload: { contratos: body.data } });

		// 	//Buscar contrato activo
		// 	const found = body.data.find(
		// 		(elemento: iContract) => elemento.isContractActivide === true
		// 	);
		// 	// Guardar contrato activo
		// 	dispatch<any>(getContractToShow(found));
		// } else {
		// 	console.log(body.message);
		// }
	};
};
const cleanContracts = () => {
	return async (dispatch: Dispatch<ContractsDispatchTypes>) => {
		//Se limpia el array de contracts
		dispatch({ type: CLEAN_CONTRACTS });
	};
};
const cleanContractToshow = () => {
	return async (dispatch: Dispatch<ContractsDispatchTypes>) => {
		//Se limpia el array de contracts
		dispatch({ type: CLEAN_CONTRACT_TO_SHOW });
	};
};

export const getContractToShow = (contract: iContract) => {
	return async (dispatch: Dispatch<ContractsDispatchTypes>) => {
		dispatch({ type: GET_CONTRACTS_TO_SHOW, payload: { contrato: contract } });
	};
};

//(POST) Registro de nuevo contrato
export const registerNewContract = (data: iNewContract) => {
	return async (dispatch: Dispatch<ContractsDispatchTypes>) => {
		//dispatch para cambiar loading a true
		dispatch({
			type: REGISTER_NEW_CONTRACT_START_LOADING,
		});

		//Peticion Fetch a la API para hacer login
		const respuesta = await fetchConToken(
			`employees/${data.userId}/contracts/`,
			data,
			'POST'
		);
		//.json() a la respuesta
		const body = await respuesta?.json();

		//Mensajes de Confirmación o Error
		if (body.ok) {
			//se obtienen los nuevos contratos
			dispatch<any>(getContracts(data.userId.toString()));
			//dispatch para cambiar loading a true
			dispatch({
				type: REGISTER_NEW_COONTRACT_LOADING_END,
			});
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: `¡${body.message}!`,
				showConfirmButton: false,
				timer: 2000,
			});

			//Cerrar modal
			const newContractModal = document.getElementById('newContractModal');
			newContractModal?.click();

			// if (miExampleModal) {
			// 	const modal = bootstrap.Modal.getInstance(miExampleModal);
			// 	modal?.hide();
			// }
		} else {
			dispatch({
				type: REGISTER_NEW_COONTRACT_LOADING_END,
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

//(PATCH -users ) Modificar datos del contrato
export const updateContractById = (
	contractId: number,
	employeeId: number,
	formData: {}
) => {
	return async (dispatch: Dispatch<ContractsDispatchTypes>) => {
		//Peticion Fetch a la API para modificar el accesso
		const respuesta = await fetchConToken(
			`employees/${employeeId}/contracts/${contractId}`,
			formData,
			'PATCH'
		);
		//.json() a la respuesta
		const body = await respuesta?.json();

		if (body.ok) {
			dispatch<any>(getContractsWithoutContractToshow(body.data.userId));
			//Se hace la modificacion del contrato en el Reducer
			dispatch({ type: GET_CONTRACTS_TO_SHOW, payload: { contrato: body.data } });
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: '¡Actualización exitosa!',
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

//(GET) Obtener lsita de contratos by userID
export const getContractsWithoutContractToshow = (userId: string) => {
	// console.log('Ejecutando getUsers');
	return async (dispatch: Dispatch<ContractsDispatchTypes>) => {
		//se limpia el array de contratos.
		dispatch<any>(cleanContracts());
		//Peticion Fetch a la API para hacer obtener los contratos
		// const respuesta = await fetchConToken(`contracts/${userId}`, {}, 'GET');
		const respuesta = await fetchConToken(
			`employees/${userId}/contracts`,
			{},
			'GET'
		);
		//.json() a la respuesta
		const body = await respuesta?.json();

		if (body.ok) {
			//Se guarda los contratos obtenidos en el Reducer
			dispatch({ type: GET_CONTRACTS, payload: { contratos: body.data } });
		} else {
			console.log(body.message);
		}
	};
};
