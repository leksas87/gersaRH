import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerNewContract } from '../../../actions/contractsActions/contractsActions';
import { useForm } from '../../../hooks/useForm';
import { RootSote } from '../../../store/Store';

const ModalNuevoContrato = () => {
	//dispatch para ejecutar las contractsActions
	const dispatch = useDispatch();
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilUsuario } = useSelector((state: RootSote) => state.users);
	const { registerState } = useSelector((state: RootSote) => state.contracts);

	//objeto user para formulario Registro
	const newContract = {
		tipoDeContrato: '',
		fechaDeInicio: '',
		fechaDeFinalizacion: '',
		puesto: '',
		horasLaborales: '',
		unidadLaborales: '',
		cantidadSalario: '',
		tipoSalario: '',
	};

	//Estado inicial para manejo de errores
	interface iErrors {
		msgError: string;
		errors: string[];
	}
	const errors: iErrors = {
		msgError: '',
		errors: [],
	};
	//Uso de hook useForm para manejo de campos en el formulario
	const [formValues, handleInputChange, reset] = useForm(newContract);

	// useState para manejo de errores
	const [error, setError] = useState(errors);

	const {
		tipoDeContrato,
		fechaDeInicio,
		fechaDeFinalizacion,
		puesto,
		horasLaborales,
		unidadLaborales,
		cantidadSalario,
		tipoSalario,
	} = formValues;

	//Submit del modal
	const handeNewContract = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (isFormValid()) {
			if (!fechaDeFinalizacion) {
				dispatch(
					registerNewContract({
						userId: perfilUsuario.id,
						puesto: puesto,
						fechaDeInicio: fechaDeInicio,
						horasLaborales: horasLaborales,
						unidadLaborales: unidadLaborales,
						tipoSalario: tipoSalario,
						cantidadSalario: cantidadSalario,
						tipoDeContrato: tipoDeContrato,
					})
				);
			} else {
				dispatch(
					registerNewContract({
						userId: perfilUsuario.id,
						puesto: puesto,
						fechaDeInicio: fechaDeInicio,
						fechaDeFinalizacion: fechaDeFinalizacion,
						horasLaborales: horasLaborales,
						unidadLaborales: unidadLaborales,
						tipoSalario: tipoSalario,
						cantidadSalario: cantidadSalario,
						tipoDeContrato: tipoDeContrato,
					})
				);
			}
		}
	};

	const isFormValid = (): boolean => {
		// El campo usuario no debe estar vacío
		if (tipoDeContrato === '--Selecciona uno--' || tipoDeContrato === '') {
			setError({
				errors: ['tipoDeContrato'],
				msgError: 'El campo "Tipo de contrato" es obligatorio',
			});
			return false;
			// El campo contraseña debe tener al menos 6 caracteres
		} else if (fechaDeInicio === '') {
			setError({
				errors: ['fechaDeInicio'],
				msgError: 'El campo "Fecha de inicio" es obligatorio',
			});
			return false;
		} else if (puesto === '--Selecciona uno--' || puesto === '') {
			setError({
				errors: ['puesto'],
				msgError: 'El campo "Puesto" es obligatorio',
			});
			return false;
		} else if (horasLaborales === 0 || horasLaborales === '') {
			setError({
				errors: ['horasLaborales'],
				msgError: 'El campo "Horas" es obligatorio',
			});
			return false;
		} else if (
			unidadLaborales === '--Selecciona uno--' ||
			unidadLaborales === ''
		) {
			setError({
				errors: ['unidadLaborales'],
				msgError: 'El campo "Horas Tipo" es obligatorio',
			});
			return false;
		} else if (cantidadSalario === 0 || cantidadSalario === '') {
			setError({
				errors: ['cantidadSalario'],
				msgError: 'El campo "Salario bruto" es obligatorio',
			});
			return false;
		} else if (tipoSalario === '--Selecciona uno--' || tipoSalario === '') {
			setError({
				errors: ['tipoSalario'],
				msgError: 'El campo "Salario tipo" es obligatorio',
			});
			return false;
		}

		//Resetea estado al valor inicial
		setError({ errors: [], msgError: '' });
		return true;
	};
	useEffect(() => {
		function toclose(e: any) {
			reset();
		}

		const myModalEl = document.getElementById('newContractModal');
		if (myModalEl) {
			myModalEl.addEventListener('hidden.bs.modal', toclose);
		}

		return () => {
			myModalEl?.removeEventListener('hidden.bs.modal', toclose);
		};
	}, [reset]);
	return (
		<>
			<div>
				{/* <!-- Modal --> */}
				<div
					className='modal fade'
					id='newContractModal'
					tabIndex={-1}
					aria-labelledby='newContractModal'
					aria-hidden='true'
				>
					<div className='modal-dialog d-flex justify-content-center'>
						<div className='modal-content custm-modalContent'>
							<div
								className='modal-header'
								style={{
									border: 'none',
									borderRadius: '50px',
								}}
							>
								<div className='custm-modalIcon d-flex justify-content-center align-items-center'>
									<i className='bi bi-pen' />
								</div>
								<button
									type='button'
									className='btn-close custm-iconExit'
									data-bs-dismiss='modal'
									aria-label='Close'
								></button>
							</div>
							<div className='d-flex justify-content-center' style={{ width: '100%' }}>
								<div className='d-flex flex-column' style={{ width: '75%' }}>
									<div
										className='d-flex flex-column'
										style={{ maxWidth: '300px', lineHeight: '28px' }}
									>
										<label className='textColorPrimary fs-2'>Nuevo contrato</label>
										<label
											className='textColorLight fw-light mt-2'
											style={{ lineHeight: '15px' }}
										>
											Completa la información siguiente para crear un nuevo contrato.
										</label>
									</div>
									<div
										style={{
											width: '100%',
											paddingTop: '1rem',
										}}
									>
										<form onSubmit={handeNewContract}>
											<label htmlFor='tipoContrati' className='pt-2'>
												Tipo de contrato
											</label>
											<select
												className={
													error.errors.includes('tipoDeContrato')
														? 'form-select custm-input form-control mb-0  is-invalid'
														: 'form-select custm-input form-control mb-0'
												}
												name='tipoDeContrato'
												value={tipoDeContrato}
												onChange={handleInputChange}
											>
												<option>--Selecciona uno--</option>
												<option value='Indeterminado'>Indeterminado</option>
												<option value='Por tiempo determinado'>
													Por tiempo determinado
												</option>
												<option value='Por obra determinada'>Por obra determinada</option>
											</select>
											<div className='d-flex justify-content-between'>
												<div className=''>
													<label htmlFor='fechaInicio' className='pt-2'>
														Fecha inicio*
													</label>
													<input
														type='date'
														className={
															error.errors.includes('fechaDeInicio')
																? 'custm-input form-control custm-inputDate is-invalid'
																: 'custm-input form-control custm-inputDate'
														}
														name='fechaDeInicio'
														value={fechaDeInicio}
														onChange={handleInputChange}
													/>
												</div>
												<div className=''>
													<label htmlFor='fechaFin' className='pt-2'>
														Fecha fin
													</label>
													<input
														type='date'
														className='custm-input form-control custm-inputDate'
														name='fechaDeFinalizacion'
														value={fechaDeFinalizacion}
														onChange={handleInputChange}
													/>
												</div>
											</div>
											<label htmlFor='puesto' className='pt-2'>
												Puesto
											</label>
											<select
												// className='form-select custm-input form-control mb-0'
												className={
													error.errors.includes('puesto')
														? 'form-select custm-input form-control mb-0  is-invalid'
														: 'form-select custm-input form-control mb-0'
												}
												name='puesto'
												value={puesto}
												onChange={handleInputChange}
											>
												<option>--Selecciona uno--</option>
												<option value='ADMINISTRADOR FINANCIERO'>
													ADMINISTRADOR FINANCIERO
												</option>
												<option value='ANALISTA DE IMPORTACIONES'>
													ANALISTA DE IMPORTACIONES
												</option>
												<option value='ANALISTA DE SISTEMAS'>ANALISTA DE SISTEMAS</option>
												<option value='ASISTENTE DE DIRECCION'>
													ASISTENTE DE DIRECCION
												</option>
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
												<option value='GERENTE DE OPERACIONES'>
													GERENTE DE OPERACIONES
												</option>
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
											<div className='d-flex'>
												<div
													className='me-3'
													style={{
														width: '100%',
													}}
												>
													<label htmlFor='recipient-name' className='pt-2'>
														Horas
													</label>
													<input
														type='number'
														className={
															error.errors.includes('horasLaborales')
																? 'custm-input form-control mb-0  is-invalid'
																: 'custm-input form-control mb-0'
														}
														placeholder='Horas'
														name='horasLaborales'
														value={horasLaborales}
														onChange={handleInputChange}
													/>
												</div>
												<div className='ms-3' style={{ width: '100%' }}>
													<label htmlFor='recipient-name' className='pt-2'>
														Tipo
													</label>
													<select
														className={
															error.errors.includes('unidadLaborales')
																? 'form-select custm-input form-control mb-0  is-invalid'
																: 'form-select custm-input form-control mb-0'
														}
														name='unidadLaborales'
														value={unidadLaborales}
														onChange={handleInputChange}
													>
														<option>--Selecciona uno--</option>
														<option value='Semanal'>Semanal</option>
														<option value='Quincenal'>Quincenal</option>
														<option value='Mensual'>Mensual</option>
													</select>
												</div>
											</div>

											{/* <div
												className='btn-group mb-2 custm-Width100'
												role='group'
												aria-label='Basic checkbox toggle button group'
											>
												<input
													type='checkbox'
													className='btn-check custm-checkWeek '
													id='btncheckLunes'
													name='lunes'
													defaultChecked={lunes}
													onClick={handleClick}
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
													defaultChecked={martes}
													onClick={handleClick}
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
													defaultChecked={miercoles}
													onClick={handleClick}
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
													defaultChecked={jueves}
													onClick={handleClick}
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
													defaultChecked={viernes}
													onClick={handleClick}
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
													defaultChecked={sabado}
													onClick={handleClick}
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
													defaultChecked={domingo}
													onClick={handleClick}
												/>
												<label
													className='btn btn-outline-primary custm-btnWeek'
													htmlFor='btncheckDomingo'
												>
													D
												</label>
											</div> */}
											<div className='d-flex'>
												<div
													className='me-3'
													style={{
														width: '100%',
													}}
												>
													<label htmlFor='recipient-name' className='pt-2'>
														Salario bruto
													</label>
													<input
														type='number'
														className={
															error.errors.includes('cantidadSalario')
																? 'custm-input form-control mb-0  is-invalid'
																: 'custm-input form-control mb-0'
														}
														id='recipient-name'
														name='cantidadSalario'
														value={cantidadSalario}
														placeholder='Cantidad MXN'
														onChange={handleInputChange}
													/>
												</div>
												<div className='ms-3' style={{ width: '100%' }}>
													<label htmlFor='recipient-name' className='pt-2'>
														Tipo
													</label>
													<select
														className={
															error.errors.includes('tipoSalario')
																? 'form-select custm-input form-control mb-0  is-invalid'
																: 'form-select custm-input form-control mb-0'
														}
														name='tipoSalario'
														value={tipoSalario}
														onChange={handleInputChange}
													>
														<option>--Selecciona uno--</option>
														<option value='Semanal'>Semanal</option>
														<option value='Quincenal'>Quincenal</option>
														<option value='Mensual'>Mensual</option>
													</select>
												</div>
											</div>
											{error.msgError && (
												<div className='form-text textColorError'>
													<i className='bi bi-exclamation-circle'>{` `}</i>
													{error.msgError}.
												</div>
											)}
											<div className='d-flex justify-content-end'>
												{!registerState.loading ? (
													<button type='submit' className='custm-btnFormSubmit inputSubmit'>
														Crear contrato
													</button>
												) : (
													<button
														className='btn  custm-btnFormSubmit inputSubmit'
														type='button'
														disabled
													>
														<span
															className='spinner-border spinner-border-sm me-2'
															role='status'
															aria-hidden='true'
														></span>
														Creando contrato...
													</button>
												)}
												{/* <button className=' custm-btnFormSubmit inputSubmit'>
													Crear contrato
												</button> */}
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalNuevoContrato;
