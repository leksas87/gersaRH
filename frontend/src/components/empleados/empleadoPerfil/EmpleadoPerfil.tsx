import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { reSendAccessCode } from '../../../actions/eventsActions/eventsActions';
import { getContracts } from '../../../actions/contractsActions/contractsActions';
import {
	changeRollToUser,
	getEmployeeById,
	getUserById,
} from '../../../actions/usersActions/usersActions';
import { RootSote } from '../../../store/Store';
import './EmpleadoPerfil.css';
import ModalElimnarAcceso from './ModalElimnarAcceso';
import ModalFinalizarEmpleado from './ModalFinalizarEmpleado';
import ModalNuevoContrato from './ModalNuevoContrato';
import * as bootstrap from 'bootstrap';

const EmpleadoPerfil = () => {
	//Hook para obtener los parametros del url
	const params = useParams();
	const empleadoId = params.empleadoId;

	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilUsuario: perfilEmpleado, tablePath } = useSelector(
		(state: RootSote) => state.users
	);
	//Senecesita el state que indica el roll, nombre y apellido del usuario
	const { rollTypeId } = useSelector((state: RootSote) => state.auth);
	//useDispatch para ehecutar las Actions
	const dispatch = useDispatch();

	//Tomar Solo el primer nombre y el primer apellido
	const indiceName = perfilEmpleado.firstName.indexOf(' ');
	const indiceLastname = perfilEmpleado.lastName.indexOf(' ');
	const name = perfilEmpleado.firstName.substring(0, indiceName);
	const lastName = perfilEmpleado.lastName.substring(0, indiceLastname);
	const roll = perfilEmpleado.rollTypeId;
	const isActive = perfilEmpleado.active;

	useEffect(() => {
		if (empleadoId) dispatch(getUserById(empleadoId));
		if (empleadoId) dispatch(getEmployeeById(empleadoId));

		if (empleadoId) dispatch(getContracts(empleadoId));
	}, [dispatch, empleadoId]);

	//metodo para remover Permisos de Administrador
	const quitarAdmin = () => {
		dispatch(changeRollToUser(perfilEmpleado.id, 2));
	};
	//metodo para asignar Permisos de Administrador
	const nombrarAdmin = () => {
		dispatch(changeRollToUser(perfilEmpleado.id, 1));
	};
	//metodo para asignar Permisos de Jefe de Cuadrilla
	const nombrarJefe = () => {
		dispatch(changeRollToUser(perfilEmpleado.id, 3));
	};
	//Metodo para reenviar codifo de acceso al empleado
	const resendAccessCode = () => {
		dispatch(reSendAccessCode(perfilEmpleado.id));
	};
	const showDropDown = () => {
		let searchDropdown = new bootstrap.Dropdown('#btnEployeeOptions');
		searchDropdown.show();
	};
	return (
		<>
			<div
				className={
					tablePath === '/empleados'
						? 'custm-empleadosContainer rounded-3 shadow mt-4'
						: 'custm-empleadosContainer rounded-3  mt-1'
				}
			>
				{/* <h1>Empleado - {params.empleadoId}</h1> */}
				<div
					className='d-flex justify-content-center align-items-center p-4'
					style={
						tablePath === '/empleados'
							? {
									borderBottom: '1px solid var(--textColorDisable)',
									position: 'relative',
							  }
							: {
									position: 'relative',
							  }
					}
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
						<ModalElimnarAcceso />
						<ModalFinalizarEmpleado />
						<ModalNuevoContrato />
						{tablePath === '/empleados' && rollTypeId === 1 && (
							<div className='dropdown'>
								{/* Boton para activar ventana DropDown */}
								<button
									className='btn custm-btnMasEmpleado custmBtnActions'
									type='button'
									id='btnEployeeOptions'
									data-bs-toggle='dropdown'
									aria-expanded='false'
									onClick={showDropDown}
								>
									●●●
								</button>

								{/* Ventana DropDown*/}
								<ul
									className='dropdown-menu custm-dropDownBtnMas'
									aria-labelledby='btnEployeeOptions'
								>
									{isActive && (
										<li>
											{/* Boton para mostrar Modal SeleccionarExcel */}
											<button
												className='dropdown-item custm-dropdown-item custm-dropItem'
												type='button'
												data-bs-toggle='modal'
												data-bs-target='#ModalEliminarAcceso'
											>
												<div className='fs-5'>Eliminar acceso</div>
												<div className='custm-dropItemText'>
													El empleado no podrá acceder al
												</div>
												<div className='custm-dropItemText'>
													sistema hasta que no le invites
												</div>
												<div className='custm-dropItemText'>de nuevo.</div>
											</button>
										</li>
									)}
									<li>
										{/* rollId 2 = Empleado */}
										{(roll === 2 || roll === 3) && (
											<button
												className='dropdown-item custm-dropdown-item custm-dropItem'
												type='button'
												onClick={nombrarAdmin}
											>
												<div className='fs-5'>Nombrar administrador</div>

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
												onClick={quitarAdmin}
											>
												<div className='fs-5'>Quitar como admin</div>

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
										{/* rollId 2 = Empleado */}
										{(roll === 1 || roll === 2) && (
											<button
												className='dropdown-item custm-dropdown-item custm-dropItem'
												type='button'
												onClick={nombrarJefe}
											>
												<div className='fs-5'>Nombrar Jefe </div>
												<div className='fs-5'>de cuadrilla </div>

												<div className='custm-dropItemText'>
													Tendrá visibilidad de los empleados a
												</div>
												<div className='custm-dropItemText'>
													su cargo y podrá realizar las funciones
												</div>
												<div className='custm-dropItemText'>de un jefe de cuadrilla.</div>
											</button>
										)}
										{/* rollId 1 = Admin */}
										{roll === 3 && (
											<button
												className='dropdown-item custm-dropdown-item custm-dropItem'
												type='button'
												onClick={quitarAdmin}
											>
												<div className='fs-5'>
													<div>Quitar como</div>
													<div>Jefe de Cuadrilla</div>
												</div>

												<div className='custm-dropItemText'>
													Convierte este Jefe en un empleado
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
											onClick={resendAccessCode}
										>
											<div className='fs-5'>Reenviar Codigo</div>
											<div className='fs-5'>de Acceso </div>
											<div className='custm-dropItemText'>
												Reenvia al empleado su código de
											</div>
											<div className='custm-dropItemText'>acceso.</div>
										</button>
									</li>
									<li>
										<button
											className='dropdown-item custm-dropdown-item custm-dropItem'
											type='button'
											data-bs-toggle='modal'
											data-bs-target='#ModalFinalizarEmpleado'
										>
											<div className='fs-5'>
												Finalizar a{' '}
												<span className='text-capitalize'>
													{name ? name : perfilEmpleado.firstName}
												</span>
											</div>
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
						)}
					</div>
				</div>
				{/* Navbar */}
				<nav className='custm-navbarPerrfil p-3'>
					{rollTypeId === 1 && (
						<>
							<NavLink
								to={`${tablePath}/${params.empleadoId}/perfil`}
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
								to={`${tablePath}/${params.empleadoId}/personal`}
								className={({ isActive }) =>
									isActive
										? 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink custm-empleadoNavLink-Active'
										: 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink'
								}
							>
								Personal
							</NavLink>
							<NavLink
								to={`${tablePath}/${params.empleadoId}/infocontrato`}
								className={({ isActive }) =>
									isActive
										? 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink custm-empleadoNavLink-Active text-center'
										: 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink text-center'
								}
							>
								Información de Contrato
							</NavLink>
						</>
					)}
					<NavLink
						to={`${tablePath}/${params.empleadoId}/controlhorario`}
						className={({ isActive }) =>
							isActive
								? 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink custm-empleadoNavLink-Active text-center'
								: 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink text-center'
						}
					>
						Control horario
					</NavLink>
					<NavLink
						to={`${tablePath}/${params.empleadoId}/controlhorasextras`}
						className={({ isActive }) =>
							isActive
								? 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink custm-empleadoNavLink-Active text-center'
								: 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink text-center'
						}
					>
						Control horas extras
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
