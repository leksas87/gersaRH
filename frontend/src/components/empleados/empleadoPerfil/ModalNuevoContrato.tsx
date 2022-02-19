import React from 'react';

const ModalNuevoContrato = () => {
	const handeNewContract = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('creando contrato');
	};
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
											paddingTop: '1.5rem',
										}}
									>
										<form onSubmit={handeNewContract}>
											<div className='d-flex justify-content-between'>
												<div className=''>
													<label htmlFor='recipient-name' className='pt-2'>
														Fecha inicio*
													</label>
													<input
														type='date'
														className='custm-input form-control custm-inputDate'
														id='recipient-name'
														name='name'
														// value={name}
														placeholder='Ingresa el nombre'
														aria-describedby='registerName'
														autoComplete='off'
														// onChange={handleInputChange}
													/>
												</div>
												<div className=''>
													<label htmlFor='recipient-name' className='pt-2'>
														Fecha fin
													</label>
													<input
														type='date'
														className='custm-input form-control custm-inputDate'
														id='recipient-apellido'
														name='apellidos'
														// value={apellidos}
														placeholder='Ingresa el apellido'
														aria-describedby='registerLastName'
														autoComplete='off'
														// onChange={handleInputChange}
													/>
												</div>
											</div>
											<label htmlFor='recipient-name' className='pt-2'>
												Puesto
											</label>
											<select
												className='form-select custm-input form-control mb-0'
												name='puesto'
												// value={genero}
												// onChange={handleInputChangeInfoGral}
												// disabled={!value}
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
														className='custm-input form-control mb-0'
														id='recipient-name'
														name='name'
														// value={name}
														placeholder='Horas'
														aria-describedby='registerName'
														autoComplete='off'
														// onChange={handleInputChange}
													/>
												</div>
												<div className='ms-3' style={{ width: '100%' }}>
													<label htmlFor='recipient-name' className='pt-2'>
														Tipo
													</label>
													<select
														className='form-select custm-input form-control mb-0'
														name='tipoHoras'
														// value={frecuenciaPago}
														// onChange={handleInputChangeInfoGral}
														// disabled={!value}
													>
														<option value='Semanal'>Semanal</option>
														<option value='Quincenal'>Quincenal</option>
														<option value='Mensual'>Mensual</option>
													</select>
												</div>
											</div>
											<label htmlFor='recipient-name' className='pt-2'>
												Dias
											</label>
											<div
												className='btn-group mb-2 custm-Width100'
												role='group'
												aria-label='Basic checkbox toggle button group'
											>
												<input
													type='checkbox'
													className='btn-check custm-checkWeek '
													id='btncheckLunes'
													autoComplete='off'
													// disabled={!horasLabValue}
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
													autoComplete='off'
													// disabled={!horasLabValue}
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
													autoComplete='off'
													// disabled={!horasLabValue}
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
													autoComplete='off'
													// disabled={!horasLabValue}
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
													autoComplete='off'
													// disabled={!horasLabValue}
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
													autoComplete='off'
													// disabled={!horasLabValue}
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
													autoComplete='off'
													// disabled={!horasLabValue}
												/>
												<label
													className='btn btn-outline-primary custm-btnWeek'
													htmlFor='btncheckDomingo'
												>
													D
												</label>
											</div>
											<div className='d-flex'>
												<div
													className='me-3'
													style={{
														width: '100%',
													}}
												>
													<label htmlFor='recipient-name' className='pt-2'>
														Salario
													</label>
													<input
														type='number'
														className='custm-input form-control mb-0'
														id='recipient-name'
														name='name'
														// value={name}
														placeholder='Salario'
														aria-describedby='registerName'
														autoComplete='off'
														// onChange={handleInputChange}
													/>
												</div>
												<div className='ms-3' style={{ width: '100%' }}>
													<label htmlFor='recipient-name' className='pt-2'>
														Tipo
													</label>
													<select
														className='form-select custm-input form-control mb-0'
														name='tipoHoras'
														// value={frecuenciaPago}
														// onChange={handleInputChangeInfoGral}
														// disabled={!value}
													>
														<option value='Semanal'>Semanal</option>
														<option value='Quincenal'>Quincenal</option>
														<option value='Mensual'>Mensual</option>
													</select>
												</div>
											</div>
											{/* {error && (
												<div className='form-text textColorError'>
													<i className='bi bi-exclamation-circle'>{` `}</i>
													{error}.
												</div>
											)} */}
											<div className='d-flex justify-content-end'>
												{/* {!registerState.loading ? (
													<button className='custm-btnFormSubmit inputSubmit'>
														Guardar empleado
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
														Cargando tabla...
													</button>
												)} */}
												<button className=' custm-btnFormSubmit inputSubmit'>
													Crear contrato
												</button>
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
