import { Link } from 'react-router-dom';

const SolicitudesMenu = () => {
	return (
		<>
			<div className='custm-empleadosHead justify-content-center'>
				<div
					className='textColorSecondary fs-4'
					style={{ textDecoration: 'underline' }}
				>
					Solicitudes
				</div>
			</div>
			<div className='d-flex flex-column justify-content-center pt-4 p-4'>
				<div className='d-flex flex-column align-items-center'>
					<div className='d-flex flex-column align-items-center custm-width100'>
						<div
							className='text-center fs-5 textColorLight'
							style={{ maxWidth: '400px' }}
						>
							Haz clic en alguna de las opciones para entrar al detalle de la
							solicitud.
						</div>
						<div style={{ color: 'var(--textColorLink)' }}>____________</div>
					</div>

					<div className='mt-4'>
						<div className='d-flex flex-wrap justify-content-between'>
							<Link to='falta' className=' custm-btnSolicitud shadow-sm '>
								<i
									style={{ fontSize: '2.8rem', color: 'var(--textColorLink)' }}
									className='bi bi-window-plus'
								/>
								<div className='fs-5'>Solicitudes personales</div>
							</Link>
							<Link to='incapacidad' className=' custm-btnSolicitud shadow-sm'>
								<i
									style={{ fontSize: '2.8rem', color: 'var(--textColorLink)' }}
									className='bi bi-bandaid'
								/>
								<div className='fs-5'>Solicitud de incapacidad</div>
							</Link>
						</div>
						<Link to='vacaciones' className=' custm-btnSolicitud shadow-sm'>
							<i
								style={{ fontSize: '2.8rem', color: 'var(--textColorLink)' }}
								className='bi bi-calendar2-week-fill'
							/>
							<div className='fs-5'>Solicitud de vacaciones</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default SolicitudesMenu;
