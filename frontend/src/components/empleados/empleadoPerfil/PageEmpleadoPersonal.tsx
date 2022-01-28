import { useSelector } from 'react-redux';
import { useToggle } from '../../../hooks/useToggle';
import { RootSote } from '../../../store/Store';

const PageEmpleadoPersonal = () => {
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilEmpleado } = useSelector((state: RootSote) => state.users);

	//useToggle, se extrae el valor y toggleValue-> para cabiar el valor
	const [value, toggleValue] = useToggle(false); //Recibe el valor inicial
	const [ddiValue, toggleDdiValue] = useToggle(false); //Recibe el valor inicial
	const [direccionValue, toggleDireccion] = useToggle(false); //Recibe el valor inicial

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
							<form style={{ width: '90%' }} onSubmit={handlesubmit}>
								<div className='mb-4'>
									<label className='custm-Width100'>Nombre</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.firstName}
										disabled={!value}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Apellidos</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.lastName}
										disabled={!value}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Fecha de nacimiento</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Fecha de nacimiento'
										disabled={!value}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Género legal</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Género legal'
										disabled={!value}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Nacionalidad</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Nacionalidad'
										disabled={!value}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Teléfono</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.phone}
										disabled={!value}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Frecuencia de pago</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Frecuencia de pago'
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
										placeholder='--escoge--'
										disabled={!ddiValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Número de identificación</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Número de identificación'
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
										placeholder='Dirección'
										disabled={!direccionValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Dirección 2</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Opcional'
										disabled={!direccionValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Ciudad</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Ciudad'
										disabled={!direccionValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Código Postal</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Código Postal'
										disabled={!direccionValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Estado / Provincia / Región</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Estado / Provincia / Región'
										disabled={!direccionValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>País</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='País'
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
			</div>
		</>
	);
};

export default PageEmpleadoPersonal;
