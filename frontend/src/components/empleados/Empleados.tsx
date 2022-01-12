import './Empleados.css';

const Empleados = () => {
	return (
		<>
			<div>
				{/* <!-- Button para activar modal --> */}
				<button
					type='button'
					className='btn btn-primary'
					data-bs-toggle='modal'
					data-bs-target='#exampleModal'
				>
					+ Nuevo empleado
				</button>

				{/* <!-- Modal --> */}
				<div
					className='modal fade'
					id='exampleModal'
					tabIndex={-1}
					aria-labelledby='exampleModalLabel'
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
								<div className='custm-modalIcon d-flex justify-content-center align-items-center'>
									<i className='bi bi-person-plus-fill' />
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
										<label className='textColorPrimary fs-2'>Crear empleado</label>
										<label
											className='textColorLight fw-light'
											style={{ lineHeight: '15px' }}
										>
											Completa la información siguiente para añadir un nuevo empleado.
										</label>
									</div>
									<div
										style={{
											width: '100%',
											paddingTop: '1.5rem',
										}}
									>
										<form>
											<label htmlFor='recipient-name' className='col-form-label'>
												Correo electrónico*
											</label>
											<input
												type='text'
												className='custm-input form-control'
												id='recipient-name'
											/>
											<div className='custm-inputGird'>
												<div className='grid-area-Name'>
													<label htmlFor='recipient-name' className='col-form-label'>
														Nombre*
													</label>
													<input
														type='text'
														className='custm-input form-control is-invalid'
														id='recipient-name'
													/>
												</div>
												<div className='grid-area-Apellido'>
													<label htmlFor='recipient-name' className='col-form-label'>
														Apellidos*
													</label>
													<input
														type='text'
														className='custm-input form-control'
														id='recipient-name'
													/>
												</div>
											</div>
											<div className='d-flex justify-content-end'>
												<button className='custm-btnFormSubmit inputSubmit'>
													Guardar empleado
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

export default Empleados;
