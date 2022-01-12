import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootSote } from '../../store/Store';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './DashboardPage.css';

const DashboardPage = () => {
	//Se necesita el state que indica el nombre del usuario
	const { firstName } = useSelector((state: RootSote) => state.auth);
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
			<div className='d-flex container mt-5'>
				{!screenSize && (
					<div className='sidebar-sticky'>
						<Sidebar screenSize={screenSize} />
					</div>
				)}
				<div className='dashboardContainer'>
					<div className='d-flex'>
						<div
							style={{
								width: '300px',
								height: '300px',
								backgroundColor: 'white',
								margin: '1rem',
							}}
							className='d-flex justify-content-center align-items-center flex-column shadow'
						>
							<h3>
								¡Hola, <span style={{ textTransform: 'capitalize' }}>{firstName}</span>!
							</h3>
							<p className='text-center'>
								Bienvenido de vuelta.
								<br /> Esto es lo nuevo por aqui...
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
