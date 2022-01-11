import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
	test('renders App component', () => {
		render(<App />);

		//Para mostrar el código
		// screen.debug();
	});
});
