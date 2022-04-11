const PageVerReportesAdministrativos = () => {
	return (
		<>
			<div className='d-flex flex-column justify-content-center pt-4 p-4'>
				{/* Inicio */}
				<div className='d-flex flex-wrap custm-Width100 '>
					{/* Izquierda */}
					<div className='custm-PageContainerContent'>
						<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
							<div
								className='d-flex justify-content-center align-items-center'
								style={{
									width: '5rem',
									border: '3px solid var(--colorSecondary)',
									borderRadius: '10px',
								}}
							>
								<i
									style={{ fontSize: '3rem', color: 'var(--colorSecondary)' }}
									className='bi bi-exclamation-lg'
								/>
							</div>
							<div className='fs-5 textColorLight'>
								Aqui se muestra el historial de
							</div>
							<div className='fs-5 textColorLight'>reportes administrativos</div>
							<div className='fs-5 textColorLight'>enviado por supervisores</div>
							<div className='custm-underLineTittle'></div>
						</div>
					</div>
					{/* Derecha */}
					<div className='custm-PageContainerContent'>
						<div className='d-flex flex-column align-items-center custm-PageHistoryContainer'>
							<div className='fs-5 textColorSecondary mt-2'>
								Lista de reportes administrativos.
							</div>
							{/* Inicio */}
							<div className='d-flex flex-column custm-Width100 mt-3 custm-UnderLineSection p-3'>
								<div className='d-flex textColorSecondary'>
									<div style={{ width: '40%' }}>Fecha de envío:</div>
									<div style={{ width: '60%' }}>01/01/2022</div>
								</div>
								<div className='d-flex custm-Status4 mt-3'>
									<div className='fw-bold' style={{ width: '40%' }}>
										Solicitud de baja
									</div>
								</div>
								<div className='d-flex textColorSecondary mt-3'>
									<div style={{ width: '40%' }}>Empleado:</div>
									<div className='d-flex' style={{ width: '60%' }}>
										<span className=''>Ivan Santana Santana</span>
									</div>
								</div>
								<div className='d-flex textColorSecondary mt-3'>
									<div style={{ width: '40%' }}>Lugar de trabajo:</div>
									<div className='d-flex' style={{ width: '60%' }}>
										<span className=''>Lugar 1</span>
									</div>
								</div>

								<div className='d-flex mt-3'>
									<div className='textColorSecondary' style={{ width: '40%' }}>
										Detalle:
									</div>
									<div className='textColorLight' style={{ width: '60%' }}>
										Veniam non commodo exercitation qui cupidatat sit sit proident
										proident. Sit duis officia eiusmod sint minim cupidatat dolor
										exercitation pariatur. Adipisicing velit cillum velit veniam irure
										dolor laborum fugiat ex Lorem ad.
									</div>
								</div>
								<div className='d-flex textColorSecondary mt-3'>
									<div style={{ width: '40%' }}>Estado:</div>
									<div className='d-flex' style={{ width: '60%' }}>
										<select
											className='form-select form-control'
											style={{ width: '130px', backgroundColor: 'transparent' }}
											name='statusFiltering'
											// onChange={handleInputChange}
											// disabled={!horasLabValue}
											// value={tipoDeHorario}
											// disabled={!infoBasicavalue}
										>
											<option className='custm-Status1' value='Pendiente'>
												Pendiente
											</option>
											<option className='custm-Status4' value='Revisado'>
												Revisado
											</option>
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

export default PageVerReportesAdministrativos;
