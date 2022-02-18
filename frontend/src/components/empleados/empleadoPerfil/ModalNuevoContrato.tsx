import React from 'react';

const ModalNuevoContrato = () => {
	const handeNewContract = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('creando contrato');
	};
	return (
		<>
			<div>
				{/* <!-- Modal --> */}
				<div
					className='modal fade'
					id='newContractModal'
					tabIndex={-1}
					aria-labelledby='newContractModal'
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
									<i className='bi bi-pen' />
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
										<label className='textColorPrimary fs-2'>Nuevo contrato</label>
										<label
											className='textColorLight fw-light mt-2'
											style={{ lineHeight: '15px' }}
										>
											Completa la información siguiente para crear un nuevo contrato.
										</label>
									</div>
									<div
										style={{
											width: '100%',
											paddingTop: '1.5rem',
										}}
									>
										<form onSubmit={handeNewContract}>
											<div className='custm-inputGird'>
												<div className='grid-area-Name'>
													<label htmlFor='recipient-name' className='col-form-label'>
														Fecha inicio*
													</label>
													<input
														type='text'
														className='custm-input form-control'
														id='recipient-name'
														name='name'
														// value={name}
														placeholder='Ingresa el nombre'
														aria-describedby='registerName'
														autoComplete='off'
														// onChange={handleInputChange}
													/>
												</div>
												<div className='grid-area-Apellido'>
													<label htmlFor='recipient-name' className='col-form-label'>
														Fecha fin
													</label>
													<input
														type='text'
														className='custm-input form-control'
														id='recipient-apellido'
														name='apellidos'
														// value={apellidos}
														placeholder='Ingresa el apellido'
														aria-describedby='registerLastName'
														autoComplete='off'
														// onChange={handleInputChange}
													/>
												</div>
											</div>
											<label htmlFor='recipient-name' className='col-form-label'>
												Cargo
											</label>
											<input
												type='text'
												className='custm-input form-control'
												id='recipient-name-email'
												name='correo'
												// value={correo}
												placeholder='cargo'
												aria-describedby='registerEmail'
												autoComplete='off'
												// onChange={handleInputChange}
											/>
											<label htmlFor='recipient-name' className='col-form-label'>
												Horas*
											</label>
											<input
												type='text'
												className='custm-input form-control'
												id='recipient-name-phone'
												name='phone'
												// value={phone}
												placeholder='Ingresa el numero de telefono'
												aria-describedby='registerPhone'
												autoComplete='off'
												// onChange={handleInputChange}
											/>
											{/* {error && (
												<div className='form-text textColorError'>
													<i className='bi bi-exclamation-circle'>{` `}</i>
													{error}.
												</div>
											)} */}
											<div className='d-flex justify-content-end'>
												{/* {!registerState.loading ? (
													<button className='custm-btnFormSubmit inputSubmit'>
														Guardar empleado
													</button>
												) : (
													<button
														className='btn  custm-btnFormSubmit inputSubmit'
														type='button'
														disabled
													>
														<span
															className='spinner-border spinner-border-sm me-2'
															role='status'
															aria-hidden='true'
														></span>
														Cargando tabla...
													</button>
												)} */}
												<button className='custm-btnFormSubmit inputSubmit'>
													Crear contrato
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

export default ModalNuevoContrato;
