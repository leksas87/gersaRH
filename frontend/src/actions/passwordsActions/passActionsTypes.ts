//Types
export const VALIDATION_TOKEN_SUCCESS = 'validationTokenSuccess';
export const VALIDATION_TOKEN_CLEAN = 'validationTokenClean';
export const PASSWORD_UPDATED = 'passwordUpdated';
export const PASSWORD_REQUEST_NEW = 'passwordRequestNew';

//Data que se recibe del fetch al hacer ValidacionToken
export type confirmationUser = {
	id: number | null;
	username: string;
	passworUpdated: boolean;
};

//Validacion Token
export interface ValidationTokenSuccess {
	type: typeof VALIDATION_TOKEN_SUCCESS;
	payload: {
		confirmationUser: confirmationUser;
	};
}
//Clean
export interface ValidationTokenClean {
	type: typeof VALIDATION_TOKEN_CLEAN;
}
//password Updated
export interface PasswordUpdated {
	type: typeof PASSWORD_UPDATED;
}
//password Request New
export interface PasswordRequestNew {
	type: typeof PASSWORD_REQUEST_NEW;
}

//Types para el dispatch
export type PassDispatchTypes =
	| ValidationTokenSuccess
	| ValidationTokenClean
	| PasswordRequestNew
	| PasswordUpdated;
