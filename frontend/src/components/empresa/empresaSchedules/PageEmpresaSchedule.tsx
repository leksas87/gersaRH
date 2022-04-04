import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getSchedules,
	scheduleToDelete,
	scheduleToUpdated,
	updatedSchedules,
} from '../../../actions/scheduleActions/scheduleActions';
import { iSchedules } from '../../../actions/scheduleActions/scheduleActionsTypes';
import { useToggle } from '../../../hooks/useToggle';
import { RootSote } from '../../../store/Store';
import ModalEliminarHorario from './ModalEliminarHorario';
import ModalNuevoHorario from './ModalNuevoHorario';
import './PageEmpresaSchedule.css';

const PageEmpresaSchedule = () => {
	//dispatch para ejecutar las actions
	const dispatch = useDispatch();
	//Se necesita el state que contiene los datos de los schedules
	const { schedulesArray, schedulesToEdited } = useSelector(
		(state: RootSote) => state.schedules
	);

	//useToggle, se extrae el valor y toggleValue-> para cabiar el valor
	const [scheduleValue, toggleSchedule] = useToggle(false); //Recibe el valor inicial

	//objeto para formulario  Schedule
	const formSchedule = {
		scheduleName: '',
		horaEntrada: '',
		tiempoRetraso: 0,
		horaSalida: '',
		tiempoDescanso: 0,
	};
	// Objeto para el manejo de los dias trabajados
	const days = {
		Lunes: false,
		Martes: false,
		Miercoles: false,
		Jueves: false,
		Viernes: false,
		Sabado: false,
		Domingo: false,
	};
	//states de formularios
	const [infoScheduleValues, setInfoScheduleValues] = useState(formSchedule);
	//useState para manejo del checkbox
	const [checked, setChecked] = useState(days);

	//Desestructuracion de elemntos del useState
	const {
		scheduleName,
		horaEntrada,
		tiempoRetraso,
		horaSalida,
		tiempoDescanso,
	} = infoScheduleValues;
	//Desestructuracion de propiedades
	const { Lunes, Martes, Miercoles, Jueves, Viernes, Sabado, Domingo } = checked;

	//Efecto que asigna el valor al inicialstate con lo que se tiene en el reducer.
	useEffect(() => {
		setInfoScheduleValues({
			scheduleName: schedulesToEdited.scheduleName,
			horaEntrada: schedulesToEdited.horaEntrada,
			tiempoRetraso: schedulesToEdited.tiempoRetraso,
			horaSalida: schedulesToEdited.horaSalida,
			tiempoDescanso: schedulesToEdited.tiempoDescanso,
		});
		setChecked({
			Lunes: schedulesToEdited.Lunes,
			Martes: schedulesToEdited.Martes,
			Miercoles: schedulesToEdited.Miercoles,
			Jueves: schedulesToEdited.Jueves,
			Viernes: schedulesToEdited.Viernes,
			Sabado: schedulesToEdited.Sabado,
			Domingo: schedulesToEdited.Domingo,
		});
	}, [schedulesToEdited]);

	//handleInputChange
	const handleInputChangeInfoSchedule = (event: any) => {
		setInfoScheduleValues({
			...infoScheduleValues,
			[event.target.name]: event.target.value,
		});
	};
	const handleClick = (e: any): void => {
		setChecked({ ...checked, [e.target.name]: e.target.checked });
	};

	//Submit del formulario edit schedule
	const handlesubmitSchedule = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			updatedSchedules(schedulesToEdited.id, {
				scheduleName,
				horaEntrada,
				tiempoRetraso,
				horaSalida,
				tiempoDescanso,
				Lunes,
				Martes,
				Miercoles,
				Jueves,
				Viernes,
				Sabado,
				Domingo,
			})
		);

		toggleSchedule(false);
	};

	useEffect(() => {
		dispatch(getSchedules());
	}, [dispatch]);

	const selectScheduleToDelete = (schedule: iSchedules) => {
		dispatch(
			scheduleToDelete({ id: schedule.id, scheduleName: schedule.scheduleName })
		);
	};
	const selectSchedule = (schedule: iSchedules) => {
		dispatch(scheduleToUpdated(schedule));
	};

	return (
		<>
			<ModalNuevoHorario />
			<ModalEliminarHorario />
			<div className='custm-contractContainerCenter p-3'>
				<div className='d-flex flex-column custm-scheduleWidht'>
					<div className=' d-flex justify-content-end custm-Width100 '>
						{/* <div className='btn custm-btnBorder'> */}
						<button
							className='btn custm-btnBorder'
							type='button'
							data-bs-toggle='modal'
							data-bs-target='#ModalNuevoHorario'
						>
							Nuevo horario <i className='bi bi-plus-circle' />
						</button>
					</div>
					<div className=' mt-3'>
						<div className='table-responsive custm-tableSchedules'>
							<table className='table table align-middle'>
								<thead>
									{/* <thead> */}
									<tr>
										<th scope='col'>
											<div className='d-flex justify-content-center textColorSecondary'>
												Id
											</div>
										</th>
										<th scope='col'>
											<div className='d-flex justify-content-center textColorSecondary'>
												Nombre del horario
											</div>
										</th>
										<th scope='col'>
											<div className='d-flex justify-content-center'>Acción</div>
										</th>
									</tr>
								</thead>
								<tbody>
									{schedulesArray.map((schedule) => (
										<tr
											key={schedule.id}
											className='custm-table-trSchedule'
											onClick={() => selectSchedule(schedule)}
										>
											<th scope='row'>
												<div className='d-flex align-items-center justify-content-center text-center textColorSecondary'>
													{schedule.id}
												</div>
											</th>
											<td>
												<div className='d-flex align-items-center justify-content-center'>
													<div className='textColorSecondary'>{schedule.scheduleName}</div>
												</div>
											</td>
											<td>
												<div className='d-flex align-items-center justify-content-center'>
													{/* <div className=' btn custm-btnEliminar'>Eliminar</div> */}
													<button
														className='btn custm-btnEliminar'
														type='button'
														data-bs-toggle='modal'
														data-bs-target='#ModalEliminarSchedule'
														onClick={() => selectScheduleToDelete(schedule)}
													>
														Eliminar
													</button>
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
			{schedulesToEdited.id !== 0 ? (
				<div className='d-flex justify-content-center pt-5'>
					<div
						className='d-flex flex-column align-items-center '
						style={{ maxWidth: '400px' }}
					>
						<div className='d-flex justify-content-end custm-Width100'>
							<button className='btn fs-3 custm-btnToggle' onClick={toggleSchedule}>
								<i className='bi bi-pencil-square textColorSecondary' />
							</button>
						</div>
						<form style={{ width: '90%' }} onSubmit={handlesubmitSchedule}>
							<div className='d-flex justify-content-center textColorLight mb-1'>
								<div className='fs-4 textColorLight'>Detalle del horario</div>
							</div>
							<div className='d-flex mb-4'>
								<div className='me-1'>
									<label className='custm-Width100 text-center textColorLight'>
										Nombre del horario
									</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilEmpleado.ciudad}
										name='scheduleName'
										value={scheduleName}
										onChange={handleInputChangeInfoSchedule}
										disabled={!scheduleValue}
									/>
								</div>
								<div className='ms-1'>
									<label className='custm-Width100 text-center textColorLight'>
										Hora entrada
									</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='time'
										// placeholder={perfilEmpleado.codigoPostal.toString()}
										name='horaEntrada'
										value={horaEntrada}
										onChange={handleInputChangeInfoSchedule}
										disabled={!scheduleValue}
									/>
								</div>
							</div>
							<div className='d-flex mb-4'>
								<div className='me-1 d-flex flex-column justify-content-end'>
									<label className='custm-Width100 text-center textColorLight'>
										Tiempo de retardo (Minutos)
									</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='number'
										// placeholder={perfilEmpleado.ciudad}
										name='tiempoRetraso'
										value={tiempoRetraso}
										onChange={handleInputChangeInfoSchedule}
										disabled={!scheduleValue}
									/>
								</div>
								<div className='ms-1 d-flex flex-column justify-content-end'>
									<label className='custm-Width100 text-center textColorLight'>
										Hora salida
									</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='time'
										// placeholder={perfilEmpleado.codigoPostal.toString()}
										name='horaSalida'
										value={horaSalida}
										onChange={handleInputChangeInfoSchedule}
										disabled={!scheduleValue}
									/>
								</div>
							</div>
							<div className='d-flex mb-4 justify-content-center'>
								<div className='ms-1 d-flex flex-column justify-content-end'>
									<label className='custm-Width100 text-center textColorLight'>
										Tiempo de descanso
									</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='number'
										// placeholder={perfilEmpleado.codigoPostal.toString()}
										name='tiempoDescanso'
										value={tiempoDescanso}
										onChange={handleInputChangeInfoSchedule}
										disabled={!scheduleValue}
									/>
								</div>
							</div>

							<div className='d-flex justify-content-center textColorLight mb-1'>
								<label>
									{/* <span className='text-capitalize'>{perfilUsuario.firstName}</span>{' '} */}
									Días laborales:
								</label>
							</div>
							<div className='d-flex justify-content-center mb-4'>
								<div
									className='btn-group mb-2 custm-Width100'
									role='group'
									aria-label='Basic checkbox toggle button group'
								>
									<input
										type='checkbox'
										className='btn-check custm-checkWeek '
										id='btncheckLunesComponent'
										name='Lunes'
										checked={Lunes}
										onChange={handleClick}
										disabled={!scheduleValue}
									/>
									<label
										className='btn btn-outline-primary custm-btnWeek'
										htmlFor='btncheckLunesComponent'
									>
										L
									</label>

									<input
										type='checkbox'
										className='btn-check custm-checkWeek'
										id='btncheckMartesComponent'
										name='Martes'
										checked={Martes}
										onChange={handleClick}
										disabled={!scheduleValue}
									/>
									<label
										className='btn btn-outline-primary custm-btnWeek'
										htmlFor='btncheckMartesComponent'
									>
										M
									</label>

									<input
										type='checkbox'
										className='btn-check custm-checkWeek'
										id='btncheckMiercolesComponent'
										name='Miercoles'
										checked={Miercoles}
										onChange={handleClick}
										disabled={!scheduleValue}
									/>
									<label
										className='btn btn-outline-primary custm-btnWeek'
										htmlFor='btncheckMiercolesComponent'
									>
										M
									</label>
									<input
										type='checkbox'
										className='btn-check custm-checkWeek'
										id='btncheckJuevesComponent'
										name='Jueves'
										checked={Jueves}
										onChange={handleClick}
										disabled={!scheduleValue}
									/>
									<label
										className='btn btn-outline-primary custm-btnWeek'
										htmlFor='btncheckJuevesComponent'
									>
										J
									</label>
									<input
										type='checkbox'
										className='btn-check custm-checkWeek'
										id='btncheckViernesComponent'
										name='Viernes'
										checked={Viernes}
										onChange={handleClick}
										disabled={!scheduleValue}
									/>
									<label
										className='btn btn-outline-primary custm-btnWeek'
										htmlFor='btncheckViernesComponent'
									>
										V
									</label>
									<input
										type='checkbox'
										className='btn-check custm-checkWeek'
										id='btncheckSabadoComponent'
										name='Sabado'
										checked={Sabado}
										onChange={handleClick}
										disabled={!scheduleValue}
									/>
									<label
										className='btn btn-outline-primary custm-btnWeek'
										htmlFor='btncheckSabadoComponent'
									>
										S
									</label>
									<input
										type='checkbox'
										className='btn-check custm-checkWeek'
										id='btncheckDomingoComponent'
										name='Domingo'
										checked={Domingo}
										onChange={handleClick}
										disabled={!scheduleValue}
									/>
									<label
										className='btn btn-outline-primary custm-btnWeek'
										htmlFor='btncheckDomingoComponent'
									>
										D
									</label>
								</div>
							</div>

							<div
								className='d-flex justify-content-end custm-Width100'
								style={{ height: '3rem' }}
							>
								{scheduleValue && (
									<button type='submit' className='btn  custm-empleadoFormSubmit'>
										Guardar
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			) : (
				<div className='d-flex justify-content-center pt-5'>
					<span className='fs-4 textColorSecondary'>
						Selecciona un horario para ver su detalle.
					</span>
				</div>
			)}
		</>
	);
};

export default PageEmpresaSchedule;
