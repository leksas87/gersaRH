import { useForm } from '../../hooks/useForm';

const ModalNuevaSolicitudFalta = () => {
	const loading = false;
	// useForm para el inputFile
	const [formValues, onchange] = useForm({
		uploadfile: '',
	});
	const { uploadfile } = formValues;
	const handeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('enviando');
	};
	return (
		<>
			<div>
				{/* <!-- Button para activar modal --> */}
				<button
					type='button'
					className='btn custm-btnNuevoEmpleado custmBtnActions me-3'
					style={{ height: 'auto' }}
					data-bs-toggle='modal'
					data-bs-target='#modalSolicitudIncapacidad'
				>
					+ Nueva solicitud
				</button>

				{/* <!-- Modal --> */}
				<div
					className='modal fade'
					id='modalSolicitudIncapacidad'
					tabIndex={-1}
					aria-labelledby='modalSolicitudIncapacidad'
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
									<i className='bi bi-window-plus' />
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
										<label className='textColorPrimary fs-2'>Solicitud de falta</label>
										<label
											className='textColorLight fw-light mt-2'
											style={{ lineHeight: '15px' }}
										>
											Completa la información siguiente para crear una nueva solicitud de
											falta.
										</label>
									</div>
									<div
										style={{
											width: '100%',
											paddingTop: '1.5rem',
										}}
									>
										<form onSubmit={handeSubmit}>
											<div className='d-flex mb-4 mt-4 justify-content-between flex-wrap'>
												<div>
													<label className='custm-Width100  textColorLight'>
														Fecha inicio*
													</label>

													<input
														className='form-control custm-Width100 custm-empleadoFormIntput'
														type='date'
														// placeholder={perfilEmpleado.ciudad}
														name='fechaInicio'
														// value={scheduleName}
														// onChange={handleInputChange}
													/>
												</div>
												<div>
													<label className='custm-Width100  textColorLight'>
														Fecha fin*
													</label>

													<input
														className='form-control custm-Width100 custm-empleadoFormIntput'
														type='date'
														// placeholder={perfilEmpleado.codigoPostal.toString()}
														name='fechaFin'
														// value={horaEntrada}
														// onChange={handleInputChange}
													/>
												</div>
											</div>
											{/* <div className='d-flex mb-4 mt-4 justify-content-between'> */}
											<div>
												<label className='custm-Width100  textColorLight'>
													Descripción*
												</label>
												<textarea
													// form='usrform'
													className='form-control custm-Width100 custm-empleadoFormIntput'
													rows={4}
													cols={50}
													name='descripcionEmpleado'
													placeholder='Escribe un breve detalle.'
												></textarea>
											</div>
											<div
												// style={{
												// 	width: '100%',
												// 	padding: '2rem 0px 2rem 0px',
												// }}
												className='mt-4'
											>
												<label className='custm-Width100  textColorLight'>
													Selecciona un comprobante
												</label>
												<input
													className='form-control custm-InputFile'
													type='file'
													name='uploadfile'
													id='formFile'
													accept='.jpg,.jpeg, .pdf'
													// required={true}
													value={uploadfile}
													onChange={onchange}
												/>
											</div>
											{/* </div> */}

											{/* {error && (
												<div className='form-text textColorError'>
													<i className='bi bi-exclamation-circle'>{` `}</i>
													{error}.
												</div>
											)} */}
											<div className='d-flex justify-content-end mt-4'>
												{/* {!registerState.loading ? ( */}
												{!loading ? (
													<button className='custm-btnFormSubmit inputSubmit'>
														Enviar solicitud
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
														Enviando solicitud...
													</button>
												)}
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

export default ModalNuevaSolicitudFalta;
