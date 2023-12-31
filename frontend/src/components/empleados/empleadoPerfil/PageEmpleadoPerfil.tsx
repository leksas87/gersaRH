import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getEmployeeByRollType,
	getWorkPlaces,
	patchEmployeeavailableDays,
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
		diasDisponibles,
	} = useSelector((state: RootSote) => state.users);

	const jefes = administradores.concat(supervisores);

	//Tomar solo la fecha
	const indiceFechaIngreso = perfilEmpleado.fechaIngreso.indexOf('T');
	const miFechaIngreso = perfilEmpleado.fechaIngreso.substring(
		0,
		indiceFechaIngreso
	);

	//Dispatch para ejecutar las Actions
	const dispatch = useDispatch();

	const nombre = perfilUsuario.firstName;
	const correo = perfilUsuario.username;
	const isMailActive = perfilUsuario.active;

	//useToggle, se extrae el valor y toggleValue-> para cabiar el valor
	const [value, toggleValue] = useToggle(false); //Recibe el valor inicial
	const [valueForm2, toggleValueForm2] = useToggle(false); //Recibe el valor inicial

	//objeto para formulario formPuesto
	const formPuesto = {
		supervisor: '',
		username: '',
		lugarDeTrabajo: '',
	};
	interface iForm2 {
		numeroEmpleado: string;
		diasDisponiblesFaltas: number;
		fechaIngreso: string;
	}
	//objeto para formulario2
	const form2: iForm2 = {
		numeroEmpleado: '',
		diasDisponiblesFaltas: 0,
		fechaIngreso: '',
	};
	//state de formulario Puesto
	const [values, setValues] = useState(formPuesto);
	const [values2, setValues2] = useState(form2);
	const { supervisor, username, lugarDeTrabajo } = values;
	const { numeroEmpleado, diasDisponiblesFaltas, fechaIngreso } = values2;

	useEffect(() => {
		setValues({
			supervisor: perfilEmpleado.supervisor,
			username: perfilUsuario.username,
			lugarDeTrabajo: perfilEmpleado.lugarDeTrabajo,
		});
		if (diasDisponibles.avaibleDays) {
			setValues2({
				numeroEmpleado: perfilEmpleado.numeroEmpleado,
				diasDisponiblesFaltas: diasDisponibles.avaibleDays,
				fechaIngreso: miFechaIngreso,
			});
		} else {
			setValues2({
				numeroEmpleado: perfilEmpleado.numeroEmpleado,
				diasDisponiblesFaltas: 0,
				fechaIngreso: miFechaIngreso,
			});
		}
	}, [perfilUsuario, perfilEmpleado, miFechaIngreso, diasDisponibles]);

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
	const handleInputChange2 = (event: any) => {
		setValues2({
			...values2,
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
	const handlesubmitForm2 = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (diasDisponiblesFaltas !== diasDisponibles.avaibleDays) {
			if (diasDisponibles.id) {
				dispatch(
					patchEmployeeavailableDays(diasDisponibles.id, {
						avaibleDays: diasDisponiblesFaltas,
					})
				);
			}
		}
		if (perfilEmpleado.id) {
			dispatch(
				updateEmployeeById(perfilEmpleado.id, {
					numeroEmpleado: numeroEmpleado,
					fechaIngreso: fechaIngreso,
				})
			);
		}

		toggleValueForm2(false);
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
										placeholder='seleccione uno'
										list='datalistOptions'
										value={lugarDeTrabajo}
										name='lugarDeTrabajo'
										onChange={handleInputChange}
										disabled={!value}
									/>
									<datalist id='datalistOptions'>
										{/* <option value='2'>Adidas</option> */}
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
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer mt-5'>
							<div className='d-flex justify-content-end custm-Width100'>
								<button className='btn fs-3 custm-btnToggle' onClick={toggleValueForm2}>
									<i className='bi bi-pencil-square textColorSecondary' />
								</button>
							</div>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }} onSubmit={handlesubmitForm2}>
								<div className='mb-4'>
									<label className='custm-Width100'>Número empleado</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										name='numeroEmpleado'
										value={numeroEmpleado}
										onChange={handleInputChange2}
										disabled={!valueForm2}
										placeholder='Número de empleado'
									/>
								</div>

								<div className='mb-4'>
									<label className='custm-Width100'>Días disponibles (faltas)</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='number'
										name='diasDisponiblesFaltas'
										value={diasDisponiblesFaltas}
										onChange={handleInputChange2}
										disabled={!valueForm2}
										placeholder='días disponibles (faltas)'
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Fecha de Ingreso</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='date'
										name='fechaIngreso'
										value={fechaIngreso}
										onChange={handleInputChange2}
										disabled={!valueForm2}
									/>
								</div>
								<div
									className='d-flex justify-content-end custm-Width100'
									style={{ height: '3rem' }}
								>
									{valueForm2 && (
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
