import React, { useState } from 'react';

const ModalNuevoArchivoEmpresa = () => {
	//estado para mostrar la carga del inputFile
	const [progress, setProgress] = useState(0);

	const handeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('enviando');
	};
	return (
		<>
			<div>
				{/* <!-- Button para activar modal --> */}
				<button
					type='button'
					className='custm-btnFormSubmitModal inputSubmit'
					style={{ height: 'auto' }}
					data-bs-toggle='modal'
					data-bs-target='#modalNuevoArchivoEmpresa'
				>
					+ Nuevo
				</button>

				{/* <!-- Modal --> */}
				<div
					className='modal fade'
					id='modalNuevoArchivoEmpresa'
					tabIndex={-1}
					aria-labelledby='modalNuevoArchivoEmpresa'
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
										</label>
										<label
											className='textColorLight fw-light mt-2'
											style={{ lineHeight: '15px' }}
										>
											Archivos/Empresa
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
													className='form-control custm-InputFile'
													type='file'
													// onChange={handleFileInput}
												/>

												<div>El progreso de la carga del archivo es del {progress}%</div>
											</div>
											<div className='d-flex justify-content-end mt-4'>
												{/* {!registerState.loading ? ( */}
												{true ? (
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

export default ModalNuevoArchivoEmpresa;
