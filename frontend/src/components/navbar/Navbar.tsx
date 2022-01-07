import './Navbar.css';
const Navbar = () => {
	return (
		<>
			<div className='d-flex '>
				<nav className='d-flex align-items-center justify-content-between navbarContainer'>
					<div className='navbarBtnMenu d-flex justify-content-center'>
						<i className='bi bi-list navbarIcon' />
					</div>
					<div>
						<img width='100px' src='assets\gersa-logo.png' alt='gersa-logo' />
					</div>
					<div>
						<i
							className='bi bi-person-circle navbarIcon'
							style={{ color: '#ff0062' }}
						/>
					</div>
				</nav>
			</div>
		</>
	);
};

export default Navbar;
