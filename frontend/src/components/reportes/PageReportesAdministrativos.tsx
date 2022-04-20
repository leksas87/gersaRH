import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReportListByEmployeeId } from '../../actions/reportsActions/reportsActions';
import { RootSote } from '../../store/Store';
import ModalNuevoReporteAdministrativo from './ModalNuevoReporteAdministrativo';

const PageReportesAdministrativos = () => {
	//dispatch para ejecutar las Actions
	const dispatch = useDispatch();
	//Se necesita el satate que indica el reportsList
	const { reportsList } = useSelector((state: RootSote) => state.reports);
	//Stete que indica el employee.id del usuario logeado
	const { empleadoData } = useSelector((state: RootSote) => state.auth);

	useEffect(() => {
		if (empleadoData.id) {
			dispatch(getReportListByEmployeeId(empleadoData.id));
		}
	}, [dispatch, empleadoData.id]);

	return (
		<>
			<div className='custm-empleadosContainer rounded-3 shadow mt-4'>
				<div className='custm-empleadosHead justify-content-between'>
					<div />
					<div
						className='textColorSecondary fs-4'
						style={{ textDecoration: 'underline' }}
					>
						Reportes administrativos2
					</div>
					<div>
						<ModalNuevoReporteAdministrativo />
					</div>
				</div>
				<div className='d-flex flex-column justify-content-center pt-4 p-4'>
					{/* Inicio */}
					<div className='d-flex flex-wrap custm-Width100 '>
						{/* Izquierda */}
						<div className='custm-PageContainerContent'>
							<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
								<div className='custm-Width100'>
									<i
										style={{ fontSize: '3rem', color: 'var(--colorSecondary)' }}
										className='bi bi-chat-dots-fill'
									/>
								</div>
								<div style={{ maxWidth: '200px' }} className='fs-4'>
									Reportes administrativos
								</div>
								<div className='fs-5 textColorLight'>
									Rellena los campos siguientes para
								</div>
								<div className='fs-5 textColorLight'>
									{' '}
									enviar un reporte administrativo.
								</div>
								<div className='custm-underLineTittle'></div>
							</div>
						</div>
						{/* Derecha */}
						<div className='custm-PageContainerContent'>
							<div className='d-flex flex-column align-items-center custm-PageHistoryContainer'>
								<div className='p-3 textColorLight fs-5 text-'>
									Nota: Los reportes serán vistos y revisados únicamente por el personal
									de recursos humanos.
								</div>
								<div className='fs-5 textColorSecondary mt-2'>
									Historial de reportes
								</div>
								{/* Inicio */}
								{reportsList
									.filter((element) => {
										return element.reportType === 'administrativo';
									})
									.map((report) => (
										<div
											key={report.id}
											className='d-flex flex-column custm-Width100 mt-3 custm-UnderLineSection p-3'
										>
											<div className='d-flex textColorSecondary'>
												<div style={{ width: '40%' }}>Fecha de envío:</div>
												<div style={{ width: '60%' }}>{report.fechaCreacion}</div>
											</div>
											<div className='d-flex custm-Status4 mt-3'>
												<div className='fw-bold' style={{ width: '100%' }}>
													{report.asunto}
												</div>
											</div>
											<div className='d-flex textColorSecondary mt-3'>
												<div style={{ width: '40%' }}>Empleado:</div>
												<div className='d-flex' style={{ width: '60%' }}>
													<span className=''>
														{/* {report.employee.User.firstName} {report.employee.User.lastName} */}
														PENDIENTE
													</span>
												</div>
											</div>
											<div className='d-flex textColorSecondary mt-3'>
												<div style={{ width: '40%' }}>Estatus:</div>
												<div className='d-flex' style={{ width: '60%' }}>
													{report.statusId === 1 && (
														<span className='custm-Status1 pe-3'>● Pendiente de revisar</span>
													)}
													{report.statusId !== 1 && (
														<>
															{report.statusId === 4 && (
																<span className='custm-Status4 pe-3'>● Revisado</span>
															)}
														</>
													)}
												</div>
											</div>
											<div className='d-flex mt-3'>
												<div className='textColorSecondary' style={{ width: '40%' }}>
													Detalle:
												</div>
												<div className='textColorLight' style={{ width: '60%' }}>
													{report.descripcionEmpleado}
												</div>
											</div>
										</div>
									))
									.reverse()}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageReportesAdministrativos;
