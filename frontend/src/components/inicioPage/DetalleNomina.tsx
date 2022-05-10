import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContracts } from '../../actions/contractsActions/contractsActions';
import { RootSote } from '../../store/Store';

const DetalleNomina = () => {
	const dispatch = useDispatch();
	const { empleadoData } = useSelector((state: RootSote) => state.auth);
	const { contractToShow } = useSelector((state: RootSote) => state.contracts);
	const payrollDetail = {
		id: 1,
		employeeId: 1,
		numeroEmpleado: '10001',
		nombreEmpleado: 'Ivan Santana',
		semana: 7,
		periodo: 'Del 07 al 13 de febrero del 2022',
		diasTrabajados: 5,
		retardos: 1,
		permisos: 1,
		horasExtra: 1,
		sueldo: 5500.56,
		tiempoExtra: 100.0,
		bonoAsistencia: 100,
		descuentoLaboral: 50,
		festLab: 50,
		primaDom: 100,
		primaVacacional: 100,
		aclaraciones: 100,
		infonavit: 100,
		cajaAhorro: 100,
		dcoExt: 50,
		permisosHrs: 50,
		prestamos: 100,
		solidaridad: 150,
		descuentoPensionAlimenticia: 100,
		descuentoPorFiesta: 100,
	};

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
		}
	}, [dispatch, empleadoData.id]);

	return (
		<>
			<div className='d-flex justify-content-center'>
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
									<div className='d-flex justify-content-between me-2 mt-1'>
										<div>Sueldo.</div>
										<div className='fw-bold'>
											$ {payrollDetail.sueldo.toLocaleString()}
										</div>
									</div>
									<div className='d-flex justify-content-between me-2 mt-1'>
										<div>Tiempo extra.</div>
										<div className='fw-bold'>
											$ {payrollDetail.tiempoExtra.toLocaleString()}
										</div>
									</div>
									<div className='d-flex justify-content-between me-2 mt-1'>
										<div>Bono asist.</div>
										<div className='fw-bold'>
											$ {payrollDetail.bonoAsistencia.toLocaleString()}
										</div>
									</div>
									<div className='d-flex justify-content-between me-2 mt-1'>
										<div>Desc. Lab.</div>
										<div className='fw-bold'>
											$ {payrollDetail.descuentoLaboral.toLocaleString()}
										</div>
									</div>
									<div className='d-flex justify-content-between me-2 mt-1'>
										<div>Fest. lab.</div>
										<div className='fw-bold'>
											$ {payrollDetail.festLab.toLocaleString()}
										</div>
									</div>
									<div className='d-flex justify-content-between me-2 mt-1'>
										<div>Prima dom.</div>
										<div className='fw-bold'>
											$ {payrollDetail.primaDom.toLocaleString()}
										</div>
									</div>
									<div className='d-flex justify-content-between me-2 mt-1'>
										<div>Prima vacacional.</div>
										<div className='fw-bold'>
											$ {payrollDetail.tiempoExtra.toLocaleString()}
										</div>
									</div>
									<div className='d-flex justify-content-between me-2 mt-1'>
										<div>Aclaraciones.</div>
										<div className='fw-bold'>
											$ {payrollDetail.aclaraciones.toLocaleString()}
										</div>
									</div>
								</div>
								<div className='mt-3 d-flex justify-content-around'>
									<div>Total Percepciones:</div>
									<div className='textColorLink fw-bold'>
										$ {totalPercepciones.toLocaleString()}
									</div>
								</div>
							</div>
						</div>
						<div className='d-flex flex-column custm-NomDetall '>
							<span className='fw-bold'>DEDUCCIONES:</span>
							<div className='p-3 mb-4 shadow custm-NomDetallShadow d-flex flex-column justify-content-between'>
								<div>
									<div className='d-flex justify-content-between me-2 mt-1'>
										<div>Infonavit.</div>
										<div className='fw-bold'>
											-$ {payrollDetail.infonavit.toLocaleString()}
										</div>
									</div>
									<div className='d-flex justify-content-between me-2 mt-1'>
										<div>Cada de ahorro.</div>
										<div className='fw-bold'>
											-$ {payrollDetail.cajaAhorro.toLocaleString()}
										</div>
									</div>
									<div className='d-flex justify-content-between me-2 mt-1'>
										<div>dcoExt.</div>
										<div className='fw-bold'>
											-$ {payrollDetail.dcoExt.toLocaleString()}
										</div>
									</div>
									<div className='d-flex justify-content-between me-2 mt-1'>
										<div>Permisos (Hrs).</div>
										<div className='fw-bold'>
											-$ {payrollDetail.permisosHrs.toLocaleString()}
										</div>
									</div>
									<div className='d-flex justify-content-between me-2 mt-1'>
										<div>Prestamos.</div>
										<div className='fw-bold'>
											-$ {payrollDetail.prestamos.toLocaleString()}
										</div>
									</div>
									<div className='d-flex justify-content-between me-2 mt-1'>
										<div>Solidaridad.</div>
										<div className='fw-bold'>
											-$ {payrollDetail.solidaridad.toLocaleString()}
										</div>
									</div>
									<div className='d-flex justify-content-between me-2 mt-1'>
										<div>Descuento pensión alimenticia.</div>
										<div className='fw-bold'>
											-$ {payrollDetail.descuentoPensionAlimenticia.toLocaleString()}
										</div>
									</div>
									<div className='d-flex justify-content-between me-2 mt-1'>
										<div>Descuento por fiesta.</div>
										<div className='fw-bold'>
											-$ {payrollDetail.descuentoPorFiesta.toLocaleString()}
										</div>
									</div>
								</div>
								<div className='mt-3 d-flex justify-content-around'>
									<div>Total Deducciones:</div>
									<div className='textColorLink fw-bold'>
										-$ {totalDeducciones.toLocaleString()}
									</div>
								</div>
							</div>
							<div className='mt-3 d-flex justify-content-between p-4'>
								<div className='fw-bold fs-3'>Total a pagar:</div>
								<div className='d-flex align-items-center  fw-bold fs-3'>
									<div className='custm-NomDollarIcon me-1 d-flex justify-content-center align-items-center'>
										<i className='bi bi-currency-dollar' />
									</div>
									<div>{totalAPagar.toLocaleString()}</div>
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
