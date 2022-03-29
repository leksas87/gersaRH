import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import {
	changecheckIsUserActiveFalse,
	sendAccessCodeDataCheck,
	sendEmployeeEvent,
} from '../../actions/eventsActions/eventsActions';
import { iEmployeeSchedules } from '../../actions/scheduleActions/scheduleActionsTypes';
import { RootSote } from '../../store/Store';
import './Checador.css';

const ChecadorConfirmacion = () => {
	//Senecesita el state que indica  el checkState
	const { userConfirmation, eventServerDay, eventServerTime, employeeEvents } =
		useSelector((state: RootSote) => state.events);
	//Senecesita el state que indica  el checkState
	const { employeeSchedules } = useSelector(
		(state: RootSote) => state.schedules
	);

	//useDispatch para ejecutar las Actions
	const dispatch = useDispatch();

	//Usestate para tipo de Event
	const [eventType, setEventType] = useState('');
	//Usestate que almacena el horario a evaluar
	const [scheduleToComparate, setscheduleToComparate] =
		useState<iEmployeeSchedules>();
	//useState que indica si empleado trabaja hoy
	const [employeeWorksToday, setEmployeeWorksToday] = useState(false);

	//useState para almacenar las cordenas
	const [cordenadas, setCordenadas] = useState({
		latitude: 0,
		longitude: 0,
	});

	//Metodo para enviar al inicio
	const navigateCheck = () => {
		//se cambia el estado de isUserActive a False
		dispatch(changecheckIsUserActiveFalse());
	};

	//Metodo que compara dos horas (Entrada)
	const compareHours = (
		horaEntradaSchedule: string,
		horaActualServer: string
	) => {
		const horaEntrada = moment(horaEntradaSchedule, 'HH:mm');
		const horaRetardo = moment(horaEntradaSchedule, 'HH:mm').add(
			scheduleToComparate?.tiempoRetraso,
			'minutes'
		);
		const horaActual = moment(horaActualServer, 'HH:mm');

		if (horaActual <= horaEntrada) {
			console.log('Normal');
			setEventType('Normal');
		} else if (horaActual > horaEntrada && horaActual <= horaRetardo) {
			console.log('retardo');
			setEventType('Retardo');
		} else if (horaActual > horaRetardo) {
			console.log('actaAdministrativa');
			setEventType('Acta administrativa');
		}
	};
	//Metodo que compara dos horas (Entrada)
	const compareHoursEntradaComida = (horaActualServer?: string) => {
		const breakfast = moment(employeeEvents[1].DateEvent, 'HH:mm');
		const horaActual = moment(horaActualServer, 'HH:mm');

		//Encuentra la duracion entre dos horas
		const durationTime = moment.duration(horaActual.diff(breakfast));
		const time = durationTime.asMinutes();

		//Condicion para guardar tipo de evento (Entrada de Descanso)
		if (scheduleToComparate?.tiempoDescanso) {
			if (time <= scheduleToComparate?.tiempoDescanso) {
				setEventType('Normal');
			} else if (
				time > scheduleToComparate?.tiempoDescanso &&
				time <=
					scheduleToComparate?.tiempoDescanso + scheduleToComparate.tiempoRetraso
			) {
				setEventType('Retardo');
			} else if (
				time >
				scheduleToComparate?.tiempoDescanso + scheduleToComparate.tiempoRetraso
			) {
				setEventType('Acta administrativa');
			}
		}
	};

	//Se obtiene horario en el cual el dia actual (hoy) coincide con tu horario
	// const event = 'Martes';
	const schedule = employeeSchedules.find(
		(schedule: any) => schedule[eventServerDay] === true
	);

	//Efecto para evaluar si empleado trabaja hoy
	// y validar hora de entrada
	useEffect(() => {
		if (schedule) {
			setEmployeeWorksToday(true);
			// Empleado SI trabaja hoy
			setscheduleToComparate(schedule);
			//Validar hora de Entrada
			if (employeeEvents.length === 0) {
				if (scheduleToComparate?.horaEntrada) {
					compareHours(scheduleToComparate?.horaEntrada, eventServerTime);
				}
			} else if (employeeEvents.length === 1) {
				setEventType('Normal');
			} else if (employeeEvents.length === 2) {
				compareHoursEntradaComida(eventServerTime);
			} else if (employeeEvents.length === 3) {
				setEventType('Normal');
			}
		} else {
			// Empleado no trabaja hoy
			setEmployeeWorksToday(false);
		}
	}, [schedule, scheduleToComparate]);

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
			dispatch(
				sendEmployeeEvent(
					{
						latitudeEvent: cordenadas.latitude.toString(),
						longitudeEvent: cordenadas.longitude.toString(),
						EventType: eventType,
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
				{employeeWorksToday ? (
					<div>
						{eventType === 'Acta administrativa' && (
							<div className='form-text custm-AdvertenciaError'>
								<i className='bi bi-exclamation-circle'>{` `}</i>
								Advertencia: Tienes un retardo que implica una acta administrativa.
							</div>
						)}
						{eventType === 'Retardo' && (
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
							<button
								className='btn custm-btnCheckConfirmation custm-btnCheckConfirmation2'
								type='button'
								onClick={confirmationRegister}
							>
								SI
							</button>
						</div>
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
