const DetalleNomina = () => {
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
								<div className='fw-bold'>Control MAquila</div>
							</div>
							<div className='d-flex justify-content-between mt-1'>
								<div>No. Empleado:</div>
								<div className='fw-bold'>26024.</div>
							</div>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Nombre:</div>
								<div className='fw-bold'>Ivan Santana Santana.</div>
							</div>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Puesto:</div>
								<div className='fw-bold'>Auxiliar Operativo.</div>
							</div>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Periodo:</div>
								<div className='fw-bold'>Del 07 al 13 de Febrero del 2022</div>
							</div>
						</div>
						<div className='d-flex flex-column custm-NomDetall mt-2'>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Días trab:</div>
								<div className='fw-bold'>7 Días.</div>
							</div>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Semana:</div>
								<div className='fw-bold'>07</div>
							</div>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Retardos:</div>
								<div className='fw-bold'>1 retardos</div>
							</div>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Permisos:</div>
								<div className='fw-bold'>2 Permosos.</div>
							</div>
							<div className='d-flex justify-content-between  mt-1'>
								<div>Hrs extras:</div>
								<div className='fw-bold'>4 Hrs.</div>
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
								<div className='mt-3 d-flex justify-content-around'>
									<div>Total Percepciones:</div>
									<div className='textColorLink fw-bold'>$3,555.00</div>
								</div>
							</div>
						</div>
						<div className='d-flex flex-column custm-NomDetall '>
							<span className='fw-bold'>DEDUCCIONES:</span>
							<div className='p-3 mb-4 shadow custm-NomDetallShadow d-flex flex-column justify-content-between'>
								<div>
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
								<div className='mt-3 d-flex justify-content-around'>
									<div>Total Deducciones:</div>
									<div className='textColorLink fw-bold'>$3,555.00</div>
								</div>
							</div>
							<div className='mt-3 d-flex justify-content-between p-4'>
								<div className='fw-bold fs-3'>Total a pagar:</div>
								<div className='d-flex align-items-center  fw-bold fs-3'>
									<div className='custm-NomDollarIcon me-1 d-flex justify-content-center align-items-center'>
										<i className='bi bi-currency-dollar' />
									</div>
									<div>3,555.00</div>
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
