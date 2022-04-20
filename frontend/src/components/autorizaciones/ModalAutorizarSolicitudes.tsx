import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { patchRequestsById } from '../../actions/requestActions/requestActions';
import { useForm } from '../../hooks/useForm';

const ModalAutorizarSolicitudes = ({ request }: any) => {
	//dispatch para ejecutar las actions
	const dispatch = useDispatch();
	const initialState = {
		descriptionRespuesta: '',
	};
	//Uso de hook useForm para manejo de campos en el formulario
	const [values, handleInputChange] = useForm(initialState);
	//Desestructuracion de elemtos
	const { descriptionRespuesta } = values;
	//Estado para error
	const [error, setError] = useState('');

	//Aceptar Solicitud
	const attendRequestAccept = () => {
		if (descriptionRespuesta) {
			setError('');
			dispatch(
				patchRequestsById(request, `modalAutorizarSolicitudes${request}`, {
					statusId: 2,
					descriptionRespuesta: descriptionRespuesta,
				})
			);
		} else {
			setError('Escribe una breve descripción');
		}
	};
	//Rechazar Solicitud
	const attendRequestReject = () => {
		if (descriptionRespuesta) {
			setError('');
			dispatch(
				patchRequestsById(request, `modalAutorizarSolicitudes${request}`, {
					statusId: 3,
					descriptionRespuesta: descriptionRespuesta,
				})
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
					className='btn  custmBtnActions me-3 p-2 custm-btnAttend'
					style={{ height: 'auto' }}
					data-bs-toggle='modal'
					data-bs-target={`#modalAutorizarSolicitudes${request}`}
				>
					Responder Solicitud
				</button>

				{/* <!-- Modal --> */}
				<div
					className='modal fade'
					id={`modalAutorizarSolicitudes${request}`}
					tabIndex={-1}
					aria-labelledby={`modalAutorizarSolicitudes${request}`}
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
									<i className='bi bi-calendar-date' />
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
										<label className='textColorPrimary fs-2'>Responder solicitud</label>
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
										<div>
											<label className='custm-Width100  textColorLight'>
												Descripción*
											</label>
											<textarea
												// form='usrform'
												className='form-control custm-Width100 custm-empleadoFormIntput'
												rows={4}
												cols={50}
												name='descriptionRespuesta'
												value={descriptionRespuesta}
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

export default ModalAutorizarSolicitudes;
