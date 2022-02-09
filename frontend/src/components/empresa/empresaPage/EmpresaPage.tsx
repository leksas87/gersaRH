import { NavLink, Outlet, useLocation } from 'react-router-dom';

const EmpresaPage = () => {
	//useLocation para conocer el path
	const { pathname } = useLocation();

	return (
		<>
			<div className='custm-empleadosContainer rounded-3 shadow mt-4'>
				<div
					className='d-flex justify-content-center align-items-center p-4'
					style={{ borderBottom: '1px solid var(--textColorDisable)' }}
				>
					<i className='d-flex bi bi-gear-fill me-2 fs-3 textColorSecondary' />

					<div className='fs-4 textColorSecondary'>
						<span className='text-capitalize'>Empresa</span>
					</div>
				</div>
				{/* Navbar */}
				<nav
					className='d-flex justify-content-center align-items-center p-3'
					style={{ borderBottom: '1px solid var(--textColorDisable)' }}
				>
					{pathname === '/empresa' ? (
						<NavLink
							to={`/empresa/`}
							// className='fs-5  textColorSecondary ms-1 me-2 custm-empleadoNavLink custm-empleadoNavLink-Active'
							className='fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink custm-empleadoNavLink-Active'
						>
							Detalles
						</NavLink>
					) : (
						<NavLink
							to={`/empresa/`}
							// className='fs-5  textColorSecondary ms-1 me-2 custm-empleadoNavLink custm-empleadoNavLink-Active'
							className={({ isActive }) =>
								isActive
									? 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink custm-empleadoNavLink-Active'
									: 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink'
							}
						>
							Detalles
						</NavLink>
					)}
					<NavLink
						to={`/empresa/archivados`}
						className={({ isActive }) =>
							isActive
								? 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink custm-empleadoNavLink-Active'
								: 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink'
						}
					>
						Empleados archivados
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

export default EmpresaPage;
