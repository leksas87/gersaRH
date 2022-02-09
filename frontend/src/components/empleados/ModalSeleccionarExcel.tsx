import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerNewUsersSend } from '../../actions/usersActions/usersActions';
import { useForm } from '../../hooks/useForm';
import { RootSote } from '../../store/Store';

const ModalSeleccionarExcel = () => {
	//Senecesita el state que indica si el usuario está autenticado o no
	const { registerState } = useSelector((state: RootSote) => state.users);
	//dispatch para ejecutar Actions
	const dispatch = useDispatch();
	// useState para mensaje de error
	const [errorMsg, setErrorMsg] = useState('');
	// useForm para el inputFile
	const [formValues, onchange] = useForm({
		uploadfile: '',
	});
	const { uploadfile } = formValues;

	//useState para manejo del checkbox
	const [checked, setChecked] = useState<boolean>(false);
	// handleClick que cambia el valor del check
	const handleClick = () => setChecked(!checked);

	//handleSubmit para el envio de lso datos del modal al Back
	const hanleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		//Validacion, si el formulario es correcto entonces... Enviar Excel
		if (isFormValid()) {
			if (checked) dispatch(registerNewUsersSend(formData, 'donotsend'));
			else dispatch(registerNewUsersSend(formData, 'send'));
		}
	};

	const isFormValid = (): boolean => {
		// El inputFile no debe estar vacío
		if (uploadfile === '') {
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
											name='uploadfile'
											id='formFile'
											accept='.xlsx,.xls'
											// required={true}
											value={uploadfile}
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
										{registerState ? (
											<button type='submit' className='custm-btnFormSubmit inputSubmit'>
												Importar Archivo
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
										)}
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
