import { Link } from 'react-router-dom';
import Empleados from './Empleados';
import './Empleados.css';

const EmpleadosPage = () => {
	return (
		<>
			<div className='custm-empleadosContainer rounded-3 shadow mt-4'>
				<div className='custm-empleadosHead '>
					<div
						className='textColorSecondary fs-4'
						style={{ textDecoration: 'underline' }}
					>
						Empleados
					</div>
					<div className='custm-btnNuevoEmpleadoContainer'>
						{/* <button className='custm-btnNuevoEmpleado'>+ Nuevo empleado</button> */}
						<Empleados />
						<button className='btn custm-btnMasEmpleado custmBtnActions'>●●●</button>
					</div>
				</div>
				<div
					// style={{ backgroundColor: 'turquoise' }}
					className='d-flex flex-column justify-content-center pt-4 p-4'
				>
					<div className='custm-coninerTituloEmpleados d-flex  justify-content-between ms-3'>
						<div>
							<div className='d-flex '>
								<div className='custm-empleadosIcon'>
									<i className='bi bi-people' />
								</div>
								<div className='d-flex ms-2 align-items-center'>
									<label className='fs-3  textColorSecondary'>Empleados</label>
								</div>
							</div>
							<div className=' custm-descEmpleados textColorLight fw-light pb-3'>
								Aquí están todos los empleados de tu empresa.
							</div>
						</div>
						<div className='d-flex align-items-center'>
							<div className='d-flex flex-column align-items-center custm-NumEmpleados mb-3 me-2'>
								<div>3486</div>
								<div>Empleados</div>
							</div>
						</div>
					</div>
					<div className='custm-tableEmpleados'>
						<div className='d-flex flex-column custm-tableHead'>
							<div className='custm-tableSearchBar d-flex align-items-center ms-3'>
								<div className='form-floating '>
									<input
										style={{ borderRadius: '30px' }}
										type='text'
										className='form-control'
										id='floatingInput'
										placeholder='Ingresa tu busqueda'
									/>
									<label htmlFor='floatingInput'>Buscar</label>
								</div>
							</div>
						</div>
						<div className='table-responsive cutm-tablaResponsive'>
							<table className='table table-hover '>
								<thead className='custm-tableThead'>
									<tr>
										<th scope='col'></th>
										<th scope='col'>Nombre</th>
										<th scope='col'>Apellidos</th>
										<th scope='col'>Correo</th>
										<th scope='col'>Telefono</th>
									</tr>
								</thead>
								<tbody>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount ms-2'>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr
										className='custm-table-tr'
										onClick={() => {
											console.log('aqui');
										}}
									>
										<th scope='row'>
											<div className='custm-imgCount ms-2'>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount ms-2'>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr className='custm-table-tr'>
										<th scope='row'>
											<div className='custm-imgCount '>
												<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
											</div>
										</th>
										<td>Ultimo</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
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

export default EmpleadosPage;
