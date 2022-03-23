import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getSchedules,
	scheduleToDelete,
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
	const { schedulesArray } = useSelector((state: RootSote) => state.schedules);

	//useToggle, se extrae el valor y toggleValue-> para cabiar el valor
	const [scheduleValue, toggleSchedule] = useToggle(false); //Recibe el valor inicial

	const handlesubmitSchedule = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('sending');
		toggleSchedule(false);
	};

	useEffect(() => {
		dispatch(getSchedules());
	}, []);

	const selectScheduleToDelete = (schedule: iSchedules) => {
		dispatch(
			scheduleToDelete({ id: schedule.id, scheduleName: schedule.scheduleName })
		);
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
												Nombre
											</div>
										</th>
										<th scope='col'>
											<div className='d-flex justify-content-center' />
										</th>
									</tr>
								</thead>
								<tbody>
									{schedulesArray.map((schedule) => (
										<tr key={schedule.id} className='custm-table-trSchedule'>
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
									// value={ciudad}
									// onChange={handleInputChangeDireccion}
									disabled={!scheduleValue}
								/>
							</div>
							<div className='ms-1'>
								<label className='custm-Width100 text-center textColorLight'>
									Hora entrada
								</label>

								<input
									className='form-control custm-Width100 custm-empleadoFormIntput'
									type='text'
									// placeholder={perfilEmpleado.codigoPostal.toString()}
									name='horaEntrada'
									// value={codigoPostal}
									// onChange={handleInputChangeDireccion}
									disabled={!scheduleValue}
								/>
							</div>
						</div>
						<div className='d-flex mb-4'>
							<div className='me-1 d-flex flex-column justify-content-end'>
								<label className='custm-Width100 text-center textColorLight'>
									Tiempo de retardo
								</label>

								<input
									className='form-control custm-Width100 custm-empleadoFormIntput'
									type='text'
									// placeholder={perfilEmpleado.ciudad}
									name='tiempoRetraso'
									// value={ciudad}
									// onChange={handleInputChangeDireccion}
									disabled={!scheduleValue}
								/>
							</div>
							<div className='ms-1 d-flex flex-column justify-content-end'>
								<label className='custm-Width100 text-center textColorLight'>
									Hora salida
								</label>

								<input
									className='form-control custm-Width100 custm-empleadoFormIntput'
									type='text'
									// placeholder={perfilEmpleado.codigoPostal.toString()}
									name='horaSalida'
									// value={codigoPostal}
									// onChange={handleInputChangeDireccion}
									disabled={!scheduleValue}
								/>
							</div>
						</div>
						<div className='d-flex mb-4'>
							<div className='me-1 d-flex flex-column justify-content-end'>
								<label className='custm-Width100 text-center textColorLight'>
									Tiempo de acta administrativa
								</label>

								<input
									className='form-control custm-Width100 custm-empleadoFormIntput'
									type='text'
									// placeholder={perfilEmpleado.ciudad}
									name='tiempoActaAdministrativa'
									// value={ciudad}
									// onChange={handleInputChangeDireccion}
									disabled={!scheduleValue}
								/>
							</div>
							<div className='ms-1 d-flex flex-column justify-content-end'>
								<label className='custm-Width100 text-center textColorLight'>
									Tiempo de descanso
								</label>

								<input
									className='form-control custm-Width100 custm-empleadoFormIntput'
									type='text'
									// placeholder={perfilEmpleado.codigoPostal.toString()}
									name='tiempoDescanso'
									// value={codigoPostal}
									// onChange={handleInputChangeDireccion}
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
									name='lunes'
									// checked={lunes}
									// onChange={handleClick}
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
									name='martes'
									// checked={martes}
									// onChange={handleClick}
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
									name='miercoles'
									// checked={miercoles}
									// onChange={handleClick}
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
									name='jueves'
									// checked={jueves}
									// onChange={handleClick}
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
									name='viernes'
									// checked={viernes}
									// onChange={handleClick}
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
									name='sabado'
									// checked={sabado}
									// onChange={handleClick}
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
									name='domingo'
									// checked={domingo}
									// onChange={handleClick}
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
		</>
	);
};

export default PageEmpresaSchedule;
