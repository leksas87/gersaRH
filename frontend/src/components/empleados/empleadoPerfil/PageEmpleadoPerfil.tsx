import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getEmployeeByRollType,
	getWorkPlaces,
	resendInvitationByuserName,
	updateEmployeeById,
	updateUserById,
} from '../../../actions/usersActions/usersActions';
import { useToggle } from '../../../hooks/useToggle';
import { RootSote } from '../../../store/Store';

const PageEmpleadoPerfil = () => {
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const {
		perfilUsuario,
		perfilEmpleado,
		administradores,
		supervisores,
		workPlaces,
	} = useSelector((state: RootSote) => state.users);

	const jefes = administradores.concat(supervisores);

	//Dispatch para ejecutar las Actions
	const dispatch = useDispatch();

	const nombre = perfilUsuario.firstName;
	const correo = perfilUsuario.username;
	const isMailActive = perfilUsuario.active;

	//useToggle, se extrae el valor y toggleValue-> para cabiar el valor
	const [value, toggleValue] = useToggle(false); //Recibe el valor inicial

	//objeto para formulario formPuesto
	const formPuesto = {
		supervisor: '',
		username: '',
		lugarDeTrabajo: '',
	};
	//state de formulario Puesto
	const [values, setValues] = useState(formPuesto);
	const { supervisor, username, lugarDeTrabajo } = values;

	useEffect(() => {
		setValues({
			supervisor: perfilEmpleado.supervisor,
			username: perfilUsuario.username,
			lugarDeTrabajo: perfilEmpleado.lugarDeTrabajo,
		});
	}, [perfilUsuario, perfilEmpleado]);

	useEffect(() => {
		dispatch(getEmployeeByRollType(3));
		dispatch(getEmployeeByRollType(1));
		dispatch(getWorkPlaces());
	}, [dispatch]);

	const handleInputChange = (event: any) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};
	//Submit del formulario Puesto

	const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (username !== perfilUsuario.username) {
			dispatch(
				updateUserById(perfilUsuario.id, {
					username: username,
					active: false,
				})
			);
		}
		dispatch(
			updateEmployeeById(perfilUsuario.id, {
				supervisor: supervisor,
				lugarDeTrabajo: lugarDeTrabajo,
			})
		);

		toggleValue(false);
	};

	const resendInvitation = () => {
		dispatch(resendInvitationByuserName(correo));
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
										onClick={resendInvitation}
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
									{/* <input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilEmpleado.supervisor}
										name='supervisor'
										value={supervisor}
										onChange={handleInputChange}
										disabled={!value}
									/> */}
									<select
										className='form-select  custm-Width100 custm-empleadoFormIntput'
										name='supervisor'
										value={supervisor}
										onChange={handleInputChange}
										disabled={!value}
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
										// placeholder={perfilUsuario.username}
										// placeholder={correo}
										value={username}
										name='username'
										onChange={handleInputChange}
										disabled={!value}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Lugar de trabajo</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilEmpleado.lugarDeTrabajo}
										list='datalistOptions'
										value={lugarDeTrabajo}
										name='lugarDeTrabajo'
										onChange={handleInputChange}
										disabled={!value}
									/>
									<datalist id='datalistOptions'>
										<option value='2'>Adidas</option>
										{workPlaces.map((workPlace) => (
											<option key={workPlace.id} value={workPlace.nameWorkPlace} />
										))}
										{/* <option value='3'>Adidas</option>
										<option value='4'>Adidas</option>
										<option value='5'>Adidas</option> */}
									</datalist>
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
