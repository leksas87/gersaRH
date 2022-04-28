import React, { useState, useEffect, useCallback, useRef } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootSote } from '../../store/Store';
import { logOut, startChecking } from '../../actions/loginActions/loginActions';
import * as bootstrap from 'bootstrap';

const SessionTimeout = () => {
	const dispatch = useDispatch();
	const [second, setSecond] = useState(0);
	const [isOpen, setOpen] = useState(false);

	const { authState } = useSelector((state: RootSote) => state.auth);
	const isAuthenticated = authState.isAutenticated;

	let warningInactiveInterval: any = useRef();
	let startTimerInterval: any = useRef();

	// start inactive check
	const timeChecker = useCallback(() => {
		startTimerInterval.current = setTimeout(() => {
			if (isAuthenticated) {
				const fecha = moment().format('YYYY-MM-DD HH:mm:ss');
				// warning timer
				let warningInactive = (timeString: any) => {
					clearTimeout(startTimerInterval.current);

					warningInactiveInterval.current = setInterval(() => {
						const maxTime = 2;
						const popTime = 1;

						const diff = moment.duration(moment().diff(moment(timeString)));

						const minPast = diff.minutes();
						console.log('minPast', minPast);

						const leftSecond = 60 - diff.seconds();
						console.log(leftSecond);

						if (minPast === popTime) {
							setSecond(leftSecond);
							setOpen(true);
						}
						if (minPast === maxTime) {
							clearInterval(warningInactiveInterval.current);
							setOpen(false);
							sessionStorage.removeItem('lastTimeStamp');
							localStorage.clear();
							dispatch(logOut());
							//ocultar modal
							const miModal = document.getElementById('ModalSessionTimeOut');
							if (miModal) {
								miModal.click();
							}
						}
					}, 1000);
				};
				warningInactive(fecha);
			} else return;
		}, 6600000); //110 mntos //Tiempo en activar modal de alerta (tiene que ser  menor al tiempo que expira el toquen).
		// }, 5000); //5segundos //Tiempo en activar modal de alerta (tiene que ser  menor al tiempo que expira el toquen).
	}, [isAuthenticated, dispatch]);

	// reset interval timer
	let resetTimer = useCallback(() => {
		clearTimeout(startTimerInterval.current);
		clearInterval(warningInactiveInterval.current);

		if (isAuthenticated) {
			dispatch(startChecking());
		} else {
			localStorage.clear();
			dispatch(logOut());
		}
		timeChecker();
		setOpen(false);
	}, [isAuthenticated, dispatch, timeChecker]);

	// handle close popup - Formulario
	const handleClose = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetTimer();
	};

	useEffect(() => {
		timeChecker();

		return () => {
			clearTimeout(startTimerInterval.current);
		};
	}, [timeChecker]);

	// console.log(second);

	useEffect(() => {
		//mostrarmodal
		if (isOpen) {
			const miModal = document.getElementById('ModalSessionTimeOut');
			if (miModal) {
				const myModal = new bootstrap.Modal(miModal, {});
				myModal.show();
			}
		}
	}, [isOpen]);

	const startLogOut = () => {
		setOpen(false);
		localStorage.clear();
		dispatch(logOut());

		//ocultar modal
		const miModal = document.getElementById('ModalSessionTimeOut');
		if (miModal) miModal.click();
		resetTimer();
	};

	// change fragment to modal and handleclose func to close
	// return <Fragment />;
	return (
		// <Fragment />
		<>
			{/* <!-- Modal --> */}
			<div
				className='modal fade'
				id='ModalSessionTimeOut'
				tabIndex={-1}
				aria-labelledby='ModalSessionTimeOut'
				aria-hidden='true'
			>
				<div className='modal-dialog d-flex justify-content-center'>
					<div className='modal-content custm-modalContent'>
						<div
							className='modal-header'
							style={{
								border: 'none',
								borderRadius: '50px',
							}}
						>
							<div className='custm-modalIcon d-flex justify-content-center align-items-center'>
								<i className='bi bi-person-dash textColorError2' />
							</div>
							<button
								type='button'
								className='btn-close custm-iconExit'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div
							className='d-flex justify-content-center custm-Width100'
							style={{
								height: '50%',
							}}
						>
							<div
								className='d-flex flex-column justify-content-between'
								style={{ width: '82%' }}
							>
								<div
									className='d-flex flex-column'
									style={{ maxWidth: '100%', lineHeight: '28px', marginTop: '1rem' }}
								>
									<label className='textColorPrimary fs-2 mt-3'>Sesión</label>
									<label
										className='textColorLight fw-light mt-4'
										style={{
											lineHeight: '20px',
											marginTop: '1rem',
											textAlign: 'justify',
											letterSpacing: '.5px',
										}}
									>
										Su sesión está por expirar ¿desea mantener la sesión activa?.
									</label>
								</div>
								<div>
									<h2>{second}</h2>
								</div>
								<form onSubmit={handleClose}>
									<div className='d-flex justify-content-end pt-5'>
										<button
											className='btn btn-outline-secondary m-1'
											type='button'
											data-bs-dismiss='modal'
											aria-label='Close'
											onClick={startLogOut}
										>
											Cerrar sesión
										</button>
										<button
											type='submit'
											className=' btn btn-success m-1'
											data-bs-dismiss='modal'
											aria-label='Close'
										>
											Mantener sesión
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SessionTimeout;
