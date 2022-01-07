import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './DashboardPage.css';

const DashboardPage = () => {
	return (
		<>
			<div style={{ backgroundColor: 'red', width: '100%' }}>
				<Navbar />
			</div>
			<div className='d-flex container'>
				{/* <Sidebar /> */}
				<div className='dashboardContainer'>
					<h1>start</h1>
					<h1>End</h1>
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
