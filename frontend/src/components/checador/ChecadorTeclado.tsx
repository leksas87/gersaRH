import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	changeCheckValue,
	sendAccessCodeCheck,
} from '../../actions/eventsActions/eventsActions';
import { RootSote } from '../../store/Store';
import './Checador.css';
const ChecadorTeclado = () => {
	//Senecesita el state que indica  el checkState
	const { eventsState: checkState } = useSelector(
		(state: RootSote) => state.events
	);
	//useLocation para conocer el path
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	//useNavigate oara redeireciconar a otra pagina
	const navigate = useNavigate();

	const [code, setCode] = useState('');

	const uno = code.slice(0, 1);
	const dos = code.slice(1, 2);
	const tres = code.slice(2, 3);
	const cuatro = code.slice(3, 4);

	//Metodo para ingresar los numeros
	const handleClick = (e: any) => {
		if (code.length > 3) return;
		setCode(code.concat(e.target.name));
	};

	//Metodo para eliminar el ultimo caracter
	const handleDelete = () => {
		const strLast = code.slice(0, -1);
		setCode(strLast);
	};

	//Effecto para ingresar codigo de acceso a travez del teclado de la computadora
	useEffect(() => {
		function key(e: any) {
			if (e.key === 'Enter') return;
			if (e.key === ' ') return;
			if (code.length < 4) setCode(code.concat(e.key));
		}
		window.addEventListener('keypress', key);

		return () => {
			window.removeEventListener('keypress', key);
		};
	}, [code, setCode]);

	//Envio data al backend
	const sendAccessCode = () => {
		if (pathname === '/checador/entry') {
			dispatch(sendAccessCodeCheck(parseInt(code)));
			dispatch(changeCheckValue('entry'));
		} else if (pathname === '/checador/exit') {
			dispatch(sendAccessCodeCheck(parseInt(code)));
			dispatch(changeCheckValue('exit'));
		}
	};

	//useEffect para redireccionar al login una vez se actualizo el password
	useEffect(() => {
		if (checkState.eventIsUserConfirm) {
			navigate('/checador/confirm');
		}
	}, [checkState, navigate]);

	return (
		<>
			<div className='container containerProject d-flex flex-column justify-content-center align-items-center'>
				<Link to='/checador' className='custm-arrowLeft'>
					<i className='bi bi-arrow-left' />
				</Link>
				<div className='d-flex mb-4'>
					<img
						className='custm-imgCheck'
						src='\assets\gersaLogo.svg'
						alt='gersa-logo'
					/>
				</div>
				<div className='d-flex flex-column align-items-center lh-sm'>
					<div className='fs-2 fw-light textColorSecondary'>Ingresa tu código</div>
				</div>
				<div className='d-flex '>
					<div
						className={
							uno
								? 'p-2 custm-digitCheck custm-digitCheckActive'
								: 'p-2 custm-digitCheck'
						}
					>
						{uno}
					</div>
					<div
						className={
							dos
								? 'p-2 custm-digitCheck custm-digitCheckActive'
								: 'p-2 custm-digitCheck'
						}
					>
						{dos}
					</div>
					<div
						className={
							tres
								? 'p-2 custm-digitCheck custm-digitCheckActive'
								: 'p-2 custm-digitCheck'
						}
					>
						{tres}
					</div>
					<div
						className={
							cuatro
								? 'p-2 custm-digitCheck custm-digitCheckActive'
								: 'p-2 custm-digitCheck'
						}
					>
						{cuatro}
					</div>
				</div>
				<div>
					<div className='d-flex flex-column custm-btnTableCheckContainer'>
						<div className='d-flex'>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='1'
								onClick={handleClick}
							>
								1
							</button>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='2'
								onClick={handleClick}
							>
								2
							</button>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='3'
								onClick={handleClick}
							>
								3
							</button>
						</div>
						<div className='d-flex'>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='4'
								onClick={handleClick}
							>
								4
							</button>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='5'
								onClick={handleClick}
							>
								5
							</button>
							<button
								className='btn custm-btnTableCheck'
								type='button'
								name='6'
								onClick={handleClick}
							>
								6
							</button>
						</div>
						<div className='d-flex'>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='7'
								onClick={handleClick}
							>
								7
							</button>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='8'
								onClick={handleClick}
							>
								8
							</button>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='9'
								onClick={handleClick}
							>
								9
							</button>
						</div>
						<div className='d-flex justify-content-end'>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='0'
								onClick={handleClick}
							>
								0
							</button>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='delete'
								onClick={handleDelete}
							>
								<i className='bi bi-backspace-fill' />
							</button>
						</div>
					</div>
					{!checkState.loading ? (
						<button
							className='btn custm-Width100 custm-btnCheckSubmit mt-4'
							type='button'
							onClick={sendAccessCode}
							disabled={code.length < 4 ? true : false}
						>
							CONTINUAR
						</button>
					) : (
						<button
							className='btn  custm-Width100 custm-btnCheckSubmit mt-4'
							type='button'
							disabled
						>
							<span
								className='spinner-border spinner-border-sm me-2'
								role='status'
								aria-hidden='true'
							></span>
							Espere...
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default ChecadorTeclado;
