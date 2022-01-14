import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { startChecking } from '../actions/loginActions';
import DashboardPage from '../components/dashboardPage/DashboardPage';
import Loading from '../components/loading/Loading';
import LoginPage from '../components/loginPage/LoginPage';
import { RootSote } from '../store/Store';
import NotFound from './NotFound';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

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
						<Route
							path='/login'
							element={
								<PublicRoute>
									<LoginPage />
								</PublicRoute>
							}
						/>
						<Route
							path='/dashboard'
							element={
								<PrivateRoute>
									<DashboardPage />
								</PrivateRoute>
							}
						/>
						<Route path='/*' element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</Suspense>
		</>
	);
};

export default AppRouter;
