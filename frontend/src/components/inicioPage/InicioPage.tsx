import { useSelector } from 'react-redux';
import { RootSote } from '../../store/Store';
import './InicioPage.css';

const InicioPage = () => {
	//Se necesita el state que indica el nombre del usuario
	const { firstName } = useSelector((state: RootSote) => state.auth);
	return (
		<>
			<div className='custm-inicioContainer'>
				<div className=' custm-ContainerListGrid'>
					<div className='custm-grid-area grid-area-post1'>
						<div className='custm-iPost1 custm-postShadow d-flex flex-column justify-content-center align-items-center'>
							<div className='fs-1 fw-bold'>¡Hola {firstName}!</div>
							<div className='fs-3' style={{ height: '28px' }}>
								Bienvenido de vuelta
							</div>
							<div className='fs-3 '>esto es lo nuevo por aqui...</div>
							<div className='custm-underLine'></div>
						</div>
					</div>
					<div className='custm-grid-area grid-area-post2'>
						<div className='custm-iPost2 custm-postShadow d-flex flex-column align-items-center'>
							<div className='custm-PostTittle'>TAREAS PENDIENTES</div>
							<div className='custm-postBody'>
								<label className='textColorLight fs-4'>No tienes nada pendiente.</label>
							</div>
						</div>
					</div>
					<div className='custm-grid-area grid-area-post3'>
						<div className='custm-iPost custm-postShadow d-flex flex-column align-items-center'>
							<div className='custm-PostTittle'>AVISOS</div>
							<div className='custm-postBody'>
								<label className='textColorLight fs-4 text-center'>
									No hay ningún aviso en este momento.
								</label>
							</div>
						</div>
					</div>
					<div className='custm-grid-area grid-area-post4'>
						<div className='custm-iPost custm-postShadow d-flex flex-column align-items-center'>
							<div className='custm-PostTittle'>PROXIMAS AUSENCIAS</div>
							<div className='custm-postBody'>
								<label className='textColorLight fs-4 text-center'>
									No hay ausencias próximamente.
								</label>
							</div>
						</div>
					</div>
					<div className='custm-grid-area grid-area-post5'>
						<div className='custm-iPost custm-postShadow d-flex flex-column align-items-center'>
							<div className='custm-PostTittle'>PROXIMOS EVENTOS</div>
							<div className='custm-postBody'>
								<label className='textColorLight fs-4 text-center'>
									No hay eventos próximos.
								</label>
							</div>
						</div>
					</div>
					<div className='custm-grid-area grid-area-post6'>
						<div className='custm-iPost custm-postShadow d-flex flex-column align-items-center'>
							<div className='custm-PostTittle'>PROXIMOS FERIADOS</div>
							<div className='custm-postBody'>
								<label className='textColorLight fs-4 text-center'>
									No hay vacaciones próximas.
								</label>
							</div>
						</div>
					</div>
					<div className='custm-grid-area grid-area-post7'>
						<div className='custm-iPost custm-postShadow d-flex flex-column align-items-center'>
							<div className='custm-PostTittle'>SEMAFORO</div>
							<div className='textColorLight mt-1'>Faltas, retardos, desempeño.</div>
							<div className='custm-postBody'>
								<label className='textColorLight fs-1 text-center'>
									<span style={{ color: '#76FF73', padding: '0px 3px' }}>
										<i className='bi bi-emoji-laughing-fill' />
									</span>
									<span style={{ color: '#75ff7359', padding: '0px 3px' }}>
										<i className='bi bi-emoji-smile-fill' />
									</span>
									<span style={{ color: '#FFB34259', padding: '0px 3px' }}>
										<i className='bi bi-emoji-neutral-fill' />
									</span>
									<span style={{ color: '#FF5C5C59', padding: '0px 3px' }}>
										<i className='bi bi-emoji-frown-fill' />
									</span>
								</label>
							</div>
						</div>
					</div>

					{/* <div className='custm-iPost d-flex justify-content-center align-items-center flex-column shadow'>
						<h3>
							¡Hola, <span style={{ textTransform: 'capitalize' }}>{firstName}</span>!
						</h3>
						<p className='text-center'>
							Bienvenido de vuelta.
							<br /> Esto es lo nuevo por aqui...
						</p>
					</div>
					<div className='custm-iPost d-flex justify-content-center align-items-center flex-column shadow'></div>
					<div className='custm-iPost d-flex justify-content-center align-items-center flex-column shadow'></div> */}
				</div>
			</div>
		</>
	);
};

export default InicioPage;
