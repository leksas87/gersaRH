import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gettimeRequestListByEmployeeId } from '../../actions/timeRequest/timeRequestActions';
import { useForm } from '../../hooks/useForm';
import { RootSote } from '../../store/Store';
import ModalAutorizarHorasExtras from './ModalAutorizarHorasExtras';

const PageAutorizarHorasExtras = () => {
	//Se recupera el state que indica el auth y timeRequestList
	const { empleadoData } = useSelector((state: RootSote) => state.auth);
	const { timeRequestList } = useSelector(
		(state: RootSote) => state.timeRequest
	);

	//objeto user para formulario Registro
	const initialState = {
		sortBy: '',
	};
	//Uso de hook useForm para manejo de campos en el formulario
	const [sortValues, handleInputChange, reset] = useForm(initialState);
	//Desestructuracion
	const { sortBy } = sortValues;
	//dispatch para ejecutar las actions
	const dispatch = useDispatch();
	useEffect(() => {
		if (empleadoData.id) {
			dispatch(gettimeRequestListByEmployeeId(empleadoData.id));
		}
	}, [empleadoData.id, dispatch]);

	return (
		<>
			<div className='custm-empleadosContainer rounded-3 shadow mt-4'>
				<div className='d-flex flex-column justify-content-center pt-4 p-4'>
					<div className='d-flex flex-column align-items-center'>
						<div className='d-flex '>
							<div>
								<i
									style={{ fontSize: '3rem', color: 'var(--colorSecondary)' }}
									className='bi bi-stopwatch-fill'
								/>
							</div>
							<div className='d-flex flex-column align-items-center custm-width100 ms-3'>
								<div
									className='text-center fs-5 textColorLight'
									style={{ maxWidth: '400px' }}
								>
									Aquí se muestra <br />
									el historial de solicitudes de horas extras. <br /> (Pendientes,
									aceptadas y rechazadas).
								</div>
								<div style={{ color: 'var(--textColorLink)' }}>____________</div>
							</div>
						</div>

						<div
							className='d-flex flex-column align-items-center custm-PageHistoryContainer mt-4'
							style={{ width: '100%' }}
						>
							<div className='d-flex justify-content-between custm-Width100 p-1'>
								<div />
								<div className='textColorSecondary fs-5'>Solicitudes</div>
								<div className=' ms-1 d-flex align-items-center'>
									<div>Filtrar por:</div>
									<div className='ms-2'>
										<select
											className='form-select form-control  '
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
							{timeRequestList
								.filter((element) => {
									if (!sortBy) return true;

									return element.statusId === parseInt(sortBy);
								})
								.map((timeRequest) => (
									<div
										key={timeRequest.id}
										className='d-flex flex-wrap custm-UnderLineSectionDark mt-4'
									>
										<div
											className='d-flex flex-column  p-3 custm-solicitudContaiter50'
											// style={{ width: '50%', minWidth: '300px' }}
										>
											<div className='d-flex textColorSecondary'>
												<div style={{ width: '40%' }}>Fecha de solicitud:</div>
												<div style={{ width: '60%' }}>{timeRequest.fechaCreacion}</div>
											</div>

											<div className='d-flex textColorSecondary mt-2'>
												<div style={{ width: '40%' }}>Empleado:</div>
												<div style={{ width: '60%' }}>
													{timeRequest.employee.User.firstName}{' '}
													{timeRequest.employee.User.lastName}
												</div>
											</div>
											<div className='d-flex textColorSecondary mt-2'>
												<div style={{ width: '40%' }}>Lugar de trabajo:</div>
												<div style={{ width: '60%' }}>
													{timeRequest.employee.lugarDeTrabajo}
												</div>
											</div>
											<div className='d-flex textColorSecondary mt-4'>
												<div className='fw-bold' style={{ width: '40%' }}>
													Fecha de asignación:
												</div>
												<div style={{ width: '60%' }}>{timeRequest.fechaAsignacion}</div>
											</div>
											<div className='d-flex textColorSecondary mt-2'>
												<div className='fw-bold' style={{ width: '40%' }}>
													Hora de asignación:
												</div>
												<div style={{ width: '60%' }}>{timeRequest.horaAsignacion}</div>
											</div>
											<div className='d-flex textColorSecondary mt-2'>
												<div className='fw-bold' style={{ width: '40%' }}>
													Lugar de asignación:
												</div>
												<div style={{ width: '60%' }}>{timeRequest.LugarApoyo}</div>
											</div>
											<div className='d-flex textColorSecondary mt-2'>
												<div className='fw-bold' style={{ width: '40%' }}>
													Solicita:
												</div>
												<div style={{ width: '60%' }}>{timeRequest.employeeIdRequest}</div>
											</div>

											<div className='d-flex textColorSecondary mt-2'>
												<div className='textColorLight' style={{ width: '87%' }}>
													<div className='fw-bold'>Detalle de la solicitud:</div>
													{timeRequest.descripcion}
												</div>
											</div>
										</div>
										<div className='custm-solicitudContaiter50 d-flex flex-column justify-content-center align-items-center'>
											{timeRequest.statusId === 1 && (
												<>
													<div className='d-flex textColorSecondary mt-2 mb-4'>
														<div className='fw-bold me-2' style={{ width: '40%' }}>
															Estatus:
														</div>
														<div className='custm-Status1 ' style={{ width: '60%' }}>
															● Pendiente
														</div>
													</div>
													<div className='d-flex justify-content-center textColorSecondary mt-2'>
														<ModalAutorizarHorasExtras
															timeRequest={timeRequest.id}
															employeeId={empleadoData.id}
														/>
													</div>
												</>
											)}

											{/* ------------------------------- */}
											{timeRequest.statusId !== 1 && (
												<>
													<div className='d-flex textColorSecondary mt-2 mb-4'>
														<div className='fw-bold me-2' style={{ width: '40%' }}>
															Estatus:
														</div>
														{timeRequest.statusId === 2 && (
															<div className='custm-Status2 ' style={{ width: '60%' }}>
																● Aceptada
															</div>
														)}
														{timeRequest.statusId === 3 && (
															<div className='custm-Status3 ' style={{ width: '65%' }}>
																● Rechazada
															</div>
														)}
													</div>
													<div className='d-flex justify-content-center textColorSecondary mt-2'>
														<div className='textColorLight' style={{ minWidth: '87%' }}>
															<div className='fw-bold'>Detalle de la respuesta:</div>
															{timeRequest.descripcionEmpleado}
														</div>
													</div>
												</>
											)}
										</div>
									</div>
								))}
							{/* Inicio */}
							{/* <div className='d-flex flex-wrap custm-UnderLineSectionDark mt-4'>
								<div
									className='d-flex flex-column  p-3 custm-solicitudContaiter50'
									// style={{ width: '50%', minWidth: '300px' }}
								>
									<div className='d-flex textColorSecondary'>
										<div style={{ width: '40%' }}>Fecha de solicitud:</div>
										<div style={{ width: '60%' }}>01/01/2022</div>
									</div>

									<div className='d-flex textColorSecondary mt-2'>
										<div style={{ width: '40%' }}>Empleado:</div>
										<div style={{ width: '60%' }}>Ivan Santana Santana</div>
									</div>
									<div className='d-flex textColorSecondary mt-2'>
										<div style={{ width: '40%' }}>Lugar de trabajo:</div>
										<div style={{ width: '60%' }}>Lugar 1</div>
									</div>
									<div className='d-flex textColorSecondary mt-4'>
										<div className='fw-bold' style={{ width: '40%' }}>
											Fecha de asignación:
										</div>
										<div style={{ width: '60%' }}>01/01/2022</div>
									</div>
									<div className='d-flex textColorSecondary mt-2'>
										<div className='fw-bold' style={{ width: '40%' }}>
											Hora de asignación:
										</div>
										<div style={{ width: '60%' }}>08:00</div>
									</div>
									<div className='d-flex textColorSecondary mt-2'>
										<div className='fw-bold' style={{ width: '40%' }}>
											Lugar de asignación:
										</div>
										<div style={{ width: '60%' }}>Nike 2</div>
									</div>
									<div className='d-flex textColorSecondary mt-2'>
										<div className='fw-bold' style={{ width: '40%' }}>
											Solicita:
										</div>
										<div style={{ width: '60%' }}>Ivan Santana Santana</div>
									</div>

									<div className='d-flex textColorSecondary mt-2'>
										<div className='textColorLight' style={{ width: '87%' }}>
											<div className='fw-bold'>Detalle de la solicitud:</div>
											Veniam non commodo exercitation qui cupidatat sit sit proident
											proident. Sit duis officia eiusmod sint minim cupidatat dolor
											exercitation pariatur. Adipisicing velit cillum velit veniam irure
											dolor laborum fugiat ex Lorem ad.
										</div>
									</div>
								</div>
								<div className='custm-solicitudContaiter50 d-flex flex-column justify-content-center align-items-center'>
									<div className='d-flex textColorSecondary mt-2 mb-4'>
										<div className='fw-bold me-2' style={{ width: '40%' }}>
											Estatus:
										</div>
										<div className='custm-Status2 ' style={{ width: '60%' }}>
											● Aceptada
										</div>
									</div>
									<div className='d-flex justify-content-center textColorSecondary mt-2'>
										<div className='textColorLight' style={{ width: '87%' }}>
											<div className='fw-bold'>Detalle de la respuesta:</div>
											Veniam non commodo exercitation qui cupidatat sit sit proident
											proident. Sit duis officia eiusmod sint minim cupidatat dolor
											exercitation pariatur. Adipisicing velit cillum velit veniam irure
											dolor laborum fugiat ex Lorem ad.
										</div>
									</div>
								</div>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageAutorizarHorasExtras;
