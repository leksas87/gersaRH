import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as div, useNavigate } from 'react-router-dom';
import {
	getEmployeeEvents,
	getServerTime,
	getUserEvents,
} from '../../actions/eventsActions/eventsActions';
import { getSchedulesByUserIdCheckIn } from '../../actions/scheduleActions/scheduleActions';
import { RootSote } from '../../store/Store';
import './Checador.css';

const ChecadorPage = () => {
	//dispatch para ejecutar las Actions
	const dispatch = useDispatch();
	//useNavigate para redireccionar a la página de confirmación
	const navigate = useNavigate();
	//Senecesita el state que indica  el checkState
	const { userConfirmation, employeeEvents } = useSelector(
		(state: RootSote) => state.events
	);

	const [eventsState, setEventsState] = useState({
		entrada: true,
		iniciaDescanso: true,
		terminaDescanso: true,
		salida: true,
	});

	// const arrayTest = [];

	useEffect(() => {
		if (userConfirmation.employeeId) {
			dispatch(
				getEmployeeEvents(
					userConfirmation.employeeId,
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImlhdCI6MTY0ODQ1Mzg0OCwiZXhwIjoxNjQ4NDYxMDQ4fQ.rrKt59uSQt2QXFDwHBGeecuKmgBBIi67iZ8Fu6YG1x8'
				)
			);
		}
	}, []);

	useEffect(() => {
		if (employeeEvents.length === 0) {
			setEventsState({
				entrada: false,
				iniciaDescanso: true,
				terminaDescanso: true,
				salida: true,
			});
		} else if (employeeEvents.length === 1) {
			setEventsState({
				entrada: true,
				iniciaDescanso: false,
				terminaDescanso: true,
				salida: true,
			});
		} else if (employeeEvents.length === 2) {
			setEventsState({
				entrada: true,
				iniciaDescanso: true,
				terminaDescanso: false,
				salida: true,
			});
		} else if (employeeEvents.length === 3) {
			setEventsState({
				entrada: true,
				iniciaDescanso: true,
				terminaDescanso: true,
				salida: false,
			});
		}
	}, [employeeEvents]);

	const registerEvent = () => {
		if (userConfirmation.employeeId) {
			dispatch(
				getSchedulesByUserIdCheckIn(
					userConfirmation.employeeId,
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImlhdCI6MTY0ODQ1Mzg0OCwiZXhwIjoxNjQ4NDYxMDQ4fQ.rrKt59uSQt2QXFDwHBGeecuKmgBBIi67iZ8Fu6YG1x8'
				)
			);
			dispatch(getServerTime());
		}
		navigate('/checador/confirm');
	};

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
					disabled={eventsState.entrada}
					onClick={registerEvent}
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
					disabled={eventsState.iniciaDescanso}
					onClick={registerEvent}
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
					disabled={eventsState.terminaDescanso}
					onClick={registerEvent}
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
					disabled={eventsState.salida}
					onClick={registerEvent}
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
