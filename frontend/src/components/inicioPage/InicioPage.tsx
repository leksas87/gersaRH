import { useSelector } from 'react-redux';
import { RootSote } from '../../store/Store';
import './InicioPage.css';

const InicioPage = () => {
	//Se necesita el state que indica el nombre del usuario
	const { firstName } = useSelector((state: RootSote) => state.auth);
	return (
		<>
			<div className='custm-inicioContainer'>
				<div className='d-flex flex-wrap custm-flexContainer'>
					<div className='custm-iPost d-flex justify-content-center align-items-center flex-column shadow'>
						<h3>
							¡Hola, <span style={{ textTransform: 'capitalize' }}>{firstName}</span>!
						</h3>
						<p className='text-center'>
							Bienvenido de vuelta.
							<br /> Esto es lo nuevo por aqui...
						</p>
					</div>
					<div className='custm-iPost d-flex justify-content-center align-items-center flex-column shadow'></div>
					<div className='custm-iPost d-flex justify-content-center align-items-center flex-column shadow'></div>
					<div className='custm-iPost d-flex justify-content-center align-items-center flex-column shadow'></div>
				</div>
			</div>
		</>
	);
};

export default InicioPage;
