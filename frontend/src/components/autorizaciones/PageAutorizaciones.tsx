import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRequests } from '../../actions/requestActions/requestActions';
import { useForm } from '../../hooks/useForm';
import { RootSote } from '../../store/Store';
import ModalAutorizarSolicitudes from './ModalAutorizarSolicitudes';
import './PageAutorizaciones.css';
const baseUrlRequestFilesS3 = process.env.REACT_APP_GERSA_REQUEST_BUCKET_S3;
const PageAutorizaciones = () => {
	//dispatch para ejecutar las actions
	const dispatch = useDispatch();
	//Se necesita el state que indica el requestList
	const { requestList } = useSelector((state: RootSote) => state.request);

	//objeto user para formulario Registro
	const initialState = {
		sortBy: '',
	};
	//Uso de hook useForm para manejo de campos en el formulario
	const [sortValues, handleInputChange] = useForm(initialState);
	//Desestructuracion
	const { sortBy } = sortValues;

	useEffect(() => {
		dispatch(getRequests());
	}, [dispatch]);

	return (
		<>
			<div className='custm-empleadosContainer rounded-3 shadow mt-4'>
				<div className='custm-empleadosHead justify-content-center'>
					<div
						className='textColorSecondary fs-4'
						style={{ textDecoration: 'underline' }}
					>
						Autorizaciones
					</div>
				</div>
				<div className='d-flex flex-column justify-content-center pt-4 p-4'>
					<div className='d-flex flex-column align-items-center'>
						<div className='d-flex '>
							<div>
								<i
									style={{ fontSize: '3rem', color: 'var(--colorSecondary)' }}
									className='bi bi-calendar-week'
								/>
							</div>
							<div className='d-flex flex-column align-items-center custm-width100'>
								<div
									className='text-center fs-5 textColorLight'
									style={{ maxWidth: '400px' }}
								>
									Aquí se muestra el historial de solicitudes. (Pendientes, aceptadas y
									rechazadas)
								</div>
								<div style={{ color: 'var(--textColorLink)' }}>____________</div>
							</div>
						</div>

						<div className='d-flex flex-column align-items-center custm-PageHistoryContainer mt-4'>
							<div className='d-flex justify-content-between custm-Width100 p-1'>
								<div />
								<div className='textColorSecondary fs-5'>Solicitudes</div>
								<div className=' ms-1 d-flex align-items-center'>
									<div>Filtrar por:</div>
									<div className='ms-2'>
										<select
											className='form-select form-control'
											value={sortBy}
											name='sortBy'
											onChange={handleInputChange}
										>
											<option value=''>Todos</option>
											<option value='2'>Aceptadas</option>
											<option value='3'>Rechazadas</option>
											<option value='1'>Pendientes</option>
										</select>
									</div>
								</div>
							</div>
							{/* Inicio */}
							{requestList
								.filter((element) => {
									if (!sortBy) return true;

									return element.statusId === parseInt(sortBy);
								})
								.map((request) => (
									<div
										key={request.id}
										className='d-flex flex-wrap custm-UnderLineSectionDark mt-4'
									>
										<div
											className='d-flex flex-column  p-3 custm-solicitudContaiter50'
											// style={{ width: '50%', minWidth: '300px' }}
										>
											<div className='d-flex textColorSecondary'>
												<div style={{ width: '40%' }}>Fecha de solicitud:</div>
												<div style={{ width: '60%' }}>{request.fechaCreacion}</div>
											</div>
											<div className='d-flex textColorSecondary mt-3 text-capitalize'>
												<div style={{ width: '40%' }}>Empleado:</div>
												<div style={{ width: '60%' }}>
													{request.employee.User.firstName} {request.employee.User.lastName}
												</div>
											</div>
											<div className='d-flex textColorSecondary mt-3'>
												<div style={{ width: '40%' }}>Lugar de trabajo:</div>
												<div style={{ width: '60%' }}>
													{request.employee.lugarDeTrabajo}
												</div>
											</div>
											<div className='d-flex textColorSecondary mt-3'>
												{request.requestTypeId === 1 && (
													<div className='fw-bold' style={{ width: '40%' }}>
														Vacaciones:
													</div>
												)}
												{request.requestTypeId === 2 && (
													<div className='fw-bold' style={{ width: '40%' }}>
														Incapacidad:
													</div>
												)}
												{request.requestTypeId === 3 && (
													<div className='fw-bold' style={{ width: '40%' }}>
														Falta:
													</div>
												)}
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
												<div style={{ width: '40%' }}>Detalle de la solicitud:</div>
												<div style={{ width: '60%' }}>{request.descripcionEmpleado}</div>
											</div>
										</div>
										{/* Derecha */}
										<div className='custm-solicitudContaiter50 d-flex flex-column justify-content-center align-items-center mb-4'>
											{request.statusId === 1 && (
												<>
													<div className='d-flex textColorSecondary mt-2 mb-1'>
														<div className='fw-bold me-2' style={{ width: '40%' }}>
															Estatus:
														</div>
														<div className='custm-Status1 ' style={{ width: '60%' }}>
															● Pendiente
														</div>
													</div>
													{request.adjunto && (
														<div className='d-flex ms-1'>
															<div>Adjunto:</div>
															<a
																className='fs-4  textColorSecondary'
																href={`${baseUrlRequestFilesS3}${request.adjunto}`}
																target='_blank'
																rel='noopener noreferrer'
																style={{ textDecoration: 'none' }}
															>
																<i className='bi bi-paperclip' />
															</a>
														</div>
													)}
													<div className='d-flex justify-content-center textColorSecondary mt-2'>
														<ModalAutorizarSolicitudes
															request={request.id}
															// timeRequest={timeRequest.id}
															// employeeId={empleadoData.id}
														/>
													</div>
												</>
											)}
											{request.statusId !== 1 && (
												<>
													<div className='d-flex textColorSecondary mt-2 mb-1'>
														<div className='fw-bold me-2' style={{ width: '40%' }}>
															Estatus:
														</div>
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
													</div>
													{request.adjunto && (
														<div className='d-flex ms-1'>
															<div>Adjunto:</div>
															<a
																className='fs-4  textColorSecondary'
																href={`${baseUrlRequestFilesS3}${request.adjunto}`}
																target='_blank'
																rel='noopener noreferrer'
																style={{ textDecoration: 'none' }}
															>
																<i className='bi bi-paperclip' />
															</a>
														</div>
													)}
													<div className='d-flex justify-content-center textColorSecondary mt-2'>
														<div className='textColorLight' style={{ minWidth: '87%' }}>
															<div className='fw-bold'>Detalle de la respuesta:</div>
															{request.descriptionRespuesta}
														</div>
													</div>
												</>
											)}
										</div>
									</div>
								))
								.reverse()}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageAutorizaciones;
