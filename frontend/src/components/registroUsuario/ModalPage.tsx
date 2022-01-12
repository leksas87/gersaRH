import './ModalPage.css';

export const ModalPage = () => {
	return (
		<div>
			<div
				className='modal fade'
				id='miModal'
				// tabIndex={-1}
				aria-hidden='true'
				aria-labelledby='modalTitle'
			>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content mdl-content'>
						<div className='custm-flex-container justify-content-start modal-header'>
							<div>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									className='bi bi-person-plus-fill icon-modal'
									viewBox='0 0 16 16'
								>
									<path d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
									<path
										fillRule='evenodd'
										d='M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z'
									/>
								</svg>
								<button
									className='btn-close btn-clo'
									data-bs-dismiss='modal'
									aria-label='Close'
								></button>
							</div>
							<h5 className='createTitle'>Crear empleado</h5>
							<p className='createPa'>
								completa la informacion siguiente para añadir un nuevo empleado.
							</p>
						</div>

						<div className='modal-body justify-content-start flex-container'>
							<form>
								<div className='mb-3'>
									<label htmlFor='recipient-name' className='col-form-label inputLabel'>
										Numero de empleado*
									</label>
									<input
										type='text'
										className='form-control colorInput'
										id='recipient-name-empleado'
									/>
								</div>
								<div className='mb-3 flex-container-1'>
									<div className='inputs'>
										<label htmlFor='recipient-name' className='col-form-label inputLabel'>
											Nombre*
										</label>
										<input
											type='text'
											className='form-control colorInputD'
											id='recipient-name'
										/>
									</div>
									<div className='inputs'>
										<label htmlFor='recipient-name' className='col-form-label inputLabel'>
											Apellidos*
										</label>
										<input
											type='text'
											className='form-control colorInputD'
											id='recipient-apellido'
										/>
									</div>
								</div>
								<div>
									<label htmlFor='recipient-name' className='col-form-label inputLabel'>
										Correo electronico*
									</label>
									<input
										type='text'
										className='form-control colorInput'
										id='recipient-name-email'
									/>
								</div>
								<div>
									<label htmlFor='recipient-name' className='col-form-label inputLabel'>
										Codigo de acceso*
									</label>
									<input
										type='text'
										className='form-control colorInput'
										id='recipient-name-email'
									/>
								</div>
							</form>
						</div>
						<div className='modal-footer'>
							<button className='btn btn-primary mt-4 shadow-sm inputSubmitmodal'>
								Guardar empleado
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
