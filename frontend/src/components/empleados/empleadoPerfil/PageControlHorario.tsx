const PageControlHorario = () => {
	return (
		<>
			<div className='d-flex flex-column align-items-center'>
				<div className='d-flex'>
					<div className='d-flex align-items-center pe-2'>
						<i className='bi bi-stopwatch fs-1 textColorSecondary' />
					</div>
					<div className='d-flex flex-column align-items-center'>
						<div className='fs-4'>Registro de horas</div>
						<div className='textColorLight '>
							Información sobre el registro de entradas y salidas
						</div>
					</div>
				</div>
				<div className='d-flex custm-Width100 pt-2 pb-2'>
					<div
						className=' d-flex align-items-center p-2 rounded-3'
						style={{ backgroundColor: 'var(--backgroundBody)' }}
					>
						<div
							className='p-2 shadow rounded-3'
							style={{ backgroundColor: '#fff', pointerEvents: 'none' }}
						>
							Semanal
						</div>
						{/* <div className='ms-2 me-2 btn'>Quincenal</div>
						<div className='ms-2 me-2 btn'>Mensual</div> */}
					</div>
				</div>
				<div className='d-flex custm-Width100 mt-3 align-items-center '>
					<div className='textColorSecondary  d-flex align-items-center'>
						<div>
							<i className=' btn bi bi-caret-left' />
						</div>
						<div>14 - 20 FEBRERO 2022</div>

						<div>
							<i className=' btn bi bi-caret-right' />
						</div>
					</div>
					<div className='btn textColorLight'>Ir a semana actual</div>
				</div>
				<div className='custm-tableEmpleados mt-3'>
					<div className='table-responsive'>
						<table className='table table align-middle'>
							<thead className=''>
								<tr>
									<th scope='col'>
										<div className='d-flex justify-content-center'>Fecha</div>
									</th>
									<th scope='col'>
										<div className='d-flex justify-content-center'>Entrada</div>
									</th>
									<th scope='col'>
										<div className='d-flex justify-content-center'>Inicia descanso</div>
									</th>
									<th scope='col'>
										<div className='d-flex justify-content-center'>Fin descanso</div>
									</th>
									<th scope='col'>
										<div className='d-flex justify-content-center'>Salida</div>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope='row'>
										<div className='d-flex align-items-center justify-content-center text-center'>
											Lunes 14
										</div>
									</th>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsEntry'>08:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>11:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsEntry'>12:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>18:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
								</tr>
								<tr>
									<th scope='row'>
										<div className='d-flex align-items-center justify-content-center text-center'>
											Martes 15
										</div>
									</th>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsEntry'>08:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>11:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsEntry'>12:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>18:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
								</tr>
								<tr>
									<th scope='row'>
										<div className='d-flex align-items-center justify-content-center text-center'>
											Miercoles 16
										</div>
									</th>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsEntry'>08:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>11:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsEntry'>12:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>18:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
								</tr>
								<tr>
									<th scope='row'>
										<div className='d-flex align-items-center justify-content-center text-center'>
											Jueves 17
										</div>
									</th>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsEntry'>08:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>11:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsEntry'>12:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>18:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
								</tr>
								<tr>
									<th scope='row'>
										<div className='d-flex align-items-center justify-content-center text-center'>
											Viernes 18
										</div>
									</th>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsEntry'>08:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>11:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsEntry'>12:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div>
									</td>
									<td>
										{/* <div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>18:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div> */}
									</td>
								</tr>
								<tr style={{ height: '4rem' }}>
									<th scope='row'>
										<div className='d-flex align-items-center justify-content-center text-center'>
											sabado 19
										</div>
									</th>
									<td>
										{/* <div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsEntry'>08:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div> */}
									</td>
									<td>
										{/* <div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>11:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div> */}
									</td>
									<td>
										{/* <div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsEntry'>12:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div> */}
									</td>
									<td>
										{/* <div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>18:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div> */}
									</td>
								</tr>
								<tr style={{ height: '4rem' }}>
									<th scope='row'>
										<div className='d-flex align-items-center justify-content-center text-center'>
											Domingo 20
										</div>
									</th>
									<td>
										{/* <div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsEntry'>08:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div> */}
									</td>
									<td>
										{/* <div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>11:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div> */}
									</td>
									<td>
										{/* <div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsEntry'>12:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div> */}
									</td>
									<td>
										{/* <div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>18:00</div>
											<a
												className='fs-3 btn textColorSecondary'
												href='https://www.google.com.mx/maps/@25.7710416,-100.1143285,15z'
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none' }}
											>
												<i className='bi bi-geo-alt' />
											</a>
										</div> */}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageControlHorario;
