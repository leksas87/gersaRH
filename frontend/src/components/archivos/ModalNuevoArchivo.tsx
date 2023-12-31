import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootSote } from '../../store/Store';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import { registerNewFile } from '../../actions/archivosActions/archivosActions';
const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID_S3AWS;
const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY_S3AWS;

const S3_BUCKET = 'gersarhfiles';
const REGION = 'us-east-1';

AWS.config.update({
	accessKeyId: accessKeyId,
	secretAccessKey: secretAccessKey,
});

const myBucket = new AWS.S3({
	params: { Bucket: S3_BUCKET },
	region: REGION,
});

const ModalNuevoArchivo = () => {
	const dispatch = useDispatch();
	//Senecesita el state que indica  el perfilEmpleado
	const { empleadoData } = useSelector((state: RootSote) => state.auth);
	const { registerFileState } = useSelector((state: RootSote) => state.files);
	//objeto user para formulario Registro
	const newRequest = {
		nombreArchivo: '',
		url: '',
	};
	//estado para mostrar la carga del inputFile
	const [progress, setProgress] = useState(0);
	//Estado para guardar el nombre Key del InputFile
	const [inputFile, setInputFile] = useState(newRequest);

	const handeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (empleadoData.id) {
			dispatch(
				registerNewFile(
					{
						employeeId: empleadoData.id,
						employeeIdUpload: empleadoData.id,
						nombreArchivo: inputFile.nombreArchivo,
						ubicacionCarpeta: 'empleado/personales',
						url: inputFile.url,
						tipoDocumento: 1,
					},
					'modalNuevoArchivo',
					empleadoData.id,
					1,
					'empleado/personales'
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
		// setInputFileName(keyName);
		setInputFile({
			nombreArchivo: file.name,
			url: keyName,
		});

		const params = {
			Body: file,
			Bucket: S3_BUCKET,
			Key: keyName,
			ContentType: file.type,
 		};
		console.log('FILETYPE:::',file.type);

		myBucket
			.putObject(params)
			.on('httpUploadProgress', (evt) => {
				setProgress(Math.round((evt.loaded / evt.total) * 100));
			})
			.send((err) => {
				if (err) console.log(err);
			});
	};

	useEffect(() => {
		function toclose(e: any) {
			(document.getElementById('inputUpFile') as HTMLInputElement).value = '';
		}

		const myModalEl = document.getElementById('modalNuevoArchivo');
		if (myModalEl) {
			myModalEl.addEventListener('hidden.bs.modal', toclose);
		}

		return () => {
			myModalEl?.removeEventListener('hidden.bs.modal', toclose);
		};
	}, []);

	return (
		<>
			<div>
				{/* <!-- Button para activar modal --> */}
				<button
					type='button'
					className='custm-btnFormSubmitModal inputSubmit'
					style={{ height: 'auto' }}
					data-bs-toggle='modal'
					data-bs-target='#modalNuevoArchivo'
				>
					+ Nuevo
				</button>

				{/* <!-- Modal --> */}
				<div
					className='modal fade'
					id='modalNuevoArchivo'
					tabIndex={-1}
					aria-labelledby='modalNuevoArchivo'
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
									<i className='bi bi-folder-fill' />
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
										<label className='textColorPrimary fs-2'>Subir nuevo archivo</label>
										<label
											className='textColorLight fw-light mt-2'
											style={{ lineHeight: '15px' }}
										>
											Selecciona un archivo para guardarlo en tu carpeta de
											archivos/empelado.
										</label>
									</div>
									<div
										style={{
											width: '100%',
											paddingTop: '1.5rem',
										}}
									>
										<form onSubmit={handeSubmit}>
											<div className='mt-4'>
												<label className='custm-Width100  textColorLight'>
													Selecciona un archivo*
												</label>
												<input
													id='inputUpFile'
													className='form-control custm-InputFile'
													type='file'
													onChange={handleFileInput}
												/>

												<div>El progreso de la carga del archivo es del {progress}%</div>
											</div>
											<div className='d-flex justify-content-end mt-4'>
												{!registerFileState.loading ? (
													<button type='submit' className='custm-btnFormSubmit inputSubmit'>
														Subir archivo
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
														Subiendo...
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

export default ModalNuevoArchivo;
