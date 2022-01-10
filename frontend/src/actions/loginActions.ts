import { Dispatch } from 'redux';
import {
	AuthDispatchTypes,
	AUTH_LOGOUT,
	AUTH_START_LOADING,
	AUTH_SUCCESS,
	Usuario,
} from './loginActionsTypes';
import Swal from 'sweetalert2';

//Login
export const startLogin = (email: string, password: string) => {
	//Falta el async al return (Agregar cuando se haga la peticion a la api)
	return (dispatch: Dispatch<AuthDispatchTypes>) => {
		try {
			dispatch({
				type: AUTH_START_LOADING,
			});
			//Peticion Fetch (usar fetch con api)
			// const respuesta = await fetchSinToken('auth', { email, password }, 'POST');
			// const body = await respuesta.json();
			if (email === 'test@test.com' && password === '123456') {
				const usuario: Usuario = {
					uid: '1232344',
					nombre: 'Iván',
					apellido: 'Santana',
					roll: 'Administrador',
					token: '1w321esdfgesr',
				};

				dispatch({
					type: AUTH_SUCCESS,
					payload: { usuario },
				});
			} else {
				console.log('Error');
			}
		} catch (error) {
			Swal.fire('Error', 'body.msg', 'error');
			// Swal.fire('Error', body.msg, 'error');
		}
	};
};

//LogOut
export const logOut = () => ({
	type: AUTH_LOGOUT,
});
