const ArchivosEmpresa = () => {
	return (
		<>
			<div className='d-flex flex-column align-items-center'>
				<div
					className='d-flex justify-content-center custm-Width100'
					style={{ position: 'relative' }}
				>
					<div className='d-flex mt-4'>
						<div>
							<i
								style={{ fontSize: '3rem', color: 'var(--colorSecondary)' }}
								className='bi bi-folder-fill'
							/>
						</div>
						<div className='d-flex flex-column align-items-center justify-content-center custm-width100 ms-2'>
							<div
								className='text-center fs-4 textColorSecondary'
								style={{ maxWidth: '400px' }}
							>
								Archivos / Empresa.
							</div>
						</div>
					</div>
					<div style={{ position: 'absolute', top: '1rem', right: '2rem' }}>
						{/* <ModalNuevoArchivo /> */}
					</div>
				</div>
				<div className='d-flex justify-content-center  mt-3 custm-Width100'>
					<div className='custm-tableArchivos mt-3'>
						<div className='table-responsive '>
							<table className='table align-middle'>
								<thead className='custm-tableThead'>
									<tr>
										<th scope='col' className='custm-col textColorLight'>
											Nombre
										</th>
										<th scope='col' className='custm-col textColorLight'>
											Fecha creación
										</th>
									</tr>
								</thead>
								<tbody>
									<tr
										className='custm-table-tr textColorLight'
										// onClick={() => {
										// 	irEmpleado(empleado.id);
										// }}
									>
										<th scope='row'>
											<i className='bi bi-file-earmark-text pe-1' />
											Imagen.png
										</th>
										<td>22/04/22</td>
									</tr>
									<tr
										className='custm-table-tr textColorLight'
										// onClick={() => {
										// 	irEmpleado(empleado.id);
										// }}
									>
										<th scope='row'>
											<i className='bi bi-file-earmark-text pe-1' />
											Imagen.png
										</th>
										<td>22/04/22</td>
									</tr>
									<tr
										className='custm-table-tr textColorLight'
										// onClick={() => {
										// 	irEmpleado(empleado.id);
										// }}
									>
										<th scope='row'>
											<i className='bi bi-file-earmark-text pe-1' />
											Imagen.png
										</th>
										<td>22/04/22</td>
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

export default ArchivosEmpresa;
