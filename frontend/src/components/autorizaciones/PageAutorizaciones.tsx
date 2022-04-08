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
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageAutorizaciones;
