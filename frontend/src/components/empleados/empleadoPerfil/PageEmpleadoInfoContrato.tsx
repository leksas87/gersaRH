import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getContractToShow,
	updateContractById,
} from '../../../actions/contractsActions/contractsActions';
import { iContract } from '../../../actions/contractsActions/contractsActionTypes';
import { useToggle } from '../../../hooks/useToggle';
import { RootSote } from '../../../store/Store';

const PageEmpleadoInfoContrato = () => {
	const dispatch = useDispatch();

	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilUsuario } = useSelector((state: RootSote) => state.users);
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { contratosEmpleado, contractToShow } = useSelector(
		(state: RootSote) => state.contracts
	);

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

	//useToggle, se extrae el valor y toggleValue-> para cabiar el valor
	const [infoBasicavalue, toggleInfoBasic] = useToggle(false); //Recibe el valor inicial
	const [horasLabValue, toggleHorasLab] = useToggle(false); //Recibe el valor inicial
	const [salarioBruValue, toggleSalarioBru] = useToggle(false); //Recibe el valor inicial

	//objeto para formulario InfoBasic
	const formInfoBasic = {
		tipoDeContrato: '',
		puesto: '',
		fechaDeInicio: '',
		fechaDeFinalizacion: '',
	};
	//objeto para formulario SalarioBruto
	const formSalarioBruto = {
		tipoSalario: '',
		cantidadSalario: 0,
	};
	//objeto para formulario SalarioBruto
	const formHorasLaborales = {
		horasLaborales: 0,
		unidadLaborales: '',
	};
	// Objeto para el manejo de los dias trabajados
	const days = {
		lunes: false,
		martes: false,
		miercoles: false,
		jueves: false,
		viernes: false,
		sabado: false,
		domingo: false,
	};

	//states de formularios
	const [infoBasicValues, setInfoBasicValues] = useState(formInfoBasic);
	const [salarioBrutoValues, setSalarioBrutoValues] = useState(formSalarioBruto);
	const [horasLaboralesValues, setHorasLaboralesValues] =
		useState(formHorasLaborales);
	//useState para manejo del checkbox
	const [checked, setChecked] = useState(days);

	//Desestructuracion de elemntos del useState
	const { tipoDeContrato, puesto, fechaDeInicio, fechaDeFinalizacion } =
		infoBasicValues;
	//Desestructuracion de elemntos del useState
	const { cantidadSalario, tipoSalario } = salarioBrutoValues;
	//Desestructuracion de propiedades
	const { lunes, martes, miercoles, jueves, viernes, sabado, domingo } = checked;
	//Desestructuracion de propiedades
	const { horasLaborales, unidadLaborales } = horasLaboralesValues;

	//Efecto que asigna el valor al inicialstate con lo que se tiene en el reducer.
	useEffect(() => {
		setInfoBasicValues({
			tipoDeContrato: contractToShow.tipoDeContrato,
			puesto: contractToShow.puesto,
			fechaDeInicio: fechaInicio,
			fechaDeFinalizacion: fechaFin,
		});
		setSalarioBrutoValues({
			tipoSalario: contractToShow.tipoSalario,
			cantidadSalario: contractToShow.cantidadSalario,
		});
		setHorasLaboralesValues({
			horasLaborales: contractToShow.horasLaborales,
			unidadLaborales: contractToShow.unidadLaborales,
		});
		setChecked({
			lunes: contractToShow.lunes,
			martes: contractToShow.martes,
			miercoles: contractToShow.miercoles,
			jueves: contractToShow.jueves,
			viernes: contractToShow.viernes,
			sabado: contractToShow.sabado,
			domingo: contractToShow.domingo,
		});
	}, [contractToShow, fechaInicio, fechaFin]);

	//handleInputChange
	const handleInputChangeInfoBasic = (event: any) => {
		setInfoBasicValues({
			...infoBasicValues,
			[event.target.name]: event.target.value,
		});
	};
	const handleInputChangeSalarioBruto = (event: any) => {
		setSalarioBrutoValues({
			...salarioBrutoValues,
			[event.target.name]: event.target.value,
		});
	};
	const handleInputChangeHorasLaborales = (event: any) => {
		setHorasLaboralesValues({
			...horasLaboralesValues,
			[event.target.name]: event.target.value,
		});
	};
	const handleClick = (e: any): void => {
		setChecked({ ...checked, [e.target.name]: e.target.checked });
	};

	//Submit del formulario InfoGral
	const handlesubmitInfoBasic = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (fechaDeFinalizacion) {
			dispatch(
				updateContractById(contractToShow.id, {
					tipoDeContrato: tipoDeContrato,
					puesto: puesto,
					fechaDeInicio: fechaDeInicio,
					fechaDeFinalizacion: fechaDeFinalizacion,
				})
			);
		} else {
			dispatch(
				updateContractById(contractToShow.id, {
					tipoDeContrato: tipoDeContrato,
					puesto: puesto,
					fechaDeInicio: fechaDeInicio,
					fechaDeFinalizacion: '10/10/1000',
				})
			);
		}

		toggleInfoBasic(false);
	};
	//Submit del formularioHoraLaboral
	const handlesubmitHoraLaboral = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(
			updateContractById(contractToShow.id, {
				horasLaborales: horasLaborales,
				unidadLaborales: unidadLaborales,
				lunes: lunes,
				martes: martes,
				miercoles: miercoles,
				jueves: jueves,
				viernes: viernes,
				sabado: sabado,
				domingo: domingo,
			})
		);

		toggleHorasLab(false);
	};
	//Submit del formulario InfoGral
	const handlesubmitSalarioBruto = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(
			updateContractById(contractToShow.id, {
				tipoSalario: tipoSalario,
				cantidadSalario: cantidadSalario,
			})
		);

		toggleSalarioBru(false);
	};

	const showInfo = (contractData: iContract) => {
		dispatch(getContractToShow(contractData));
	};

	return (
		<>
			<div className='d-flex flex-column align-items-center'>
				<div
					className={
						contratosEmpleado.length > 2
							? 'custm-contractContainer p-5'
							: 'custm-contractContainerCenter p-5'
					}
				>
					{contratosEmpleado.map((contrato) => {
						const indiceFechaInicio = contrato.fechaDeInicio.indexOf('T');
						const fechaInicio = contrato.fechaDeInicio.substring(
							0,
							indiceFechaInicio
						);

						return (
							<button
								key={contrato.id}
								type='button'
								className='custm-contract btn '
								onClick={() => showInfo(contrato)}
							>
								<div className='custm-contractDate d-flex justify-content-center align-items-center'>
									{fechaInicio}
								</div>
								<div
									className='d-flex flex-column justify-content-evenly '
									style={{ height: '100%' }}
								>
									<div className='custm-contractLine' />
									<div className='custm-contractLine2' />
									<div className='custm-contractLine' />
									<div className='custm-contractLine2' />
									<div className='custm-contractLine' />
								</div>
								{contrato.isContractActivide && (
									<div className='custm-contractActual d-flex justify-content-center align-items-center'>
										ACTUAL
									</div>
								)}
							</button>
						);
					})}

					<button
						className='btn custm-contractBtnPlus '
						type='button'
						data-bs-toggle='modal'
						data-bs-target='#newContractModal'
					>
						<i className='bi bi-plus-lg' />
					</button>
				</div>
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
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer'>
							<div className='d-flex justify-content-end custm-Width100'>
								<button className='btn fs-3 custm-btnToggle' onClick={toggleInfoBasic}>
									<i className='bi bi-pencil-square textColorSecondary' />
								</button>
							</div>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }} onSubmit={handlesubmitInfoBasic}>
								<div className='mb-4'>
									<label className='custm-Width100'>Tipo de contrato</label>
									<select
										className=' form-select form-control custm-Width100 custm-empleadoFormIntput'
										name='tipoDeContrato'
										value={tipoDeContrato}
										onChange={handleInputChangeInfoBasic}
										disabled={!infoBasicavalue}
									>
										<option>--Selecciona uno--</option>
										<option value='Indeterminado'>Indeterminado</option>
										<option value='Por tiempo determinado'>Por tiempo determinado</option>
										<option value='Por obra determinada'>Por obra determinada</option>
									</select>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Puesto</label>
									<select
										className='form-select form-control custm-Width100 custm-empleadoFormIntput'
										name='puesto'
										value={puesto}
										onChange={handleInputChangeInfoBasic}
										disabled={!infoBasicavalue}
									>
										<option>--Selecciona uno--</option>
										<option value='ADMINISTRADOR FINANCIERO'>
											ADMINISTRADOR FINANCIERO
										</option>
										<option value='ANALISTA DE IMPORTACIONES'>
											ANALISTA DE IMPORTACIONES
										</option>
										<option value='ANALISTA DE SISTEMAS'>ANALISTA DE SISTEMAS</option>
										<option value='ASISTENTE DE DIRECCION'>ASISTENTE DE DIRECCION</option>
										<option value='AUXILIAR OPERATIVO A'>AUXILIAR OPERATIVO A</option>
										<option value='AUXILIAR OPERATIVO B'>AUXILIAR OPERATIVO B</option>
										<option value='BECARIA DE MARKETING'>BECARIA DE MARKETING</option>
										<option value='BECARIA DE RECURSOS'>BECARIA DE RECURSOS</option>
										<option value='BECARIO DE DISEÑO'>BECARIO DE DISEÑO</option>
										<option value='CAPACITADOR'>CAPACITADOR</option>
										<option value='CAPTURISTA'>CAPTURISTA</option>
										<option value='COORDINADOR DE NOMINA'>COORDINADOR DE NOMINA</option>
										<option value='COORDINADOR DE RECLUTAMIENTO'>
											COORDINADOR DE RECLUTAMIENTO
										</option>
										<option value='COSTURERA'>COSTURERA</option>
										<option value='EJECUTIVO DE COMPRAS'>EJECUTIVO DE COMPRAS</option>
										<option value='GERENTE DE OPERACIONES'>GERENTE DE OPERACIONES</option>
										<option value='GUARDIA'>GUARDIA</option>
										<option value='JEFA DE RECURSOS'>JEFA DE RECURSOS</option>
										<option value='JEFE DE CUADRILLA'>JEFE DE CUADRILLA</option>
										<option value='JEFE DE MANTENIMIENTO'>JEFE DE MANTENIMIENTO</option>
										<option value='MANIOBRISTA'>MANIOBRISTA</option>
										<option value='MONTACARGUISTA'>MONTACARGUISTA</option>
										<option value='OPERADOR'>OPERADOR</option>
										<option value='RECLUTADOR DE CAMPO'>RECLUTADOR DE CAMPO</option>
										<option value='REINGENIERIA DE PROCESOS'>
											REINGENIERIA DE PROCESOS
										</option>
										<option value='SUPERVISOR A'>SUPERVISOR A</option>
										<option value='SUPERVISOR B'>SUPERVISOR B</option>
										<option value='SUPERVISOR DE SEGURIDAD'>
											SUPERVISOR DE SEGURIDAD
										</option>
										<option value='SUPERVISOR FISCAL'>SUPERVISOR FISCAL</option>
										<option value='SUPERVISOR FISCAL JR'>SUPERVISOR FISCAL JR</option>
										<option value='SURTIDOR'>SURTIDOR</option>
										<option value='VERIFICADOR'>VERIFICADOR</option>
									</select>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Fecha de inicio</label>
									<input
										type='date'
										className='form-control custm-Width100 custm-empleadoFormIntput'
										name='fechaDeInicio'
										value={fechaDeInicio}
										onChange={handleInputChangeInfoBasic}
										disabled={!infoBasicavalue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Fecha de finalización</label>
									<input
										type='date'
										className='form-control custm-Width100 custm-empleadoFormIntput'
										name='fechaDeFinalizacion'
										value={fechaDeFinalizacion}
										onChange={handleInputChangeInfoBasic}
										disabled={!infoBasicavalue}
									/>
								</div>
								<div
									className='d-flex justify-content-end custm-Width100'
									style={{ height: '3rem' }}
								>
									{infoBasicavalue && (
										<button type='submit' className='btn  custm-empleadoFormSubmit'>
											Guardar
										</button>
									)}
								</div>
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
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer'>
							<div className='d-flex justify-content-end custm-Width100'>
								<button className='btn fs-3 custm-btnToggle' onClick={toggleHorasLab}>
									<i className='bi bi-pencil-square textColorSecondary' />
								</button>
							</div>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }} onSubmit={handlesubmitHoraLaboral}>
								<div className='d-flex mb-4'>
									<div className='me-1'>
										<label className='custm-Width100'>Horas</label>
										<input
											type='number'
											className='form-control custm-Width100 custm-empleadoFormIntput'
											placeholder='Horas laborales'
											name='horasLaborales'
											value={horasLaborales}
											onChange={handleInputChangeHorasLaborales}
											disabled={!horasLabValue}
										/>
									</div>
									<div className='ms-1'>
										<label className='custm-Width100'>Unidad</label>

										<select
											className='form-select form-control custm-Width100  custm-empleadoFormIntput'
											name='unidadLaborales'
											value={unidadLaborales}
											onChange={handleInputChangeHorasLaborales}
											disabled={!horasLabValue}
										>
											<option>--Selecciona uno--</option>
											<option value='Semanal'>Semanal</option>
											<option value='Quincenal'>Quincenal</option>
											<option value='Mensual'>Mensual</option>
										</select>
									</div>
								</div>
								<div className='d-flex justify-content-center flex-column mb-4'>
									<label className='custm-Width100'>Horario del trabajador</label>
									<select
										className=' form-select form-control custm-Width100 custm-empleadoFormIntput'
										name='tipoDeHorario'
										// value={tipoDeHorario}
										// onChange={handleInputChangeInfoBasic}
										// disabled={!infoBasicavalue}
									>
										<option>--Selecciona uno--</option>
										<option value='Nike 1 Matutino'>Nike 1 Matutino</option>
										<option value='Nike 1 Matutino'>Nike 2 Matutino</option>
										<option value='Nike 1 Matutino'>Nike 3 Matutino</option>
									</select>
								</div>

								<div className='d-flex justify-content-center textColorLight mb-1'>
									<div className='fs-4 textColorLight'>Detalle del horario</div>
								</div>
								<div className='d-flex mb-4'>
									<div className='me-1'>
										<label className='custm-Width100 text-center textColorLight'>
											Hora entrada
										</label>

										<input
											className='form-control custm-Width100 custm-empleadoFormIntput'
											type='text'
											// placeholder={perfilEmpleado.ciudad}
											name='horaEntrada'
											// value={ciudad}
											// onChange={handleInputChangeDireccion}
											disabled
										/>
									</div>
									<div className='ms-1'>
										<label className='custm-Width100 text-center textColorLight'>
											Hora salida
										</label>

										<input
											className='form-control custm-Width100 custm-empleadoFormIntput'
											type='text'
											// placeholder={perfilEmpleado.codigoPostal.toString()}
											name='horaSalida'
											// value={codigoPostal}
											// onChange={handleInputChangeDireccion}
											disabled
										/>
									</div>
								</div>
								<div className='d-flex mb-4'>
									<div className='me-1 d-flex flex-column justify-content-end'>
										<label className='custm-Width100 text-center textColorLight'>
											Tiempo de retardo
										</label>

										<input
											className='form-control custm-Width100 custm-empleadoFormIntput'
											type='text'
											// placeholder={perfilEmpleado.ciudad}
											name='horaEntrada'
											// value={ciudad}
											// onChange={handleInputChangeDireccion}
											disabled
										/>
									</div>
									<div className='ms-1 d-flex flex-column justify-content-end'>
										<label className='custm-Width100 text-center textColorLight'>
											Tiempo de acta administrativaa
										</label>

										<input
											className='form-control custm-Width100 custm-empleadoFormIntput'
											type='text'
											// placeholder={perfilEmpleado.codigoPostal.toString()}
											name='horaSalida'
											// value={codigoPostal}
											// onChange={handleInputChangeDireccion}
											disabled
										/>
									</div>
								</div>
								<div className='d-flex mb-4 justify-content-center'>
									<div className='me-1 d-flex flex-column justify-content-end'>
										<label className='custm-Width100 text-center textColorLight'>
											Tiempo de descanso
										</label>

										<input
											className='form-control custm-Width100 custm-empleadoFormIntput'
											type='text'
											// placeholder={perfilEmpleado.ciudad}
											name='horaEntrada'
											// value={ciudad}
											// onChange={handleInputChangeDireccion}
											disabled
										/>
									</div>
								</div>

								<div className='d-flex justify-content-center textColorLight mb-1'>
									<label>
										<span className='text-capitalize'>{perfilUsuario.firstName}</span>{' '}
										trabaja los días:
									</label>
								</div>
								<div className='d-flex justify-content-center mb-4'>
									<div
										className='btn-group mb-2 custm-Width100'
										role='group'
										aria-label='Basic checkbox toggle button group'
									>
										<input
											type='checkbox'
											className='btn-check custm-checkWeek '
											id='btncheckLunesComponent'
											name='lunes'
											checked={lunes}
											onChange={handleClick}
											disabled
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckLunesComponent'
										>
											L
										</label>

										<input
											type='checkbox'
											className='btn-check custm-checkWeek'
											id='btncheckMartesComponent'
											name='martes'
											checked={martes}
											onChange={handleClick}
											disabled
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckMartesComponent'
										>
											M
										</label>

										<input
											type='checkbox'
											className='btn-check custm-checkWeek'
											id='btncheckMiercolesComponent'
											name='miercoles'
											checked={miercoles}
											onChange={handleClick}
											disabled
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckMiercolesComponent'
										>
											M
										</label>
										<input
											type='checkbox'
											className='btn-check custm-checkWeek'
											id='btncheckJuevesComponent'
											name='jueves'
											checked={jueves}
											onChange={handleClick}
											disabled
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckJuevesComponent'
										>
											J
										</label>
										<input
											type='checkbox'
											className='btn-check custm-checkWeek'
											id='btncheckViernesComponent'
											name='viernes'
											checked={viernes}
											onChange={handleClick}
											disabled
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckViernesComponent'
										>
											V
										</label>
										<input
											type='checkbox'
											className='btn-check custm-checkWeek'
											id='btncheckSabadoComponent'
											name='sabado'
											checked={sabado}
											onChange={handleClick}
											disabled
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckSabadoComponent'
										>
											S
										</label>
										<input
											type='checkbox'
											className='btn-check custm-checkWeek'
											id='btncheckDomingoComponent'
											name='domingo'
											checked={domingo}
											onChange={handleClick}
											disabled
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckDomingoComponent'
										>
											D
										</label>
									</div>
								</div>

								<div
									className='d-flex justify-content-end custm-Width100'
									style={{ height: '3rem' }}
								>
									{horasLabValue && (
										<button type='submit' className='btn  custm-empleadoFormSubmit'>
											Guardar
										</button>
									)}
								</div>
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
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer'>
							<div className='d-flex justify-content-end custm-Width100'>
								<button className='btn fs-3 custm-btnToggle' onClick={toggleSalarioBru}>
									<i className='bi bi-pencil-square textColorSecondary' />
								</button>
							</div>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }} onSubmit={handlesubmitSalarioBruto}>
								<div className='mb-4'>
									<label className='custm-Width100'>Tipo</label>

									<select
										className='form-select form-control custm-Width100 custm-empleadoFormIntput'
										name='tipoSalario'
										value={tipoSalario}
										onChange={handleInputChangeSalarioBruto}
										disabled={!salarioBruValue}
									>
										<option>--Selecciona uno--</option>
										<option value='Semanal'>Semanal</option>
										<option value='Quincenal'>Quincenal</option>
										<option value='Mensual'>Mensual</option>
									</select>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Cantidad MXN</label>
									<input
										type='number'
										className='form-control custm-Width100 custm-empleadoFormIntput'
										id='recipient-name'
										name='cantidadSalario'
										placeholder='Cantidad MXN'
										value={cantidadSalario}
										onChange={handleInputChangeSalarioBruto}
										disabled={!salarioBruValue}
									/>
								</div>

								<div
									className='d-flex justify-content-end custm-Width100'
									style={{ height: '3rem' }}
								>
									{salarioBruValue && (
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

export default PageEmpleadoInfoContrato;
