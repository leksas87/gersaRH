import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	getEmployeeById,
	getUserById,
} from '../../actions/usersActions/usersActions';
import { RootSote } from '../../store/Store';
import './InicioPage.css';

const InicioPage = () => {
	//Se necesita el state que indica el nombre del usuario
	const { firstName, id } = useSelector((state: RootSote) => state.auth);
	const { perfilEmpleado } = useSelector((state: RootSote) => state.users);

	const [isBirthday, setIsBirthday] = useState(false);

	//dispatch para ejecutarActions
	const dispatch = useDispatch();

	useEffect(() => {
		//metodo si hoy es cumpleaños
		const isToday = () => {
			const today = new Date();
			// console.log('fechaHoy', today);
			// console.log(perfilEmpleado.fechaNacimiento);
			const fecha = new Date(perfilEmpleado.fechaNacimiento);
			// console.log('fechaCumple', fecha);
			return (
				fecha.getDate() === today.getDate() && fecha.getMonth() === today.getMonth()
			);
		};

		// isToday();
		setIsBirthday(isToday());
	}, [perfilEmpleado]);

	//useEfect para ejecutar...
	useEffect(() => {
		dispatch(getUserById(id));
		dispatch(getEmployeeById(id));
	}, [id, dispatch]);

	return (
		<>
			<div className='d-flex flex-column custm-NominaContainer'>
				<div className='custm-inicioContainer'>
					<div className=' custm-ContainerListGrid'>
						{isBirthday ? (
							<div className='custm-grid-area grid-area-post1'>
								<div className='custm-iPost1  d-flex flex-column justify-content-center align-items-center'>
									<div className='fs-4 fw-bold'>
										<span className='fs-1'>🎊</span>¡Hola {firstName}!
										<span className='fs-1'>🎊</span>
									</div>
									<div className='fs-2' style={{ height: '28px' }}>
										<span className='fs-1'>🎉</span>
										¡FELIZ CUMPLEAÑOS!<span className='fs-1'>🎉</span>
									</div>
									<div
										className='fs-3 text-center mt-5 textColorLight lh-1'
										style={{ width: '80%' }}
									>
										Nuestros mejores deseos para tí te desean tus amigos de GERSA
									</div>
									<div className='custm-underLine'></div>
								</div>
							</div>
						) : (
							<div className='custm-grid-area grid-area-post1'>
								<div className='custm-iPost1  d-flex flex-column justify-content-center align-items-center'>
									<div className='fs-1 fw-bold'>¡Hola {firstName}!</div>
									<div className='fs-3' style={{ height: '28px' }}>
										Bienvenido de vuelta
									</div>
									<div className='fs-3 '>esto es lo nuevo por aqui...</div>
									<div className='custm-underLine'></div>
								</div>
							</div>
						)}
						<div className='custm-grid-area grid-area-post2'>
							<div className='custm-iPost2 custm-postShadow d-flex flex-column align-items-center'>
								<div className='custm-PostTittle'>DETALLE DE NÓMINA</div>
								<div className='custm-postBody'>
									<Link
										to='detalleNomina'
										className='textColorLink fs-4 text-decoration-none'
									>
										<i className='bi bi-eye' /> Ver detalle de nómina.
									</Link>
								</div>
							</div>
						</div>
						<div className='custm-grid-area grid-area-post3'>
							<div className='custm-iPost custm-postShadow d-flex flex-column align-items-center'>
								<div className='custm-PostTittle'>MI PERFIL</div>
								<div className='custm-postBody'>
									<Link
										to='miperfil'
										className='textColorLink fs-4 text-center text-decoration-none'
									>
										<i className='bi bi-eye' /> Ver mi perfil
									</Link>
								</div>
							</div>
						</div>
						<div className='custm-grid-area grid-area-post4'>
							<div className='custm-iPost custm-postShadow d-flex flex-column align-items-center'>
								<div className='custm-PostTittle'>SOLICITUDES</div>
								<div className='custm-postBody'>
									<Link
										to='solicitudes'
										className='textColorLink fs-4 text-center text-decoration-none'
									>
										<i className='bi bi-eye' /> Ver mis solicitudes.
									</Link>
								</div>
							</div>
						</div>
						<div className='custm-grid-area grid-area-post5'>
							<div className='custm-iPost custm-postShadow d-flex flex-column align-items-center'>
								<div className='custm-PostTittle'>REPORTES</div>
								<div className='custm-postBody'>
									<Link
										to='misreportes'
										className='textColorLink fs-4 text-center text-decoration-none'
									>
										<i className='bi bi-eye' /> Ver mis reportes.
									</Link>
								</div>
							</div>
						</div>
						<div className='custm-grid-area grid-area-post6'>
							<div className='custm-iPost custm-postShadow d-flex flex-column align-items-center'>
								<div className='custm-PostTittle'>HORAS EXTRAS</div>
								<div className='custm-postBody'>
									<Link
										to='horasextras'
										className='textColorLink fs-4 text-center text-decoration-none'
									>
										<i className='bi bi-eye' /> Ver sección horas extras
									</Link>
								</div>
							</div>
						</div>
						<div className='custm-grid-area grid-area-post7'>
							<div className='custm-iPost custm-postShadow d-flex flex-column align-items-center'>
								<div className='custm-PostTittle'>MIS ARCHIVOS</div>
								<div className='custm-postBody'>
									<Link
										to='misarchivos'
										className='textColorLink fs-4 text-center text-decoration-none'
									>
										<i className='bi bi-eye' /> Ver mis archivos
									</Link>
								</div>
								{/* <div className='textColorLight mt-1'>Faltas, retardos, desempeño.</div>
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
								</div> */}
							</div>
						</div>
					</div>
				</div>
				{/* <DetalleNomina /> */}
			</div>
		</>
	);
};

export default InicioPage;
