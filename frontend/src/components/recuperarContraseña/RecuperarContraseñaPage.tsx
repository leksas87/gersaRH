import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import validator from 'validator';
import { passwordRequestNew } from '../../actions/passwordsActions/passActions';
import { useForm } from '../../hooks/useForm';
import './RecuperarContraseñaPage.css';

const RecuperarContraseñaPage = () => {
	//dispatch para ejecutar las acciones del pass
	const dispatch = useDispatch();
	//navigate para redireccionar al usuario
	const navigate = useNavigate();
	//useState para mensaje de error
	const [error, setError] = useState<string>('');
	const [msn, setMsg] = useState<boolean>(false);

	interface iUsername {
		userName: string;
	}
	//objeto user para formulario Login
	const mailaddress: iUsername = {
		userName: '',
	};

	//Uso de hook useForm para manejo de campos en el formulario
	const [formValues, handleInputChange] = useForm(mailaddress);
	//Desestructuracion de propiedades
	const { userName } = formValues;

	const handleSolicitarRecuperacion = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(passwordRequestNew(userName));
		if (isFormValid()) {
			setMsg(true);
			Swal.fire({
				position: 'center',
				icon: 'info',
				title: `¡Si el correo existe en nuestro sistema, <br/> en unos minutos recibirás un
				email con las instrucciones para acceder!`,
				showConfirmButton: false,
				timer: 6000,
			});
			setTimeout(() => {
				navigate('/');
			}, 6000);
		}
	};

	//Validación de formulario
	const isFormValid = (): boolean => {
		// El campo usuario no deve estar vacío
		if (userName.trim().length === 0) {
			setError('Usuario es requerido');
			return false;
		} else if (!validator.isEmail(userName)) {
			setError('El campo debe ser un correo electrónico');
			return false;
		}
		//Resetea estado a un string vacío
		setError('');
		return true;
	};

	return (
		<div className='containerProject container d-flex justify-content-center align-items-center '>
			<div className='loginContainer shadow' style={{ position: 'relative' }}>
				<Link to='/' className='custm-arrowLeft'>
					<i className='bi bi-arrow-left' />
				</Link>
				<div className='d-flex mb-4'>
					<img width='200px' src='\assets\gersa-logo.png' alt='gersa-logo' />
				</div>
				<form className='formLogin' onSubmit={handleSolicitarRecuperacion}>
					<div className='d-flex flex-column mb-3'>
						<label className='fw-bold  textColorError'>RECUPERAR CONTRASEÑA.</label>
						<label className='fw-lighter textColorLight'>
							¿Ha olvidado su contraseña?
						</label>
					</div>

					<div className='mb-3'>
						<label htmlFor='inputUsuarioLogin' className='form-label fs-6'>
							Usuario*
						</label>
						<input
							type='text'
							className={error ? 'form-control is-invalid' : 'form-control'}
							id='inputUsuarioLogin'
							name='userName'
							value={userName}
							placeholder='Ingresa tu usuario'
							aria-describedby='usuarioHelpLogin'
							autoComplete='off'
							onChange={handleInputChange}
						/>
					</div>
					{error && (
						<div className='form-text textColorError'>
							<i className='bi bi-exclamation-circle'>{` `}</i>
							{error}.
						</div>
					)}
					{/* Mensaje condicional al enviar la petición 	 */}
					{msn && (
						<div className='custm-msngRecuperar'>
							¡Si el correo existe en nuestro sistema, en unos minutos recibirás un
							email con las instrucciones para acceder!
						</div>
					)}
					<button
						type='submit'
						className='btn btn-primary mt-4 shadow-sm inputSubmit p-3 custm-btnRecuperar'
						style={{ borderRadius: '70px' }}
					>
						Enviar instrucciones
					</button>
				</form>
			</div>
		</div>
	);
};

export default RecuperarContraseñaPage;
