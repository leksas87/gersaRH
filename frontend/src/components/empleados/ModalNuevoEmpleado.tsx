import { useState } from 'react';

import validator from 'validator';
import { iNuevoEmpleado } from '../../interfaces/interfaces';
import { useForm } from '../../hooks/useForm';
import './ModalNuevoEmpleado.css';
import { useDispatch } from 'react-redux';
import { registerNewUser } from '../../actions/usersActions/usersActions';

const ModalNuevoEmpleado = () => {
	const dispatch = useDispatch();

	//useState para mensaje de error
	const [error, setError] = useState<string>('');

	//useState para manejo del checkbox
	const [checked, setChecked] = useState<boolean>(false);
	const handleClick = () => setChecked(!checked);

	//objeto user para formulario Registro
	const employee: iNuevoEmpleado = {
		name: '',
		apellidos: '',
		correo: '',
		phone: '',
	};
	//Uso de hook useForm para manejo de campos en el formulario
	const [formValues, handleInputChange] = useForm(employee);
	//Desestructuracion de propiedades
	const { name, apellidos, correo, phone } = formValues;

	//handeRegister para registro del formulario
	const handeRegister = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		//Si el formulario es valido entonces dispatch startLogin...
		if (isFormValid()) {
			dispatch(registerNewUser(name, apellidos, correo, phone, checked));
		}
	};

	//Validación de formulario
	const isFormValid = (): boolean => {
		// El campo usuario no deve estar vacío
		if (
			name.trim().length === 0 &&
			apellidos.trim().length === 0 &&
			!validator.isEmail(correo) &&
			phone.trim().length < 10
		) {
			setError('Nombre, apellidos, correo y numero de telefono son requeridos');
			return false;
		} else if (
			name.trim().length === 0 &&
			apellidos.trim().length === 0 &&
			!validator.isEmail(correo)
		) {
			setError('Nombre, apellidos y correo son requerido');
			return false;
		} else if (
			apellidos.trim().length === 0 &&
			!validator.isEmail(correo) &&
			phone.trim().length < 10
		) {
			setError('Apellidos, correo y numero de telefono son requerido');
			return false;
		} else if (
			name.trim().length === 0 &&
			apellidos.trim().length === 0 &&
			phone.trim().length < 10
		) {
			setError('Nombre, apellidos y numero de telefono son requerido');
			return false;
		} else if (
			name.trim().length === 0 &&
			!validator.isEmail(correo) &&
			phone.trim().length < 10
		) {
			setError('Nombre, correo y numero de telefono son requerido');
			return false;
		} else if (name.trim().length === 0 && apellidos.trim().length === 0) {
			setError('Nombre y apellidos son requerido');
			return false;
		} else if (name.trim().length === 0 && !validator.isEmail(correo)) {
			setError('Nombre y correo son requerido');
			return false;
		} else if (name.trim().length === 0 && phone.trim().length < 10) {
			setError('Nombre y numero de telefono son requerido');
			return false;
		} else if (apellidos.trim().length === 0 && !validator.isEmail(correo)) {
			setError('Apellidos y correo son requerido');
			return false;
		} else if (apellidos.trim().length === 0 && phone.trim().length < 10) {
			setError('Apellidos y numero de telefono son requerido');
			return false;
		} else if (!validator.isEmail(correo) && phone.trim().length < 10) {
			setError('Correo y numero de telefono son requerido');
			return false;
		} else if (name.trim().length === 0) {
			setError('Nombre es requerido');
			return false;
		} else if (apellidos.trim().length === 0) {
			setError('Apellidos son requerido');
			return false;
		} else if (!validator.isEmail(correo)) {
			setError('Correo electronico no es valido');
			return false;
		} else if (phone.trim().length < 10) {
			setError('Numero de telefono debe tener 10 digitos');
			return false;
		}
		//Resetea estado a un string vacío
		setError('');
		return true;
	};

	return (
		<>
			<div>
				{/* <!-- Button para activar modal --> */}
				<button
					type='button'
					className='btn custm-btnNuevoEmpleado custmBtnActions'
					data-bs-toggle='modal'
					data-bs-target='#exampleModal'
				>
					+ Nuevo empleado
				</button>

				{/* <!-- Modal --> */}
				<div
					className='modal fade'
					id='exampleModal'
					tabIndex={-1}
					aria-labelledby='exampleModalLabel'
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
									<i className='bi bi-person-plus-fill' />
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
										<label className='textColorPrimary fs-2'>Crear empleado</label>
										<label
											className='textColorLight fw-light mt-2'
											style={{ lineHeight: '15px' }}
										>
											Completa la información siguiente para añadir un nuevo empleado.
										</label>
									</div>
									<div
										style={{
											width: '100%',
											paddingTop: '1.5rem',
										}}
									>
										<form onSubmit={handeRegister}>
											<div className='custm-inputGird'>
												<div className='grid-area-Name'>
													<label htmlFor='recipient-name' className='col-form-label'>
														Nombre*
													</label>
													<input
														type='text'
														className={
															error ===
																'Nombre, apellidos, correo y numero de telefono son requeridos' ||
															error === 'Nombre es requerido' ||
															error === 'Nombre, correo y numero de telefono son requerido' ||
															error ===
																'Nombre, apellidos y numero de telefono son requerido' ||
															error === 'Nombre, apellidos y correo son requeridos' ||
															error === 'Nombre y apellidos son requerido' ||
															error === 'Nombre y correo son requerido' ||
															error === 'Nombre y numero de telefono son requerido'
																? 'custm-input form-control is-invalid'
																: 'custm-input form-control'
														}
														id='recipient-name'
														name='name'
														value={name}
														placeholder='Ingresa el nombre'
														aria-describedby='registerName'
														autoComplete='off'
														onChange={handleInputChange}
													/>
												</div>
												<div className='grid-area-Apellido'>
													<label htmlFor='recipient-name' className='col-form-label'>
														Apellidos*
													</label>
													<input
														type='text'
														className={
															error ===
																'Nombre, apellidos, correo y numero de telefono son requeridos' ||
															error === 'Apellidos son requerido' ||
															error ===
																'Nombre, apellidos y numero de telefono son requerido' ||
															error ===
																'Apellidos, correo y numero de telefono son requerido' ||
															error === 'Nombre, apellidos y correo son requeridos' ||
															error === 'Apellidos y numero de telefono son requerido' ||
															error === 'Nombre y apellidos son requerido' ||
															error === 'Apellidos y correo son requerido'
																? 'custm-input form-control is-invalid'
																: 'custm-input form-control'
														}
														id='recipient-apellido'
														name='apellidos'
														value={apellidos}
														placeholder='Ingresa el apellido'
														aria-describedby='registerLastName'
														autoComplete='off'
														onChange={handleInputChange}
													/>
												</div>
											</div>
											<label htmlFor='recipient-name' className='col-form-label'>
												Correo electrónico*
											</label>
											<input
												type='text'
												className={
													error ===
														'Nombre, apellidos, correo y numero de telefono son requeridos' ||
													error === 'Correo electronico no es valido' ||
													error === 'Nombre, correo y numero de telefono son requerido' ||
													error === 'Apellidos, correo y numero de telefono son requerido' ||
													error === 'Nombre, apellidos y correo son requeridos' ||
													error === 'Correo y numero de telefono son requerido' ||
													error === 'Nombre y correo son requerido' ||
													error === 'Apellidos y correo son requerido'
														? 'custm-input form-control is-invalid'
														: 'custm-input form-control'
												}
												id='recipient-name-email'
												name='correo'
												value={correo}
												placeholder='Ingresa el correo electronico'
												aria-describedby='registerEmail'
												autoComplete='off'
												onChange={handleInputChange}
											/>
											<label htmlFor='recipient-name' className='col-form-label'>
												Numero de telefono*
											</label>
											<input
												type='text'
												className={
													error ===
														'Nombre, apellidos, correo y numero de telefono son requeridos' ||
													error === 'Nombre, correo y numero de telefono son requerido' ||
													error === 'Nombre, apellidos y numero de telefono son requerido' ||
													error === 'Apellidos, correo y numero de telefono son requerido' ||
													error === 'Apellidos y numero de telefono son requerido' ||
													error === 'Correo y numero de telefono son requerido' ||
													error === 'Nombre y numero de telefono son requerido' ||
													error === 'Numero de telefono debe tener 10 digitos'
														? 'custm-input form-control is-invalid'
														: 'custm-input form-control'
												}
												id='recipient-name-phone'
												name='phone'
												value={phone}
												placeholder='Ingresa el numero de telefono'
												aria-describedby='registerPhone'
												autoComplete='off'
												onChange={handleInputChange}
											/>
											<div className='form-check form-switch mt-4'>
												<input
													className='form-check-input custm-InputSwitch'
													type='checkbox'
													name='sendInvitation'
													// value={sendInvitation}
													id='switchModalNewEmployee'
													onClick={handleClick}
													// checked={checked}
													defaultChecked={checked}
												/>
												<label
													className='form-check-label'
													htmlFor='switchModalNewEmployee'
												>
													Enviar invitación al sistema GersaRH
												</label>
											</div>
											{error && (
												<div className='form-text textColorError'>
													<i className='bi bi-exclamation-circle'>{` `}</i>
													{error}.
												</div>
											)}
											<div className='d-flex justify-content-end'>
												<button className='custm-btnFormSubmit inputSubmit'>
													Guardar empleado
												</button>
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

export default ModalNuevoEmpleado;
