import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootSote } from '../store/Store';

export const RequireCheckState = () => {
	///Senecesita el state que indica  el checkState
	const { eventsState: checkState } = useSelector(
		(state: RootSote) => state.events
	);

	// if (!isAutenticated) {
	if (!checkState.eventIsUserConfirm) {
		return <Navigate to='/checador' />;
	}

	return <Outlet />;
};
