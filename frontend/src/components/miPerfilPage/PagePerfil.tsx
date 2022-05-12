import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootSote } from '../../store/Store';

const PagePerfil = () => {
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilUsuario, administradores, supervisores } = useSelector(
		(state: RootSote) => state.users
	);
	const { perfilEmpleado } = useSelector((state: RootSote) => state.users);

	const jefes = administradores.concat(supervisores);
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
	const { supervisor } = values;
	const { numeroEmpleado, diasDisponiblesFaltas, fechaIngreso } = values2;

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

	useEffect(() => {
		setValues({
			supervisor: perfilEmpleado.supervisor,
			username: perfilUsuario.username,
			lugarDeTrabajo: perfilEmpleado.lugarDeTrabajo,
		});
		if (perfilEmpleado.diasDisponiblesFaltas) {
			setValues2({
				numeroEmpleado: perfilEmpleado.numeroEmpleado,
				diasDisponiblesFaltas: perfilEmpleado.diasDisponiblesFaltas,
				fechaIngreso: moment(perfilEmpleado.fechaIngreso).format('YYYY-MM-DD'),
			});
		}
	}, [perfilUsuario, perfilEmpleado]);
	// const nombre = firstName;
	// const correo = perfilEmpleado.username;
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
							<form style={{ width: '90%' }} className='pt-5'>
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
										value={supervisor}
										onChange={handleInputChange}
										disabled
									>
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
							</form>
						</div>
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer mt-5'>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }} className='pt-5'>
								<div className='mb-4'>
									<label className='custm-Width100'>Número empleado</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										name='numeroEmpleado'
										value={numeroEmpleado}
										onChange={handleInputChange2}
										disabled
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
										disabled
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
										disabled
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PagePerfil;
