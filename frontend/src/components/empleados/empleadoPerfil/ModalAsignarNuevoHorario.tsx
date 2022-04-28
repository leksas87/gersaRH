import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addScheduleToEmployee } from '../../../actions/scheduleActions/scheduleActions';
import { useForm } from '../../../hooks/useForm';
import { RootSote } from '../../../store/Store';

const ModalAsignarNuevoHorario = () => {
	//dispatch para ejecutar las contractsActions
	const dispatch = useDispatch();
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilUsuario, perfilEmpleado } = useSelector(
		(state: RootSote) => state.users
	);
	//Se necesita el state que contiene los datos de los schedules
	const { schedulesArray } = useSelector((state: RootSote) => state.schedules);

	//objeto user para formulario Registro
	const newSchedule = {
		scheduleId: 0,
	};

	//Uso de hook useForm para manejo de campos en el formulario
	const [formValues, handleInputChange] = useForm(newSchedule);
	//useState para error
	const [error, setError] = useState(false);

	const { scheduleId } = formValues;

	//Submit del modal
	const handeNewSchedule = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		if (isFormValid()) {
			if (perfilEmpleado.id) {
				dispatch(
					addScheduleToEmployee({
						employeeId: perfilEmpleado.id,
						scheduleId: scheduleId,
					})
				);
			}
		}
	};

	const isFormValid = (): boolean => {
		if (scheduleId === 0 || scheduleId === '--Selecciona uno--') {
			setError(true);
			return false;
		}
		//Resetea estado al valor inicial
		setError(false);
		return true;
	};

	return (
		<>
			<div>
				{/* <!-- Modal --> */}
				<div
					className='modal fade'
					id='newScheduleAsignModal'
					tabIndex={-1}
					aria-labelledby='newScheduleAsignModal'
					aria-hidden='true'
				>
					<div className='modal-dialog d-flex justify-content-center'>
						<div className='modal-content custm-modalContent'>
							<div
								className='modal-header'
								style={{
									border: 'none',
									borderRadius: '50px',
								}}
							>
								<div
									className='custm-modalIcon d-flex justify-content-center align-items-center'
									style={{ position: 'relative' }}
								>
									<div
										className='d-flex justify-content-center align-items-center'
										style={{
											position: 'absolute',
											backgroundColor: 'var(--backgroundPrimary)',
											borderRadius: '50%',
											width: '35px',
											height: '35px',
											right: '10px',
											bottom: '18px',
										}}
									>
										<i
											style={{ fontSize: '1.8rem' }}
											className='bi bi-plus textColorSecondary'
										/>
									</div>
									<i className='bi bi-calendar-week textColorSecondary' />
								</div>
								<button
									type='button'
									className='btn-close custm-iconExit'
									data-bs-dismiss='modal'
									aria-label='Close'
								></button>
							</div>
							<div className='d-flex justify-content-center' style={{ width: '100%' }}>
								<div className='d-flex flex-column' style={{ width: '75%' }}>
									<div
										className='d-flex flex-column'
										style={{ maxWidth: '300px', lineHeight: '28px' }}
									>
										<label className='textColorPrimary fs-2'>Asignar nuevo horario</label>
										<label
											className='textColorLight fw-light mt-2'
											style={{ lineHeight: '15px' }}
										>
											Selecciona una opción para asignar un nuevo horario a{' '}
											{perfilUsuario.firstName}
										</label>
									</div>
									<div
										style={{
											width: '100%',
											paddingTop: '1rem',
										}}
									>
										<form onSubmit={handeNewSchedule}>
											<label htmlFor='recipient-name' className='pt-2'>
												Horario
											</label>
											<select
												className='form-select custm-input form-control custm-Width100  '
												name='scheduleId'
												onChange={handleInputChange}
												// disabled={!horasLabValue}
												// value={tipoDeHorario}
												// disabled={!infoBasicavalue}
											>
												<option>--Selecciona uno--</option>
												{schedulesArray.map((schedule) => (
													<option key={schedule.id} value={schedule.id}>
														{schedule.scheduleName}
													</option>
												))}
											</select>
											{error && (
												<div className='form-text textColorError mb-4'>
													<i className='bi bi-exclamation-circle'>{` `}</i>
													Selecciona una opción
												</div>
											)}

											<div className='d-flex justify-content-end'>
												<button type='submit' className='custm-btnFormSubmit inputSubmit'>
													Asignar horario
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalAsignarNuevoHorario;
