import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { startChecking } from '../actions/loginActions/loginActions';
import Checador from '../components/checador/Checador';
import ChecadorConfirmacion from '../components/checador/ChecadorConfirmacion';
import ChecadorPage from '../components/checador/ChecadorPage';

import ChecadorTeclado from '../components/checador/ChecadorTeclado';
import ConfirmarContraseñaPage from '../components/confirmarContraseña/ConfirmarContraseñaPage';
import RecuperacionContrasenaPage from '../components/confirmarContraseña/RecuperacionContrasenaPage';
import DashboardPage from '../components/dashboardPage/DashboardPage';
import EmpleadoPerfil from '../components/empleados/empleadoPerfil/EmpleadoPerfil';
import PageControlHorario from '../components/empleados/empleadoPerfil/PageControlHorario';
import PageEmpleadoInfoContrato from '../components/empleados/empleadoPerfil/PageEmpleadoInfoContrato';
import PageEmpleadoPerfil from '../components/empleados/empleadoPerfil/PageEmpleadoPerfil';
import PageEmpleadoPersonal from '../components/empleados/empleadoPerfil/PageEmpleadoPersonal';
import EmpleadosPage from '../components/empleados/EmpleadosPage';
import EmpresaArchivados from '../components/empresa/empresaEmpleadosArchivados/EmpresaArchivados';
import EmpresaDetalles from '../components/empresa/empresaPage/EmpresaDetalles';
import EmpresaPage from '../components/empresa/empresaPage/EmpresaPage';
import InicioPage from '../components/inicioPage/InicioPage';
import Loading from '../components/loading/Loading';
import LoginPage from '../components/loginPage/LoginPage';
import MiPerfil from '../components/miPerfilPage/MiPerfil';
import PageInfoContrato from '../components/miPerfilPage/PageInfoContrato';
import PageInfoPersonal from '../components/miPerfilPage/PageInfoPersonal';
import PagePerfil from '../components/miPerfilPage/PagePerfil';
import RecuperarContraseñaPage from '../components/recuperarContraseña/RecuperarContraseñaPage';
import { RootSote } from '../store/Store';
import NotFound from './NotFound';
import { RequireAdminPrivileges } from './RequireAdminPrivileges';
import { RequireAuth } from './RequireAuth';
import { RequireAuthToHidden } from './RequireAuthToHidden';
import { RequireCheckState } from './RequireCheckState';

const AppRouter = () => {
	const dispatch = useDispatch();
	//Senecesita el state que indica el roll, nombre y apellido del usuario
	const { authState } = useSelector((state: RootSote) => state.auth);

	//Efecto que renueva el token cada que se refesca o carga la pagina
	useEffect(() => {
		dispatch(startChecking());
	}, [dispatch]);

	if (authState.loading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}

	return (
		<>
			<Suspense
				fallback={
					<div>
						<Loading />
					</div>
				}
			>
				<BrowserRouter>
					<Routes>
						{/* Rutas que no ves cuando estas autenticado */}
						<Route element={<RequireAuthToHidden />}>
							<Route path='/login' element={<LoginPage />} />
						</Route>

						{/* Rutas con autenticacion */}
						<Route element={<RequireAuth />}>
							<Route path='/' element={<DashboardPage />}>
								<Route index element={<InicioPage />} />

								<Route path='miperfil/' element={<MiPerfil />}>
									<Route index element={<PagePerfil />} />
									<Route path='personal' element={<PageInfoPersonal />} />
									<Route path='infocontrato' element={<PageInfoContrato />} />
								</Route>
								{/* Rutas para administrador */}
								<Route element={<RequireAdminPrivileges />}>
									<Route path='empleados' element={<EmpleadosPage />} />
									<Route path='empleados/:empleadoId/' element={<EmpleadoPerfil />}>
										<Route path='perfil' element={<PageEmpleadoPerfil />} />
										<Route path='personal' element={<PageEmpleadoPersonal />} />
										<Route path='infocontrato' element={<PageEmpleadoInfoContrato />} />
										<Route path='controlhorario' element={<PageControlHorario />} />
										<Route path='*' element={<NotFound />} />
									</Route>
									<Route path='empresa/' element={<EmpresaPage />}>
										<Route index element={<EmpresaDetalles />} />
										<Route path='archivados' element={<EmpresaArchivados />} />
										<Route path='archivados/:empleadoId/' element={<EmpleadoPerfil />}>
											<Route path='perfil' element={<PageEmpleadoPerfil />} />
											<Route path='personal' element={<PageEmpleadoPersonal />} />
											<Route path='infocontrato' element={<PageEmpleadoInfoContrato />} />
											<Route path='controlhorario' element={<PageControlHorario />} />
											<Route path='*' element={<NotFound />} />
										</Route>
									</Route>
								</Route>
								<Route path='/*' element={<NotFound />} />
							</Route>
						</Route>

						{/* Rutas públicas */}
						{/* Nueva Cuenta */}
						<Route
							path='/confirmacion/:tknconfirmacion'
							element={<ConfirmarContraseñaPage />}
						/>
						{/* Cambiar Password */}
						<Route
							path='/recuperacion/:tknconfirmacion'
							element={<RecuperacionContrasenaPage />}
						/>
						{/* Página para solicitar nuevo password */}
						<Route
							path='/recuperarcontrasena'
							element={<RecuperarContraseñaPage />}
						/>
						{/* Check */}
						<Route path='checador/' element={<Checador />}>
							<Route index element={<ChecadorPage />} />
							<Route path='entry' element={<ChecadorTeclado />} />
							<Route path='exit' element={<ChecadorTeclado />} />
							<Route element={<RequireCheckState />}>
								<Route path='confirm' element={<ChecadorConfirmacion />} />
							</Route>
							{/* <Route path='*' element={<NotFound />} /> */}
						</Route>

						{/* <Route path='output/' element={<h1>salida</h1>}> */}
						{/* <Route path='/checador' element={<ChecadorConfirmacion />} /> */}
					</Routes>
				</BrowserRouter>
			</Suspense>
		</>
	);
};

export default AppRouter;
