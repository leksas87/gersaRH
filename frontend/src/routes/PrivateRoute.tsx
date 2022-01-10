import { ReactChild, ReactChildren, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { JsxElement } from 'typescript';
import { RootSote } from '../store/Store';

interface iChildren {
	children: ReactChild | ReactChildren | JSX.Element[] | JSX.Element;
}

export const PrivateRoute = ({
	children,
}: iChildren): ReactElement<JsxElement> => {
	//Senecesita el state que indica si el usuario está autenticado o no
	const { authState } = useSelector((state: RootSote) => state.auth);
	//isAutenticated
	const isAutenticated: boolean = authState.isAutenticated;
	return isAutenticated ? <>{children}</> : <Navigate to='/login' />;
};
