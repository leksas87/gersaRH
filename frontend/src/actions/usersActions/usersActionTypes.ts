//Types
export const REGISTER_START_LOADING = 'regiserStartLoading';
export const REGISTER_FAIL = 'registerFail';
export const REGISTER_SUCCESS = 'registerSuccess';

//Usuario que se recibe del fetch al ahcer logIn
export type Usuario = {
	firstName: string;
	lastName: string;
	userName: string;
	phone: string;
};
//Cargando
export interface RegisterStartLoading {
	type: typeof REGISTER_START_LOADING;
}
//LogOut
export interface RegisterFail {
	type: typeof REGISTER_FAIL;
}

//Login
export interface RegisterSuccess {
	type: typeof REGISTER_SUCCESS;
	payload: {
		usuario: Usuario;
	};
}
//Types para el dispatch
export type UsersDispatchTypes =
	| RegisterSuccess
	| RegisterStartLoading
	| RegisterFail;
