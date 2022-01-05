import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardPage from '../components/dashboardPage/DashboardPage';
import Loading from '../components/loading/Loading';
import LoginPage from '../components/loginPage/LoginPage';
import NotFound from './NotFound';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

const AppRouter = () => {
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
