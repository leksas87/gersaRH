import ModalNuevoReporteEmpleado from './ModalNuevoReporteEmpleado';

const PageMisReportes = () => {
	return (
		<>
			<div className='custm-empleadosContainer rounded-3 shadow mt-4'>
				<div className='custm-empleadosHead justify-content-center'>
					<div
						className='textColorSecondary fs-4'
						style={{ textDecoration: 'underline' }}
					>
						Reportes, quejas y sugerencias
					</div>
					<div style={{ position: 'absolute', right: '15px' }}>
						<ModalNuevoReporteEmpleado />
					</div>
				</div>
				<div className='d-flex flex-column justify-content-center pt-4 p-4'>
					{/* Inicio */}
					<div className='d-flex flex-wrap custm-Width100 '>
						{/* Izquierda */}
						<div className='custm-PageContainerContent'>
							<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
								<div className='custm-Width100'>
									<i
										style={{ fontSize: '3rem', color: 'var(--colorSecondary)' }}
										className='bi bi-chat-dots-fill'
									/>
								</div>
								<div style={{ maxWidth: '200px' }} className='fs-4'>
									Reportes, quejas y sugerencias
								</div>
								<div className='fs-5 textColorLight'>
									Rellena los campos siguientes para
								</div>
								<div className='fs-5 textColorLight'>
									{' '}
									enviar un reporte, queja o sugerencia.
								</div>
								<div className='custm-underLineTittle'></div>
							</div>
						</div>
						{/* Derecha */}
						<div className='custm-PageContainerContent'>
							<div className='d-flex flex-column align-items-center custm-PageHistoryContainer'>
								<div className='p-3 textColorLight fs-5'>
									Nota: Los reportes, quejas y sugerencias serán vistos y revisados
									únicamente por el personal de recursos humanos.
								</div>
								<div className='fs-5 textColorSecondary mt-2'>
									Historial de reportes
								</div>
								{/* Inicio */}
								<div className='d-flex flex-column custm-Width100 mt-3 custm-UnderLineSection p-3'>
									<div className='d-flex textColorSecondary'>
										<div style={{ width: '40%' }}>Fecha de envío:</div>
										<div style={{ width: '60%' }}>01/01/2022</div>
									</div>
									<div className='d-flex custm-Status2 mt-3'>
										<div className='fw-bold' style={{ width: '40%' }}>
											Sugerencia
										</div>
									</div>
									<div className='d-flex textColorSecondary mt-3'>
										<div style={{ width: '40%' }}>Empleado:</div>
										<div className='d-flex' style={{ width: '60%' }}>
											<span className=''>Anónimo</span>
										</div>
									</div>
									<div className='d-flex textColorSecondary mt-3'>
										<div style={{ width: '40%' }}>Estatus:</div>
										<div className='d-flex' style={{ width: '60%' }}>
											<span className='custm-Status1 pe-3'>● Pendiente de revisar</span>
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageMisReportes;
