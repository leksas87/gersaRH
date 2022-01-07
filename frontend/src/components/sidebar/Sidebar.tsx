import './Sidebar.css';
const Sidebar = () => {
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
							data-bs-dismiss='offcanvas'
						>
							<i className='bi bi-house-door sidebarIcon' />
							Inicio
						</div>
						<div className='sidebarOption' data-bs-dismiss='offcanvas'>
							<i className='bi bi-person-square sidebarIcon' />
							Mi perfil
						</div>
						<div className='sidebarOption'>
							<i className='bi bi-clock sidebarIcon' />
							Reloj Checador
						</div>
						<div className='sidebarOption'>
							<i className='bi bi-lightbulb-off sidebarIcon' />
							Ausencias
						</div>
						<div className='sidebarOption'>
							<i className='bi bi-card-checklist sidebarIcon' />
							Tareas
						</div>
					</nav>
					<nav className='d-flex flex-column sidebarEmpresa'>
						<label className='fs-6 textColorSecondary'>TU EMPRESA</label>
						<div className='sidebarOption'>
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
					<div className='mt-3 sidebarLeave'>
						<i
							className='bi bi-person-circle sidebarIcon'
							style={{ color: '#ff0062' }}
						/>
						Ivan Santana ●
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
