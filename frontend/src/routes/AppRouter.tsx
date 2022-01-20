import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { startChecking } from '../actions/loginActions/loginActions';
import DashboardPage from '../components/dashboardPage/DashboardPage';
import EmpleadosPage from '../components/empleados/EmpleadosPage';
import InicioPage from '../components/inicioPage/InicioPage';
import Loading from '../components/loading/Loading';
import LoginPage from '../components/loginPage/LoginPage';
import { RootSote } from '../store/Store';
import NotFound from './NotFound';
import { RequireAuth } from './RequireAuth';
import { RequireAuthToHidden } from './RequireAuthToHidden';

const AppRouter = () => {
	const dispatch = useDispatch();
	//Senecesita el state que indica el roll, nombre y apellido del usuario
	const { authState } = useSelector((state: RootSote) => state.auth);

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
						<Route element={<RequireAuthToHidden />}>
							<Route path='/login' element={<LoginPage />} />
						</Route>

						<Route element={<RequireAuth />}>
							<Route path='/' element={<DashboardPage />}>
								<Route index element={<InicioPage />} />
								<Route path='empleados' element={<EmpleadosPage />} />
								<Route path='/*' element={<NotFound />} />
							</Route>
						</Route>
					</Routes>
				</BrowserRouter>
			</Suspense>
		</>
	);
};

export default AppRouter;
