import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
	sendPassword,
	validationToken,
} from '../../actions/passwordsActions/passActions';
import { useForm } from '../../hooks/useForm';
import { RootSote } from '../../store/Store';
import './ConfirmarContraseñaPage.css';
const ConfirmarContraseñaPage = () => {
	//Se necesita el state que indica el nombre del usuario
	const { id, username, passworUpdated } = useSelector(
		(state: RootSote | any) => state.pass
	);

	//useParams para obtener los parametros de la ruta
	const params = useParams();
	//Asignacion del parametro en una const
	const tkn = params.tknconfirmacion;

	//useDispatch para ejeturar las acciones del passActions
	const dispatch = useDispatch();

	//useNavigate para enviar a inicio
	const navigate = useNavigate();

	//useState para mensaje de error
	const [error, setError] = useState<string>('');

	interface iConfirmPassword {
		contraseña1: string;
		contraseña2: string;
	}

	//objeto user para formulario Login
	const confirmPassword: iConfirmPassword = {
		contraseña1: '',
		contraseña2: '',
	};

	//Uso de hook useForm para manejo de campos en el formulario
	const [formValues, handleInputChange] = useForm(confirmPassword);
	//Desestructuracion de propiedades
	const { contraseña1, contraseña2 } = formValues;

	//Submit para el Formulario.
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isFormValid()) {
			console.log('Enviando');
			if (tkn) dispatch(sendPassword(tkn, username, contraseña1));
		}
	};

	//Validación de formulario
	const isFormValid = (): boolean => {
		// El campo usuario no deve estar vacío
		if (contraseña1.trim().length < 6) {
			setError('Contraseña debe tener  al menos 6 caracteres');
			return false;
			// El campo contraseña debe tener al menos 6 caracteres
		} else if (contraseña1.trim() !== contraseña2.trim()) {
			setError('Las contraseñas no coinciden');
			return false;
		}
		//Resetea estado a un string vacío
		setError('');
		return true;
	};

	//Efecto que se ejecuta al cargar el componente
	useEffect(() => {
		dispatch(validationToken(tkn));
	}, [dispatch, tkn]);

	//useEffect para redireccionar al login una vez se actualizo el password
	useEffect(() => {
		if (passworUpdated) {
			navigate('/');
		}
	}, [passworUpdated, navigate]);

	return (
		<div className='custm-backgroundConfirm'>
			{!!id ? (
				<div className='custm-ConfirmContainer d-flex flex-column align-items-center'>
					<div
						className='d-flex'
						style={{
							position: 'relative',
							width: '100%',
							padding: '30px 30px 0px 30px',
							marginTop: '10px',
						}}
					>
						<img width='50px' src='\assets\gersaLogo-icon.svg' alt='logoGersa' />
						<div
							className='d-flex justify-content-center'
							style={{ width: '100%', textAlign: 'center' }}
						>
							<label className='custm-textTittleCC'>ESTABLECE TU CONTRASEÑA</label>
						</div>
					</div>
					<div className='fw-light fs-2 textColorError2 mb-4'>{username}</div>
					{/* Formulario */}
					<form className='custmFromCC' onSubmit={handleSubmit}>
						<div className='form-floating mb-4'>
							<input
								type='password'
								// className='form-control custm-inputFromControlCC'
								className={
									error === 'Contraseña debe tener  al menos 6 caracteres'
										? 'form-control custm-inputFromControlCC is-invalid'
										: 'form-control custm-inputFromControlCC'
								}
								id='floatingPassword1'
								placeholder='Password'
								name='contraseña1'
								value={contraseña1}
								onChange={handleInputChange}
							/>
							<label
								className='custm-labelinputFromControlCC textColorSecondary'
								htmlFor='floatingPassword'
							>
								Contraseña
							</label>
						</div>
						<div className='form-floating mb-3'>
							<input
								type='password'
								className={
									error === 'Las contraseñas no coinciden'
										? 'form-control custm-inputFromControlCC is-invalid'
										: 'form-control custm-inputFromControlCC'
								}
								id='floatingPassword2'
								placeholder='Password'
								name='contraseña2'
								value={contraseña2}
								onChange={handleInputChange}
							/>
							<label
								className='custm-labelinputFromControlCC textColorSecondary'
								htmlFor='floatingPassword'
							>
								Confirma tu Contraseña
							</label>
						</div>
						{error && (
							<div className='form-text textColorError'>
								<i className='bi bi-exclamation-circle'>{` `}</i>
								{error}.
							</div>
						)}
						<div>
							<button
								type='submit'
								className='btn btn-primary mt-4 shadow-sm inputSubmit custm-btnSubmitCC'
							>
								Continuar.
							</button>
						</div>
					</form>
				</div>
			) : (
				<div className='d-flex flex-column align-items-center textColorSecondary'>
					<div className='mb-5'>
						<img
							className='custm-CoverImgLogo'
							width='300px'
							src='\assets\gersaLogo.svg'
							alt='Logo Gersa'
						/>
					</div>
					<h1>Pagina no encontrada</h1>
					<Link
						to='/'
						className='btn fs-1 textColorPrimary'
						style={{ textDecoration: 'none', color: '#ffffff' }}
					>
						ir a inicio...
					</Link>
				</div>
			)}
		</div>
	);
};

export default ConfirmarContraseñaPage;
