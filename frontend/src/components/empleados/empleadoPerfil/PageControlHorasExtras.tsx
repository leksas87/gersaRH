import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getEmployeeEventsByDates,
	getEmployeeHoursAcceptedByDates,
} from '../../../actions/eventsActions/eventsActions';
import { iEmployeeEvent } from '../../../actions/eventsActions/eventsActionTypes';
import { RootSote } from '../../../store/Store';
import AutorizarHorasExtras from './AutorizarHorasExtras';
import TotalHorasComponent from './TotalHorasComponent';

const PageControlHorasExtras = () => {
	//dispatch para ejecutar las Actions
	const dispatch = useDispatch();
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilEmpleado, perfilUsuario } = useSelector(
		(state: RootSote) => state.users
	);
	//Se necesita el state que contiene los datos del EmployeeEvents
	const { employeeEvents, employeeHoursAccepted } = useSelector(
		(state: RootSote) => state.events
	);

	const tipoDeAccionArray = [
		{ name: 'Entrada', eventActionType: 5 },
		{ name: 'Salida', eventActionType: 6 },
	];

	//useState que guarda el digito de día inicio y fin de semana para mostrar en el titulo
	const [days, setDays] = useState({
		fechaInicioD: '',
		fechaFinD: '',
	});
	const [totalHorasAceptadas, setTotalHorasAceptadas] = useState(0);

	//useState que guarda los Arrays por días de la semana
	const [weeksArrayMonday, setWeeksArrayMonday] = useState<iEmployeeEvent[]>();
	const [weeksArrayTuesday, setWeeksArrayTuesday] = useState<iEmployeeEvent[]>();
	const [weeksArrayWednesday, setWeeksArrayWednesday] =
		useState<iEmployeeEvent[]>();
	const [weeksArrayThursday, setWeeksArrayThursday] =
		useState<iEmployeeEvent[]>();
	const [weeksArrayFriday, setWeeksArrayFriday] = useState<iEmployeeEvent[]>();
	const [weeksArraySaturday, setWeeksArraySaturday] =
		useState<iEmployeeEvent[]>();
	const [weeksArraySunday, setWeeksArraySunday] = useState<iEmployeeEvent[]>();

	const semanaArray = [
		{ id: 1, dia: 'Lunes', position: 0, weeksArrayDay: weeksArrayMonday },
		{ id: 2, dia: 'Martes', position: 1, weeksArrayDay: weeksArrayTuesday },
		{ id: 3, dia: 'Miercoles', position: 2, weeksArrayDay: weeksArrayWednesday },
		{ id: 4, dia: 'Jueves', position: 3, weeksArrayDay: weeksArrayThursday },
		{ id: 5, dia: 'Viernes', position: 4, weeksArrayDay: weeksArrayFriday },
		{ id: 6, dia: 'Sabado', position: 5, weeksArrayDay: weeksArraySaturday },
		{ id: 7, dia: 'Domingo', position: 6, weeksArrayDay: weeksArraySunday },
	];

	//se obtiene fecha actual
	const fechaEvent = moment().format('YYYY-MM-DD HH:mm:ss');

	//Se obtiene numero de semana y se asigna al useState
	const [semanaEvent, setSemanaEvent] = useState(moment(fechaEvent).week());

	//Se determina el día de inicio de la semana actual
	const fechaInicio = moment()
		.isoWeek(semanaEvent - 1)
		.startOf('isoWeek')
		.format('YYYY-MM-DD HH:mm:ss');
	//Se determina el ultimo día de la semana actual
	const fechaFin = moment()
		.isoWeek(semanaEvent - 1)
		.endOf('isoWeek')
		.format('YYYY-MM-DD HH:mm:ss');

	useEffect(() => {
		let initialValue = 0;
		const sum = employeeHoursAccepted.reduce(
			(previousValue, currentValue) =>
				previousValue + parseInt(currentValue.horasAceptadas),
			initialValue
		);

		setTotalHorasAceptadas(sum);
	}, [employeeHoursAccepted]);

	//Efecto que ejecuta la peticion al Backend
	useEffect(() => {
		setDays({
			fechaInicioD: moment(fechaInicio).format('L'),
			fechaFinD: moment(fechaFin).format('L'),
		});
		//Si perfilEmpleado.Id existe se hace el dispatch
		if (perfilEmpleado.id) {
			console.log(fechaInicio);
			console.log(fechaFin);
			dispatch(getEmployeeEventsByDates(perfilEmpleado.id, fechaInicio, fechaFin));
			dispatch(
				getEmployeeHoursAcceptedByDates(perfilEmpleado.id, fechaInicio, fechaFin)
			);
		}
	}, [semanaEvent, dispatch, fechaFin, fechaInicio, perfilEmpleado.id]);

	//Efecto que separa el array principal en los eventos por día
	useEffect(() => {
		//Monday
		const result = employeeEvents.filter(
			(event) => moment(event.DateEvent).format('dddd') === 'Monday'
		);
		setWeeksArrayMonday(result);

		//Tuesday
		const result2 = employeeEvents.filter(
			(event) => moment(event.DateEvent).format('dddd') === 'Tuesday'
		);
		setWeeksArrayTuesday(result2);
		// console.log(result2);

		//Wednesday
		const result3 = employeeEvents.filter(
			(event) => moment(event.DateEvent).format('dddd') === 'Wednesday'
		);
		setWeeksArrayWednesday(result3);

		//Thursday
		const result4 = employeeEvents.filter(
			(event) => moment(event.DateEvent).format('dddd') === 'Thursday'
		);
		setWeeksArrayThursday(result4);

		//Friday
		const result5 = employeeEvents.filter(
			(event) => moment(event.DateEvent).format('dddd') === 'Friday'
		);
		setWeeksArrayFriday(result5);

		//Saturday
		const result6 = employeeEvents.filter(
			(event) => moment(event.DateEvent).format('dddd') === 'Saturday'
		);
		setWeeksArraySaturday(result6);

		//Sunday
		const result7 = employeeEvents.filter(
			(event) => moment(event.DateEvent).format('dddd') === 'Sunday'
		);
		setWeeksArraySunday(result7);
	}, [employeeEvents]);

	//boton para ir una semana atras
	const substWeek = () => {
		setSemanaEvent(semanaEvent - 1);
	};
	//boton para ir una semana adelante
	const addWeek = () => {
		setSemanaEvent(semanaEvent + 1);
	};
	//boton para ir a la semana actual
	const currentWeek = () => {
		setSemanaEvent(moment(fechaEvent).week());
	};
	return (
		<>
			<div className='d-flex flex-column align-items-center'>
				<div className='d-flex'>
					<div className='d-flex align-items-center pe-2'>
						<i className='bi bi-stopwatch fs-1 textColorSecondary' />
					</div>
					<div className='d-flex flex-column align-items-center'>
						<div className='fs-4'>Registro de horas</div>
						<div className='textColorLight '>
							Información sobre el registro de entradas y salidas
						</div>
					</div>
				</div>
				<div className='d-flex custm-Width100 pt-2 pb-2'>
					<div
						className=' d-flex align-items-center p-2 rounded-3'
						style={{ backgroundColor: 'var(--backgroundBody)' }}
					>
						<div
							className='p-2 shadow rounded-3'
							style={{ backgroundColor: '#fff', pointerEvents: 'none' }}
						>
							Semanal
						</div>
						{/* <div className='ms-2 me-2 btn'>Quincenal</div>
						<div className='ms-2 me-2 btn'>Mensual</div> */}
					</div>
				</div>
				<div className='d-flex custm-Width100 mt-3 align-items-center flex-wrap'>
					<div className='textColorSecondary  d-flex align-items-center'>
						<button
							className='btn d-flex justify-content-center'
							style={{ width: '30px' }}
							onClick={substWeek}
						>
							<i className=' btn bi bi-caret-left' />
						</button>
						<div>
							<span className='textColorLight'>( {days.fechaInicioD}</span>
							<span className='fs-5'>{'  -  '}</span>
							<span className='textColorLight'>{days.fechaFinD} )</span>
						</div>

						<button
							className='btn d-flex justify-content-center'
							onClick={addWeek}
							style={{ width: '30px' }}
						>
							<i className=' btn bi bi-caret-right' />
						</button>
					</div>
					<button onClick={currentWeek} className='btn textColorLight'>
						Ir a semana actual
					</button>
				</div>
				<div className='custm-tableEmpleados mt-3'>
					<div className='table-responsive'>
						<table className='table table align-middle'>
							<thead className=''>
								<tr>
									<th scope='col'>
										<div className='d-flex justify-content-center'>Fecha</div>
									</th>
									{tipoDeAccionArray.map((element) => (
										<th key={element.eventActionType} scope='col'>
											<div className='d-flex justify-content-center'>{element.name}</div>
										</th>
									))}
									<th scope='col'>
										<div className='d-flex justify-content-center'>Total horas</div>
									</th>
									<th scope='col'>
										<div className='d-flex justify-content-center'>Autorizar</div>
									</th>
								</tr>
							</thead>
							<tbody>
								{semanaArray.map((semana) => (
									<tr key={semana.id} style={{ height: '4rem' }}>
										<th scope='row'>
											<div className='d-flex align-items-center justify-content-center text-center'>
												{semana.dia}{' '}
												{moment(fechaInicio).add(semana.position, 'day').format('DD')}
												{/* {moment(fechaInicio).add(semana.position, 'day').format('L')} */}
											</div>
										</th>
										{tipoDeAccionArray.map((tipoAction, i) => (
											<td key={i}>
												{semana.weeksArrayDay &&
													semana.weeksArrayDay
														.filter(
															(array) => array.eventActionTypeId === tipoAction.eventActionType
														)
														.map((item) => (
															<div
																key={item.id}
																className='d-flex align-items-center justify-content-center'
															>
																<span className='textColorLight'>hrs</span>
																<div className='custm-hrsExit'>
																	{moment(item.DateEvent).format('HH:mm')}
																</div>
																<a
																	className='fs-3 btn textColorSecondary'
																	href={`https://www.google.com.mx/maps/@${item.latitudeEvent},${item.longitudeEvent},16z`}
																	target='_blank'
																	rel='noopener noreferrer'
																	style={{ textDecoration: 'none' }}
																>
																	<i className='bi bi-geo-alt' />
																</a>
															</div>
														))}
											</td>
										))}
										<td>
											<TotalHorasComponent semana={semana.weeksArrayDay} />
										</td>
										<td>
											<AutorizarHorasExtras
												date={moment(fechaInicio)
													.add(semana.position, 'day')
													.format('YYYY-MM-DD')}
												fechaFin={fechaFin}
												fechaInicio={fechaInicio}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div className='mt-4 custm-Width100 d-flex flex-column'>
					<div className='textColorSecondary fs-5'>
						Informe de empleado - Horas extras
					</div>
					<div className='textColorSecondary'>
						Empleado: {`${perfilUsuario.firstName} ${perfilUsuario.lastName}`}
					</div>
					<div className='textColorSecondary mt-3'>
						Horas extras Aceptadas:{' '}
						<span className='fw-bold'>{totalHorasAceptadas} horas</span>
					</div>

					<div className='d-flex justify-content-center   custm-Width100'>
						<div className='custm-tableArchivos mt-3'>
							<div className='table-responsive '>
								<table className='table align-middle'>
									<thead className='custm-tableThead'>
										<tr>
											<th scope='col' className='custm-col textColorLight'>
												Fecha del evento
											</th>
											<th scope='col' className='custm-col textColorLight'>
												Horas aceptadas
											</th>
											<th scope='col' className='custm-col textColorLight'>
												Fecha de Autorización
											</th>
										</tr>
									</thead>
									<tbody>
										{employeeHoursAccepted.map((file) => (
											<tr key={file.id} className='custm-table-tr textColorLight'>
												<th className='textColorSecondary' scope='row'>
													<div className='d-flex align-items-center justify-content-center text-center'>
														{file.fechaEvento}
													</div>
												</th>
												<td>
													<div className='d-flex align-items-center justify-content-center text-center'>
														{file.horasAceptadas}
													</div>
												</td>
												<td>
													<div className='d-flex align-items-center justify-content-center text-center'>
														{file.fechaCreacion}
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageControlHorasExtras;
