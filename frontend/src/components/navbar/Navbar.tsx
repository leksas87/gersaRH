import Sidebar from '../sidebar/Sidebar';
import './Navbar.css';
const Navbar = () => {
	return (
		<>
			<div className='d-flex '>
				<nav className='d-flex align-items-center justify-content-between navbarContainer'>
					<div className='d-flex justify-content-center'>
						<button
							className='navbarBtnMenu'
							type='button'
							data-bs-toggle='offcanvas'
							data-bs-target='#offcanvasExample'
							aria-controls='offcanvasExample'
						>
							<i className='bi bi-list navbarIcon' />
						</button>
					</div>
					<div>
						<img width='100px' src='assets\gersa-logo.png' alt='gersa-logo' />
					</div>

					<div className=' custm-imgCount'>
						<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
					</div>
				</nav>
			</div>

			<div
				className='offcanvas offcanvas-start'
				style={{
					width: '270px',
					borderEndEndRadius: '25px',
					borderTopRightRadius: '25px',
					backgroundColor: 'var(--backgroundBody)',
				}}
				tabIndex={-1}
				id='offcanvasExample'
				aria-labelledby='offcanvasExampleLabel'
			>
				<div className='offcanvas-header'>
					<h5 className='offcanvas-title' id='offcanvasExampleLabel'>{` `}</h5>
					<button
						type='button'
						className='btn-close text-reset'
						data-bs-dismiss='offcanvas'
						aria-label='Close'
					></button>
				</div>
				<div className='offcanvas-body'>
					<Sidebar />
				</div>
			</div>
		</>
	);
};

export default Navbar;
