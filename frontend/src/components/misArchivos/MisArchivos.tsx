import { useSelector } from 'react-redux';
import { RootSote } from '../../store/Store';

const MisArchivos = () => {
	const { firstName, lastName } = useSelector((state: RootSote) => state.auth);

	//Tomar Solo el primer nombre y el primer apellido
	const indiceName = firstName.indexOf(' ');
	const indiceLastname = lastName.indexOf(' ');
	const myName = firstName.substring(0, indiceName);
	const myLastName = lastName.substring(0, indiceLastname);
	return (
		<>
			<div className='custm-empleadosContainer rounded-3 shadow mt-4'>
				<div className='custm-empleadosHead'>
					<div
						className='textColorSecondary fs-4 d-flex justify-content-center align-items-center p-4'
						style={{ textDecoration: 'underline' }}
					>
						<div className='custm-imgCount me-2'>
							<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
						</div>
						<div className='fs-4 textColorSecondary'>
							<span className='text-capitalize'>
								{myName ? myName : firstName}
								{` `}
								{myLastName ? myLastName : lastName}
							</span>
						</div>
					</div>
				</div>
				<div className='d-flex flex-column align-items-center'>
					<div className='d-flex '>
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
								Mis archivos / Personales.
							</div>
							<div className='table-responsive cutm-tablaResponsive'>
								<table className='table table-hover '>
									<thead className='custm-tableThead'>
										<tr>
											<th scope='col'></th>
											<th scope='col' className='custm-col'>
												Nombre
												<i
													className='custm-icon bi bi-arrow-down-up'
													// onClick={() => {
													// 	sortEmployees(empleados, 'Nombre', isAscending);
													// 	isAscending ? setIsAscending(false) : setIsAscending(true);
													// }}
												/>
											</th>
											<th scope='col' className='custm-col'>
												Apellidos
												<i
													className='custm-icon bi bi-arrow-down-up'
													// onClick={() => {
													// 	sortEmployees(empleados, 'Apellidos', isAscending);
													// 	isAscending ? setIsAscending(false) : setIsAscending(true);
													// }}
												/>
											</th>
											<th scope='col' className='custm-col'>
												Correo
												<i
													className='custm-icon bi bi-arrow-down-up'
													// onClick={() => {
													// 	sortEmployees(empleados, 'Correo', isAscending);
													// 	isAscending ? setIsAscending(false) : setIsAscending(true);
													// }}
												/>
											</th>
											<th scope='col' className='custm-col'>
												Telefono
												<i
													className='custm-icon bi bi-arrow-down-up'
													// onClick={() => {
													// 	sortEmployees(empleados, 'Telefono', isAscending);
													// 	isAscending ? setIsAscending(false) : setIsAscending(true);
													// }}
												/>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr
											className='custm-table-tr'
											// onClick={() => {
											// 	irEmpleado(empleado.id);
											// }}
										>
											<th scope='row'>
												<div className='custm-imgCount ms-2'>
													<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
												</div>
											</th>
											<td>nombre</td>
											<td>apellido</td>
											<td>correo</td>
											<td>telefono</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MisArchivos;
