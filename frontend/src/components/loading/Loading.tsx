const Loading = () => {
	return (
		<>
			<div
				className='loadingContainer d-flex flex-column'
				style={{ paddingBottom: '10rem' }}
			>
				<div style={{ paddingBottom: '2rem' }}>
					<img width='200px' src='\assets\gersaLogo.svg' alt='gersa-logo' />
				</div>
				<div className='d-flex justify-content-center'>
					<div className='spinner-border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Loading;
