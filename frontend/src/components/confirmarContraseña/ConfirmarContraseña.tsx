import { useState } from 'react';

import { useForm } from '../../hooks/useForm';
import { iConfirmarContraseña } from '../../interfaces/interfaces';
import './ConfirmarContraseña.css';

export const ConfirmarContraseña = () => {
	//useState para mensaje de error
	const [error, setError] = useState<string>('');

	//objeto user para formulario
	const contraseñas: iConfirmarContraseña = {
		contraseña1: '',
		contraseña2: '',
	};

	//Uso de hook useForm para manejo de campos en el formulario
	const [formValues, handleInputChange] = useForm(contraseñas);

	//Desestructuracion de propiedades
	const { contraseña1, contraseña2 } = formValues;

	const isFormValid = (): boolean => {
		// El campo usuario no deve estar vacío
		if (contraseña1.trim().length === 0 || contraseña2.trim().length === 0) {
			setError('Contraseña requerida');
			return false;
		} else if (contraseña1.trim().length < 6 || contraseña2.trim().length < 6) {
			setError('6 caracteres como minimo');
			return false;
		} else if (contraseña1 !== contraseña2) {
			setError('Las contraseñas no son las mismas');
			return false;
		}
		//Resetea estado a un string vacío
		setError('');
		return true;
	};

	return (
		<div className='containerProject custm-body-cc d-flex justify-content-center align-items-center'>
			<div className='custm-shadow-cc'>
				<div style={{ width: '100%', height: '17vh' }} className='d-flex'>
					<img
						style={{
							margin: '3vh 0 0 4vw',
							padding: '0',
							width: '5vw',
							height: '8vh',
						}}
						src='assets\gersaLogo-icon.svg'
						alt='gersaLogo'
					/>
					<div
						style={{ margin: '22vh 8vw 0 0', height: '30vh' }}
						className='d-flex justify-content-center flex-column align-items-center'
					>
						<h1 className='textColorSecondary fs-3 custm-title-cc  '>
							ESTABLECE TU CONTRASEÑA
						</h1>
						<h3 className='textColorError fs-2' style={{ margin: '1vh 0 3vh 0' }}>
							tu@correo.com
						</h3>
						<form className='form-floating ' style={{ width: '100%' }}>
							<input
								type='password'
								className={
									error === 'Contraseña requerida' ||
									error === 'Las contraseñas no son las mismas' ||
									error === '6 caracteres como minimo'
										? 'form-control custm-input-cc is-invalid '
										: 'form-control custm-input-cc'
								}
								id='inputValuePassword1'
								name='contraseña1'
								value={contraseña1}
								placeholder='6 caracteres como minimo'
								autoComplete='off'
								onChange={handleInputChange}
							/>
							<label
								className={
									error === 'Contraseña requerida' ||
									error === 'Las contraseñas no son las mismas' ||
									error === '6 caracteres como minimo'
										? 'custm-label-cci is-invalid '
										: 'custm-label-cc'
								}
							>
								Contraseña
							</label>
						</form>
						<form
							className='form-floating '
							style={{ width: '100%', margin: '3vh 0 0 0' }}
						>
							<input
								type='password'
								className={
									error === 'Contraseña requerida' ||
									error === 'Las contraseñas no son las mismas' ||
									error === '6 caracteres como minimo'
										? 'form-control custm-input-cc is-invalid'
										: 'form-control custm-input-cc'
								}
								id='inputValuePassword2'
								name='contraseña2'
								value={contraseña2}
								placeholder='Las contraseñas deben coincidir'
								autoComplete='off'
								onChange={handleInputChange}
							/>
							<label
								className={
									error === 'Contraseña requerida' ||
									error === 'Las contraseñas no son las mismas' ||
									error === '6 caracteres como minimo'
										? 'custm-label-cci is-invalid '
										: 'custm-label-cc'
								}
							>
								Confirma tu contraseña
							</label>
						</form>
						{error && (
							<div
								className='form-text textColorError'
								style={{ width: '20vw', margin: '0 23vw 0 0' }}
							>
								<i className='bi bi-exclamation-circle'>{` `}</i>
								{error}.
							</div>
						)}
						<button
							className='custm-btnFormSubmit inputSubmit'
							onClick={() => {
								isFormValid()
									? console.log(contraseña1, contraseña2)
									: console.log('Aun no');
							}}
						>
							Continuar.
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
