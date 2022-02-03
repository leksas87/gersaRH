import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';

const ModalSeleccionarExcel = () => {
	// useState para mensaje de error
	const [errorMsg, setErrorMsg] = useState('');
	// useForm para el inputFile
	const [formValues, onchange] = useForm({
		archivoSeleccionado: '',
	});
	const { archivoSeleccionado } = formValues;

	//useState para manejo del checkbox
	const [checked, setChecked] = useState<boolean>(false);
	// handleClick que cambia el valor del check
	const handleClick = () => setChecked(!checked);

	//handleSubmit para el envio de lso datos del modal al Back
	const hanleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		//Validacion, si el formulario es correcto entonces...
		if (isFormValid()) {
			if (checked) {
				console.log('SendInvitations');

				// fetch('/',{
				// 	method:'POST',
				// 	body:formData
				// })
			} else {
				console.log('Do not send Invitations');
			}
		}
	};

	const isFormValid = (): boolean => {
		// El inputFile no debe estar vacío
		if (archivoSeleccionado === '') {
			setErrorMsg('Por favor seleccione un archivo');
			return false;
		}
		//Regresa estado a un string vacío
		setErrorMsg('');
		return true;
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
									{/* InputFile */}
									<div
										style={{
											width: '100%',
											padding: '4rem 0px 2rem 0px',
										}}
									>
										<input
											className={
												errorMsg === 'Por favor seleccione un archivo'
													? 'form-control custm-InputFile is-invalid'
													: 'form-control custm-InputFile '
											}
											type='file'
											name='archivoSeleccionado'
											id='formFile'
											accept='.xlsx,.xls'
											// required={true}
											value={archivoSeleccionado}
											onChange={onchange}
										/>
										{errorMsg && (
											<div className='form-text textColorError'>
												<i className='bi bi-exclamation-circle'>{` `}</i>
												{errorMsg}.
											</div>
										)}
									</div>
									<div>
										<div className='form-check form-switch'>
											<input
												className='form-check-input custm-InputSwitch'
												type='checkbox'
												id='switchModalImportFile'
												onClick={handleClick}
												// checked={checked}
												defaultChecked={checked}
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
