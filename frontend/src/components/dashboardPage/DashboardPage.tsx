import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './DashboardPage.css';

const DashboardPage = () => {
	//state que guarda un boolean si la pantalla es pequeña o no
	const [screenSize, setScreenSize] = useState<boolean>(false);

	//Effect para el manejo del resize de la pantalla
	useEffect(() => {
		//Funcion que retorna un boolean si la pantalla hace match con la condicion
		const isSmallScreen = (): boolean =>
			window.matchMedia('(max-width: 768px)').matches;

		//Se gurda el valor de la funcion en el state
		setScreenSize(isSmallScreen());

		// Funcion que ejecutará el evento Listener resize
		const screenResize = (): void => {
			// si la isSmallScreen es true se cambia el state a -> true
			if (isSmallScreen()) setScreenSize(true);
			// en caso contrario se cambia el state a -> false
			else setScreenSize(false);
		};

		//Evento que escucha cuando la pantalla cambia de valores
		window.addEventListener('resize', (): void => {
			screenResize();
		});

		// Se remueve el evento Listener resize
		return () => window.removeEventListener('resize', (): void => screenResize());
	}, [setScreenSize, screenSize]);

	return (
		<>
			{screenSize && <Navbar />}
			<div className='d-flex container custm-mtop'>
				{!screenSize && (
					<div className='sidebar-sticky'>
						<Sidebar screenSize={screenSize} />
					</div>
				)}
				<div className='custm-dashboardContainer'>
					<Outlet />
					{/* <Routes>
						<Route path='/' element={<InicioPage />} />
						<Route path='/' element={<EmpleadosPage />} />
					</Routes> */}

					{/* <InicioPage /> */}
					{/* <EmpleadosPage /> */}
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
