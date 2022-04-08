import { Outlet } from 'react-router-dom';
import './PageSolicitudes.css';
const PageSolicitudes = () => {
	return (
		<>
			<div className='custm-empleadosContainer rounded-3 shadow mt-4'>
				<Outlet />
			</div>
		</>
	);
};

export default PageSolicitudes;
