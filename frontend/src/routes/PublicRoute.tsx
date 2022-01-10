import { ReactChild, ReactChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootSote } from '../store/Store';

interface iChildren {
	children: ReactChild | ReactChildren;
}

export const PublicRoute = ({ children }: iChildren) => {
	//Senecesita el state que indica si el usuario está autenticado o no
	const { authState } = useSelector((state: RootSote) => state.auth);
	// isAutenticated
	const isAutenticated: boolean = authState.isAutenticated;
	return isAutenticated ? <Navigate to='/dashboard' /> : <>{children}</>;
};
