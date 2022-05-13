import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateEmployeeById,
	updateUserById,
} from '../../../actions/usersActions/usersActions';
import { useToggle } from '../../../hooks/useToggle';
import { RootSote } from '../../../store/Store';

const PageEmpleadoPersonal = () => {
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilUsuario } = useSelector((state: RootSote) => state.users);
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilEmpleado } = useSelector((state: RootSote) => state.users);

	//Tomar solo la fecha
	const indiceFechaNacimiento = perfilEmpleado.fechaNacimiento.indexOf('T');
	const fechaNac = perfilEmpleado.fechaNacimiento.substring(
		0,
		indiceFechaNacimiento
	);
	//Tomar solo la fecha
	const indiceFechaImss = perfilEmpleado.fechaAltaImss.indexOf('T');
	const fechaAltImss = perfilEmpleado.fechaAltaImss.substring(
		0,
		indiceFechaImss
	);

	let direction2 = '';
	if (perfilEmpleado.direccion2) direction2 = perfilEmpleado.direccion2;
	else direction2 = '';

	//dispatch para ejecutar las Actions
	const dispatch = useDispatch();

	//useToggle, se extrae el valor y toggleValue-> para cabiar el valor
	const [value, toggleValue] = useToggle(false); //Recibe el valor inicial
	const [ddiValue, toggleDdiValue] = useToggle(false); //Recibe el valor inicial
	const [direccionValue, toggleDireccion] = useToggle(false); //Recibe el valor inicial
	const [contactoEValue, toggleContactoE] = useToggle(false); //Recibe el valor inicial
	const [infoBankEValue, toggleInfoBank] = useToggle(false); //Recibe el valor inicial
	const [numSafeEValue, toggleNumSafe] = useToggle(false); //Recibe el valor inicial

	//objeto para formulario InfoGral
	const formInfoGral = {
		firstName: '',
		lastName: '',
		fechaNacimiento: '',
		genero: '',
		nacionalidad: '',
		phone: '',
		frecuenciaPago: '',
	};
	//objeto para formulario DocIdentidad
	const formDocIdentidad = {
		tipoIdentificacion: '',
		documentoIdentidad: '',
	};
	//objeto para formulario Direccion
	const formDireccion = {
		direccion1: '',
		direccion2: '',
		ciudad: '',
		codigoPostal: '',
		estadoProvincia: '',
		pais: '',
	};
	//objeto para formulario ContEmergencia
	const formContEmergencia = {
		emergenciaNombre: '',
		empergenciaTelefono: '',
	};
	//objeto para formulario InfBancaria
	const formInfBancaria = {
		numeroCuentaBancaria: '',
		swiftBic: '',
	};
	//objeto para formulario numSeguridadSocial
	const formNumSeguridadSocial = {
		rfc: '',
		numeroImms: '',
		curp: '',
		fechaAltaImss: '',
	};

	//state de formulario Puesto
	const [infoGralValues, setInfoGralValues] = useState(formInfoGral);
	const [docIdentidadValues, setDocIdentidadValues] = useState(formDocIdentidad);
	const [direccionValues, setDireccionValues] = useState(formDireccion);
	const [contEmergenciaValues, setContEergenciaValues] =
		useState(formContEmergencia);
	const [infBancariaValues, setInfBancariaValues] = useState(formInfBancaria);
	const [numSeguridadSocialValues, setNumSeguridadSocialValues] = useState(
		formNumSeguridadSocial
	);

	//Desestructuracion de elemntos del useState
	const {
		firstName,
		lastName,
		fechaNacimiento,
		genero,
		nacionalidad,
		phone,
		frecuenciaPago,
	} = infoGralValues;
	//Desestructuracion de elemntos del useState
	const { documentoIdentidad, tipoIdentificacion } = docIdentidadValues;
	//Desestructuracion de elemntos del useState
	const { direccion1, direccion2, ciudad, codigoPostal, estadoProvincia, pais } =
		direccionValues;
	//Desestructuracion de elemntos del useState
	const { emergenciaNombre, empergenciaTelefono } = contEmergenciaValues;
	//Desestructuracion de elemntos del useState
	const { numeroCuentaBancaria, swiftBic } = infBancariaValues;
	//Desestructuracion de elemntos del useState
	const { rfc, numeroImms, fechaAltaImss, curp } = numSeguridadSocialValues;

	useEffect(() => {
		setInfoGralValues({
			firstName: perfilUsuario.firstName,
			lastName: perfilUsuario.lastName,
			fechaNacimiento: fechaNac,
			genero: perfilEmpleado.genero,
			nacionalidad: perfilEmpleado.nacionalidad,
			phone: perfilUsuario.phone,
			frecuenciaPago: perfilEmpleado.frecuenciaPago,
		});
		setDocIdentidadValues({
			tipoIdentificacion: perfilEmpleado.tipoIdentificacion,
			documentoIdentidad: perfilEmpleado.documentoIdentidad,
		});
		setDireccionValues({
			direccion1: perfilEmpleado.direccion1,
			direccion2: direction2,
			ciudad: perfilEmpleado.ciudad,
			codigoPostal: perfilEmpleado.codigoPostal,
			estadoProvincia: perfilEmpleado.estadoProvincia,
			pais: perfilEmpleado.pais,
		});
		setContEergenciaValues({
			emergenciaNombre: perfilEmpleado.emergenciaNombre,
			empergenciaTelefono: perfilEmpleado.empergenciaTelefono,
		});
		setInfBancariaValues({
			numeroCuentaBancaria: perfilEmpleado.numeroCuentaBancaria,
			swiftBic: perfilEmpleado.swiftBic,
		});
		setNumSeguridadSocialValues({
			rfc: perfilEmpleado.rfc,
			numeroImms: perfilEmpleado.numeroImms,
			curp: perfilEmpleado.curp,
			fechaAltaImss: fechaAltImss,
		});
	}, [perfilUsuario, perfilEmpleado, direction2, fechaAltImss, fechaNac]);

	//handleInputChange
	const handleInputChangeInfoGral = (event: any) => {
		setInfoGralValues({
			...infoGralValues,
			[event.target.name]: event.target.value,
		});
	};
	const handleInputChangeDocIdentidad = (event: any) => {
		setDocIdentidadValues({
			...docIdentidadValues,
			[event.target.name]: event.target.value,
		});
	};
	const handleInputChangeDireccion = (event: any) => {
		setDireccionValues({
			...direccionValues,
			[event.target.name]: event.target.value,
		});
	};
	const handleInputChangeContEmergencia = (event: any) => {
		setContEergenciaValues({
			...contEmergenciaValues,
			[event.target.name]: event.target.value,
		});
	};
	const handleInputChangeInfBancaria = (event: any) => {
		setInfBancariaValues({
			...infBancariaValues,
			[event.target.name]: event.target.value,
		});
	};
	const handleInputChangeNumSegSocial = (event: any) => {
		setNumSeguridadSocialValues({
			...numSeguridadSocialValues,
			[event.target.name]: event.target.value,
		});
	};

	//Submit del formulario InfoGral
	const handlesubmitInfoGral = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			updateUserById(perfilUsuario.id, {
				firstName: firstName,
				lastName: lastName,
				phone: phone,
			})
		);
		if (perfilEmpleado.id) {
			dispatch(
				updateEmployeeById(perfilEmpleado.id, {
					fechaNacimiento: fechaNacimiento,
					genero: genero,
					nacionalidad: nacionalidad,
					frecuenciaPago: frecuenciaPago,
				})
			);
		}
		toggleValue(false);
	};
	//Submit del formulario DocIdentidad
	const handlesubmitDocIdentidad = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (perfilEmpleado.id) {
			dispatch(
				updateEmployeeById(perfilEmpleado.id, {
					tipoIdentificacion: tipoIdentificacion,
					documentoIdentidad: documentoIdentidad,
				})
			);
		}
		toggleDdiValue(false);
	};
	//Submit del formulario Direccion
	const handlesubmitDireccion = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (perfilEmpleado.id) {
			dispatch(
				updateEmployeeById(perfilEmpleado.id, {
					direccion1: direccion1,
					direccion2: direccion2,
					ciudad: ciudad,
					codigoPostal: codigoPostal,
					estadoProvincia: estadoProvincia,
					pais: pais,
				})
			);
		}
		toggleDireccion(false);
	};
	//Submit del formulario ContEmergencia
	const handlesubmitContEmergencia = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (perfilEmpleado.id) {
			dispatch(
				updateEmployeeById(perfilEmpleado.id, {
					emergenciaNombre: emergenciaNombre,
					empergenciaTelefono: empergenciaTelefono,
				})
			);
		}
		toggleContactoE(false);
	};
	//Submit del formulario InfBancaria
	const handlesubmitInfBancaria = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (perfilEmpleado.id) {
			dispatch(
				updateEmployeeById(perfilEmpleado.id, {
					numeroCuentaBancaria: numeroCuentaBancaria,
					swiftBic: swiftBic,
				})
			);
		}
		toggleInfoBank(false);
	};
	//Submit del formulario NumSegSocial
	const handlesubmitNumSegSocial = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (perfilEmpleado.id) {
			dispatch(
				updateEmployeeById(perfilEmpleado.id, {
					rfc: rfc,
					numeroImms: numeroImms,
					curp: curp,
					fechaAltaImss: fechaAltaImss,
				})
			);
		}
		toggleNumSafe(false);
	};

	return (
		<>
			<div className='d-flex flex-column align-items-center'>
				{/* Información general */}
				<div className='d-flex flex-wrap custm-Width100 custm-UnderLineSection'>
					{/* Izquierda */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
							<div className='custm-Width100'>
								<i
									style={{ fontSize: '3rem', color: 'var(--textColorLink)' }}
									className='bi bi-person'
								/>
							</div>
							<div className='fs-4'>Información general</div>
							<div className='fs-5 textColorLight'>Datos personales</div>
							<div className='custm-underLineTittle'></div>
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
							<form style={{ width: '90%' }} onSubmit={handlesubmitInfoGral}>
								<div className='mb-4'>
									<label className='custm-Width100'>Nombre</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilUsuario.firstName}
										name='firstName'
										value={firstName}
										onChange={handleInputChangeInfoGral}
										disabled={!value}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Apellidos</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilUsuario.lastName}
										name='lastName'
										value={lastName}
										onChange={handleInputChangeInfoGral}
										disabled={!value}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Fecha de nacimiento</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='date'
										// placeholder={perfilEmpleado.fechaNacimiento}
										name='fechaNacimiento'
										value={fechaNacimiento}
										onChange={handleInputChangeInfoGral}
										disabled={!value}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Género legal</label>
									{/* <input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilEmpleado.genero}
										name='genero'
										value={genero}
										onChange={handleInputChangeInfoGral}
										disabled={!value}
									/> */}
									<select
										className='form-select  custm-Width100 custm-empleadoFormIntput'
										name='genero'
										value={genero}
										onChange={handleInputChangeInfoGral}
										disabled={!value}
									>
										<option value=''>Selecciona uno</option>
										<option value='Masculino'>Masculino</option>
										<option value='Femenino'>Femenino</option>
									</select>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Nacionalidad</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilEmpleado.nacionalidad}
										name='nacionalidad'
										value={nacionalidad}
										onChange={handleInputChangeInfoGral}
										disabled={!value}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Teléfono</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='tel'
										// placeholder={perfilUsuario.phone}
										name='phone'
										value={phone}
										onChange={handleInputChangeInfoGral}
										disabled={!value}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Frecuencia de pago</label>
									<select
										className='form-select  custm-Width100 custm-empleadoFormIntput'
										name='frecuenciaPago'
										value={frecuenciaPago}
										onChange={handleInputChangeInfoGral}
										disabled={!value}
									>
										<option value=''>Selecciona uno</option>
										<option value='Semanal'>Semanal</option>
										<option value='Quincenal'>Quincenal</option>
										<option value='Mensual'>Mensual</option>
									</select>
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
				{/* Documento de identidad */}
				<div className='d-flex flex-wrap custm-Width100 custm-UnderLineSection'>
					{/* Izquierda */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
							<div className='custm-Width100 d-flex'>
								<div
									style={{
										border: '2px solid var(--textColorLink)',
										borderRadius: '10px',
										padding: '0px 15px',
									}}
								>
									<i
										style={{ fontSize: '2.5rem', color: 'var(--textColorLink)' }}
										className='bi bi-person-lines-fill'
									/>
								</div>
							</div>
							<div className='fs-4'>Documento de identidad</div>
							<div className='fs-5 textColorLight'>
								Añade el número de identificación aquí
							</div>
							<div className='custm-underLineTittle'></div>
						</div>
					</div>
					{/* Derecha */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer'>
							<div className='d-flex justify-content-end custm-Width100'>
								<button className='btn fs-3 custm-btnToggle' onClick={toggleDdiValue}>
									<i className='bi bi-pencil-square textColorSecondary' />
								</button>
							</div>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }} onSubmit={handlesubmitDocIdentidad}>
								<div className='mb-4'>
									<label className='custm-Width100'>Tipo de identificación</label>

									<select
										className='form-select  custm-Width100 custm-empleadoFormIntput'
										name='tipoIdentificacion'
										value={tipoIdentificacion}
										onChange={handleInputChangeDocIdentidad}
										disabled={!ddiValue}
									>
										<option value=''>Seleccione uno</option>
										<option value='INE'>INE</option>
										<option value='Pasaporte'>Pasaporte</option>
										<option value='Cartilla militar'>Cartilla militar</option>
										<option value='Cedula profesional'>Cédula profesional</option>
									</select>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Número de identificación</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilEmpleado.documentoIdentidad}
										name='documentoIdentidad'
										value={documentoIdentidad}
										onChange={handleInputChangeDocIdentidad}
										disabled={!ddiValue}
									/>
								</div>
								<div
									className='d-flex justify-content-end custm-Width100'
									style={{ height: '3rem' }}
								>
									{ddiValue && (
										<button type='submit' className='btn  custm-empleadoFormSubmit'>
											Guardar
										</button>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
				{/* Dirección */}
				<div className='d-flex flex-wrap custm-Width100 custm-UnderLineSection'>
					{/* Izquierda */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
							<div className='custm-Width100 d-flex align-items-end'>
								<i
									style={{ fontSize: '3rem', color: 'var(--textColorLink)' }}
									className='bi bi-geo-alt'
								/>
								<i
									style={{
										fontSize: '2rem',
										color: 'var(--textColorLink)',
										marginLeft: '-10px',
									}}
									className='bi bi-house-door'
								/>
							</div>
							<div className='fs-4'>Dirección</div>
							<div className='fs-5 textColorLight'>Detalla la dirección postal.</div>
							<div className='custm-underLineTittle'></div>
						</div>
					</div>
					{/* Derecha */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer'>
							<div className='d-flex justify-content-end custm-Width100'>
								<button className='btn fs-3 custm-btnToggle' onClick={toggleDireccion}>
									<i className='bi bi-pencil-square textColorSecondary' />
								</button>
							</div>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }} onSubmit={handlesubmitDireccion}>
								<div className='mb-4'>
									<label className='custm-Width100'>Dirección 1</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilEmpleado.direccion1}
										name='direccion1'
										value={direccion1}
										onChange={handleInputChangeDireccion}
										disabled={!direccionValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Dirección 2</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={
										// 	perfilEmpleado.direccion2 ? perfilEmpleado.direccion2 : 'Ninguna'
										// }
										name='direccion2'
										value={direccion2}
										onChange={handleInputChangeDireccion}
										disabled={!direccionValue}
									/>
								</div>
								<div className='d-flex mb-4'>
									<div className='me-1'>
										<label className='custm-Width100'>Ciudad</label>

										<input
											className='form-control custm-Width100 custm-empleadoFormIntput'
											type='text'
											// placeholder={perfilEmpleado.ciudad}
											name='ciudad'
											value={ciudad}
											onChange={handleInputChangeDireccion}
											disabled={!direccionValue}
										/>
									</div>
									<div className='ms-1'>
										<label className='custm-Width100'>Código Postal</label>

										<input
											className='form-control custm-Width100 custm-empleadoFormIntput'
											type='text'
											// placeholder={perfilEmpleado.codigoPostal.toString()}
											name='codigoPostal'
											value={codigoPostal}
											onChange={handleInputChangeDireccion}
											disabled={!direccionValue}
										/>
									</div>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Estado / Provincia / Región</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilEmpleado.estadoProvincia}
										name='estadoProvincia'
										value={estadoProvincia}
										onChange={handleInputChangeDireccion}
										disabled={!direccionValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>País</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilEmpleado.pais}
										name='pais'
										value={pais}
										onChange={handleInputChangeDireccion}
										disabled={!direccionValue}
									/>
								</div>
								<div
									className='d-flex justify-content-end custm-Width100'
									style={{ height: '3rem' }}
								>
									{direccionValue && (
										<button type='submit' className='btn  custm-empleadoFormSubmit'>
											Guardar
										</button>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
				{/* Contacto de Emergencia */}
				<div className='d-flex flex-wrap custm-Width100 custm-UnderLineSection'>
					{/* Izquierda */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
							<div className='custm-Width100 d-flex align-items-center'>
								<i
									style={{ fontSize: '3rem', color: 'var(--textColorLink)' }}
									className='bi bi-person'
								/>
								<i
									style={{
										fontSize: '1.5rem',
										color: 'var(--textColorLink)',
										marginLeft: '-5px',
									}}
									className='bi bi-heart'
								/>
							</div>
							<div className='fs-4'>Contacto de emergencia</div>
							<div className='fs-5 textColorLight'>
								Completa la información del contacto de emergencia.
							</div>
							<div className='custm-underLineTittle'></div>
						</div>
					</div>
					{/* Derecha */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer'>
							<div className='d-flex justify-content-end custm-Width100'>
								<button className='btn fs-3 custm-btnToggle' onClick={toggleContactoE}>
									<i className='bi bi-pencil-square textColorSecondary' />
								</button>
							</div>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }} onSubmit={handlesubmitContEmergencia}>
								<div className='mb-4'>
									<label className='custm-Width100'>Nombre</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilEmpleado.emergenciaNombre}
										name='emergenciaNombre'
										value={emergenciaNombre}
										onChange={handleInputChangeContEmergencia}
										disabled={!contactoEValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Teléfono</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='tel'
										// placeholder={perfilEmpleado.empergenciaTelefono}
										name='empergenciaTelefono'
										value={empergenciaTelefono}
										onChange={handleInputChangeContEmergencia}
										disabled={!contactoEValue}
									/>
								</div>

								<div
									className='d-flex justify-content-end custm-Width100'
									style={{ height: '3rem' }}
								>
									{contactoEValue && (
										<button type='submit' className='btn  custm-empleadoFormSubmit'>
											Guardar
										</button>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
				{/* Información bancaria */}
				<div className='d-flex flex-wrap custm-Width100 custm-UnderLineSection'>
					{/* Izquierda */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
							<div className='custm-Width100 d-flex align-items-end'>
								<i
									style={{ fontSize: '3rem', color: 'var(--textColorLink)' }}
									className='bi bi-bank2'
								/>
								<i
									style={{
										fontSize: '1.5rem',
										color: 'var(--textColorLink)',
									}}
									className='bi bi-cash-coin'
								/>
							</div>
							<div className='fs-4'>Información bancaria</div>
							<div className='fs-5 textColorLight'>
								Información sobre la cuenta bancaria del empleado
							</div>
							<div className='custm-underLineTittle'></div>
						</div>
					</div>
					{/* Derecha */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer'>
							<div className='d-flex justify-content-end custm-Width100'>
								<button className='btn fs-3 custm-btnToggle' onClick={toggleInfoBank}>
									<i className='bi bi-pencil-square textColorSecondary' />
								</button>
							</div>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }} onSubmit={handlesubmitInfBancaria}>
								<div className='mb-4'>
									<label className='custm-Width100'>Cuenta bancaria</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										// type='string'
										type='number'
										// placeholder={perfilEmpleado.numeroCuentaBancaria.toString()}
										name='numeroCuentaBancaria'
										value={numeroCuentaBancaria}
										onChange={handleInputChangeInfBancaria}
										disabled={!infoBankEValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>SWIFT/BIC</label>

									<select
										className='form-select  custm-Width100 custm-empleadoFormIntput'
										name='swiftBic'
										value={swiftBic}
										onChange={handleInputChangeInfBancaria}
										disabled={!infoBankEValue}
									>
										<option value=''>Seleccione uno</option>
										<option value='SWIFT'>SWIFT</option>
										<option value='BIC'>BIC</option>
									</select>
								</div>

								<div
									className='d-flex justify-content-end custm-Width100'
									style={{ height: '3rem' }}
								>
									{infoBankEValue && (
										<button type='submit' className='btn  custm-empleadoFormSubmit'>
											Guardar
										</button>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
				{/* Número de la Seguridad Social */}
				<div className='d-flex flex-wrap custm-Width100 custm-UnderLineSection'>
					{/* Izquierda */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
							<div className='custm-Width100 d-flex align-items-end'>
								<i
									style={{ fontSize: '3rem', color: 'var(--textColorLink)' }}
									className='bi bi-bank'
								/>
								<i
									style={{
										fontSize: '1.4rem',
										color: 'var(--textColorLink)',
										marginLeft: '5px',
									}}
									className='bi bi-plus-square-fill'
								/>
							</div>
							<div className='fs-4'>Número de la Seguridad Social</div>
							<div className='fs-5 textColorLight'>
								Número de la Seguridad Social del empleado
							</div>
							<div className='custm-underLineTittle'></div>
						</div>
					</div>
					{/* Derecha */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer'>
							<div className='d-flex justify-content-end custm-Width100'>
								<button className='btn fs-3 custm-btnToggle' onClick={toggleNumSafe}>
									<i className='bi bi-pencil-square textColorSecondary' />
								</button>
							</div>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }} onSubmit={handlesubmitNumSegSocial}>
								<div className='mb-4'>
									<label className='custm-Width100'>RFC</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilEmpleado.rfc}
										name='rfc'
										value={rfc}
										onChange={handleInputChangeNumSegSocial}
										disabled={!numSafeEValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Número IMSS</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilEmpleado.numeroImms}
										name='numeroImms'
										value={numeroImms}
										onChange={handleInputChangeNumSegSocial}
										disabled={!numSafeEValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>CURP</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilEmpleado.curp}
										name='curp'
										value={curp}
										onChange={handleInputChangeNumSegSocial}
										disabled={!numSafeEValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Fecha alta IMSS</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='date'
										name='fechaAltaImss'
										value={fechaAltaImss}
										onChange={handleInputChangeNumSegSocial}
										disabled={!numSafeEValue}
									/>
								</div>
								<div
									className='d-flex justify-content-end custm-Width100'
									style={{ height: '3rem' }}
								>
									{numSafeEValue && (
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

export default PageEmpleadoPersonal;
