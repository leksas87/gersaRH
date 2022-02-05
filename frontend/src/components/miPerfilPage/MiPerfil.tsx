import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../../actions/usersActions/usersActions';
// import { getUserById } from '../../../actions/usersActions/usersActions';
import { RootSote } from '../../store/Store';
// import './EmpleadoPerfil.css';

const MiPerfil = () => {
	const navigate = useNavigate();
	// navigate('/miperfil');
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { firstName, lastName } = useSelector((state: RootSote) => state.auth);

	//Tomar Solo el primer nombre y el primer apellido
	const indiceName = firstName.indexOf(' ');
	const indiceLastname = lastName.indexOf(' ');
	const name = firstName.substring(0, indiceName);
	const lastname = lastName.substring(0, indiceLastname);

	//Hook para obtener los parametros del url
	const params = useParams();

	useEffect(() => {}, []);

	return (
		<>
			<div className='custm-empleadosContainer rounded-3 shadow mt-4'>
				{/* <h1>Empleado - {params.empleadoId}</h1> */}
				<div
					className='d-flex justify-content-center align-items-center p-4'
					style={{ borderBottom: '1px solid var(--textColorDisable)' }}
				>
					<div className='custm-imgCount me-2'>
						<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
					</div>
					<div className='fs-4 textColorSecondary'>
						<span className='text-capitalize'>
							{name ? name : firstName}
							{` `}
							{lastname ? lastname : lastName}
						</span>
					</div>
				</div>
				{/* Navbar */}
				<nav
					className='d-flex justify-content-center align-items-center p-3'
					style={{ borderBottom: '1px solid var(--textColorDisable)' }}
				>
					<NavLink
						to={`/miperfil/`}
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
						to={`/miperfil/personal`}
						className={({ isActive }) =>
							isActive
								? 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink custm-empleadoNavLink-Active'
								: 'fs-5  textColorSecondary ms-1 me-3 custm-empleadoNavLink'
						}
					>
						Personal
					</NavLink>
					<NavLink
						to={`/miperfil/infocontrato`}
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

export default MiPerfil;
