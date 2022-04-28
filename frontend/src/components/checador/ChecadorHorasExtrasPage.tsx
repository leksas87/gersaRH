import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	changecheckIsUserActiveFalse,
	employeeEventValidation,
	getEmployeeEvents,
} from '../../actions/eventsActions/eventsActions';
import { RootSote } from '../../store/Store';
import './Checador.css';

const ChecadorHorasExtrasPage = () => {
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
		salida: true,
	});

	//efecto para obtener los eventos del empleado
	useEffect(() => {
		if (userConfirmation.employeeId) {
			dispatch(
				getEmployeeEvents(userConfirmation.employeeId, userConfirmation.token)
			);
		}
	}, [dispatch, userConfirmation.employeeId, userConfirmation.token]);

	// Effecto para bloquear botones
	useEffect(() => {
		// checks whether an element is even
		const entrada = employeeEvents.some(
			(element) => element.eventActionTypeId === 5
		);
		const salida = employeeEvents.some(
			(element) => element.eventActionTypeId === 6
		);

		console.log(entrada, salida);
		setEventsState({
			entrada: entrada,
			salida: salida,
		});
		// console.log('test:-', eventsState);
	}, [employeeEvents]);

	//metodo que se ejecuta al dar clic en un boton del checador
	const registerEvent = (eventActionTypeId: number) => {
		console.log('actionTypeId: ', eventActionTypeId);

		if (userConfirmation.employeeId) {
			//Se obtiene los horarios del empleado
			dispatch(
				employeeEventValidation(
					userConfirmation.employeeId,
					eventActionTypeId,
					userConfirmation.token
				)
			);
		}
		//Se navega a la página de confirmacion
		navigate('/checador/confirm');
	};
	//Metodo para enviar al inicio
	const navigateCheck = () => {
		dispatch(changecheckIsUserActiveFalse());
	};
	return (
		<div className='container containerProject d-flex flex-column justify-content-center align-items-center'>
			<button className=' btn custm-arrowLeft' onClick={navigateCheck}>
				<i className='bi bi-arrow-left' />
			</button>

			<div className='d-flex mb-4'>
				<img
					className='custm-imgLogo'
					src='\assets\gersaLogo.svg'
					alt='gersa-logo'
				/>
			</div>
			<div className='d-flex flex-column align-items-center lh-sm'>
				<div className='fs-2 fw-bold textColorSecondary'>
					¡Horas Extras Bienvenido!
				</div>
				<div className='fs-2 fw-bold textColorSecondary text-capitalize'>
					{userConfirmation.firstName}
				</div>
				<div className='fs-4 fw-light textColorLight'>Por favor regístrese</div>
			</div>
			<div className='d-flex mt-4 mb-5 flex-wrap justify-content-center'>
				<button
					className=' btn d-flex flex-column align-items-center custm-btnCheckMargin'
					disabled={eventsState.entrada}
					onClick={() => registerEvent(5)}
				>
					<div className='custm-btnCheck custm-btnCheckIn d-flex justify-content-center align-items-center'>
						<i className='custm-checkDoor bi bi-door-open' />
						<i className='custm-checkArrow bi bi-box-arrow-in-left' />
					</div>
					<div className='custm-btnCheckTittle'>ENTRADA.</div>
				</button>

				<button
					className='btn d-flex flex-column align-items-center custm-btnCheckMargin'
					disabled={eventsState.salida}
					onClick={() => registerEvent(6)}
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

export default ChecadorHorasExtrasPage;
