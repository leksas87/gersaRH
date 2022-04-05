import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeEventsByDates } from '../../../actions/eventsActions/eventsActions';
import { iEmployeeEvent } from '../../../actions/eventsActions/eventsActionTypes';
import { RootSote } from '../../../store/Store';

const PageControlHorario = () => {
	//dispatch para ejecutar las Actions
	const dispatch = useDispatch();
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilEmpleado } = useSelector((state: RootSote) => state.users);
	//Se necesita el state que contiene los datos del EmployeeEvents
	const { employeeEvents } = useSelector((state: RootSote) => state.events);

	//useState que guarda el digito de día inicio y fin de semana para mostrar en el titulo
	const [days, setDays] = useState({
		fechaInicioD: '',
		fechaFinD: '',
	});

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

	//Efecto que ejecuta la peticion al Backend
	useEffect(() => {
		setDays({
			fechaInicioD: moment(fechaInicio).format('L'),
			fechaFinD: moment(fechaFin).format('L'),
		});
		//Si perfilEmpleado.Id existe se hace el dispatch
		if (perfilEmpleado.id)
			dispatch(getEmployeeEventsByDates(perfilEmpleado.id, fechaInicio, fechaFin));
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
				<div className='d-flex custm-Width100 mt-3 align-items-center '>
					<div className='textColorSecondary  d-flex align-items-center'>
						<button className='btn' onClick={substWeek}>
							<i className=' btn bi bi-caret-left' />
						</button>
						<div>
							<span className='textColorLight'>( {days.fechaInicioD}</span>
							<span className='fs-4'>{'  -  '}</span>
							<span className='textColorLight'>{days.fechaFinD} )</span>
						</div>

						<button className='btn' onClick={addWeek}>
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
									<th scope='col'>
										<div className='d-flex justify-content-center'>Entrada</div>
									</th>
									<th scope='col'>
										<div className='d-flex justify-content-center'>Inicia descanso</div>
									</th>
									<th scope='col'>
										<div className='d-flex justify-content-center'>Fin descanso</div>
									</th>
									<th scope='col'>
										<div className='d-flex justify-content-center'>Salida</div>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr style={{ height: '4rem' }}>
									<th scope='row'>
										<div className='d-flex align-items-center justify-content-center text-center'>
											Lunes {moment(fechaInicio).format('DD')}
										</div>
									</th>
									{weeksArrayMonday &&
										weeksArrayMonday.map((item) => (
											<td key={item.id}>
												<div className='d-flex align-items-center justify-content-center'>
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
											</td>
										))}
								</tr>
								<tr style={{ height: '4rem' }}>
									<th scope='row'>
										<div className='d-flex align-items-center justify-content-center text-center'>
											Martes {moment(fechaInicio).add(1, 'day').format('DD')}
										</div>
									</th>
									{weeksArrayTuesday &&
										weeksArrayTuesday.map((item) => (
											<td key={item.id}>
												<div className='d-flex align-items-center justify-content-center'>
													<span className='textColorLight'>hrs</span>
													<div className='custm-hrsEntry'>
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
											</td>
										))}
								</tr>
								<tr style={{ height: '4rem' }}>
									<th scope='row'>
										<div className='d-flex align-items-center justify-content-center text-center'>
											Miercoles {moment(fechaInicio).add(2, 'day').format('DD')}
										</div>
									</th>
									{weeksArrayWednesday &&
										weeksArrayWednesday.map((item) => (
											<td key={item.id}>
												<div className='d-flex align-items-center justify-content-center'>
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
											</td>
										))}
								</tr>
								<tr style={{ height: '4rem' }}>
									<th scope='row'>
										<div className='d-flex align-items-center justify-content-center text-center'>
											Jueves {moment(fechaInicio).add(3, 'day').format('DD')}
										</div>
									</th>
									{weeksArrayThursday &&
										weeksArrayThursday.map((item) => (
											<td key={item.id}>
												<div className='d-flex align-items-center justify-content-center'>
													<span className='textColorLight'>hrs</span>
													<div className='custm-hrsEntry'>
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
											</td>
										))}
								</tr>
								<tr style={{ height: '4rem' }}>
									<th scope='row'>
										<div className='d-flex align-items-center justify-content-center text-center'>
											Viernes {moment(fechaInicio).add(4, 'day').format('DD')}
										</div>
									</th>
									{weeksArrayFriday &&
										weeksArrayFriday.map((item) => (
											<td key={item.id}>
												<div className='d-flex align-items-center justify-content-center'>
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
											</td>
										))}
								</tr>
								<tr style={{ height: '4rem' }}>
									<th scope='row'>
										<div className='d-flex align-items-center justify-content-center text-center'>
											sabado {moment(fechaInicio).add(5, 'day').format('DD')}
										</div>
									</th>
									{weeksArraySaturday &&
										weeksArraySaturday.map((item) => (
											<td key={item.id}>
												<div className='d-flex align-items-center justify-content-center'>
													<span className='textColorLight'>hrs</span>
													<div className='custm-hrsEntry'>
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
											</td>
										))}
								</tr>
								<tr style={{ height: '4rem' }}>
									<th scope='row'>
										<div className='d-flex align-items-center justify-content-center text-center'>
											Domingo {moment(fechaInicio).add(6, 'day').format('DD')}
										</div>
									</th>
									{weeksArraySunday &&
										weeksArraySunday.map((item) => (
											<td key={item.id}>
												<div className='d-flex align-items-center justify-content-center'>
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
											</td>
										))}
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageControlHorario;
