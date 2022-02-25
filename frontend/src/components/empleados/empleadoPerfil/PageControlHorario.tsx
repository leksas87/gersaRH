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
							className='btn p-2 shadow rounded-3'
							style={{ backgroundColor: '#fff' }}
						>
							Semanal
						</div>
						<div className='ms-2 me-2 btn'>Quincenal</div>
						<div className='ms-2 me-2 btn'>Mensual</div>
					</div>
				</div>
				<div className='d-flex custm-Width100 mt-3'>
					<div className='textColorSecondary '>14 - 20 FEBRERO 2022</div>
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
										<div className='d-flex justify-content-center'>Salida</div>
									</th>
									<th scope='col'>
										<div className='d-flex justify-content-center'>Lugar Entrada</div>
									</th>
									<th scope='col'>
										<div className='d-flex justify-content-center'>Lugar Salida</div>
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
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>18:00</div>
										</div>
									</td>
									<td>
										<div className='d-flex flex-column align-items-center textColorLight text-center'>
											<div>Cordenadas:</div>
											<div>
												<span>17.5548193</span>, <span>-99.4877102,19z</span>
											</div>
										</div>
									</td>
									<td>
										<div className='d-flex flex-column align-items-center textColorLight text-center'>
											<div>Cordenadas:</div>
											<div>
												<span>17.5548193</span>, <span>-99.4877102,19z</span>
											</div>
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
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>18:00</div>
										</div>
									</td>
									<td>
										<div className='d-flex flex-column align-items-center textColorLight text-center'>
											<div>Cordenadas:</div>
											<div>
												<span>17.5548193</span>, <span>-99.4877102,19z</span>
											</div>
										</div>
									</td>
									<td>
										<div className='d-flex flex-column align-items-center textColorLight text-center'>
											<div>Cordenadas:</div>
											<div>
												<span>17.5548193</span>, <span>-99.4877102,19z</span>
											</div>
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
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>18:00</div>
										</div>
									</td>
									<td>
										<div className='d-flex flex-column align-items-center textColorLight text-center'>
											<div>Cordenadas:</div>
											<div>
												<span>17.5548193</span>, <span>-99.4877102,19z</span>
											</div>
										</div>
									</td>
									<td>
										<div className='d-flex flex-column align-items-center textColorLight text-center'>
											<div>Cordenadas:</div>
											<div>
												<span>17.5548193</span>, <span>-99.4877102,19z</span>
											</div>
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
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>18:00</div>
										</div>
									</td>
									<td>
										<div className='d-flex flex-column align-items-center textColorLight text-center'>
											<div>Cordenadas:</div>
											<div>
												<span>17.5548193</span>, <span>-99.4877102,19z</span>
											</div>
										</div>
									</td>
									<td>
										<div className='d-flex flex-column align-items-center textColorLight text-center'>
											<div>Cordenadas:</div>
											<div>
												<span>17.5548193</span>, <span>-99.4877102,19z</span>
											</div>
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
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>18:00</div>
										</div>
									</td>
									<td>
										<div className='d-flex flex-column align-items-center textColorLight text-center'>
											<div>Cordenadas:</div>
											<div>
												<span>17.5548193</span>, <span>-99.4877102,19z</span>
											</div>
										</div>
									</td>
									<td>
										<div className='d-flex flex-column align-items-center textColorLight text-center'>
											<div>Cordenadas:</div>
											<div>
												<span>17.5548193</span>, <span>-99.4877102,19z</span>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<th scope='row'>
										<div className='d-flex align-items-center justify-content-center text-center'>
											Sabado 19
										</div>
									</th>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsEntry'>08:00</div>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>18:00</div>
										</div>
									</td>
									<td>
										<div className='d-flex flex-column align-items-center textColorLight text-center'>
											<div>Cordenadas:</div>
											<div>
												<span>17.5548193</span>, <span>-99.4877102,19z</span>
											</div>
										</div>
									</td>
									<td>
										<div className='d-flex flex-column align-items-center textColorLight text-center'>
											<div>Cordenadas:</div>
											<div>
												<span>17.5548193</span>, <span>-99.4877102,19z</span>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<th scope='row'>
										<div className='d-flex align-items-center justify-content-center text-center'>
											Domingo 20
										</div>
									</th>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsEntry'>08:00</div>
										</div>
									</td>
									<td>
										<div className='d-flex align-items-center justify-content-center'>
											<span className='textColorLight'>hrs</span>
											<div className='custm-hrsExit'>18:00</div>
										</div>
									</td>
									<td>
										<div className='d-flex flex-column align-items-center textColorLight text-center'>
											<div>Cordenadas:</div>
											<div>
												<span>17.5548193</span>, <span>-99.4877102,19z</span>
											</div>
										</div>
									</td>
									<td>
										<div className='d-flex flex-column align-items-center textColorLight text-center'>
											<div>Cordenadas:</div>
											<div>
												<span>17.5548193</span>, <span>-99.4877102,19z</span>
											</div>
										</div>
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
