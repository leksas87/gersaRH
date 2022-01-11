import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/loginActions';
import { useForm } from '../../hooks/useForm';
import { iUser } from '../../interfaces/interfaces';
import './LoginPage.css';

const LoginPage = () => {
	const dispatch = useDispatch();
	//useState para mensaje de error
	const [error, setError] = useState<string>('');

	//objeto user para formulario Login
	const user: iUser = {
		usuario: '',
		contraseña: '',
	};

	//Uso de hook useForm para manejo de campos en el formulario
	const [formValues, handleInputChange] = useForm(user);
	//Desestructuracion de propiedades
	const { usuario, contraseña } = formValues;

	//handleLogin para submit del formulario
	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		//Si el formulario es valido entonces dispatch startLogin...
		if (isFormValid()) {
			dispatch(startLogin(usuario, contraseña));
		}
	};

	//Validación de formulario
	const isFormValid = (): boolean => {
		// El campo usuario no deve estar vacío
		if (usuario.trim().length === 0) {
			setError('Usuario es requerido');
			return false;
			// El campo contraseña debe tener al menos 6 caracteres
		} else if (contraseña.length < 6) {
			setError('Contraseña debe tener  al menos 6 caracteres');
			return false;
		}
		//Resetea estado a un string vacío
		setError('');
		return true;
	};

	return (
		<div className='containerProject container d-flex justify-content-center align-items-center '>
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
							className={
								error === 'Usuario es requerido'
									? 'form-control inputForm is-invalid'
									: 'form-control inputForm'
							}
							id='inputUsuarioLogin'
							name='usuario'
							value={usuario}
							placeholder='Ingresa tu usuario'
							aria-describedby='usuarioHelpLogin'
							autoComplete='off'
							onChange={handleInputChange}
						/>
					</div>
					<div className='mb-3'>
						<label htmlFor='exampleInputPassword1' className='form-label'>
							Contraseña*
						</label>
						<input
							type='password'
							className={
								error === 'Contraseña debe tener  al menos 6 caracteres'
									? 'form-control inputForm is-invalid'
									: 'form-control inputForm'
							}
							name='contraseña'
							value={contraseña}
							placeholder='Ingresa tu contraseña'
							onChange={handleInputChange}
						/>
					</div>
					{error && (
						<div className='form-text textColorError'>
							<i className='bi bi-exclamation-circle'>{` `}</i>
							{error}.
						</div>
					)}
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
