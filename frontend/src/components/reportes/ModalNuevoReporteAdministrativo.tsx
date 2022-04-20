import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerNewReport } from '../../actions/reportsActions/reportsActions';
import { useForm } from '../../hooks/useForm';
import { RootSote } from '../../store/Store';

const ModalNuevoReporteAdministrativo = () => {
	const loading = false;

	//Dispatch para ejecutar las actions
	const dispatch = useDispatch();
	//State que indica el id del empleado
	const { empleadoData } = useSelector((state: RootSote) => state.auth);
	const { registerState } = useSelector((state: RootSote) => state.reports);

	//objeto user para formulario Registro
	const newRequest = {
		asunto: '',
		descripcionEmpleado: '',
	};
	//Uso de hook useForm para manejo de campos en el formulario
	const [formValues, handleInputChange] = useForm(newRequest);

	//Desestructuracion de propiedades
	const { asunto, descripcionEmpleado } = formValues;

	const handeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (empleadoData.id) {
			dispatch(
				registerNewReport(
					{
						asunto: asunto,
						descripcionEmpleado: descripcionEmpleado,
						employeeId: empleadoData.id,
						anonimo: false,
						reportType: 'administrativo',
					},
					empleadoData.id,
					'modalNuevoReporteAdministrativo'
				)
			);
		}
	};
	return (
		<>
			<div>
				{/* <!-- Button para activar modal --> */}
				<button
					type='button'
					className='btn custm-btnNuevoEmpleado custmBtnActions me-3'
					style={{ height: 'auto' }}
					data-bs-toggle='modal'
					data-bs-target='#modalNuevoReporteAdministrativo'
				>
					+ Nuevo registro
				</button>

				{/* <!-- Modal --> */}
				<div
					className='modal fade'
					id='modalNuevoReporteAdministrativo'
					tabIndex={-1}
					aria-labelledby='modalNuevoReporteAdministrativo'
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
									<i className='bi bi-chat-dots-fill' />
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
										<label className='textColorPrimary fs-2'>
											Enviar reporte administrativo
										</label>
										<label
											className='textColorLight fw-light mt-2'
											style={{ lineHeight: '15px' }}
										>
											Completa la información siguiente para enviar un nuevo registro.
										</label>
									</div>
									<div
										style={{
											width: '100%',
											paddingTop: '1.5rem',
										}}
									>
										<form onSubmit={handeSubmit}>
											<div className='d-flex flex-column mb-4 mt-1'>
												<label htmlFor='selectReportType' className='pt-2 textColorLight'>
													Asunto*
												</label>
												<input
													type='text'
													id='selectReportType'
													className='form-control custm-Width100 custm-empleadoFormIntput'
													name='asunto'
													onChange={handleInputChange}
													value={asunto}
													required
													placeholder='Escriba un asunto'
												/>
											</div>

											{/* <div className='d-flex mb-4 mt-4 justify-content-between'> */}
											<div>
												<label className='custm-Width100  textColorLight'>
													Descripción*
												</label>
												<textarea
													// form='usrform'
													className='form-control custm-Width100 custm-empleadoFormIntput'
													rows={4}
													cols={50}
													name='descripcionEmpleado'
													value={descripcionEmpleado}
													onChange={handleInputChange}
													placeholder='Escribe un breve detalle'
												></textarea>
											</div>

											{/* </div> */}

											{/* {error && (
												<div className='form-text textColorError'>
													<i className='bi bi-exclamation-circle'>{` `}</i>
													{error}.
												</div>
											)} */}
											<div className='d-flex justify-content-end mt-3'>
												{/* {!registerState.loading ? ( */}
												{!registerState.loading ? (
													<button className='custm-btnFormSubmit inputSubmit'>Enviar</button>
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
														Enviando...
													</button>
												)}
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

export default ModalNuevoReporteAdministrativo;
