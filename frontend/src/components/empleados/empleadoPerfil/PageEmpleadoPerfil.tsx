import React from 'react';
import { useSelector } from 'react-redux';
import { useToggle } from '../../../hooks/useToggle';
import { RootSote } from '../../../store/Store';

const PageEmpleadoPerfil = () => {
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilEmpleado } = useSelector((state: RootSote) => state.users);

	const nombre = perfilEmpleado.firstName;
	const correo = perfilEmpleado.username;
	const isMailActive = perfilEmpleado.active;

	//useToggle, se extrae el valor y toggleValue-> para cabiar el valor
	const [value, toggleValue] = useToggle(false); //Recibe el valor inicial

	//Submit del formulario
	const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('submit');
		toggleValue(false);
	};
	return (
		<>
			<div className='d-flex flex-column align-items-center'>
				<div className='d-flex flex-wrap custm-Width100'>
					{/* Izquierda */}
					<div className='custm-empleadoContainerContent'>
						{!isMailActive && (
							<div className='d-flex flex-column align-items-center custm-empleadoFormContainer'>
								<div className='p-3 text-center textColorLight custm-textSendInvitation'>
									<span className='text-capitalize'>{nombre}</span> no ha aceptado
									todavía la invitacion
								</div>
								<div className='p-3'>
									<button
										type='submit'
										className='btn btn-primary inputSubmit custm-btnSendInvitation'
									>
										Reenviar invitacion
									</button>
								</div>
							</div>
						)}

						<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
							<div className='custm-Width100'>
								<i
									style={{ fontSize: '3rem', color: 'var(--textColorLink)' }}
									className='bi bi-building'
								/>
							</div>
							<div className='fs-4'>Información sobre el puesto</div>
							<div className='fs-5 textColorLight'>
								Información básica sobre la posición
							</div>
						</div>
					</div>
					{/* Derecha */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer'>
							<div className='d-flex justify-content-end custm-Width100'>
								<button className='btn fs-3 custm-btnToggle' onClick={toggleValue}>
									<i className='bi bi-pencil-square textColorSecondary' />
								</button>
							</div>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }} onSubmit={handlesubmit}>
								<div className='mb-4'>
									<label className='custm-Width100'>Reporta a</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Nombre supervisor'
										disabled={!value}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>
										Correo electrónico{' '}
										{isMailActive ? (
											<span style={{ color: '#73EE5F' }}>
												<i className='bi bi-check-circle-fill' />
											</span>
										) : (
											<span style={{ color: '#EE3074' }}>
												<i className='bi bi-exclamation-diamond-fill' />
											</span>
										)}
									</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder='Correo electrónico'
										placeholder={correo}
										disabled={!value}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Lugar de trabajo</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Lugar de trabajo'
										disabled={!value}
									/>
								</div>
								<div
									className='d-flex justify-content-end custm-Width100'
									style={{ height: '3rem' }}
								>
									{value && (
										<button type='submit' className='btn  custm-empleadoFormSubmit'>
											Guardar
										</button>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageEmpleadoPerfil;