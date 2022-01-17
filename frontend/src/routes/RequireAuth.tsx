import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootSote } from '../store/Store';

export const RequireAuth = () => {
	//Senecesita el state que indica si el usuario está autenticado o no
	// const { authState } = useSelector((state: RootSote) => state.auth);
	// isAutenticated
	// const isAutenticated: boolean = authState.isAutenticated;
	const gersaUserName = localStorage.getItem('gersaUserName') || '';

	// if (!isAutenticated) {
	if (!gersaUserName) {
		return <Navigate to='/login' />;
	}

	return <Outlet />;
};
