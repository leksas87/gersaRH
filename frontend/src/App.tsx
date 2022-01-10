import { Provider } from 'react-redux';
import AppRouter from './routes/AppRouter';
import { store } from './store/Store';

function App() {
	return (
		<div className='containerProject'>
			<Provider store={store}>
				<AppRouter />
			</Provider>
		</div>
	);
}

export default App;
