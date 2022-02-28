import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootSote } from '../store/Store';

export const RequireCheckState = () => {
	///Senecesita el state que indica  el checkState
	const { checkState } = useSelector((state: RootSote) => state.check);

	// if (!isAutenticated) {
	if (!checkState.checkIsUserConfirm) {
		return <Navigate to='/checador' />;
	}

	return <Outlet />;
};
