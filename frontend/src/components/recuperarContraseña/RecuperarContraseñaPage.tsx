import React from 'react';
import { Link } from 'react-router-dom';
import './RecuperarContraseñaPage.css';

const RecuperarContraseñaPage = () => {
	const handleSolicitarRecuperacion = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('recuperar');
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
							className='form-control'
							id='inputUsuarioLogin'
							name='usuario'
							// value={usuario}
							placeholder='Ingresa tu usuario'
							aria-describedby='usuarioHelpLogin'
							autoComplete='off'
							// onChange={handleInputChange}
						/>
					</div>
					{/* Mensaje condicional al enviar la petición 	 */}
					<div className='custm-msngRecuperar'>
						Si el correo existe en nuestro sistema, en unos minutos recibirás un email
						con las instrucciones para acceder.
					</div>
					<button
						type='submit'
						className='btn btn-primary mt-4 shadow-sm inputSubmit p-3 custm-btnRecuperar'
						style={{ borderRadius: '70px' }}
					>
						Enviar instrucciones para restablecer contraseña
					</button>
				</form>
			</div>
		</div>
	);
};

export default RecuperarContraseñaPage;
