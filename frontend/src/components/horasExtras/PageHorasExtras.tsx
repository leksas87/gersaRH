import { NavLink, Outlet, useLocation } from 'react-router-dom';

const PageHorasExtras = () => {
	//useLocation para conocer el path
	const { pathname } = useLocation();
	return (
		<>
			<div className='custm-empleadosContainer rounded-3 shadow mt-4'>
				<div
					className='d-flex justify-content-center align-items-center p-4'
					style={{ borderBottom: '1px solid var(--textColorDisable)' }}
				>
					<div className='fs-4 textColorSecondary'>
						<span className='text-capitalize'>Solicitar horas extras</span>
					</div>
				</div>
				{/* Navbar */}
				<nav
					className='d-flex justify-content-center align-items-center p-3'
					style={{ borderBottom: '1px solid var(--textColorDisable)' }}
				>
					{pathname === '/solicitarhoras' ? (
						<NavLink
							to={`/solicitarhoras/`}
							// className='fs-5  textColorSecondary ms-1 me-2 custm-empleadoNavLink custm-empleadoNavLink-Active'
							className='fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink custm-empleadoNavLink-Active'
						>
							Solicitud de horas extras
						</NavLink>
					) : (
						<NavLink
							to={`/solicitarhoras/`}
							// className='fs-5  textColorSecondary ms-1 me-2 custm-empleadoNavLink custm-empleadoNavLink-Active'
							className={({ isActive }) =>
								isActive
									? 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink custm-empleadoNavLink-Active'
									: 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink'
							}
						>
							Solicitud de horas extras
						</NavLink>
					)}

					<NavLink
						to={`/solicitarhoras/historial`}
						className={({ isActive }) =>
							isActive
								? 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink custm-empleadoNavLink-Active'
								: 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink'
						}
					>
						Historial de horas extras
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

export default PageHorasExtras;
