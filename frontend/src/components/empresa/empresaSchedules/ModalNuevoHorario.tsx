const ModalNuevoHorario = () => {
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
								<form
								// onSubmit={handlesubmitSchedule}
								>
									<div className='d-flex mb-4 mt-4'>
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
												// disabled={!scheduleValue}
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
												// disabled={!scheduleValue}
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
												// disabled={!scheduleValue}
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
												// disabled={!scheduleValue}
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
												// disabled={!scheduleValue}
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
												// disabled={!scheduleValue}
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
												// disabled={!scheduleValue}
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
												// disabled={!scheduleValue}
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
												// disabled={!scheduleValue}
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
												// disabled={!scheduleValue}
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
												// disabled={!scheduleValue}
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
												// disabled={!scheduleValue}
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
												// disabled={!scheduleValue}
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
