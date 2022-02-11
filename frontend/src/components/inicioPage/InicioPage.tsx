import { useSelector } from 'react-redux';
import { RootSote } from '../../store/Store';
import './InicioPage.css';

const InicioPage = () => {
	//Se necesita el state que indica el nombre del usuario
	const { firstName } = useSelector((state: RootSote) => state.auth);
	return (
		<>
			<div className='custm-inicioContainer'>
				<div className=' custm-ContainerListGrid'>
					<div className='custm-grid-area grid-area-post1'>
						<div className='custm-iPost1 shadow-sm'>Bien venido</div>
					</div>
					<div className='custm-grid-area grid-area-post2'>
						<div className='custm-iPost2 shadow-sm'>Tareas pendientes</div>
					</div>
					<div className='custm-grid-area grid-area-post3'>
						<div className='custm-iPost shadow-sm'>Avisos</div>
					</div>
					<div className='custm-grid-area grid-area-post4'>
						<div className='custm-iPost shadow-sm'>Proximas ausencias</div>
					</div>
					<div className='custm-grid-area grid-area-post5'>
						<div className='custm-iPost shadow-sm'>Proximos eventos</div>
					</div>
					<div className='custm-grid-area grid-area-post6'>
						<div className='custm-iPost shadow-sm'>Proximos feriados</div>
					</div>
					<div className='custm-grid-area grid-area-post7'>
						<div className='custm-iPost shadow-sm'>Semaforo</div>
					</div>

					{/* <div className='custm-iPost d-flex justify-content-center align-items-center flex-column shadow'>
						<h3>
							¡Hola, <span style={{ textTransform: 'capitalize' }}>{firstName}</span>!
						</h3>
						<p className='text-center'>
							Bienvenido de vuelta.
							<br /> Esto es lo nuevo por aqui...
						</p>
					</div>
					<div className='custm-iPost d-flex justify-content-center align-items-center flex-column shadow'></div>
					<div className='custm-iPost d-flex justify-content-center align-items-center flex-column shadow'></div> */}
				</div>
			</div>
		</>
	);
};

export default InicioPage;
