import './Checador.css';

const ChecadorConfirmacion = () => {
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
						Ivan Ojendis Santana
					</div>
					<div className='fs-2  textColorSecondary'>4052</div>
					<div className='fs-5 textColorLight text-center'>
						Cordenadas: 17.5548193, -99.4877102,19z
					</div>
				</div>
				<div className='mt-4 pb-5 d-flex flex-wrap justify-content-center'>
					<button
						className='btn custm-btnCheckConfirmation custm-btnCheckConfirmation1'
						type='button'
					>
						NO
					</button>
					<button
						className='btn custm-btnCheckConfirmation custm-btnCheckConfirmation2'
						type='button'
					>
						SI
					</button>
				</div>
			</div>
		</>
	);
};

export default ChecadorConfirmacion;
