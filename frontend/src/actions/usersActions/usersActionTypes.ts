//Types
export const REGISTER_USER_START_LOADING = 'regiserUserStartLoading';
export const REGISTER_USER_LOADING_END = 'registerUserLoadingEnd';

//Usuario que se recibe del fetch al ahcer logIn
export type Usuario = {
	firstName: string;
	lastName: string;
	userName: string;
	phone: string;
};
//Inicia registro
export interface RegiserUserStartLoading {
	type: typeof REGISTER_USER_START_LOADING;
}
//Termino registro
export interface RegisterUserLoadingEnd {
	type: typeof REGISTER_USER_LOADING_END;
}

//Types para el dispatch
export type UsersDispatchTypes =
	| RegiserUserStartLoading
	| RegisterUserLoadingEnd;
