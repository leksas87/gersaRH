import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { patchtimeRequestById } from '../../actions/timeRequest/timeRequestActions';
import { useForm } from '../../hooks/useForm';

const ModalAutorizarHorasExtras = ({ timeRequest, employeeId }: any) => {
	//dispatch para ejecutar las actions
	const dispatch = useDispatch();
	const initialState = {
		descripcionEmpleado: '',
	};
	//Uso de hook useForm para manejo de campos en el formulario
	const [values, handleInputChange] = useForm(initialState);
	//Desestructuracion de elemtos
	const { descripcionEmpleado } = values;
	//Estado para error
	const [error, setError] = useState('');

	//Aceptar Solicitud
	const attendRequestAccept = () => {
		if (descripcionEmpleado) {
			setError('');
			dispatch(
				patchtimeRequestById(
					timeRequest,
					{
						descripcionEmpleado: descripcionEmpleado,
						statusId: 2,
					},
					`modalAutorizarHorasExtras${timeRequest}`,
					employeeId
				)
			);
		} else {
			setError('Escribe una breve descripción');
		}
	};
	//Rechazar Solicitud
	const attendRequestReject = () => {
		if (descripcionEmpleado) {
			setError('');
			dispatch(
				patchtimeRequestById(
					timeRequest,
					{
						descripcionEmpleado: descripcionEmpleado,
						statusId: 3,
					},
					`modalAutorizarHorasExtras${timeRequest}`,
					employeeId
				)
			);
		} else {
			setError('Escribe una breve descripción');
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
					data-bs-target={`#modalAutorizarHorasExtras${timeRequest}`}
				>
					Responder Solicitud
				</button>

				{/* <!-- Modal --> */}
				<div
					className='modal fade'
					id={`modalAutorizarHorasExtras${timeRequest}`}
					tabIndex={-1}
					aria-labelledby={`modalAutorizarHorasExtras${timeRequest}`}
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
									<i className='bi bi-stopwatch' />
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
											Responder solicitud de horas extras
										</label>
										<label
											className='textColorLight fw-light mt-2'
											style={{ lineHeight: '15px' }}
										>
											Completa la información siguiente para enviar una respuesta a la
											solicitud.
										</label>
									</div>
									<div
										style={{
											width: '100%',
											paddingTop: '1.5rem',
										}}
									>
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
												required
											></textarea>
										</div>
										{error && (
											<div className='form-text textColorError'>
												<i className='bi bi-exclamation-circle'>{` `}</i>
												{error}.
											</div>
										)}
										<div className='d-flex justify-content-center mt-4'>
											<button
												type='button'
												onClick={attendRequestAccept}
												className='btn custm-btnAccept p-3 m-3'
											>
												Aceptar solicitud
											</button>
											<button
												type='button'
												onClick={attendRequestReject}
												className='btn custm-btnDeny p-3 m-3'
											>
												Rechazar solicitud
											</button>
										</div>
										{/* </div> */}

										{/* {error && (
												<div className='form-text textColorError'>
													<i className='bi bi-exclamation-circle'>{` `}</i>
													{error}.
												</div>
											)} */}
										<div className='d-flex justify-content-end'>
											{/* {!registerState.loading ? ( */}
											{/* {!registerState.loading ? (
													<button type='submit' className='custm-btnFormSubmit inputSubmit'>
														Enviar solicitud
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
														Enviando solicitud...
													</button>
												)} */}
										</div>
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

export default ModalAutorizarHorasExtras;
