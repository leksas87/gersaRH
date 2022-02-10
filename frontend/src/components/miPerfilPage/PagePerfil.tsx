import React from 'react';
import { useSelector } from 'react-redux';
// import { resendInvitationByuserName } from '../../../actions/usersActions/usersActions';
import { useToggle } from '../../hooks/useToggle';
import { RootSote } from '../../store/Store';

const PagePerfil = () => {
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilUsuario } = useSelector((state: RootSote) => state.users);
	const { perfilEmpleado } = useSelector((state: RootSote) => state.users);

	// const nombre = firstName;
	// const correo = perfilEmpleado.username;
	// const isMailActive = perfilEmpleado.active;

	return (
		<>
			<div className='d-flex flex-column align-items-center'>
				<div className='d-flex flex-wrap custm-Width100'>
					{/* Izquierda */}
					<div className='custm-empleadoContainerContent'>
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
							{/* Inicia formulario */}
							<form style={{ width: '90%' }} className='pt-5'>
								<div className='mb-4'>
									<label className='custm-Width100'>Reporta a</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.supervisor}
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>
										Correo electrónico {/* {isMailActive ? ( */}
										{false ? (
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
										placeholder={perfilUsuario.username}
										// placeholder={correo}
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Lugar de trabajo</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.lugarDeTrabajo}
										disabled
									/>
								</div>
								<div
									className='d-flex justify-content-end custm-Width100'
									style={{ height: '3rem' }}
								></div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PagePerfil;
