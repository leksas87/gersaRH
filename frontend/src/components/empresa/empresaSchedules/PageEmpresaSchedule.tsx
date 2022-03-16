import './PageEmpresaSchedule.css';

const PageEmpresaSchedule = () => {
	return (
		<>
			<div className='custm-contractContainerCenter p-3'>
				<div className='d-flex flex-column custm-scheduleWidht'>
					<div className=' d-flex justify-content-end custm-Width100 '>
						<div className='btn custm-btnBorder'>
							Nuevo horario <i className='bi bi-plus-circle' />
						</div>
					</div>
					<div className=' mt-3'>
						<div className='table-responsive custm-tableSchedules'>
							<table className='table table align-middle'>
								<thead>
									{/* <thead> */}
									<tr>
										<th scope='col'>
											<div className='d-flex justify-content-center textColorSecondary'>
												Id
											</div>
										</th>
										<th scope='col'>
											<div className='d-flex justify-content-center textColorSecondary'>
												Nombre
											</div>
										</th>
										<th scope='col'>
											<div className='d-flex justify-content-center' />
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope='row'>
											<div className='d-flex align-items-center justify-content-center text-center textColorSecondary'>
												1
											</div>
										</th>
										<td>
											<div className='d-flex align-items-center justify-content-center'>
												<div className='textColorSecondary'>Nike Matutino 1</div>
											</div>
										</td>
										<td>
											<div className='d-flex align-items-center justify-content-center'>
												<div className=' btn custm-btnEliminar'>Eliminar</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope='row'>
											<div className='d-flex align-items-center justify-content-center text-center textColorSecondary'>
												2
											</div>
										</th>
										<td>
											<div className='d-flex align-items-center justify-content-center'>
												<div className='textColorSecondary'>Nike Matutino 1</div>
											</div>
										</td>
										<td>
											<div className='d-flex align-items-center justify-content-center'>
												<div className=' btn custm-btnEliminar'>Eliminar</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope='row'>
											<div className='d-flex align-items-center justify-content-center text-center textColorSecondary'>
												3
											</div>
										</th>
										<td>
											<div className='d-flex align-items-center justify-content-center'>
												<div className='textColorSecondary'>Nike Matutino 1</div>
											</div>
										</td>
										<td>
											<div className='d-flex align-items-center justify-content-center'>
												<div className=' btn custm-btnEliminar'>Eliminar</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope='row'>
											<div className='d-flex align-items-center justify-content-center text-center textColorSecondary'>
												4
											</div>
										</th>
										<td>
											<div className='d-flex align-items-center justify-content-center'>
												<div className='textColorSecondary'>Nike Matutino 1</div>
											</div>
										</td>
										<td>
											<div className='d-flex align-items-center justify-content-center'>
												<div className=' btn custm-btnEliminar'>Eliminar</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope='row'>
											<div className='d-flex align-items-center justify-content-center text-center textColorSecondary'>
												4
											</div>
										</th>
										<td>
											<div className='d-flex align-items-center justify-content-center'>
												<div className='textColorSecondary'>Nike Matutino 1</div>
											</div>
										</td>
										<td>
											<div className='d-flex align-items-center justify-content-center'>
												<div className=' btn custm-btnEliminar'>Eliminar</div>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageEmpresaSchedule;
