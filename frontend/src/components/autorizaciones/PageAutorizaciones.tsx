import './PageAutorizaciones.css';
const PageAutorizaciones = () => {
	return (
		<>
			<div className='custm-empleadosContainer rounded-3 shadow mt-4'>
				<div className='custm-empleadosHead justify-content-center'>
					<div
						className='textColorSecondary fs-4'
						style={{ textDecoration: 'underline' }}
					>
						Autorizaciones
					</div>
				</div>
				<div className='d-flex flex-column justify-content-center pt-4 p-4'>
					<div className='d-flex flex-column align-items-center'>
						<div className='d-flex '>
							<div>
								<i
									style={{ fontSize: '3rem', color: 'var(--colorSecondary)' }}
									className='bi bi-calendar-week'
								/>
							</div>
							<div className='d-flex flex-column align-items-center custm-width100'>
								<div
									className='text-center fs-5 textColorLight'
									style={{ maxWidth: '400px' }}
								>
									Aquí se muestra el historial de solicitudes. (Pendientes, aceptadas y
									rechazadas)
								</div>
								<div style={{ color: 'var(--textColorLink)' }}>____________</div>
							</div>
						</div>

						<div className='d-flex flex-column align-items-center custm-PageHistoryContainer mt-4'>
							<div className='d-flex justify-content-between custm-Width100 p-1'>
								<div />
								<div className='textColorSecondary fs-5'>Solicitudes</div>
								<div className=' ms-1 d-flex align-items-center'>
									<div>Filtrar por:</div>
									<div className='ms-2'>
										<select
											className='form-select form-control  '
											name='statusFiltering'
											// onChange={handleInputChange}
											// disabled={!horasLabValue}
											// value={tipoDeHorario}
											// disabled={!infoBasicavalue}
										>
											<option value='Todos'>Todos</option>
											<option value='Aceptadas'>Aceptadas</option>
											<option value='Rechazadas'>Rechazadas</option>
										</select>
									</div>
								</div>
							</div>
							{/* Inicio */}
							<div className='d-flex flex-wrap custm-UnderLineSectionDark mt-4'>
								<div
									className='d-flex flex-column  p-3 custm-solicitudContaiter50'
									// style={{ width: '50%', minWidth: '300px' }}
								>
									<div className='d-flex textColorSecondary'>
										<div style={{ width: '40%' }}>Fecha de solicitud:</div>
										<div style={{ width: '60%' }}>01/01/2022</div>
									</div>
									<div className='d-flex textColorSecondary mt-3'>
										<div style={{ width: '40%' }}>Empleado:</div>
										<div style={{ width: '60%' }}>Ivan Santana Santana</div>
									</div>
									<div className='d-flex textColorSecondary mt-3'>
										<div style={{ width: '40%' }}>Lugar de trabajo:</div>
										<div style={{ width: '60%' }}>Lugar 2</div>
									</div>
									<div className='d-flex textColorSecondary mt-3'>
										<div className='fw-bold' style={{ width: '40%' }}>
											Incapacidad:
										</div>
										<div className='d-flex' style={{ width: '60%' }}>
											<div className='d-flex flex-column pe-4'>
												<div>De:</div>
												<div className='textColorLight'>01/01/2022</div>
											</div>
											<div className='d-flex flex-column'>
												<div>A:</div>
												<div className='textColorLight'>01/01/2022</div>
											</div>
										</div>
									</div>
									<div className='d-flex textColorSecondary mt-3'>
										<div style={{ width: '40%' }}>Descripción:</div>
										<div style={{ width: '60%' }}>
											Veniam non commodo exercitation qui cupidatat sit sit proident
											proident. Sit duis officia eiusmod sint minim cupidatat dolor
											exercitation pariatur. Adipisicing velit cillum velit veniam irure
											dolor laborum fugiat ex Lorem ad.
										</div>
									</div>
									<div className='d-flex textColorSecondary mt-3'>
										<div style={{ width: '40%' }}>Estatus:</div>
										<div className='d-flex' style={{ width: '60%' }}>
											<span className='custm-Status1 pe-3'>● Pendiente</span>
											<div className='d-flex'>
												<div>Adjunto:</div>
												<a
													className='fs-4  textColorSecondary'
													href={`https://www.google.com.mx/maps/`}
													target='_blank'
													rel='noopener noreferrer'
													style={{ textDecoration: 'none' }}
												>
													<i className='bi bi-paperclip' />
												</a>
											</div>
										</div>
									</div>
									<div className='d-flex textColorSecondary'>
										<div style={{ width: '40%' }}></div>
										<div className='textColorLight' style={{ width: '60%' }}>
											<div>Detalle:</div>
											Veniam non commodo exercitation qui cupidatat sit sit proident
											proident. Sit duis officia eiusmod sint minim cupidatat dolor
											exercitation pariatur. Adipisicing velit cillum velit veniam irure
											dolor laborum fugiat ex Lorem ad.
										</div>
									</div>
								</div>
								<div className='custm-solicitudContaiter50 d-flex justify-content-center'>
									<form className='mt-5'>
										<div className='d-flex flex-column align-items-center'>
											<label className='textColorLight custm-Width100 ms-5'>
												Descripción*
											</label>
											<textarea
												// form='usrform'
												className='form-control  custm-empleadoFormIntput'
												style={{ width: '90%' }}
												rows={6}
												cols={50}
												name='descriptionRespuesta'
												placeholder='Escribe un breve detalle'
											></textarea>
										</div>
										<div className='d-flex justify-content-center mt-4'>
											<button type='button' className='btn custm-btnAccept p-3 m-3'>
												Aceptar
											</button>
											<button type='button' className='btn custm-btnDeny p-3 m-3'>
												Rechazar
											</button>
										</div>
									</form>
								</div>
							</div>
							{/* Inicio */}
							<div className='d-flex flex-wrap custm-UnderLineSectionDark mt-4'>
								<div
									className='d-flex flex-column  p-3 custm-solicitudContaiter50'
									// style={{ width: '50%', minWidth: '300px' }}
								>
									<div className='d-flex textColorSecondary'>
										<div style={{ width: '40%' }}>Fecha de solicitud:</div>
										<div style={{ width: '60%' }}>01/01/2022</div>
									</div>
									<div className='d-flex textColorSecondary mt-3'>
										<div className='fw-bold' style={{ width: '40%' }}>
											Incapacidad:
										</div>
										<div className='d-flex' style={{ width: '60%' }}>
											<div className='d-flex flex-column pe-4'>
												<div>De:</div>
												<div className='textColorLight'>01/01/2022</div>
											</div>
											<div className='d-flex flex-column'>
												<div>A:</div>
												<div className='textColorLight'>01/01/2022</div>
											</div>
										</div>
									</div>
									<div className='d-flex textColorSecondary mt-3'>
										<div style={{ width: '40%' }}>Descripción:</div>
										<div style={{ width: '60%' }}>
											Veniam non commodo exercitation qui cupidatat sit sit proident
											proident. Sit duis officia eiusmod sint minim cupidatat dolor
											exercitation pariatur. Adipisicing velit cillum velit veniam irure
											dolor laborum fugiat ex Lorem ad.
										</div>
									</div>
									<div className='d-flex textColorSecondary mt-3'>
										<div style={{ width: '40%' }}>Estatus:</div>
										<div className='d-flex' style={{ width: '60%' }}>
											<span className='custm-Status1 pe-3'>● Pendiente</span>
											<div className='d-flex'>
												<div>Adjunto:</div>
												<a
													className='fs-4  textColorSecondary'
													href={`https://www.google.com.mx/maps/`}
													target='_blank'
													rel='noopener noreferrer'
													style={{ textDecoration: 'none' }}
												>
													<i className='bi bi-paperclip' />
												</a>
											</div>
										</div>
									</div>
									<div className='d-flex textColorSecondary'>
										<div style={{ width: '40%' }}></div>
										<div className='textColorLight' style={{ width: '60%' }}>
											<div>Detalle:</div>
											Veniam non commodo exercitation qui cupidatat sit sit proident
											proident. Sit duis officia eiusmod sint minim cupidatat dolor
											exercitation pariatur. Adipisicing velit cillum velit veniam irure
											dolor laborum fugiat ex Lorem ad.
										</div>
									</div>
								</div>
								<div className='custm-solicitudContaiter50 d-flex flex-column justify-content-center align-items-center'>
									<div className='textColorLight fs-4'> Solicitud aceptada por</div>
									<div className='textColorLight fs-4'> Ivan Ojendis Santana</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageAutorizaciones;
