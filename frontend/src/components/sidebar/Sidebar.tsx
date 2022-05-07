import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from '../../actions/loginActions/loginActions';
import { RootSote } from '../../store/Store';
import './Sidebar.css';
import * as bootstrap from 'bootstrap';

interface iProps {
	screenSize?: boolean;
}

const Sidebar = ({ screenSize = true }: iProps) => {
	//hook useNavigate
	const navigate = useNavigate();
	//useDispatch para hacer dispatch de la accion
	const dispatch = useDispatch();
	//Senecesita el state que indica el roll, nombre y apellido del usuario
	const { firstName, lastName, rollTypeId } = useSelector(
		(state: RootSote) => state.auth
	);

	//Tomar Solo el primer nombre y el primer apellido
	const indiceName = firstName.indexOf(' ');
	const indiceLastname = lastName.indexOf(' ');
	const name = firstName.substring(0, indiceName);
	const lastname = lastName.substring(0, indiceLastname);

	//Metodo para cerrar sesion
	const startLogOut = () => {
		window.location.reload();
		localStorage.clear();
		// localStorage.setItem('gersaUserName', '');
		dispatch(logOut());
	};

	//se usa navigate ya que data-bs-dismiss del offCanvas no permite el redireccionamiento directo
	const navigateTo = (ruta: string) => {
		navigate(ruta);
	};

	const showDropDown = () => {
		let searchDropdown = new bootstrap.Dropdown('#dropDownLeft');
		searchDropdown.show();
	};

	return (
		<>
			<div className='d-flex flex-column sidebarContainer'>
				<div className='d-flex justify-content-center  mb-4 sidebarLogo'>
					<img width='100%' src='\assets\gersaLogo.svg' alt='gersa-logo' />
				</div>
				<div className='sidebarContent'>
					<nav className='d-flex flex-column sidebarTu'>
						<label className='fs-6 textColorSecondary'>TÚ</label>
						<NavLink
							to='/'
							// className='sidebarOption sidebarOptionActive'
							className={({ isActive }) =>
								isActive ? 'sidebarOption sidebarOptionActive' : 'sidebarOption'
							}
							data-bs-dismiss={`${screenSize ? 'offcanvas' : ''}`}
							onClick={() => {
								navigateTo('/');
							}}
						>
							<i className='bi bi-house-door sidebarIcon' />
							Inicio
						</NavLink>
						<NavLink
							to='/miperfil'
							className={({ isActive }) =>
								isActive ? 'sidebarOption sidebarOptionActive' : 'sidebarOption'
							}
							data-bs-dismiss={`${screenSize ? 'offcanvas' : ''}`}
							onClick={() => {
								navigateTo('/miperfil');
							}}
						>
							<i className='bi bi-person-square sidebarIcon' />
							Mi perfil
						</NavLink>
						<NavLink
							to='/solicitudes'
							className={({ isActive }) =>
								isActive ? 'sidebarOption sidebarOptionActive' : 'sidebarOption'
							}
							data-bs-dismiss={`${screenSize ? 'offcanvas' : ''}`}
							onClick={() => {
								navigateTo('/solicitudes');
							}}
						>
							<i className='bi bi-calendar-date sidebarIcon ' />
							Solicitudes
						</NavLink>
						<NavLink
							to='/misreportes'
							className={({ isActive }) =>
								isActive ? 'sidebarOption sidebarOptionActive' : 'sidebarOption'
							}
							data-bs-dismiss={`${screenSize ? 'offcanvas' : ''}`}
							onClick={() => {
								navigateTo('/misreportes');
							}}
						>
							<i className='bi bi-exclamation-lg sidebarIcon' />
							Reportes
						</NavLink>
						<NavLink
							to='/horasextras'
							className={({ isActive }) =>
								isActive ? 'sidebarOption sidebarOptionActive' : 'sidebarOption'
							}
							data-bs-dismiss={`${screenSize ? 'offcanvas' : ''}`}
							onClick={() => {
								navigateTo('/horasextras');
							}}
						>
							<i className='bi bi-stopwatch-fill sidebarIcon' />
							Horas extras
						</NavLink>
						<NavLink
							to='/misarchivos'
							className={({ isActive }) =>
								isActive ? 'sidebarOption sidebarOptionActive' : 'sidebarOption'
							}
							data-bs-dismiss={`${screenSize ? 'offcanvas' : ''}`}
							onClick={() => {
								navigateTo('/misarchivos');
							}}
						>
							<i className='bi bi-folder2-open sidebarIcon' />
							Mis Archivos
						</NavLink>
					</nav>
					{(rollTypeId === 1 || rollTypeId === 3) && (
						<nav className='d-flex flex-column sidebarEmpresa'>
							<label className='fs-6 textColorSecondary'>TU EMPRESA</label>
							{/* {rollTypeId === 1 && (
							)} */}
							{(rollTypeId === 1 || rollTypeId === 3) && (
								<div>
									<NavLink
										to='/empleados'
										className={({ isActive }) =>
											isActive ? 'sidebarOption sidebarOptionActive' : 'sidebarOption'
										}
										data-bs-dismiss={`${screenSize ? 'offcanvas' : ''}`}
										onClick={() => {
											navigateTo('/empleados');
										}}
									>
										<i className='bi bi-person-video2 sidebarIcon' />
										Empleados
									</NavLink>
									<NavLink
										to='/solicitarhoras'
										className={({ isActive }) =>
											isActive ? 'sidebarOption sidebarOptionActive' : 'sidebarOption'
										}
										data-bs-dismiss={`${screenSize ? 'offcanvas' : ''}`}
										onClick={() => {
											navigateTo('/solicitarhoras');
										}}
									>
										<i className='bi bi-stopwatch sidebarIcon' />
										Solicitar horas extras
									</NavLink>

									<NavLink
										to='/autorizaciones'
										className={({ isActive }) =>
											isActive ? 'sidebarOption sidebarOptionActive' : 'sidebarOption'
										}
										data-bs-dismiss={`${screenSize ? 'offcanvas' : ''}`}
										onClick={() => {
											navigateTo('/autorizaciones');
										}}
									>
										<i className='bi bi-calendar-week sidebarIcon' />
										Autorizaciones
									</NavLink>
								</div>
							)}
							{rollTypeId === 3 && (
								<NavLink
									to='/reportesadministrativos'
									className={({ isActive }) =>
										isActive ? 'sidebarOption sidebarOptionActive' : 'sidebarOption'
									}
									data-bs-dismiss={`${screenSize ? 'offcanvas' : ''}`}
									onClick={() => {
										navigateTo('/reportesadministrativos');
									}}
								>
									<i className='bi bi-exclamation-lg sidebarIcon' />
									Reportes Administrativos
								</NavLink>
							)}
							{rollTypeId === 1 && (
								<NavLink
									to='/reportes'
									className={({ isActive }) =>
										isActive ? 'sidebarOption sidebarOptionActive' : 'sidebarOption'
									}
									data-bs-dismiss={`${screenSize ? 'offcanvas' : ''}`}
									onClick={() => {
										navigateTo('/reportes');
									}}
								>
									<i className='bi bi-exclamation-lg sidebarIcon' />
									Ver reportes
								</NavLink>
							)}

							{rollTypeId === 1 && (
								<NavLink
									to='/empresa'
									className={({ isActive }) =>
										isActive ? 'sidebarOption sidebarOptionActive' : 'sidebarOption'
									}
									data-bs-dismiss={`${screenSize ? 'offcanvas' : ''}`}
									onClick={() => {
										navigateTo('/empresa');
									}}
								>
									<i className='bi bi-gear sidebarIcon ' />
									Empresa
								</NavLink>
							)}
						</nav>
					)}
					<div className='mt-3 ms-1 btn-group '>
						<button
							id='dropDownLeft'
							type='button'
							className='sidebarLeaveButton sidebarOption'
							data-bs-toggle='dropdown'
							aria-expanded='true'
							onClick={showDropDown}
						>
							<div className='custm-imgCount me-2'>
								<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
							</div>
							<span style={{ textTransform: 'capitalize' }}>
								{name ? name : firstName}
								{` `}
								{lastname ? lastname : lastName}
							</span>
						</button>
						<ul
							style={{ border: 'none' }}
							className='dropdown-menu dropdown-menu-end shadow-sm'
						>
							<li>
								<button
									className='dropdown-item custm-dropdown-item'
									type='button'
									onClick={startLogOut}
									data-bs-dismiss={`${screenSize ? 'offcanvas' : ''}`}
								>
									Salir
								</button>
							</li>
							<li>
								<button className='dropdown-item custm-dropdown-item' type='button'>
									Another action
								</button>
							</li>
							<li>
								<button className='dropdown-item custm-dropdown-item' type='button'>
									Something else here
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
