import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import {
	changecheckIsUserActiveFalse,
	changeCheckValue,
} from '../../actions/checkActions/checkActions';
import { RootSote } from '../../store/Store';
import './Checador.css';

const ChecadorConfirmacion = () => {
	//Senecesita el state que indica  el checkState
	const { userConfirmation, checkState } = useSelector(
		(state: RootSote) => state.check
	);
	//useDispatch para ejecutar las Actions
	const dispatch = useDispatch();
	//useNaviagate para navegar a la ruta indicada
	// const navigate = useNavigate();

	//Aquí metodo para obtener coordenadas
	const componentDidMount = () => {
		navigator.geolocation.getCurrentPosition(function (position) {
			console.log('Latitude is :', position.coords.latitude);
			console.log('Longitude is :', position.coords.longitude);
		});
	};
	componentDidMount();

	//Metodo que envia lso datos de confirmacion
	const confirmationCheck = () => {
		if (checkState.checkOption === 'entry') {
			console.log('cordenadass', checkState.checkOption);
		} else if (checkState.checkOption === 'exit') {
			console.log('exit');
		}
	};
	//Metodo para enviar al inicio
	const navigateCheck = () => {
		// console.log('cordenadas', checkState.checkOption);
		dispatch(changeCheckValue(''));
		dispatch(changecheckIsUserActiveFalse());
		// navigate('/checador');
	};

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
					<div className='fs-2 fw-bold textColorSecondary text-center'>
						Confírmanos que eres tú
					</div>
				</div>
				<div className='d-flex flex-column align-items-center mt-5'>
					<div className='fs-2  textColorSecondary text-center'>
						{userConfirmation.username}
					</div>
					<div className='fs-2  textColorSecondary'>
						{userConfirmation.accessCode}
					</div>
					<div className='fs-5 textColorLight text-center'>
						Cordenadas: 17.5548193, -99.4877102,19z
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
						onClick={confirmationCheck}
					>
						SI
					</button>
				</div>
			</div>
		</>
	);
};

export default ChecadorConfirmacion;
