import { useDispatch, useSelector } from 'react-redux';
import { registerNewRequest } from '../../actions/requestActions/requestActions';
import { useForm } from '../../hooks/useForm';
import { RootSote } from '../../store/Store';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import { useState } from 'react';
const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID_S3AWS;
const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY_S3AWS;

const S3_BUCKET = 'gersarequestfiles';
const REGION = 'us-east-1';

AWS.config.update({
	accessKeyId: accessKeyId,
	secretAccessKey: secretAccessKey,
});

const myBucket = new AWS.S3({
	params: { Bucket: S3_BUCKET },
	region: REGION,
});

const ModalNuevaSolicitudFalta = () => {
	//dispatch para ejecutar Actions
	const dispatch = useDispatch();

	//Senecesita el state que indica  el perfilEmpleado
	const { empleadoData } = useSelector((state: RootSote) => state.auth);
	const { registerState } = useSelector((state: RootSote) => state.request);
	//objeto user para formulario Registro
	const newRequest = {
		fechaFin: '',
		fechaInicio: '',
		descripcionEmpleado: '',
		statusId: 1,
		employeeId: empleadoData.id,
		requestTypeId: 1,
	};
	//Uso de hook useForm para manejo de campos en el formulario
	const [formValues, handleInputChange] = useForm(newRequest);
	//estado para mostrar la carga del inputFile
	const [progress, setProgress] = useState(0);
	//Estado para guardar el nombre Key del InputFile
	const [inputFileName, setInputFileName] = useState('');

	//Desestructuracion de propiedades
	const { fechaFin, fechaInicio, descripcionEmpleado } = formValues;

	const handeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (empleadoData.id) {
			dispatch(
				registerNewRequest(
					{
						fechaFin: fechaFin,
						fechaInicio: fechaInicio,
						descripcionEmpleado: descripcionEmpleado,
						statusId: 1,
						employeeId: empleadoData.id,
						requestTypeId: 3,
						adjunto: inputFileName,
					},
					empleadoData.id,
					'modalSolicitudIncapacidad'
				)
			);
		} else {
			console.log('Error falta userId');
		}
	};
	//Metodo que carga el file
	const handleFileInput = (e: any) => {
		setProgress(0);
		// setSelectedFile(e.target.files[0]);
		const file = e.target.files[0];
		const keyName = `${uuidv4()}.${file.name.split('.').pop()}`;
		setInputFileName(keyName);

		const params = {
			Body: file,
			Bucket: S3_BUCKET,
			Key: keyName,
		};

		myBucket
			.putObject(params)
			.on('httpUploadProgress', (evt) => {
				setProgress(Math.round((evt.loaded / evt.total) * 100));
			})
			.send((err) => {
				if (err) console.log(err);
			});
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
					data-bs-target='#modalSolicitudIncapacidad'
				>
					+ Nueva solicitud
				</button>

				{/* <!-- Modal --> */}
				<div
					className='modal fade'
					id='modalSolicitudIncapacidad'
					tabIndex={-1}
					aria-labelledby='modalSolicitudIncapacidad'
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
									<i className='bi bi-window-plus' />
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
										<label className='textColorPrimary fs-2'>Solicitud personal</label>
										<label
											className='textColorLight fw-light mt-2'
											style={{ lineHeight: '15px' }}
										>
											Completa la información siguiente para crear una nueva solicitud
											personal.
										</label>
									</div>
									<div
										style={{
											width: '100%',
											paddingTop: '1.5rem',
										}}
									>
										<form onSubmit={handeSubmit}>
											<div className='d-flex mb-4 mt-4 justify-content-between flex-wrap'>
												<div>
													<label className='custm-Width100  textColorLight'>
														Fecha inicio*
													</label>

													<input
														className='form-control custm-Width100 custm-empleadoFormIntput'
														type='date'
														// placeholder={perfilEmpleado.ciudad}
														name='fechaInicio'
														value={fechaInicio}
														onChange={handleInputChange}
														required
													/>
												</div>
												<div>
													<label className='custm-Width100  textColorLight'>
														Fecha fin*
													</label>

													<input
														className='form-control custm-Width100 custm-empleadoFormIntput'
														type='date'
														// placeholder={perfilEmpleado.codigoPostal.toString()}
														name='fechaFin'
														value={fechaFin}
														onChange={handleInputChange}
														required
													/>
												</div>
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
													placeholder='Escribe un breve detalle.'
													required
												></textarea>
											</div>
											<div className='mt-4'>
												<label className='custm-Width100  textColorLight'>
													Selecciona un comprobante*
												</label>
												<input
													className='form-control custm-InputFile'
													type='file'
													onChange={handleFileInput}
												/>

												<div>El progreso de la carga del archivo es del {progress}%</div>
											</div>

											<div className='d-flex justify-content-end mt-4'>
												{!registerState.loading ? (
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

export default ModalNuevaSolicitudFalta;
