import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContracts } from '../../actions/contractsActions/contractsActions';
import { RootSote } from '../../store/Store';

const PageInfoContrato = () => {
	//dispatch para ejecutar las actions
	const dispatch = useDispatch();
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilEmpleado } = useSelector((state: RootSote) => state.users);
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { contractToShow } = useSelector((state: RootSote) => state.contracts);

	//Tomar solo la fecha Inicio
	const indiceFechaInicio = contractToShow.fechaDeInicio.indexOf('T');
	const fechaInicio = contractToShow.fechaDeInicio.substring(
		0,
		indiceFechaInicio
	);
	let fechaFin = '';
	let fechaFinValue = '';
	//Tomar solo la fecha Fin
	if (contractToShow.fechaDeFinalizacion) {
		const indiceFechaFin = contractToShow.fechaDeFinalizacion.indexOf('T');
		fechaFinValue = contractToShow.fechaDeFinalizacion.substring(
			0,
			indiceFechaFin
		);
		if (fechaFinValue === '1000-10-10') fechaFin = '';
		else fechaFin = fechaFinValue;
	}

	useEffect(() => {
		if (perfilEmpleado.id) dispatch(getContracts(perfilEmpleado.id.toString()));
	}, [dispatch, perfilEmpleado.id]);

	return (
		<>
			<div className='d-flex flex-column align-items-center'>
				{/* Información básica */}
				<div className='d-flex flex-wrap custm-Width100 custm-UnderLineSection'>
					{/* Izquierda */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
							<div className='custm-Width100'>
								<i
									style={{ fontSize: '3rem', color: 'var(--textColorLink)' }}
									className='bi bi-pen'
								/>
							</div>
							<div className='fs-4'>Información básica</div>
							<div className='fs-5 textColorLight'>
								Información básica del empleado
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
									<label className='custm-Width100'>Tipo de contrato</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										value={contractToShow.tipoDeContrato}
										placeholder='tipo de contrato'
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Puesto</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										value={contractToShow.puesto}
										placeholder='puesto'
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Fecha de inicio</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='date'
										placeholder='Fecha de inicio'
										value={fechaInicio}
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Fecha de finalización</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='date'
										value={fechaFin}
										placeholder='Fecha de finalización'
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
				{/* Horas laborales*/}
				<div className='d-flex flex-wrap custm-Width100 custm-UnderLineSection'>
					{/* Izquierda */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
							<div className='custm-Width100 d-flex'>
								<i
									style={{ fontSize: '3rem', color: 'var(--textColorLink)' }}
									className='bi bi-stopwatch'
								/>
							</div>
							<div className='fs-4'>Horas laborales</div>
							<div className='fs-5 textColorLight'>
								Esta es la cantidad de días y horas que trabaja este empleado
							</div>
							<div className='custm-underLineTittle'></div>
						</div>
					</div>
					{/* Derecha */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer pt-5'>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }}>
								<div className='d-flex mb-4'>
									<div className='me-1'>
										<label className='custm-Width100'>Horas</label>
										<input
											className='form-control custm-Width100 custm-empleadoFormIntput'
											type='text'
											placeholder='Horas'
											value={contractToShow.horasLaborales}
											disabled
										/>
									</div>
									<div className='ms-1'>
										<label className='custm-Width100'>Unidad</label>
										<input
											className='form-control custm-empleadoFormIntput'
											type='text'
											value={contractToShow.unidadLaborales}
											placeholder='Unidad'
											disabled
										/>
									</div>
								</div>

								<div
									className='d-flex justify-content-end custm-Width100'
									style={{ height: '3rem' }}
								></div>
							</form>
						</div>
					</div>
				</div>
				{/* Salario Bruto */}
				<div className='d-flex flex-wrap custm-Width100 custm-UnderLineSection'>
					{/* Izquierda */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
							<div className='custm-Width100 d-flex align-items-end'>
								<i
									style={{ fontSize: '3rem', color: 'var(--textColorLink)' }}
									className='bi bi-cash-coin'
								/>
							</div>
							<div className='fs-4'>Salario bruto</div>
							<div className='fs-5 textColorLight'>El salario base del empleado</div>
							<div className='custm-underLineTittle'></div>
						</div>
					</div>
					{/* Derecha */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer pt-5'>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }}>
								<div className='mb-4'>
									<label className='custm-Width100'>Tipo</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										value={contractToShow.tipoSalario}
										placeholder={perfilEmpleado.frecuenciaPago}
										disabled
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Cantidad</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										value={contractToShow.cantidadSalario}
										placeholder='Cantidad MXN'
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

export default PageInfoContrato;
