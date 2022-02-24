import { Dispatch } from 'redux';
import Swal from 'sweetalert2';
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
		//se limpia el array de contratos.
		dispatch<any>(cleanContracts());
		dispatch<any>(cleanContractToshow());
		//Peticion Fetch a la API para hacer obtener los contratos
		const respuesta = await fetchConToken(`contracts/${userId}`, {}, 'GET');
		//.json() a la respuesta
		const body = await respuesta?.json();

		if (body.ok) {
			//Se guarda los contratos obtenidos en el Reducer
			dispatch({ type: GET_CONTRACTS, payload: { contratos: body.data } });

			//Buscar contrato activo
			const found = body.data.find(
				(elemento: iContract) => elemento.isContractActivide === true
			);
			console.log(found);
			// Guardar contrato activo
			dispatch<any>(getContractToShow(found));
		} else {
			console.log(body.message);
		}
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
		//Se limpia el array de contracts
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
		const respuesta = await fetchConToken('contracts', data, 'POST');
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
export const updateContractById = (contractId: number, formData: {}) => {
	return async (dispatch: Dispatch<ContractsDispatchTypes>) => {
		//Peticion Fetch a la API para modificar el accesso
		const respuesta = await fetchConToken(
			`contracts/${contractId}`,
			formData,
			'PATCH'
		);
		//.json() a la respuesta
		const body = await respuesta?.json();

		if (body.ok) {
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
