import React from 'react';

const EmpresaDetalles = () => {
	return (
		<>
			<div className='d-flex flex-column align-items-center'>
				{/* Información general */}
				<div className='d-flex flex-wrap custm-Width100 '>
					{/* Izquierda */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
							<div className='custm-Width100'>
								<i
									style={{ fontSize: '3rem', color: 'var(--textColorLink)' }}
									className='bi bi-diagram-3-fill'
								/>
							</div>
							<div className='fs-4'>Información Básica</div>
							<div className='fs-5 textColorLight'>Información sobre tu empresa</div>
							<div className='custm-underLineTittle'></div>
						</div>
					</div>
					{/* Derecha */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex flex-column align-items-center custm-empleadoFormContainer pt-5'>
							{/* Inicia formulario */}
							<form style={{ width: '90%' }}>
								<div className='mb-4'>
									<label className='custm-Width100'>Nombre de la empresa</label>
									<input
										className='form-control custm-Width100 custm-empleadoFormIntput'
										type='text'
										placeholder='Gersa logistics'
										disabled
									/>
								</div>

								<div style={{ height: '3rem' }}></div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EmpresaDetalles;
