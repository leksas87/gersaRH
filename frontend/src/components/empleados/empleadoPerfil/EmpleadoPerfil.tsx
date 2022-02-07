import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { getUserById } from '../../../actions/usersActions/usersActions';
import { RootSote } from '../../../store/Store';
import './EmpleadoPerfil.css';

const EmpleadoPerfil = () => {
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilEmpleado } = useSelector((state: RootSote) => state.users);

	//Tomar Solo el primer nombre y el primer apellido
	const indiceName = perfilEmpleado.firstName.indexOf(' ');
	const indiceLastname = perfilEmpleado.lastName.indexOf(' ');
	const name = perfilEmpleado.firstName.substring(0, indiceName);
	const lastName = perfilEmpleado.lastName.substring(0, indiceLastname);
	const roll = perfilEmpleado.roll;

	//Hook para obtener los parametros del url
	const params = useParams();
	const dispatch = useDispatch();
	const empleadoId = params.empleadoId;

	useEffect(() => {
		if (empleadoId) dispatch(getUserById(empleadoId));
	}, [dispatch, empleadoId]);

	return (
		<>
			<div className='custm-empleadosContainer rounded-3 shadow mt-4'>
				{/* <h1>Empleado - {params.empleadoId}</h1> */}
				<div
					className='d-flex justify-content-center align-items-center p-4'
					style={{
						borderBottom: '1px solid var(--textColorDisable)',
						position: 'relative',
					}}
				>
					<div className='custm-imgCount me-2'>
						<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
					</div>
					<div className='fs-4 textColorSecondary'>
						<span className='text-capitalize'>
							{name ? name : perfilEmpleado.firstName}
							{` `}
							{lastName ? lastName : perfilEmpleado.lastName}
						</span>
					</div>
					<div className='custm-btnNuevoEmpleadoContainer me-2'>
						<div className='dropdown'>
							{/* Boton para activar ventana DropDown */}
							<button
								className='btn custm-btnMasEmpleado custmBtnActions'
								type='button'
								id='btnEployeeOptions'
								data-bs-toggle='dropdown'
								aria-expanded='false'
							>
								●●●
							</button>

							{/* Ventana DropDown*/}
							<ul
								className='dropdown-menu custm-dropDownBtnMas'
								aria-labelledby='btnEployeeOptions'
							>
								<li>
									{/* Boton para mostrar Modal SeleccionarExcel */}
									<button
										className='dropdown-item custm-dropdown-item custm-dropItem'
										type='button'
										data-bs-toggle='modal'
										data-bs-target='#ModalSeleccionarExcel'
									>
										<div className='fs-4'>Eliminar acceso</div>
										<div className='custm-dropItemText'>
											El empleado no podrá acceder al
										</div>
										<div className='custm-dropItemText'>
											sistema hasta que no le invites
										</div>
										<div className='custm-dropItemText'>de nuevo.</div>
									</button>
								</li>
								<li>
									{/* rollId 2 = Empleado */}
									{roll === 2 && (
										<button
											className='dropdown-item custm-dropdown-item custm-dropItem'
											type='button'
											// onClick={downloadTamplate}
										>
											<div className='fs-4'>Nombrar administrador</div>

											<div className='custm-dropItemText'>
												Tendrá visibilidad total en la cuenta de
											</div>
											<div className='custm-dropItemText'>
												la empresa y podrá ver y editar datos
											</div>
											<div className='custm-dropItemText'>de otros colaboradores.</div>
										</button>
									)}
									{/* rollId 1 = Admin */}
									{roll === 1 && (
										<button
											className='dropdown-item custm-dropdown-item custm-dropItem'
											type='button'
											// onClick={downloadTamplate}
										>
											<div className='fs-4'>Quitar como admin</div>

											<div className='custm-dropItemText'>
												Convierte este admin en un empleado
											</div>
											<div className='custm-dropItemText'>
												básico sin poderes en la empresa.
											</div>
										</button>
									)}
								</li>
								<li>
									<button
										className='dropdown-item custm-dropdown-item custm-dropItem'
										type='button'
									>
										<div className='fs-4'>Finalizar a @Name</div>
										<div className='custm-dropItemText'>
											Archiva a este empleado en la tabla
										</div>
										<div className='custm-dropItemText'>
											de personas que no laboran más en
										</div>
										<div className='custm-dropItemText'>tu empresa.</div>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
				{/* Navbar */}
				<nav
					className='d-flex justify-content-center align-items-center p-3'
					style={{ borderBottom: '1px solid var(--textColorDisable)' }}
				>
					<NavLink
						to={`/empleados/${params.empleadoId}/perfil`}
						// className='fs-5  textColorSecondary ms-1 me-2 custm-empleadoNavLink custm-empleadoNavLink-Active'
						className={({ isActive }) =>
							isActive
								? 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink custm-empleadoNavLink-Active'
								: 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink'
						}
					>
						Perfil
					</NavLink>
					<NavLink
						to={`/empleados/${params.empleadoId}/personal`}
						className={({ isActive }) =>
							isActive
								? 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink custm-empleadoNavLink-Active'
								: 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink'
						}
					>
						Personal
					</NavLink>
					<NavLink
						to={`/empleados/${params.empleadoId}/infocontrato`}
						className={({ isActive }) =>
							isActive
								? 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink custm-empleadoNavLink-Active text-center'
								: 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink text-center'
						}
					>
						Información de Contrato
					</NavLink>
				</nav>
				{/* Contenido */}
				<div className='d-flex flex-column p-4'>
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default EmpleadoPerfil;
