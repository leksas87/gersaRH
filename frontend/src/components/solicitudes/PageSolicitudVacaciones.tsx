import { useNavigate } from 'react-router-dom';
import ModalNuevaSolicitudVacaciones from './ModalNuevaSolicitudVacaciones';

const PageSolicitudVacaciones = () => {
	//useNavigate para redireccionar a la página principal de solicitudes
	const navigate = useNavigate();

	const navigateMenu = () => {
		navigate('/solicitudes');
	};
	return (
		<>
			<div className='custm-empleadosHead justify-content-between'>
				<button className='btn fs-5' onClick={navigateMenu}>
					<i className='bi bi-arrow-left' />
				</button>

				<div
					className='textColorSecondary fs-4'
					style={{ textDecoration: 'underline' }}
				>
					Solicitud de Vacaciones
				</div>
				<ModalNuevaSolicitudVacaciones />
			</div>
			<div className='d-flex flex-column justify-content-center pt-4 p-4'>
				{/* Inicio */}
				<div className='d-flex flex-wrap custm-Width100 '>
					{/* Izquierda */}
					<div className='custm-PageContainerContent'>
						<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
							<div className='custm-Width100'>
								<i
									style={{ fontSize: '3rem', color: 'var(--textColorLink)' }}
									className='bi bi-calendar2-week-fill'
								/>
							</div>
							<div className='fs-4'>Solicitud de vacaciones</div>
							<div className='fs-5 textColorLight'>Crea y visualiza aquí</div>
							<div className='fs-5 textColorLight'>tus solicitudes de vacaciones</div>
							<div className='custm-underLineTittle'></div>
						</div>
					</div>
					{/* Derecha */}
					<div className='custm-PageContainerContent'>
						<div className='d-flex flex-column align-items-center custm-PageHistoryContainer'>
							<div className='fs-5 textColorLight mt-2'>Historial de solicitudes</div>
							{/* Inicio */}
							<div className='d-flex flex-column custm-Width100 mt-3 custm-UnderLineSection p-3'>
								<div className='d-flex textColorSecondary'>
									<div style={{ width: '40%' }}>Fecha de solicitud:</div>
									<div style={{ width: '60%' }}>01/01/2022</div>
								</div>
								<div className='d-flex textColorSecondary mt-3'>
									<div className='fw-bold' style={{ width: '40%' }}>
										Vacaciones:
									</div>
									<div className='d-flex' style={{ width: '60%' }}>
										<div className='d-flex flex-column pe-4'>
											<div className='fw-bold'>De:</div>
											<div className='textColorLight'>01/01/2022</div>
										</div>
										<div className='d-flex flex-column'>
											<div className='fw-bold'>A:</div>
											<div className='textColorLight'>01/01/2022</div>
										</div>
									</div>
								</div>
								<div className='d-flex textColorSecondary mt-3'>
									<div style={{ width: '40%' }}>Descripción:</div>
									<div style={{ width: '60%' }}>
										Veniam non commodo exercitation qui cupidatat sit sit proident
										proident. Sit duis officia eiusmod sint minim cupidatat dolor
										exercitation pariatur. Adipisicing velit cillum velit veniam irure
										dolor laborum fugiat ex Lorem ad.
									</div>
								</div>
								<div className='d-flex textColorSecondary mt-3'>
									<div style={{ width: '40%' }}>Estatus:</div>
									<div className='d-flex' style={{ width: '60%' }}>
										<span className='custm-Status1 pe-3'>● Pendiente</span>
									</div>
								</div>
								<div className='d-flex textColorSecondary mt-2'>
									<div style={{ width: '40%' }}></div>
									<div className='textColorLight' style={{ width: '60%' }}>
										<div>Detalle:</div>
										Veniam non commodo exercitation qui cupidatat sit sit proident
										proident. Sit duis officia eiusmod sint minim cupidatat dolor
										exercitation pariatur. Adipisicing velit cillum velit veniam irure
										dolor laborum fugiat ex Lorem ad.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageSolicitudVacaciones;
