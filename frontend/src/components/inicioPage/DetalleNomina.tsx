import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContracts } from '../../actions/contractsActions/contractsActions';
import { getPayrollByEmployeeId } from '../../actions/payrollActions/payrollActions';
import { RootSote } from '../../store/Store';

const DetalleNomina = () => {
	const dispatch = useDispatch();
	const { empleadoData } = useSelector((state: RootSote) => state.auth);
	const { contractToShow } = useSelector((state: RootSote) => state.contracts);
	const { payrollDetail } = useSelector((state: RootSote) => state.payroll);

	const totalPercepciones =
		payrollDetail.sueldo +
		payrollDetail.tiempoExtra +
		payrollDetail.bonoAsistencia +
		payrollDetail.descuentoLaboral +
		payrollDetail.festLab +
		payrollDetail.primaDom +
		payrollDetail.tiempoExtra +
		payrollDetail.aclaraciones;

	const totalDeducciones =
		payrollDetail.infonavit +
		payrollDetail.cajaAhorro +
		payrollDetail.dcoExt +
		payrollDetail.permisosHrs +
		payrollDetail.prestamos +
		payrollDetail.solidaridad +
		payrollDetail.descuentoPensionAlimenticia +
		payrollDetail.descuentoPorFiesta;

	const totalAPagar = totalPercepciones - totalDeducciones;
	useEffect(() => {
		console.log('inicioando detalle de nomina');
		if (empleadoData.id) {
			dispatch(getContracts(empleadoData.id.toString()));
			dispatch(getPayrollByEmployeeId(empleadoData.id));
		}
	}, [dispatch, empleadoData.id]);

	return (
		<>
			<div
				className='d-flex justify-content-center custm-Width100'
				style={{ backgroundColor: 'tomato' }}
			>
				<div className='custm-postDetalleNom d-flex flex-column align-items-center'>
					<div
						className='d-flex custm-Width100 p-3 ps-4 textColorLink fw-bold fs-4'
						style={{ borderBottom: '1px solid var(--textColorDisable)' }}
					>
						Detalle de nómina
					</div>
					<div
						className='d-flex flex-wrap justify-content-between custm-Width100 textColorSecondary'
						style={{ width: '95%' }}
					>
						<div className='d-flex flex-column custm-NomDetall mt-2'>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Unidad:</div>
								<div className='fw-bold'>{empleadoData.lugarDeTrabajo}</div>
							</div>
							<div className='d-flex justify-content-between mt-1'>
								<div>No. Empleado:</div>
								<div className='fw-bold'>{payrollDetail.numeroEmpleado}</div>
							</div>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Nombre:</div>
								<div className='fw-bold'>{payrollDetail.nombreEmpleado}</div>
							</div>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Puesto:</div>
								<div className='fw-bold'>{contractToShow.puesto}</div>
							</div>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Periodo:</div>
								<div className='fw-bold'>{payrollDetail.periodo}</div>
							</div>
						</div>
						<div className='d-flex flex-column custm-NomDetall mt-2'>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Días trab:</div>
								<div className='fw-bold'>{payrollDetail.diasTrabajados} Días.</div>
							</div>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Semana:</div>
								<div className='fw-bold'>{payrollDetail.semana}</div>
							</div>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Retardos:</div>
								<div className='fw-bold'>{payrollDetail.retardos} retardos</div>
							</div>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Permisos:</div>
								<div className='fw-bold'>{payrollDetail.permisos} Permosos.</div>
							</div>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Hrs extras:</div>
								<div className='fw-bold'>{payrollDetail.horasExtra} Hrs.</div>
							</div>
						</div>
					</div>
					<div
						className='d-flex flex-wrap mt-4 textColorSecondary justify-content-between '
						style={{ width: '95%' }}
					>
						<div className='d-flex flex-column custm-NomDetall'>
							<span className='fw-bold'>PERCEPCIONES:</span>
							<div className='p-3 mb-4 shadow custm-NomDetallShadow d-flex flex-column justify-content-between'>
								<div>
									{payrollDetail.sueldo ? (
										<div className='d-flex justify-content-between me-2 mt-1'>
											<div>Sueldo.</div>
											<div className='fw-bold'>$ {payrollDetail.sueldo.toFixed(2)}</div>
										</div>
									) : null}
									{payrollDetail.tiempoExtra ? (
										<div className='d-flex justify-content-between me-2 mt-1'>
											<div>Tiempo extra.</div>
											<div className='fw-bold'>
												$ {payrollDetail.tiempoExtra.toFixed(2)}
											</div>
										</div>
									) : null}
									{payrollDetail.bonoAsistencia ? (
										<div className='d-flex justify-content-between me-2 mt-1'>
											<div>Bono asist.</div>
											<div className='fw-bold'>
												$ {payrollDetail.bonoAsistencia.toFixed(2)}
											</div>
										</div>
									) : null}
									{payrollDetail.descuentoLaboral ? (
										<div className='d-flex justify-content-between me-2 mt-1'>
											<div>Desc. Lab.</div>
											<div className='fw-bold'>
												$ {payrollDetail.descuentoLaboral.toFixed(2)}
											</div>
										</div>
									) : null}
									{payrollDetail.festLab ? (
										<div className='d-flex justify-content-between me-2 mt-1'>
											<div>Fest. lab.</div>
											<div className='fw-bold'>$ {payrollDetail.festLab.toFixed(2)}</div>
										</div>
									) : null}
									{payrollDetail.primaDom ? (
										<div className='d-flex justify-content-between me-2 mt-1'>
											<div>Prima dom.</div>
											<div className='fw-bold'>$ {payrollDetail.primaDom.toFixed(2)}</div>
										</div>
									) : null}
									{payrollDetail.tiempoExtra ? (
										<div className='d-flex justify-content-between me-2 mt-1'>
											<div>Prima vacacional.</div>
											<div className='fw-bold'>
												$ {payrollDetail.tiempoExtra.toFixed(2)}
											</div>
										</div>
									) : null}
									{payrollDetail.aclaraciones ? (
										<div className='d-flex justify-content-between me-2 mt-1'>
											<div>Aclaraciones.</div>
											<div className='fw-bold'>
												$ {payrollDetail.aclaraciones.toFixed(2)}
											</div>
										</div>
									) : null}
								</div>
								<div className='mt-3 d-flex justify-content-around'>
									<div>Total Percepciones:</div>
									<div className='textColorLink fw-bold'>
										$ {totalPercepciones.toFixed(2)}
									</div>
								</div>
							</div>
						</div>
						<div className='d-flex flex-column custm-NomDetall '>
							<span className='fw-bold'>DEDUCCIONES:</span>
							<div className='p-3 mb-4 shadow custm-NomDetallShadow d-flex flex-column justify-content-between'>
								<div>
									{payrollDetail.infonavit ? (
										<div className='d-flex justify-content-between me-2 mt-1'>
											<div>Infonavit.</div>
											<div className='fw-bold'>
												-$ {payrollDetail.infonavit.toFixed(2)}
											</div>
										</div>
									) : null}
									{payrollDetail.cajaAhorro ? (
										<div className='d-flex justify-content-between me-2 mt-1'>
											<div>Cada de ahorro.</div>
											<div className='fw-bold'>
												-$ {payrollDetail.cajaAhorro.toFixed(2)}
											</div>
										</div>
									) : null}
									{payrollDetail.dcoExt ? (
										<div className='d-flex justify-content-between me-2 mt-1'>
											<div>dcoExt.</div>
											<div className='fw-bold'>-$ {payrollDetail.dcoExt.toFixed(2)}</div>
										</div>
									) : null}
									{payrollDetail.permisosHrs ? (
										<div className='d-flex justify-content-between me-2 mt-1'>
											<div>Permisos (Hrs).</div>
											<div className='fw-bold'>
												-$ {payrollDetail.permisosHrs.toFixed(2)}
											</div>
										</div>
									) : null}
									{payrollDetail.prestamos ? (
										<div className='d-flex justify-content-between me-2 mt-1'>
											<div>Prestamos.</div>
											<div className='fw-bold'>
												-$ {payrollDetail.prestamos.toFixed(2)}
											</div>
										</div>
									) : null}
									{payrollDetail.solidaridad ? (
										<div className='d-flex justify-content-between me-2 mt-1'>
											<div>Solidaridad.</div>
											<div className='fw-bold'>
												-$ {payrollDetail.solidaridad.toFixed(2)}
											</div>
										</div>
									) : null}
									{payrollDetail.descuentoPensionAlimenticia ? (
										<div className='d-flex justify-content-between me-2 mt-1'>
											<div>Descuento pensión alimenticia.</div>
											<div className='fw-bold'>
												-$ {payrollDetail.descuentoPensionAlimenticia.toFixed(2)}
											</div>
										</div>
									) : null}
									{payrollDetail.descuentoPorFiesta ? (
										<div className='d-flex justify-content-between me-2 mt-1'>
											<div>Descuento por fiesta.</div>
											<div className='fw-bold'>
												-$ {payrollDetail.descuentoPorFiesta.toFixed(2)}
											</div>
										</div>
									) : null}
								</div>
								<div className='mt-3 d-flex justify-content-around'>
									<div>Total Deducciones:</div>
									<div className='textColorLink fw-bold'>
										-$ {totalDeducciones.toFixed(2)}
									</div>
								</div>
							</div>
							<div className='mt-3 d-flex justify-content-between p-4'>
								<div className='fw-bold fs-3'>Total a pagar:</div>
								<div className='d-flex align-items-center  fw-bold fs-3'>
									<div className='custm-NomDollarIcon me-1 d-flex justify-content-center align-items-center'>
										<i className='bi bi-currency-dollar' />
									</div>
									<div>{totalAPagar.toFixed(2)}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DetalleNomina;
