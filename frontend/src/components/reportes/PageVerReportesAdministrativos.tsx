import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReportList } from '../../actions/reportsActions/reportsActions';
import { RootSote } from '../../store/Store';
import SelectReport from './SelectReport';

const PageVerReportesAdministrativos = () => {
	//dispatch para ejecutar las actions
	const dispatch = useDispatch();
	//Se necesita el satate que indica el reportsList
	const { reportsList } = useSelector((state: RootSote) => state.reports);

	useEffect(() => {
		dispatch(getReportList());
	}, [dispatch]);
	return (
		<>
			<div className='d-flex flex-column justify-content-center pt-4 p-4'>
				{/* Inicio */}
				<div className='d-flex flex-wrap custm-Width100 '>
					{/* Izquierda */}
					<div className='custm-PageContainerContent'>
						<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
							<div
								className='d-flex justify-content-center align-items-center'
								style={{
									width: '5rem',
									border: '3px solid var(--colorSecondary)',
									borderRadius: '10px',
								}}
							>
								<i
									style={{ fontSize: '3rem', color: 'var(--colorSecondary)' }}
									className='bi bi-exclamation-lg'
								/>
							</div>
							<div className='fs-5 textColorLight'>
								Aqui se muestra el historial de
							</div>
							<div className='fs-5 textColorLight'>reportes administrativos</div>
							<div className='fs-5 textColorLight'>enviado por supervisores</div>
							<div className='custm-underLineTittle'></div>
						</div>
					</div>
					{/* Derecha */}
					<div className='custm-PageContainerContent'>
						<div className='d-flex flex-column align-items-center custm-PageHistoryContainer'>
							<div className='fs-5 textColorSecondary mt-2'>
								Lista de reportes administrativos.
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
											<div className='fw-bold' style={{ width: '40%' }}>
												{report.asunto}
											</div>
										</div>
										<div className='d-flex textColorSecondary mt-3'>
											<div style={{ width: '40%' }}>Empleado:</div>
											<div className='d-flex' style={{ width: '60%' }}>
												{report.anonimo ? (
													<span className=''>Anónimo</span>
												) : (
													<span className=''>
														{report.employee.User.firstName} {report.employee.User.lastName}
													</span>
												)}
											</div>
										</div>
										<div className='d-flex textColorSecondary mt-3'>
											<div style={{ width: '40%' }}>Lugar de trabajo:</div>
											<div className='d-flex' style={{ width: '60%' }}>
												<span className=''>{report.employee.lugarDeTrabajo}</span>
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
										<div className='d-flex textColorSecondary mt-3'>
											<div style={{ width: '40%' }}>Estado:</div>
											<div className='d-flex' style={{ width: '60%' }}>
												<SelectReport report={report} />
											</div>
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

export default PageVerReportesAdministrativos;
