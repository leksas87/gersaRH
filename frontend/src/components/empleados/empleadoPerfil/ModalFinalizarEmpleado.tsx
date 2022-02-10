import { useDispatch, useSelector } from 'react-redux';
import { terminateUserById } from '../../../actions/usersActions/usersActions';
import { RootSote } from '../../../store/Store';

const ModalFinalizarEmpleado = () => {
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilUsuario } = useSelector((state: RootSote) => state.users);
	//useDispath para ejecutar las Actions
	const dispatch = useDispatch();

	//handleSubmit para el envio de lso datos del modal al Back
	const hanleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(terminateUserById(perfilUsuario.id));
	};

	return (
		<div>
			{/* <!-- Modal Finalizar Empleado --> */}
			<div
				className='modal fade'
				id='ModalFinalizarEmpleado'
				tabIndex={-1}
				aria-labelledby='ModalFinalizarEmpleado'
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
								<i className='i bi-person-x textColorError2' />
							</div>
							<button
								type='button'
								className='btn-close custm-iconExit'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div
							className='d-flex justify-content-center custm-Width100'
							style={{
								height: '50%',
							}}
						>
							<div
								className='d-flex flex-column justify-content-between'
								style={{ width: '82%' }}
							>
								<div
									className='d-flex flex-column'
									style={{ maxWidth: '100%', lineHeight: '28px', marginTop: '1rem' }}
								>
									<label className='textColorPrimary fs-2 mt-3'>
										Finalizar{' '}
										<span className='text-capitalize'>{perfilUsuario.firstName}</span>
									</label>
									<label
										className='textColorLight fw-light mt-4'
										style={{
											lineHeight: '20px',
											marginTop: '1rem',
											textAlign: 'justify',
											letterSpacing: '.5px',
										}}
									>
										Los empleados finalizados no podrán acceder a Gersa RH ni recibir
										ninguna notificación.
									</label>
								</div>
								<form onSubmit={hanleSubmit}>
									<div className='d-flex justify-content-end pt-5'>
										<button
											className='btn btn-outline-secondary m-1'
											type='button'
											data-bs-dismiss='modal'
											aria-label='Close'
										>
											Cancelar
										</button>
										<button type='submit' className=' btn btn-outline-danger m-1'>
											Finalizar empleado
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

export default ModalFinalizarEmpleado;
