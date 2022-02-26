import { Link } from 'react-router-dom';
import './Checador.css';

const ChecadorPage = () => {
	return (
		<div className='container containerProject d-flex flex-column justify-content-center align-items-center'>
			<div className='d-flex mb-4'>
				{/* <img width='200px' src='\assets\gersa-logo.png' alt='gersa-logo' /> */}
				<img width='290px' src='\assets\gersaLogo.svg' alt='gersa-logo' />
			</div>
			<div className='d-flex flex-column align-items-center lh-sm'>
				<div className='fs-2 fw-bold textColorSecondary'>¡Bienvenido!</div>
				<div className='fs-4 fw-light textColorLight'>Por favor regístrese</div>
			</div>
			<div className='d-flex mt-4 mb-5'>
				<Link
					to='/checador/entry'
					type='button'
					className=' btn d-flex flex-column align-items-center custm-btnCheckMargin'
				>
					<div className='custm-btnCheck custm-btnCheckIn d-flex justify-content-center align-items-center'>
						<i className='custm-checkDoor bi bi-door-open' />
						<i className='custm-checkArrow bi bi-box-arrow-in-left' />
					</div>
					<div className='custm-btnCheckTittle'>ENTRADA.</div>
				</Link>
				<Link
					to='/checador/exit'
					type='button'
					className=' btn d-flex flex-column align-items-center custm-btnCheckMargin'
				>
					<div className='custm-btnCheck custm-btnCheckOut d-flex justify-content-center align-items-center'>
						<i className='custm-checkDoor bi bi-door-open' />
						<i className='custm-checkArrow bi bi-box-arrow-right' />
					</div>
					<div className='custm-btnCheckTittle'>SALIDA.</div>
				</Link>
			</div>
		</div>
	);
};

export default ChecadorPage;
