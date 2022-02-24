import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getContracts,
	getContractToShow,
	updateContractById,
} from '../../../actions/contractsActions/contractsActions';
import { iContract } from '../../../actions/contractsActions/contractsActionTypes';
import { useToggle } from '../../../hooks/useToggle';
import { RootSote } from '../../../store/Store';
import ModalNuevoContrato from './ModalNuevoContrato';

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
	//Tomar solo la fecha Fin
	if (contractToShow.fechaDeFinalizacion) {
		const indiceFechaFin = contractToShow.fechaDeFinalizacion.indexOf('T');
		fechaFin = contractToShow.fechaDeFinalizacion.substring(0, indiceFechaFin);
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

	//states de formularios
	const [infoBasicValues, setInfoBasicValues] = useState(formInfoBasic);
	const [salarioBrutoValues, setSalarioBrutoValues] = useState(formSalarioBruto);

	//Desestructuracion de elemntos del useState
	const { tipoDeContrato, puesto, fechaDeInicio, fechaDeFinalizacion } =
		infoBasicValues;
	const { cantidadSalario, tipoSalario } = salarioBrutoValues;

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
	}, [contractToShow]);

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
				})
			);
		}

		toggleInfoBasic(false);
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

	//Submit del formulario
	const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('submit');
		toggleInfoBasic(false);
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
							<form style={{ width: '90%' }} onSubmit={handlesubmit}>
								<div className='d-flex mb-4'>
									<div className='me-1'>
										<label className='custm-Width100'>Horas</label>
										<input
											type='number'
											className='form-control custm-Width100 custm-empleadoFormIntput'
											placeholder='Horas laborales'
											name='horasLaborales'
											disabled={!horasLabValue}
											// value={horasLaborales}
											// onChange={handleInputChange}
										/>
									</div>
									<div className='ms-1'>
										<label className='custm-Width100'>Unidad</label>

										<select
											className='form-select form-control custm-Width100  custm-empleadoFormIntput'
											name='unidadLaborales'
											disabled={!horasLabValue}
											// value={unidadLaborales}
											// onChange={handleInputChange}
										>
											<option>--Selecciona uno--</option>
											<option value='Semanal'>Semanal</option>
											<option value='Quincenal'>Quincenal</option>
											<option value='Mensual'>Mensual</option>
										</select>
									</div>
								</div>

								<div className='d-flex justify-content-center textColorLight mb-1'>
									<label>
										<span className='text-capitalize'>{perfilUsuario.firstName}</span>{' '}
										trabaja a la semana los días:
									</label>
								</div>
								<div
									className='d-flex justify-content-center'
									// style={{ backgroundColor: 'turquoise' }}
								>
									<div
										className='btn-group mb-2 custm-Width100'
										role='group'
										aria-label='Basic checkbox toggle button group'
									>
										<input
											type='checkbox'
											className='btn-check custm-checkWeek '
											id='btncheckLunes'
											name='lunes'
											disabled={!horasLabValue}
											// defaultChecked={lunes}
											// onClick={handleClick}
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckLunes'
										>
											L
										</label>

										<input
											type='checkbox'
											className='btn-check custm-checkWeek'
											id='btncheckMartes'
											name='martes'
											disabled={!horasLabValue}
											// defaultChecked={martes}
											// onClick={handleClick}
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckMartes'
										>
											M
										</label>

										<input
											type='checkbox'
											className='btn-check custm-checkWeek'
											id='btncheckMiercoles'
											name='miercoles'
											disabled={!horasLabValue}
											// defaultChecked={miercoles}
											// onClick={handleClick}
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckMiercoles'
										>
											M
										</label>
										<input
											type='checkbox'
											className='btn-check custm-checkWeek'
											id='btncheckJueves'
											name='jueves'
											disabled={!horasLabValue}
											// defaultChecked={jueves}
											// onClick={handleClick}
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckJueves'
										>
											J
										</label>
										<input
											type='checkbox'
											className='btn-check custm-checkWeek'
											id='btncheckViernes'
											name='viernes'
											disabled={!horasLabValue}
											// defaultChecked={viernes}
											// onClick={handleClick}
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckViernes'
										>
											V
										</label>
										<input
											type='checkbox'
											className='btn-check custm-checkWeek'
											id='btncheckSabado'
											name='sabado'
											disabled={!horasLabValue}
											// defaultChecked={sabado}
											// onClick={handleClick}
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckSabado'
										>
											S
										</label>
										<input
											type='checkbox'
											className='btn-check custm-checkWeek'
											id='btncheckDomingo'
											name='domingo'
											disabled={!horasLabValue}
											// defaultChecked={domingo}
											// onClick={handleClick}
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckDomingo'
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
