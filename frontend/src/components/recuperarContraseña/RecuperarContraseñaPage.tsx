import React from 'react';

const RecuperarContraseñaPage = () => {
	const handleSolicitarRecuperacion = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('recuperar');
	};
	return (
		<div className='containerProject container d-flex justify-content-center align-items-center '>
			<div className='loginContainer shadow'>
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

					<div></div>
					<button
						type='submit'
						className='btn btn-primary mt-4 shadow-sm inputSubmit p-3'
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
