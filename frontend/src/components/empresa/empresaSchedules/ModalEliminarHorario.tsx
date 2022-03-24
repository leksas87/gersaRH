import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSchedules } from '../../../actions/scheduleActions/scheduleActions';
import { RootSote } from '../../../store/Store';

const ModalEliminarHorario = () => {
	//dispatch para ejecutar las Actions
	const dispatch = useDispatch();
	//Se necesita el state que contiene los datos de los schedules
	const { schedulesToDelete } = useSelector(
		(state: RootSote) => state.schedules
	);

	//Submit del modal
	const hanleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(deleteSchedules(schedulesToDelete.id));
	};

	return (
		<div>
			{/* <!-- Modal --> */}
			<div
				className='modal fade'
				id='ModalEliminarSchedule'
				tabIndex={-1}
				aria-labelledby='ModalEliminarSchedule'
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
							{/* <div className='custm-modalIcon d-flex justify-content-center align-items-center'>
								<i className='bi bi-person-dash textColorError2' />
                                
							</div> */}
							<div
								className='custm-modalIcon d-flex justify-content-center align-items-center'
								style={{ position: 'relative' }}
							>
								<div
									className='d-flex justify-content-center align-items-center'
									style={{
										position: 'absolute',
										backgroundColor: 'var(--backgroundPrimary)',
										borderRadius: '50%',
										width: '35px',
										height: '35px',
										right: '10px',
										bottom: '18px',
									}}
								>
									<i
										style={{ fontSize: '1.8rem' }}
										className='bi bi-dash-circle textColorError2'
									/>
								</div>
								<i className='bi bi-calendar-week textColorError2' />
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
									<label className='textColorPrimary fs-2 mt-3'>Eliminar horario</label>
									<label
										className='textColorLight fw-light mt-4'
										style={{
											lineHeight: '20px',
											marginTop: '1rem',
											textAlign: 'justify',
											letterSpacing: '.5px',
										}}
									>
										El horario{' '}
										<span className='fw-bold'>{schedulesToDelete.scheduleName}</span> será
										eliminado definitivamente.
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
											Eliminar horario
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

export default ModalEliminarHorario;
