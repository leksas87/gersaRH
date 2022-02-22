import { Dispatch } from 'redux';
import Swal from 'sweetalert2';
import { fetchConToken } from '../../helpers/fetch';
import {
	ContractsDispatchTypes,
	iNewContract,
	REGISTER_NEW_CONTRACT_START_LOADING,
	REGISTER_NEW_COONTRACT_LOADING_END,
} from './contractsActionTypes';
// import * as bootstrap from 'bootstrap';

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
