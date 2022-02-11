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

	//Tomar Solo el primer nombre y el primer apellido
	const indiceFechaNacimiento = perfilEmpleado.fechaNacimiento.indexOf('T');
	const fechaNac = perfilEmpleado.fechaNacimiento.substring(
		0,
		indiceFechaNacimiento
	);

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

	//state de formulario Puesto
	const [infoGralValues, setInfoGralValues] = useState(formInfoGral);
	const {
		firstName,
		lastName,
		fechaNacimiento,
		genero,
		nacionalidad,
		phone,
		frecuenciaPago,
	} = infoGralValues;

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
	}, [perfilUsuario, perfilEmpleado]);

	const handleInputChangeInfoGral = (event: any) => {
		setInfoGralValues({
			...infoGralValues,
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
		dispatch(
			updateEmployeeById(perfilUsuario.id, {
				fechaNacimiento: fechaNacimiento,
				genero: genero,
				nacionalidad: nacionalidad,
				frecuenciaPago: frecuenciaPago,
			})
		);
		toggleValue(false);
	};
	//Submit del formulario
	const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('submit');
		toggleValue(false);
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
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilEmpleado.genero}
										name='genero'
										value={genero}
										onChange={handleInputChangeInfoGral}
										disabled={!value}
									/>
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
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										// placeholder={perfilEmpleado.frecuenciaPago}
										name='frecuenciaPago'
										value={frecuenciaPago}
										onChange={handleInputChangeInfoGral}
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
							<form style={{ width: '90%' }} onSubmit={handlesubmit}>
								<div className='mb-4'>
									<label className='custm-Width100'>Tipo de identificación</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.tipoIdentificacion}
										disabled={!ddiValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Número de identificación</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.documentoIdentidad}
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
							<form style={{ width: '90%' }} onSubmit={handlesubmit}>
								<div className='mb-4'>
									<label className='custm-Width100'>Dirección 1</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.direccion1}
										disabled={!direccionValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Dirección 2</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={
											perfilEmpleado.direccion2 ? perfilEmpleado.direccion2 : 'Ninguna'
										}
										disabled={!direccionValue}
									/>
								</div>
								<div className='d-flex mb-4'>
									<div className='me-1'>
										<label className='custm-Width100'>Ciudad</label>

										<input
											className='form-control custm-Width100 custm-empleadoFormIntput'
											type='text'
											placeholder={perfilEmpleado.ciudad}
											disabled={!direccionValue}
										/>
									</div>
									<div className='ms-1'>
										<label className='custm-Width100'>Código Postal</label>

										<input
											className='form-control custm-Width100 custm-empleadoFormIntput'
											type='text'
											placeholder={perfilEmpleado.codigoPostal.toString()}
											disabled={!direccionValue}
										/>
									</div>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Estado / Provincia / Región</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.estadoProvincia}
										disabled={!direccionValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>País</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.pais}
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
							<form style={{ width: '90%' }} onSubmit={handlesubmit}>
								<div className='mb-4'>
									<label className='custm-Width100'>Nombre</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.emergenciaNombre}
										disabled={!contactoEValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Teléfono</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.empergenciaTelefono}
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
							<form style={{ width: '90%' }} onSubmit={handlesubmit}>
								<div className='mb-4'>
									<label className='custm-Width100'>Cuenta bancaria</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.numeroCuentaBancaria.toString()}
										disabled={!infoBankEValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>SWIFT/BIC</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.swiftBic}
										disabled={!infoBankEValue}
									/>
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
							<form style={{ width: '90%' }} onSubmit={handlesubmit}>
								<div className='mb-4'>
									<label className='custm-Width100'>RFC</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.rfc}
										disabled={!numSafeEValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Número IMSS</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.numeroImms}
										disabled={!numSafeEValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>CURP</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.curp}
										disabled={!numSafeEValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Fecha alta IMSS</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='date'
										// value={perfilEmpleado.fechaAltaImss}
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
