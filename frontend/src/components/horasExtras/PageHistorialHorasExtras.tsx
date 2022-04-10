import React from 'react';

const PageHistorialHorasExtras = () => {
	return (
		<>
			<div className='d-flex flex-column justify-content-center pt-4 p-4'>
				<div className='d-flex flex-column align-items-center'>
					<div className='d-flex '>
						<div>
							<i
								style={{ fontSize: '3rem', color: 'var(--colorSecondary)' }}
								className='bi bi-stopwatch'
							/>
						</div>
						<div className='d-flex flex-column align-items-center custm-width100 ms-3'>
							<div
								className='text-center fs-5 textColorLight'
								style={{ maxWidth: '400px' }}
							>
								Aquí se muestra <br />
								el historial de solicitudes de horas extras. <br /> (Pendientes,
								aceptadas y rechazadas).
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
										<option value='Pendientes'>Pendientes</option>
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

								<div className='d-flex textColorSecondary mt-2'>
									<div style={{ width: '40%' }}>Empleado:</div>
									<div style={{ width: '60%' }}>Ivan Santana Santana</div>
								</div>
								<div className='d-flex textColorSecondary mt-2'>
									<div style={{ width: '40%' }}>Lugar de trabajo:</div>
									<div style={{ width: '60%' }}>Lugar 1</div>
								</div>
								<div className='d-flex textColorSecondary mt-4'>
									<div className='fw-bold' style={{ width: '40%' }}>
										Fecha de asignación:
									</div>
									<div style={{ width: '60%' }}>01/01/2022</div>
								</div>
								<div className='d-flex textColorSecondary mt-2'>
									<div className='fw-bold' style={{ width: '40%' }}>
										Hora de asignación:
									</div>
									<div style={{ width: '60%' }}>08:00</div>
								</div>
								<div className='d-flex textColorSecondary mt-2'>
									<div className='fw-bold' style={{ width: '40%' }}>
										Lugar de asignación:
									</div>
									<div style={{ width: '60%' }}>Nike 2</div>
								</div>
								<div className='d-flex textColorSecondary mt-2'>
									<div className='fw-bold' style={{ width: '40%' }}>
										Solicita:
									</div>
									<div style={{ width: '60%' }}>Ivan Santana Santana</div>
								</div>

								<div className='d-flex textColorSecondary mt-2'>
									<div className='textColorLight' style={{ width: '87%' }}>
										<div className='fw-bold'>Detalle de la solicitud:</div>
										Veniam non commodo exercitation qui cupidatat sit sit proident
										proident. Sit duis officia eiusmod sint minim cupidatat dolor
										exercitation pariatur. Adipisicing velit cillum velit veniam irure
										dolor laborum fugiat ex Lorem ad.
									</div>
								</div>
							</div>
							<div className='custm-solicitudContaiter50 d-flex flex-column justify-content-center align-items-center'>
								<div className='d-flex textColorSecondary mt-2 mb-4'>
									<div className='fw-bold me-2' style={{ width: '40%' }}>
										Estatus:
									</div>
									<div className='custm-Status1 ' style={{ width: '60%' }}>
										● Pendiente
									</div>
								</div>
								<div className='d-flex justify-content-center textColorSecondary mt-2'>
									<div className='textColorLight' style={{ width: '87%' }}>
										<div className='fw-bold'>Detalle de la respuesta:</div>
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
		</>
	);
};

export default PageHistorialHorasExtras;
