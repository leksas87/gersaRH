import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	changecheckIsUserActiveFalse,
	sendEmployeeEvent,
} from '../../actions/eventsActions/eventsActions';
import { RootSote } from '../../store/Store';
import './Checador.css';

const ChecadorConfirmacion = () => {
	//Senecesita el state que indica  el checkState
	const { userConfirmation, eventValidation,employeePhotoUuid } = useSelector(
		(state: RootSote) => state.events
	);

	//useDispatch para ejecutar las Actions
	const dispatch = useDispatch();

	//useState para almacenar las cordenas
	const [cordenadas, setCordenadas] = useState({
		latitude: 0,
		longitude: 0,
	});

	//Metodo para enviar al inicio
	const navigateCheck = () => {
		dispatch(changecheckIsUserActiveFalse());
	};

	//Efecto que Obtiene las coordenadas cada que se ejecuta el componente
	useEffect(() => {
		//Aquí metodo para obtener coordenadas
		const componentDidMount = () => {
			navigator.geolocation.getCurrentPosition(function (position) {
				setCordenadas({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
			});
		};
		componentDidMount();
	}, []);

	//Metodo que envia los datos de confirmacion
	const confirmationRegister = () => {
		if (userConfirmation.employeeId) {
			console.log('userConfirmation.employeeId::::',userConfirmation.employeeId);
			console.log('userConfirmation uuid::::',employeePhotoUuid);
			dispatch(
				sendEmployeeEvent(
					{
						latitudeEvent: cordenadas.latitude.toString(),
						longitudeEvent: cordenadas.longitude.toString(),
						EventTypeId: eventValidation.eventTypeId?.toString(),
						eventActionTypeId: eventValidation.eventActionTypeId,
						url:employeePhotoUuid
					},
					userConfirmation.employeeId,
					userConfirmation.token
				)
			);
		}
	};

	return (
		<>
			<div className='container containerProject d-flex flex-column justify-content-center align-items-center'>
				<div className='d-flex mb-4'>
					<img
						className='custm-imgCheck'
						src='\assets\gersaLogo.svg'
						alt='gersa-logo'
					/>
				</div>
				<div className='d-flex flex-column align-items-center lh-sm'>
					<div className='fs-2  textColorSecondary text-center'>
						Confírmanos que eres tú
					</div>
				</div>
				<div className='d-flex flex-column align-items-center mt-3'>
					<div className='fs-1 fw-bold textColorSecondary text-center text-capitalize'>
						{userConfirmation.firstName} {userConfirmation.lastName}
					</div>
					<div className='fs-5 textColorLight text-center mt-3'>
						Cordenadas: {cordenadas.latitude}, {cordenadas.longitude}
					</div>
				</div>
				{eventValidation.employeeWorksToday ? (
					<div>
						{eventValidation.eventTypeId === 3 && (
							<div className='form-text custm-AdvertenciaError'>
								<i className='bi bi-exclamation-circle'>{` `}</i>
								Advertencia: Tienes un retardo que implica una acta administrativa.
							</div>
						)}
						{eventValidation.eventTypeId === 2 && (
							<div className='form-text custm-AdvertenciaRetardo'>
								<i className='bi bi-exclamation-circle'>{` `}</i>
								Advertencia: Haz checado después de tu hora de entrada, implica un
								retardo.
							</div>
						)}
						<div className='mt-4 pb-5 d-flex flex-wrap justify-content-center'>
							<button
								className='btn custm-btnCheckConfirmation custm-btnCheckConfirmation1'
								type='button'
								onClick={navigateCheck}
							>
								NO
							</button>
							{cordenadas.latitude && cordenadas.longitude ? (
								<button
									className='btn custm-btnCheckConfirmation custm-btnCheckConfirmation2'
									type='button'
									onClick={confirmationRegister}
								>
									SI
								</button>
							) : (
								<button
									className='btn custm-btnCheckConfirmation custm-btnCheckConfirmation2'
									type='button'
									onClick={confirmationRegister}
									style={{ fontSize: '16px', width: 'auto' }}
									disabled
								>
									<span
										className='spinner-border spinner-border-sm me-2'
										role='status'
										aria-hidden='true'
									></span>
									Cargando Ubicación...
								</button>
							)}
						</div>
					</div>
				) : eventValidation.message === 'Empleado no tiene horas extra' ? (
					<div className='d-flex flex-column align-items-center'>
						<div className='form-text custm-AdvertenciaError'>
							<i className='bi bi-exclamation-circle'>{` `}</i>
							Error: ¡No tienes horas extras asignadas o aceptadas!
						</div>
						<button
							className='btn custm-btnCheckConfirmation custm-btnCheckConfirmation2'
							type='button'
							onClick={navigateCheck}
						>
							OK
						</button>
					</div>
				) : (
					<div className='d-flex flex-column align-items-center'>
						<div className='form-text custm-AdvertenciaError'>
							<i className='bi bi-exclamation-circle'>{` `}</i>
							Error: El día de hoy no está registrado como día laboral en tú horario.
						</div>
						<button
							className='btn custm-btnCheckConfirmation custm-btnCheckConfirmation2'
							type='button'
							onClick={navigateCheck}
						>
							OK
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default ChecadorConfirmacion;
