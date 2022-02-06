import { useSelector } from 'react-redux';
import { RootSote } from '../../store/Store';

const PageInfoPersonal = () => {
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	// const { perfilEmpleado } = useSelector((state: RootSote) => state.users);

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
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer pt-5'>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }}>
								<div className='mb-4'>
									<label className='custm-Width100'>Nombre</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='nombre'
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Apellidos</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Apellidos'
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Fecha de nacimiento</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Fecha de nacimiento'
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Género legal</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Género legal'
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Nacionalidad</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Nacionalidad'
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Teléfono</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Teléfono'
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Frecuencia de pago</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Frecuencia de pago'
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
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer pt-5'>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }}>
								<div className='mb-4'>
									<label className='custm-Width100'>Tipo de identificación</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='--escoge--'
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Número de identificación</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Número de identificación'
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
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer pt-5'>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }}>
								<div className='mb-4'>
									<label className='custm-Width100'>Dirección 1</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Dirección'
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Dirección 2</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Opcional'
										disabled
									/>
								</div>
								<div className='d-flex mb-4'>
									<div className='me-1'>
										<label className='custm-Width100'>Ciudad</label>

										<input
											className='form-control custm-Width100 custm-empleadoFormIntput'
											type='text'
											placeholder='Ciudad'
											disabled
										/>
									</div>
									<div className='ms-1'>
										<label className='custm-Width100'>Código Postal</label>

										<input
											className='form-control custm-Width100 custm-empleadoFormIntput'
											type='text'
											placeholder='Código Postal'
											disabled
										/>
									</div>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Estado / Provincia / Región</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Estado / Provincia / Región'
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>País</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='País'
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
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer pt-5'>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }}>
								<div className='mb-4'>
									<label className='custm-Width100'>Nombre</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Nombre'
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Teléfono</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Teléfono'
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
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer pt-5'>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }}>
								<div className='mb-4'>
									<label className='custm-Width100'>Cuenta bancaria</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Cuenta bancaria'
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>SWIFT/BIC</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='SWIFT/BIC'
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
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer pt-5'>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }}>
								<div className='mb-4'>
									<label className='custm-Width100'>RFC</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='RFC'
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Número IMSS</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Número IMSS'
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>CURP</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='CURP'
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Fecha alta IMSS</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Fecha alta IMSS'
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

export default PageInfoPersonal;
