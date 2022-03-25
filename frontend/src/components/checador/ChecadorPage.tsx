import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as div } from 'react-router-dom';
import { getUserEvents } from '../../actions/eventsActions/eventsActions';
import { RootSote } from '../../store/Store';
import './Checador.css';

const ChecadorPage = () => {
	//dispatch para ejecutar las Actions
	const dispatch = useDispatch();
	//Senecesita el state que indica  el checkState
	const { userConfirmation } = useSelector((state: RootSote) => state.events);

	useEffect(() => {
		console.log('aquí');
		if (userConfirmation.employeeId) {
			dispatch(getUserEvents(userConfirmation.employeeId));
		}
	}, []);

	return (
		<div className='container containerProject d-flex flex-column justify-content-center align-items-center'>
			<div className='d-flex mb-4'>
				{/* <img width='200px' src='\assets\gersa-logo.png' alt='gersa-logo' /> */}
				<img width='290px' src='\assets\gersaLogo.svg' alt='gersa-logo' />
			</div>
			<div className='d-flex flex-column align-items-center lh-sm'>
				<div className='fs-2 fw-bold textColorSecondary'>¡Bienvenido!</div>
				<div className='fs-2 fw-bold textColorSecondary text-capitalize'>
					{userConfirmation.firstName}
				</div>
				<div className='fs-4 fw-light textColorLight'>Por favor regístrese</div>
			</div>
			<div className='d-flex mt-4 mb-5 flex-wrap justify-content-center'>
				<button
					// to='/checador/entry'
					// type='button'
					className=' btn d-flex flex-column align-items-center custm-btnCheckMargin'
					// disabled
				>
					<div className='custm-btnCheck custm-btnCheckIn d-flex justify-content-center align-items-center'>
						<i className='custm-checkDoor bi bi-door-open' />
						<i className='custm-checkArrow bi bi-box-arrow-in-left' />
					</div>
					<div className='custm-btnCheckTittle'>ENTRADA.</div>
				</button>
				<button
					// to='/checador/exit'
					// type='button'
					className=' btn d-flex flex-column align-items-center custm-btnCheckMargin'
					// disabled
				>
					<div className='custm-btnCheck custm-btnCheckInBrake d-flex justify-content-center align-items-center'>
						<i className='custm-checkArrow bi bi-box-arrow-right' />
						<i className='custm-checkDoor bi bi-cup-straw' />
					</div>
					<div className='custm-btnCheckTittle fs-1'>
						<div>INICIA</div>
						<div>DESCANSO</div>
					</div>
				</button>
				<button
					// to='/checador/exit'
					// type='button'
					className=' btn d-flex flex-column align-items-center custm-btnCheckMargin'
					// disabled
				>
					<div className='custm-btnCheck custm-btnCheckOutBrake d-flex justify-content-center align-items-center'>
						<i className='custm-checkDoor bi bi-cup-straw' />
						<i className='custm-checkArrow bi bi-box-arrow-in-left' />
					</div>
					<div className='custm-btnCheckTittle fs-1'>
						<div>FIN</div>
						<div>DESCANSO</div>
					</div>
				</button>
				<button
					// to='/checador/exit'
					// type='button'
					className='btn d-flex flex-column align-items-center custm-btnCheckMargin'
					// disabled
				>
					<div className='custm-btnCheck custm-btnCheckOut d-flex justify-content-center align-items-center'>
						<i className='custm-checkDoor bi bi-door-open' />
						<i className='custm-checkArrow bi bi-box-arrow-right' />
					</div>
					<div className='custm-btnCheckTittle'>SALIDA.</div>
				</button>
			</div>
		</div>
	);
};

export default ChecadorPage;
