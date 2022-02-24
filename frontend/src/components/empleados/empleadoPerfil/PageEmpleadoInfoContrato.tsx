import { useDispatch, useSelector } from 'react-redux';
import { contractToShow } from '../../../actions/contractsActions/contractsActions';
import { iContract } from '../../../actions/contractsActions/contractsActionTypes';
import { useToggle } from '../../../hooks/useToggle';
import { RootSote } from '../../../store/Store';
import ModalNuevoContrato from './ModalNuevoContrato';

const PageEmpleadoInfoContrato = () => {
	const dispatch = useDispatch();

	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilUsuario } = useSelector((state: RootSote) => state.users);
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilEmpleado } = useSelector((state: RootSote) => state.users);
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { contratosEmpleado } = useSelector(
		(state: RootSote) => state.contracts
	);

	//useToggle, se extrae el valor y toggleValue-> para cabiar el valor
	const [infoBasicavalue, toggleInfoBasic] = useToggle(false); //Recibe el valor inicial
	const [horasLabValue, toggleHorasLab] = useToggle(false); //Recibe el valor inicial
	const [salarioBruValue, toggleSalarioBru] = useToggle(false); //Recibe el valor inicial

	//Submit del formulario
	const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('submit');
		toggleInfoBasic(false);
	};

	const showInfo = (contractData: iContract) => {
		dispatch(contractToShow(contractData));
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
							<form style={{ width: '90%' }} onSubmit={handlesubmit}>
								<div className='mb-4'>
									<label className='custm-Width100'>Tipo de contrato</label>
									<select
										className='form-control custm-Width100 custm-empleadoFormIntput'
										name='tipoDeContrato'
										// value={tipoDeContrato}
										// onChange={handleInputChange}
										disabled={!infoBasicavalue}
									>
										<option>--Selecciona uno--</option>
										<option value='Indeterminado'>Indeterminado</option>
										<option value='Por tiempo determinado'>Por tiempo determinado</option>
										<option value='Por obra determinada'>Por obra determinada</option>
									</select>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Cargo</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={'Cargo'}
										disabled={!infoBasicavalue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Fecha de inicio</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Fecha de inicio'
										disabled={!infoBasicavalue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Fecha de finalización</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Fecha de finalización'
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
											className='form-control custm-Width100 custm-empleadoFormIntput'
											type='text'
											placeholder='Horas'
											disabled={!horasLabValue}
										/>
									</div>
									<div className='ms-1'>
										<label className='custm-Width100'>Unidad</label>
										<input
											className='form-control custm-empleadoFormIntput'
											type='text'
											placeholder='Unidad'
											disabled={!horasLabValue}
										/>
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
										className='btn-group mb-4 custm-Width100'
										role='group'
										aria-label='Basic checkbox toggle button group'
									>
										<input
											type='checkbox'
											className='btn-check '
											id='btncheckLunes'
											autoComplete='off'
											disabled={!horasLabValue}
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckLunes'
										>
											L
										</label>

										<input
											type='checkbox'
											className='btn-check'
											id='btncheckMartes'
											autoComplete='off'
											disabled={!horasLabValue}
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckMartes'
										>
											M
										</label>

										<input
											type='checkbox'
											className='btn-check'
											id='btncheckMiercoles'
											autoComplete='off'
											disabled={!horasLabValue}
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckMiercoles'
										>
											M
										</label>
										<input
											type='checkbox'
											className='btn-check'
											id='btncheckJueves'
											autoComplete='off'
											disabled={!horasLabValue}
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckJueves'
										>
											J
										</label>
										<input
											type='checkbox'
											className='btn-check'
											id='btncheckViernes'
											autoComplete='off'
											disabled={!horasLabValue}
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckViernes'
										>
											V
										</label>
										<input
											type='checkbox'
											className='btn-check'
											id='btncheckSabado'
											autoComplete='off'
											disabled={!horasLabValue}
										/>
										<label
											className='btn btn-outline-primary custm-btnWeek'
											htmlFor='btncheckSabado'
										>
											S
										</label>
										<input
											type='checkbox'
											className='btn-check'
											id='btncheckDomingo'
											autoComplete='off'
											disabled={!horasLabValue}
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
							<form style={{ width: '90%' }} onSubmit={handlesubmit}>
								<div className='mb-4'>
									<label className='custm-Width100'>Tipo</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder={perfilEmpleado.frecuenciaPago}
										disabled={!salarioBruValue}
									/>
								</div>
								<div className='mb-4'>
									<label className='custm-Width100'>Cantidad</label>

									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Cantidad MXN'
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
