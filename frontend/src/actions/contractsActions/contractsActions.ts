import { Dispatch } from 'redux';
import Swal from 'sweetalert2';
import { fetchConToken } from '../../helpers/fetch';
import {
	CLEAN_CONTRACTS,
	ContractsDispatchTypes,
	GET_CONTRACTS,
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
		//Peticion Fetch a la API para hacer obtener los contratos
		const respuesta = await fetchConToken(`contracts/${userId}`, {}, 'GET');
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

const cleanContracts = () => {
	return async (dispatch: Dispatch<ContractsDispatchTypes>) => {
		//Se limpia el array de contracts
		dispatch({ type: CLEAN_CONTRACTS });
	};
};

//(POST) Registro de nuevo Usuario (REGISTRO INDIVIDUAL)
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
			//se limpia el array de contratos.
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
			//obtiene nuevamente los Contratos.
			// dispatch<any>(getContracts());

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
