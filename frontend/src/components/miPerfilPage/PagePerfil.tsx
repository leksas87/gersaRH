import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getEmployeeByRollType,
	getWorkPlaces,
} from '../../actions/usersActions/usersActions';

import { RootSote } from '../../store/Store';

const PagePerfil = () => {
	const dispatch = useDispatch();
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilUsuario, administradores, supervisores, perfilEmpleado } =
		useSelector((state: RootSote) => state.users);
	const { availableDays } = useSelector((state: RootSote) => state.auth);

	const jefes = administradores.concat(supervisores);

	useEffect(() => {
		dispatch(getEmployeeByRollType(3));
		dispatch(getEmployeeByRollType(1));
		dispatch(getWorkPlaces());
	}, [dispatch]);

	const isMailActive = perfilUsuario.active;

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
							<div className='mb-4'>
								<label className='custm-Width100'>Reporta a</label>
								{/* <input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.supervisor}
										disabled
									/> */}
								<select
									className='form-control  custm-Width100 custm-empleadoFormIntput'
									name='supervisor'
									value={perfilEmpleado.supervisor}
									// onChange={handleInputChange}
									disabled
								>
									<option value=''>Selecciona una opcion</option>
									{jefes.map((jefe) => (
										<option key={jefe.id} value={jefe.id}>
											{jefe.User.firstName} {jefe.User.lastName}
										</option>
									))}
								</select>
							</div>
							<div className='mb-4'>
								<label className='custm-Width100'>
									Correo electrónico {/* {isMailActive ? ( */}
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
						</div>
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer mt-5'>
							{/* Inicia formulario */}

							<div className='mb-4'>
								<label className='custm-Width100'>Número empleado</label>
								<input
									className='form-control custm-Width100 custm-empleadoFormIntput'
									type='text'
									placeholder={perfilEmpleado.numeroEmpleado}
									// onChange={handleInputChange2}
									disabled
								/>
							</div>

							<div className='mb-4'>
								<label className='custm-Width100'>Días disponibles (faltas)</label>
								<input
									className='form-control custm-Width100 custm-empleadoFormIntput'
									type='number'
									placeholder={availableDays.avaibleDays.toString()}
									disabled
								/>
							</div>
							<div className='mb-4'>
								<label className='custm-Width100'>Fecha de Ingreso</label>
								<input
									className='form-control custm-Width100 custm-empleadoFormIntput'
									type='text'
									placeholder={perfilEmpleado.fechaIngreso}
									disabled
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PagePerfil;
