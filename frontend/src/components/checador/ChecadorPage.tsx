import './Checador.css';

const ChecadorPage = () => {
	return (
		<div className='container containerProject d-flex flex-column justify-content-center align-items-center'>
			<div className='d-flex mb-4'>
				{/* <img width='200px' src='\assets\gersa-logo.png' alt='gersa-logo' /> */}
				<img width='300px' src='\assets\gersaLogo.svg' alt='gersa-logo' />
			</div>
			<div className='d-flex flex-column align-items-center lh-sm'>
				<div className='fs-2 fw-bold textColorSecondary'>¡Bienvenido!</div>
				<div className='fs-4 fw-light textColorLight'>Por favor regístrese</div>
			</div>
			<div className='d-flex mt-4 mb-5'>
				<button
					type='button'
					className=' btn d-flex flex-column align-items-center me-5'
				>
					<div className='custm-btnCheck custm-btnCheckIn d-flex justify-content-center align-items-center'>
						<i className='custm-checkDoor bi bi-door-open' />
						<i className='custm-checkArrow bi bi-box-arrow-in-left' />
					</div>
					<div className='custm-btnCheckTittle'>ENTRADA.</div>
				</button>
				<button
					type='button'
					className=' btn d-flex flex-column align-items-center ms-5'
				>
					<div className='custm-btnCheck custm-btnCheckOut d-flex justify-content-center align-items-center'>
						<i className='custm-checkDoor bi bi-door-open' />
						<i className='custm-checkArrow bi bi-box-arrow-right' />
					</div>
					<div className='custm-btnCheckTittle'>SALIDA.</div>
				</button>
			</div>
		</div>
	);
};

export default ChecadorPage;