import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootSote } from '../store/Store';

export const RequireAdminPrivileges = () => {
	//Senecesita el state que indica si el usuario está autenticado o no
	const { rollTypeId: roll } = useSelector((state: RootSote) => state.auth);

	// isAdmin
	const isAdmin: number | null = roll;

	//si isAdmin = 1 significa que es administrador
	if (isAdmin !== 1) {
		return <Navigate to='/' />;
	}

	return <Outlet />;
};
