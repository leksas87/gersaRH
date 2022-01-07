import { ReactChild, ReactChildren, useContext } from 'react';
import { Navigate } from 'react-router-dom';
// import AuthContext from '../context/authContext/AuthContext';

interface iChildren {
	children: ReactChild | ReactChildren;
}

export const PublicRoute = ({ children }: iChildren) => {
	// const { authState } = useContext(AuthContext);

	// const isAutenticated = authState.uid;
	const isAutenticated = true;
	// const isAutenticated: boolean = false;
	return isAutenticated ? <Navigate to='/dashboard' /> : <>{children}</>;
};
