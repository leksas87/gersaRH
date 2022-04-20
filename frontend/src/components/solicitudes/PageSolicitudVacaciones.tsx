import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRequestsByEmployeeId } from '../../actions/requestActions/requestActions';
import { RootSote } from '../../store/Store';
import ModalNuevaSolicitudVacaciones from './ModalNuevaSolicitudVacaciones';

const PageSolicitudVacaciones = () => {
	//Dispatch para ejecutar las actions
	const dispatch = useDispatch();

	//Se necesita el estado que indiccá el employeeId
	const { empleadoData } = useSelector((state: RootSote) => state.auth);
	//Se necesita el state que indica la lsita de Request
	const { requestList } = useSelector((state: RootSote) => state.request);

	//useNavigate para redireccionar a la página principal de solicitudes
	const navigate = useNavigate();

	const navigateMenu = () => {
		navigate('/solicitudes');
	};

	useEffect(() => {
		if (empleadoData.id) {
			dispatch(getRequestsByEmployeeId(empleadoData.id));
		}
	}, [dispatch, empleadoData.id]);
	return (
		<>
			<div className='custm-empleadosHead justify-content-between'>
				<button className='btn fs-5' onClick={navigateMenu}>
					<i className='bi bi-arrow-left' />
				</button>

				<div
					className='textColorSecondary fs-4'
					style={{ textDecoration: 'underline' }}
				>
					Solicitud de Vacaciones
				</div>
				<ModalNuevaSolicitudVacaciones />
			</div>
			<div className='d-flex flex-column justify-content-center pt-4 p-4'>
				{/* Inicio */}
				<div className='d-flex flex-wrap custm-Width100 '>
					{/* Izquierda */}
					<div className='custm-PageContainerContent'>
						<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
							<div className='custm-Width100'>
								<i
									style={{ fontSize: '3rem', color: 'var(--textColorLink)' }}
									className='bi bi-calendar2-week-fill'
								/>
							</div>
							<div className='fs-4'>Solicitud de vacaciones</div>
							<div className='fs-5 textColorLight'>Crea y visualiza aquí</div>
							<div className='fs-5 textColorLight'>tus solicitudes de vacaciones</div>
							<div className='custm-underLineTittle'></div>
						</div>
					</div>
					{/* Derecha */}
					<div className='custm-PageContainerContent'>
						<div className='d-flex flex-column align-items-center custm-PageHistoryContainer'>
							<div className='fs-5 textColorLight mt-2'>Historial de solicitudes</div>
							{/* Inicio */}
							{requestList
								.filter((element) => {
									return element.requestTypeId === 1;
								})
								.map((request) => (
									<div
										key={request.id}
										className='d-flex flex-column custm-Width100 mt-3 custm-UnderLineSection p-3'
									>
										<div className='d-flex textColorSecondary'>
											<div style={{ width: '40%' }}>Fecha de solicitud:</div>
											<div style={{ width: '60%' }}>{request.fechaCreacion}</div>
										</div>
										<div className='d-flex textColorSecondary mt-3'>
											<div className='fw-bold' style={{ width: '40%' }}>
												Vacaciones:
											</div>
											<div className='d-flex' style={{ width: '60%' }}>
												<div className='d-flex flex-column pe-4'>
													<div>De:</div>
													<div className='textColorLight'>{request.fechaInicio}</div>
												</div>
												<div className='d-flex flex-column'>
													<div>A:</div>
													<div className='textColorLight'>{request.fechaFin}</div>
												</div>
											</div>
										</div>
										<div className='d-flex textColorSecondary mt-3'>
											<div style={{ width: '40%' }}>Descripción:</div>
											<div style={{ width: '60%' }}>{request.descripcionEmpleado}</div>
										</div>
										{request.statusId === 1 && (
											<>
												<div className='d-flex textColorSecondary mt-3'>
													<div style={{ width: '40%' }}>Estatus:</div>
													<div className='d-flex' style={{ width: '60%' }}>
														<span className='custm-Status1 pe-3'>● Pendiente</span>
														{/* <div className='d-flex'>
															<div>Adjunto:</div>
															<a
																className='fs-4  textColorSecondary'
																href={`https://www.google.com.mx/maps/`}
																target='_blank'
																rel='noopener noreferrer'
																style={{ textDecoration: 'none' }}
															>
																<i className='bi bi-paperclip' />
															</a>
														</div> */}
													</div>
												</div>
											</>
										)}
										{request.statusId !== 1 && (
											<>
												<div className='d-flex textColorSecondary mt-3'>
													<div style={{ width: '40%' }}>Estatus:</div>
													<div className='d-flex' style={{ width: '60%' }}>
														{request.statusId === 2 && (
															<div className='custm-Status2 ' style={{ width: '60%' }}>
																● Aceptada
															</div>
														)}
														{request.statusId === 3 && (
															<div className='custm-Status3 ' style={{ width: '65%' }}>
																● Rechazada
															</div>
														)}

														{/* <div className='d-flex'>
															<div>Adjunto:</div>
															<a
																className='fs-4  textColorSecondary'
																href={`https://www.google.com.mx/maps/`}
																target='_blank'
																rel='noopener noreferrer'
																style={{ textDecoration: 'none' }}
															>
																<i className='bi bi-paperclip' />
															</a>
														</div> */}
													</div>
												</div>

												<div className='d-flex textColorSecondary'>
													<div style={{ width: '40%' }}></div>
													<div className='textColorLight' style={{ width: '60%' }}>
														<div>Detalle de Respuesta:</div>
														{request.descriptionRespuesta}
													</div>
												</div>
											</>
										)}
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageSolicitudVacaciones;
