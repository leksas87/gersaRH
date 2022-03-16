import { useState } from 'react';
import { useForm } from '../../../hooks/useForm';

const ModalNuevoHorario = () => {
	//objeto user para formulario Registro
	const newSchedule = {
		scheduleName: '',
		horaEntrada: '',
		horaSalida: '',
		tiempoDescanso: '',
		tiempoRetraso: '',
		tiempoActaAdministrativa: '',
	};

	// Objeto para el manejo de los dias trabajados
	const days = {
		lunes: false,
		martes: false,
		miercoles: false,
		jueves: false,
		viernes: false,
		sabado: false,
		domingo: false,
	};
	//Uso de hook useForm para manejo de campos en el formulario
	const [formValues, handleInputChange] = useForm(newSchedule);
	//useState para manejo del checkbox
	const [daysChecked, setDaysChecked] = useState(days);

	//Estado inicial para manejo de errores
	interface iErrors {
		msgError: string;
		errors: string[];
	}
	const errors: iErrors = {
		msgError: '',
		errors: [],
	};
	// useState para manejo de errores
	const [error, setError] = useState(errors);

	//Desestructuracion de propiedades
	const { lunes, martes, miercoles, jueves, viernes, sabado, domingo } =
		daysChecked;
	const {
		scheduleName,
		horaEntrada,
		horaSalida,
		tiempoDescanso,
		tiempoRetraso,
		tiempoActaAdministrativa,
	} = formValues;

	const handleClick = (e: any): void => {
		setDaysChecked({ ...daysChecked, [e.target.name]: !e.target.defaultChecked });
	};

	const handlesubmitNewSchedule = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isFormValid()) {
			console.log('Sending form');
		}
	};

	const isFormValid = (): boolean => {
		// El campo usuario no debe estar vacío
		if (scheduleName === '') {
			setError({
				errors: ['scheduleName'],
				msgError: 'El campo "Nombre del horario" es obligatorio',
			});
			return false;
			// El campo contraseña debe tener al menos 6 caracteres
		} else if (horaEntrada === '') {
			setError({
				errors: ['horaEntrada'],
				msgError: 'El campo "Hora entrada" es obligatorio',
			});
			return false;
		} else if (tiempoRetraso === '') {
			setError({
				errors: ['tiempoRetraso'],
				msgError: 'El campo "Tiempo de retardo" es obligatorio',
			});
			return false;
		} else if (horaSalida === '') {
			setError({
				errors: ['horaSalida'],
				msgError: 'El campo "Hora salida" es obligatorio',
			});
			return false;
		} else if (tiempoActaAdministrativa === '') {
			setError({
				errors: ['tiempoActaAdministrativa'],
				msgError: 'El campo "Tiempo de acta administrativa" es obligatorio',
			});
			return false;
		} else if (tiempoDescanso === '') {
			setError({
				errors: ['tiempoDescanso'],
				msgError: 'El campo "Tiempo de descanso" es obligatorio',
			});
			return false;
		}

		//Resetea estado al valor inicial
		setError({ errors: [], msgError: '' });
		return true;
	};
	return (
		<>
			{/* <!-- Modal --> */}
			<div
				className='modal fade'
				id='ModalNuevoHorario'
				tabIndex={-1}
				aria-labelledby='ModalNuevoHorario'
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
										className='bi bi-watch textColorSecondary'
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
						<div className='d-flex justify-content-center custm-Width100'>
							<div
								className='d-flex flex-column justify-content-between pb-4'
								style={{ width: '82%' }}
							>
								<div
									className='d-flex flex-column'
									style={{ maxWidth: '100%', lineHeight: '28px', marginTop: '1rem' }}
								>
									<label className='textColorPrimary fs-2 mt-1'>Nuevo horario</label>
									<label
										className='textColorLight fw-light mt-4'
										style={{
											lineHeight: '20px',
											marginTop: '1rem',
											textAlign: 'justify',
											letterSpacing: '.5px',
										}}
									>
										Completa la información siguiente para añadir un nuevo horario.
									</label>
								</div>
								<form onSubmit={handlesubmitNewSchedule}>
									<div className='d-flex mb-4 mt-4 justify-content-between'>
										<div className='me-1'>
											<label className='custm-Width100 text-center textColorLight'>
												Nombre del horario
											</label>

											<input
												className={
													error.errors.includes('scheduleName')
														? 'form-control custm-Width100 custm-empleadoFormIntput is-invalid'
														: 'form-control custm-Width100 custm-empleadoFormIntput'
												}
												type='text'
												// placeholder={perfilEmpleado.ciudad}
												name='scheduleName'
												value={scheduleName}
												onChange={handleInputChange}
											/>
										</div>
										<div className='ms-1'>
											<label className='custm-Width100 text-center textColorLight'>
												Hora entrada
											</label>

											<input
												className={
													error.errors.includes('horaEntrada')
														? 'form-control custm-Width100 custm-empleadoFormIntput is-invalid'
														: 'form-control custm-Width100 custm-empleadoFormIntput'
												}
												type='time'
												// placeholder={perfilEmpleado.codigoPostal.toString()}
												name='horaEntrada'
												value={horaEntrada}
												onChange={handleInputChange}
											/>
										</div>
									</div>
									<div className='d-flex mb-4 justify-content-between'>
										<div className='me-1 d-flex flex-column justify-content-end'>
											<label className='custm-Width100 text-center textColorLight'>
												Tiempo de retardo (Minutos)
											</label>

											<input
												className={
													error.errors.includes('tiempoRetraso')
														? 'form-control custm-Width100 custm-empleadoFormIntput is-invalid'
														: 'form-control custm-Width100 custm-empleadoFormIntput'
												}
												type='number'
												// placeholder={perfilEmpleado.ciudad}
												name='tiempoRetraso'
												value={tiempoRetraso}
												onChange={handleInputChange}
											/>
										</div>
										<div className='ms-1 d-flex flex-column justify-content-end'>
											<label className='custm-Width100 text-center textColorLight'>
												Hora salida
											</label>

											<input
												className={
													error.errors.includes('horaSalida')
														? 'form-control custm-Width100 custm-empleadoFormIntput is-invalid'
														: 'form-control custm-Width100 custm-empleadoFormIntput'
												}
												type='time'
												// placeholder={perfilEmpleado.codigoPostal.toString()}
												name='horaSalida'
												value={horaSalida}
												onChange={handleInputChange}
											/>
										</div>
									</div>
									<div className='d-flex mb-4 justify-content-between'>
										<div
											className='me-1 d-flex flex-column justify-content-end'
											style={{ maxWidth: '220px' }}
										>
											<label className='custm-Width100 text-center textColorLight'>
												Tiempo de acta administrativa (Minutos)
											</label>

											<input
												className={
													error.errors.includes('tiempoActaAdministrativa')
														? 'form-control custm-Width100 custm-empleadoFormIntput is-invalid'
														: 'form-control custm-Width100 custm-empleadoFormIntput'
												}
												type='number'
												// placeholder={perfilEmpleado.ciudad}
												name='tiempoActaAdministrativa'
												value={tiempoActaAdministrativa}
												onChange={handleInputChange}
											/>
										</div>
										<div
											className='ms-1 d-flex flex-column justify-content-end'
											style={{ maxWidth: '150px' }}
										>
											<label className='custm-Width100 text-center textColorLight'>
												Tiempo de descanso (Minutos)
											</label>

											<input
												className={
													error.errors.includes('tiempoDescanso')
														? 'form-control custm-Width100 custm-empleadoFormIntput is-invalid'
														: 'form-control custm-Width100 custm-empleadoFormIntput'
												}
												type='number'
												// placeholder={perfilEmpleado.codigoPostal.toString()}
												name='tiempoDescanso'
												value={tiempoDescanso}
												onChange={handleInputChange}
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
												id='btncheckLunesNewSchedule'
												name='lunes'
												defaultChecked={lunes}
												onChange={handleClick}
											/>
											<label
												className='btn btn-outline-primary custm-btnWeek'
												htmlFor='btncheckLunesNewSchedule'
											>
												L
											</label>

											<input
												type='checkbox'
												className='btn-check custm-checkWeek'
												id='btncheckMartesNewSchedule'
												name='martes'
												defaultChecked={martes}
												onChange={handleClick}
											/>
											<label
												className='btn btn-outline-primary custm-btnWeek'
												htmlFor='btncheckMartesNewSchedule'
											>
												M
											</label>

											<input
												type='checkbox'
												className='btn-check custm-checkWeek'
												id='btncheckMircolesNewSchedule'
												name='miercoles'
												defaultChecked={miercoles}
												onChange={handleClick}
											/>
											<label
												className='btn btn-outline-primary custm-btnWeek'
												htmlFor='btncheckMircolesNewSchedule'
											>
												M
											</label>
											<input
												type='checkbox'
												className='btn-check custm-checkWeek'
												id='btncheckJuevesNewSchedule'
												name='jueves'
												defaultChecked={jueves}
												onChange={handleClick}
											/>
											<label
												className='btn btn-outline-primary custm-btnWeek'
												htmlFor='btncheckJuevesNewSchedule'
											>
												J
											</label>
											<input
												type='checkbox'
												className='btn-check custm-checkWeek'
												id='btncheckViernesNewSchedule'
												name='viernes'
												defaultChecked={viernes}
												onChange={handleClick}
											/>
											<label
												className='btn btn-outline-primary custm-btnWeek'
												htmlFor='btncheckViernesNewSchedule'
											>
												V
											</label>
											<input
												type='checkbox'
												className='btn-check custm-checkWeek'
												id='btncheckSabadoNewSchedule'
												name='sabado'
												defaultChecked={sabado}
												onChange={handleClick}
											/>
											<label
												className='btn btn-outline-primary custm-btnWeek'
												htmlFor='btncheckSabadoNewSchedule'
											>
												S
											</label>
											<input
												type='checkbox'
												className='btn-check custm-checkWeek'
												id='btncheckDomingoNewSchedule'
												name='domingo'
												defaultChecked={domingo}
												onChange={handleClick}
											/>
											<label
												className='btn btn-outline-primary custm-btnWeek'
												htmlFor='btncheckDomingoNewSchedule'
											>
												D
											</label>
										</div>
									</div>
									{error.msgError && (
										<div className='form-text textColorError'>
											<i className='bi bi-exclamation-circle'>{` `}</i>
											{error.msgError}.
										</div>
									)}

									<div
										className='d-flex justify-content-end custm-Width100'
										style={{ height: '3rem' }}
									>
										<button type='submit' className='btn  custm-empleadoFormSubmit'>
											Guardar
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalNuevoHorario;
