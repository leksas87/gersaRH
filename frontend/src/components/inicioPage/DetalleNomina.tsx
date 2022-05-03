const DetalleNomina = () => {
	return (
		<>
			<div className='d-flex justify-content-center'>
				<div className='custm-postDetalleNom d-flex flex-column align-items-center'>
					<div
						className='d-flex custm-Width100 p-3 ps-4 textColorLink fw-bold'
						style={{ borderBottom: '1px solid var(--textColorDisable)' }}
					>
						Detalle de nómina
					</div>
					<div className='d-flex flex-wrap custm-Width100 ps-5 textColorSecondary'>
						<div className='d-flex flex-column' style={{ width: '50%' }}>
							<div className='d-flex justify-content-between me-5 mt-1'>
								<div>Unidad:</div>
								<div>Control MAquila</div>
							</div>
							<div className='d-flex justify-content-between me-5 mt-1'>
								<div>No. Empleado:</div>
								<div>26024.</div>
							</div>
							<div className='d-flex justify-content-between me-5 mt-1'>
								<div>Nombre:</div>
								<div>Ivan Santana Santana.</div>
							</div>
							<div className='d-flex justify-content-between me-5 mt-1'>
								<div>Puesto:</div>
								<div>Auxiliar Operativo.</div>
							</div>
							<div className='d-flex justify-content-between me-5 mt-1'>
								<div>Periodo:</div>
								<div>Del 07 al 13 de Febrero del 2022</div>
							</div>
						</div>
						<div className='d-flex flex-column' style={{ width: '50%' }}>
							<div className='d-flex justify-content-between me-5 mt-1'>
								<div>Días trab:</div>
								<div>7 Días.</div>
							</div>
							<div className='d-flex justify-content-between me-5 mt-1'>
								<div>Semana:</div>
								<div>07</div>
							</div>
							<div className='d-flex justify-content-between me-5 mt-1'>
								<div>Retardos:</div>
								<div>1 retardos</div>
							</div>
							<div className='d-flex justify-content-between me-5 mt-1'>
								<div>Permisos:</div>
								<div>2 Permosos.</div>
							</div>
							<div className='d-flex justify-content-between me-5 mt-1'>
								<div>Hrs extras:</div>
								<div>4 Hrs.</div>
							</div>
						</div>
					</div>
					<div className='d-flex flex-wrap custm-Width100 pt-4 ps-5 textColorSecondary'>
						<div className='d-flex flex-column' style={{ width: '50%' }}>
							PERCEPCIONES:
							<div className='p-3 mb-4 shadow'>
								<div className='d-flex justify-content-between me-5 mt-1'>
									<div>Sueldo.</div>
									<div className='fw-bold'>$ 1,264.76</div>
								</div>
								<div className='d-flex justify-content-between me-5 mt-1'>
									<div>Tiempo extra.</div>
									<div className='fw-bold'>$ 45.17</div>
								</div>
								<div className='d-flex justify-content-between me-5 mt-1'>
									<div>Bono asist.</div>
									<div className='fw-bold'>$ 84.53</div>
								</div>
								<div className='d-flex justify-content-between me-5 mt-1'>
									<div>Desc. Lab.</div>
									<div className='fw-bold'>$ 84.53</div>
								</div>
								<div className='d-flex justify-content-between me-5 mt-1'>
									<div>Fest. lab.</div>
									<div className='fw-bold'>$ 84.53</div>
								</div>
								<div className='d-flex justify-content-between me-5 mt-1'>
									<div>Prima dom.</div>
									<div className='fw-bold'>$ 84.53</div>
								</div>
								<div className='d-flex justify-content-between me-5 mt-1'>
									<div>Prima vacacional.</div>
									<div className='fw-bold'>$ 84.53</div>
								</div>
								<div className='d-flex justify-content-between me-5 mt-1'>
									<div>Aclaraciones.</div>
									<div className='fw-bold'>$ 84.53</div>
								</div>
							</div>
						</div>
						<div className='d-flex flex-column' style={{ width: '50%' }}>
							DEDUCCIONES:
							<div className='p-3 mb-4 shadow'>
								<div className='d-flex justify-content-between me-5 mt-1'>
									<div>Sueldo.</div>
									<div className='fw-bold'>$ 1,264.76</div>
								</div>
								<div className='d-flex justify-content-between me-5 mt-1'>
									<div>Tiempo extra.</div>
									<div className='fw-bold'>$ 45.17</div>
								</div>
								<div className='d-flex justify-content-between me-5 mt-1'>
									<div>Bono asist.</div>
									<div className='fw-bold'>$ 84.53</div>
								</div>
								<div className='d-flex justify-content-between me-5 mt-1'>
									<div>Desc. Lab.</div>
									<div className='fw-bold'>$ 84.53</div>
								</div>
								<div className='d-flex justify-content-between me-5 mt-1'>
									<div>Fest. lab.</div>
									<div className='fw-bold'>$ 84.53</div>
								</div>
								<div className='d-flex justify-content-between me-5 mt-1'>
									<div>Prima dom.</div>
									<div className='fw-bold'>$ 84.53</div>
								</div>
								<div className='d-flex justify-content-between me-5 mt-1'>
									<div>Prima vacacional.</div>
									<div className='fw-bold'>$ 84.53</div>
								</div>
								<div className='d-flex justify-content-between me-5 mt-1'>
									<div>Aclaraciones.</div>
									<div className='fw-bold'>$ 84.53</div>
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
