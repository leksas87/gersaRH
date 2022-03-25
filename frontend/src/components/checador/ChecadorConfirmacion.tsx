import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import {
	changecheckIsUserActiveFalse,
	sendAccessCodeDataCheck,
} from '../../actions/eventsActions/eventsActions';
import { RootSote } from '../../store/Store';
import './Checador.css';

const ChecadorConfirmacion = () => {
	//Senecesita el state que indica  el checkState
	const { userConfirmation, eventsState: checkState } = useSelector(
		(state: RootSote) => state.events
	);

	//useDispatch para ejecutar las Actions
	const dispatch = useDispatch();

	//useState para almacenar las cordenas
	const [cordenadas, setCordenadas] = useState({
		latitude: 0,
		longitude: 0,
	});

	//useNaviagate para navegar a la ruta indicada
	// const navigate = useNavigate();

	//Metodo que envia lso datos de confirmacion
	// const confirmationCheck = () => {
	// 	if (checkState.eventOption === 'entry') {
	// 		dispatch(
	// 			sendAccessCodeDataCheck(userConfirmation.accessCode, {
	// 				userId: userConfirmation.id,
	// 				username: userConfirmation.username,
	// 				latitudeCheck: cordenadas.latitude.toString(),
	// 				longitudeCheck: cordenadas.longitude.toString(),
	// 				tipoCheck: 'Entrada',
	// 			})
	// 		);
	// 	} else if (checkState.eventOption === 'exit') {
	// 		dispatch(
	// 			sendAccessCodeDataCheck(userConfirmation.accessCode, {
	// 				userId: userConfirmation.id,
	// 				username: userConfirmation.username,
	// 				latitudeCheck: cordenadas.latitude.toString(),
	// 				longitudeCheck: cordenadas.longitude.toString(),
	// 				tipoCheck: 'Salida',
	// 			})
	// 		);
	// 	}
	// };

	//Metodo para enviar al inicio
	const navigateCheck = () => {
		// console.log('cordenadas', checkState.checkOption);
		// dispatch(changeCheckValue(''));
		dispatch(changecheckIsUserActiveFalse());
		// navigate('/checador');
	};

	useEffect(() => {
		//Aquí metodo para obtener coordenadas
		const componentDidMount = () => {
			navigator.geolocation.getCurrentPosition(function (position) {
				// console.log('Latitude is :', position.coords.latitude);
				// console.log('Longitude is :', position.coords.longitude);
				setCordenadas({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
			});
		};
		componentDidMount();
	}, []);

	return (
		<>
			<div className='container containerProject d-flex flex-column justify-content-center align-items-center'>
				<div className='d-flex mb-4'>
					<img
						className='custm-imgCheck'
						src='\assets\gersaLogo.svg'
						alt='gersa-logo'
					/>
				</div>
				<div className='d-flex flex-column align-items-center lh-sm'>
					<div className='fs-2  textColorSecondary text-center'>
						Confírmanos que eres tú
					</div>
				</div>
				<div className='d-flex flex-column align-items-center mt-3'>
					<div className='fs-1 fw-bold textColorSecondary text-center'>
						{userConfirmation.firstName} {userConfirmation.lastName}
					</div>
					<div className='fs-5 textColorLight text-center mt-3'>
						Cordenadas: {cordenadas.latitude}, {cordenadas.longitude}
					</div>
				</div>
				<div className='mt-4 pb-5 d-flex flex-wrap justify-content-center'>
					<button
						className='btn custm-btnCheckConfirmation custm-btnCheckConfirmation1'
						type='button'
						onClick={navigateCheck}
					>
						NO
					</button>
					<button
						className='btn custm-btnCheckConfirmation custm-btnCheckConfirmation2'
						type='button'
						// onClick={confirmationCheck}
					>
						SI
					</button>
				</div>
			</div>
		</>
	);
};

export default ChecadorConfirmacion;
