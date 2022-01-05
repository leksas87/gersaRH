import { useForm } from '../../hooks/useForm';
import { iUser } from '../../interfaces/interfaces';
import './LoginPage.css';

const LoginPage = () => {
	//objeto user para formulario Login
	const user: iUser = {
		usuario: '',
		contraseña: '',
	};

	//Uso de hook useForm para manejo de campos en el formulario
	const [formValues, handleInputChange] = useForm(user);
	//Desestructuracion de propiedades
	const { usuario, contraseña } = formValues;

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(usuario, contraseña);
	};

	return (
		<div
			style={{ height: 'auto', minHeight: '100vh' }}
			className='d-flex justify-content-center align-items-center'
		>
			<div className='loginContainer shadow'>
				<div className='d-flex mb-4'>
					<img width='200px' src='\assets\gersa-logo.png' alt='gersa-logo' />
				</div>
				<form className='formLogin' onSubmit={handleLogin}>
					<div className='d-flex flex-column mb-3'>
						<label className='fw-bold textColorSecondary'>
							Bienvenido de Vuelta.
						</label>
						<label className='fw-lighter textColorLight'>
							Ingresa tus credenciales
						</label>
					</div>

					<div className='mb-3'>
						<label htmlFor='inputUsuarioLogin' className='form-label fs-6'>
							Usuario*
						</label>
						<input
							type='text'
							className='form-control inputForm'
							id='inputUsuarioLogin'
							name='usuario'
							value={usuario}
							placeholder='Ingresa tu usuario'
							aria-describedby='usuarioHelpLogin'
							autoComplete='off'
							onChange={handleInputChange}
						/>
						{/* <div id='usuarioHelpLogin' className='form-text textColorError'>
							Usuario incorrecto.
						</div> */}
					</div>
					<div className='mb-3'>
						<label htmlFor='exampleInputPassword1' className='form-label'>
							Contraseña*
						</label>
						<input
							type='password'
							className='form-control inputForm'
							id='exampleInputPassword1'
							name='contraseña'
							value={contraseña}
							placeholder='Ingresa tu contraseña'
							onChange={handleInputChange}
						/>
						{/* <div id='usuarioHelpLogin' className='form-text textColorError'>
							Contraseña incorrecta.
						</div> */}
					</div>
					<button
						type='submit'
						className='btn btn-primary mt-4 shadow-sm inputSubmit'
					>
						ENTRAR
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
