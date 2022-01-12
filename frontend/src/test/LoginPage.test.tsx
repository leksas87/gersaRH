import { render, screen } from '@testing-library/react';
import LoginPage from '../components/loginPage/LoginPage';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('LOGIN', () => {
	const initialState = { output: 10 };
	const mockStore = configureStore();
	let store;

	it('LoginPage', () => {
		store = mockStore(initialState);
		render(
			<Provider store={store}>
				<LoginPage />
			</Provider>
		);

		expect(screen.getByText('Bienvenido de Vuelta.')).toBeInTheDocument();
		expect(screen.getByText('Ingresa tus credenciales')).toBeInTheDocument();
		expect(screen.getByText('Usuario*')).toBeInTheDocument();
		expect(screen.getByText('Contraseña*')).toBeInTheDocument();
		expect(screen.getByText('ENTRAR')).toBeInTheDocument();
		//Para mostrar el código
		// screen.debug();
	});
});
