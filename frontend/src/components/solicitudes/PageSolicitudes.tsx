import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import {
	getEmployeeById,
	getUserById,
} from '../../actions/usersActions/usersActions';
import { RootSote } from '../../store/Store';
import './PageSolicitudes.css';
const PageSolicitudes = () => {
	//Se necesita el state que indica el nombre del usuario
	const { id } = useSelector((state: RootSote) => state.auth);

	//Dispatch para ejecutar las actions
	const dispatch = useDispatch();

	//useEfect para ejecutar...
	useEffect(() => {
		dispatch(getUserById(id));
		dispatch(getEmployeeById(id));
	}, [id, dispatch]);
	return (
		<>
			<div className='custm-empleadosContainer rounded-3 shadow mt-4'>
				<Outlet />
			</div>
		</>
	);
};

export default PageSolicitudes;
