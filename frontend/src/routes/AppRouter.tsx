import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { startChecking } from '../actions/loginActions/loginActions';
import DashboardPage from '../components/dashboardPage/DashboardPage';
import EmpleadoPerfil from '../components/empleados/EmpleadoPerfil';
import EmpleadosPage from '../components/empleados/EmpleadosPage';
import InicioPage from '../components/inicioPage/InicioPage';
import Loading from '../components/loading/Loading';
import LoginPage from '../components/loginPage/LoginPage';
import RecuperarContraseñaPage from '../components/recuperarContraseña/RecuperarContraseñaPage';
import { RootSote } from '../store/Store';
import NotFound from './NotFound';
import { RequireAdminPrivileges } from './RequireAdminPrivileges';
import { RequireAuth } from './RequireAuth';
import { RequireAuthToHidden } from './RequireAuthToHidden';

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
								{/* Rutas para administrador */}
								<Route element={<RequireAdminPrivileges />}>
									<Route path='empleados' element={<EmpleadosPage />} />
									<Route path='empleados/:empleadoId' element={<EmpleadoPerfil />} />
								</Route>
								<Route path='/*' element={<NotFound />} />
							</Route>
						</Route>

						{/* Rutas públicas */}
						<Route
							path='/confirmacion/:tknconfirmacion'
							element={<h1>Página de Confirmación</h1>}
						/>
						<Route
							path='/recuperacion'
							element={<h1>Página de Recuperación de Password</h1>}
						/>
						<Route
							path='/recuperarcontrasena'
							element={<RecuperarContraseñaPage />}
						/>
					</Routes>
				</BrowserRouter>
			</Suspense>
		</>
	);
};

export default AppRouter;
