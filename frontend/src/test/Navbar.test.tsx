import { render, screen } from '@testing-library/react';
import Navbar from '../components/navbar/Navbar';

describe('Navbar', () => {
	test('renders App component', () => {
		render(<Navbar />);
		//Para mostrar el código
		screen.debug();
	});
});
