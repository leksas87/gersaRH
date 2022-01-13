import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../actions/loginActions';
import { RootSote } from '../../store/Store';
import './Sidebar.css';

interface iProps {
	screenSize?: boolean;
}

const Sidebar = ({ screenSize = true }: iProps) => {
	const dispatch = useDispatch();
	//Senecesita el state que indica el roll, nombre y apellido del usuario
	const { roll, firstName, lastName } = useSelector(
		(state: RootSote) => state.auth
	);
	return (
		<>
			<div className='d-flex flex-column sidebarContainer'>
				<div className='d-flex justify-content-center  mb-4 sidebarLogo'>
					<img width='80%' src='assets\gersa-logo.png' alt='gersaLogo' />
				</div>
				<div className='sidebarContent'>
					<nav className='d-flex flex-column sidebarTu'>
						<label className='fs-6 textColorSecondary'>TÚ</label>
						<div
							className='sidebarOption sidebarOptionActive'
							data-bs-dismiss={`${screenSize ? 'offcanvas' : ''}`}
						>
							<i className='bi bi-house-door sidebarIcon' />
							Inicio
						</div>
						<div className='sidebarOption'>
							<i className='bi bi-person-square sidebarIcon' />
							Mi perfil
						</div>
						<div className='sidebarOption'>
							<i className='bi bi-clock sidebarIcon ' />
							Reloj Checador
						</div>
						<div className='sidebarOption'>
							<i className='bi bi-lightbulb-off sidebarIcon' />
							Ausencias
						</div>
						<div className='sidebarOption'>
							<i className='bi bi-card-checklist sidebarIcon' />
							Solicitudes
						</div>
					</nav>
					{roll === 1 && (
						<nav className='d-flex flex-column sidebarEmpresa'>
							<label className='fs-6 textColorSecondary'>TU EMPRESA</label>
							<div
								className='sidebarOption'
								data-bs-dismiss={`${screenSize ? 'offcanvas' : ''}`}
							>
								<i className='bi bi-person-video2 sidebarIcon' />
								Empleados
							</div>
							<div className='sidebarOption'>
								<i className='bi bi-calendar-week sidebarIcon' />
								Calendario
							</div>
							<div className='sidebarOption'>
								<i className='bi bi-folder2-open sidebarIcon' />
								Archivos
							</div>
							<div className='sidebarOption'>
								<i className='bi bi-gear sidebarIcon ' />
								Empresa
							</div>
						</nav>
					)}
					<div className='mt-3 ms-1 btn-group '>
						<button
							type='button'
							className='sidebarLeaveButton sidebarOption'
							data-bs-toggle='dropdown'
							aria-expanded='false'
						>
							<div className='custm-imgCount me-2'>
								<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
							</div>
							<span
								style={{ textTransform: 'capitalize' }}
							>{`${firstName} ${lastName}`}</span>
						</button>
						<ul
							style={{ border: 'none' }}
							className='dropdown-menu dropdown-menu-end shadow-sm'
						>
							<li>
								<button
									className='dropdown-item custm-dropdown-item'
									type='button'
									onClick={() => dispatch(logOut())}
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
