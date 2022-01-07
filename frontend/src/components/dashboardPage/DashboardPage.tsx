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
					<p>
						S Proident ut exercitation ad aliquip ullamco reprehenderit sit. Culpa
						nostrud consectetur qui fugiat. Culpa adipisicing id exercitation nulla
						elit in excepteur ea ullamco in excepteur. Pariatur minim consequat
						excepteur qui ut ullamco non adipisicing aute labore adipisicing dolore
						anim. Sit sit exercitation magna qui est veniam nisi ea adipisicing
						incididunt eu commodo nulla.
						<br />
						<br />
						Et excepteur anim laboris sint dolore. Deserunt sit minim in nisi. Nisi
						occaecat voluptate ut pariatur sunt irure quis ea. Laborum enim irure duis
						enim ipsum cupidatat sunt ipsum do dolor enim. Occaecat sunt qui fugiat
						adipisicing in nostrud non pariatur excepteur. Nulla laboris aliqua magna
						proident. Minim culpa elit eiusmod ex elit occaecat non aliquip
						consectetur ea deserunt enim est consequat. Incididunt dolor aute enim
						ipsum irure cillum deserunt dolore adipisicing ullamco tempor sint minim
						enim.
						<br />
						<br />
						Proident consectetur aute sunt in velit. Eu in sunt incididunt
						exercitation ullamco sint pariatur magna et sit ea elit mollit qui. Fugiat
						culpa nisi Lorem tempor do officia sint ex ullamco duis fugiat. Velit elit
						qui quis consequat duis nostrud aliquip excepteur cupidatat consequat
						adipisicing et minim. Veniam sunt nulla non anim ullamco et amet
						exercitation anim id nisi. Sunt incididunt et ut ullamco elit in aute
						sunt.
					</p>
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
