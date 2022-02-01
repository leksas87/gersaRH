import React from 'react';

const ModalSeleccionarExcel = () => {
	const hanleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Submit Excel');
	};
	return (
		<div>
			{/* <!-- Modal --> */}
			<div
				className='modal fade'
				id='ModalSeleccionarExcel'
				tabIndex={-1}
				aria-labelledby='ModalSeleccionarExcel'
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
								{/* <i className='bi bi-person-plus-fill' /> */}
								<i className='bi bi-people' />
							</div>
							<button
								type='button'
								className='btn-close custm-iconExit'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='d-flex justify-content-center' style={{ width: '100%' }}>
							<div className='d-flex flex-column' style={{ width: '82%' }}>
								<div
									className='d-flex flex-column'
									style={{ maxWidth: '100%', lineHeight: '28px', marginTop: '1rem' }}
								>
									<label className='textColorPrimary fs-2'>Importar empleados</label>
									<label
										className='textColorLight fw-light'
										style={{
											lineHeight: '20px',
											marginTop: '1rem',
											textAlign: 'justify',
											letterSpacing: '.5px',
										}}
									>
										En nuestra plantilla de Excel añade los datos de tus empleados. Una
										vez rellena, sube aquí el archivo para importar la información de tus
										empleados.
									</label>
								</div>
								<form onSubmit={hanleSubmit}>
									<div
										style={{
											width: '100%',
											padding: '4rem 0px 2rem 0px',
										}}
									>
										<input
											className='form-control custm-InputFile'
											type='file'
											id='formFile'
										/>
									</div>
									<div>
										<div className='form-check form-switch'>
											<input
												className='form-check-input custm-InputSwitch'
												type='checkbox'
												id='switchModalImportFile'
											/>
											<label className='form-check-label' htmlFor='switchModalImportFile'>
												Enviar invitación al sistema GersaRH
											</label>
										</div>
									</div>
									<div className='d-flex justify-content-end'>
										<button type='submit' className='custm-btnFormSubmit inputSubmit'>
											Importar Archivo
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalSeleccionarExcel;
