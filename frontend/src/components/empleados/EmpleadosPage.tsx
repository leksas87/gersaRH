import Empleados from './Empleados';
import './Empleados.css';

const EmpleadosPage = () => {
	return (
		<>
			<div className='custm-empleadosContainer rounded-3 shadow mt-4'>
				<div className='custm-empleadosHead '>
					<div
						className='textColorSecondary fs-4'
						style={{ textDecoration: 'underline' }}
					>
						Empleados
					</div>
					<div className='custm-btnNuevoEmpleadoContainer'>
						{/* <button className='custm-btnNuevoEmpleado'>+ Nuevo empleado</button> */}
						<Empleados />
						<button className='btn custm-btnMasEmpleado custmBtnActions'>●●●</button>
					</div>
				</div>
				<div className='d-flex flex-column justify-content-center pt-4 p-4 '>
					<div className='custm-tableEmpleados'>
						<div
							className='d-flex flex-column'
							style={{ backgroundColor: '#f4f4f5', margin: 'none', width: '100%' }}
						>
							<div>Aqui Va TITULO</div>
							<div>TITTLE</div>
							<div>SEARCH</div>
						</div>
						<div className='table-responsive '>
							<table className='table table-hover'>
								<thead style={{ backgroundColor: '#f4f4f5' }}>
									<tr>
										<th scope='col'>img</th>
										<th scope='col'>Nombre</th>
										<th scope='col'>Apellidos</th>
										<th scope='col'>Correo</th>
										<th scope='col'>Telefono</th>
									</tr>
								</thead>
								<tbody>
									<tr style={{ height: '4rem' }}>
										<th scope='row'>img</th>
										<td>Ivan</td>
										<td>Santana</td>
										<td>ivan.sanatana@gmail.com</td>
										<td>7471406561</td>
									</tr>
									<tr style={{ height: '4rem' }}>
										<th scope='row'>img</th>
										<td>Miguel</td>
										<td>Herrera</td>
										<td>miguel.herrera@gmaio.com</td>
										<td>7471717471</td>
									</tr>
									<tr style={{ height: '4rem' }}>
										<th scope='row'>img</th>
										<td>Ruben</td>
										<td>Martinezz</td>
										<td>miguel.herrera@gmaio.com</td>
										<td>7471717471</td>
									</tr>
									<tr style={{ height: '4rem' }}>
										<th scope='row'>img</th>
										<td>Ruben</td>
										<td>Martinezz</td>
										<td>miguel.herrera@gmaio.com</td>
										<td>7471717471</td>
									</tr>
									<tr style={{ height: '4rem' }}>
										<th scope='row'>img</th>
										<td>Ruben</td>
										<td>Martinezz</td>
										<td>miguel.herrera@gmaio.com</td>
										<td>7471717471</td>
									</tr>
									<tr style={{ height: '4rem' }}>
										<th scope='row'>img</th>
										<td>Ruben</td>
										<td>Martinezz</td>
										<td>miguel.herrera@gmaio.com</td>
										<td>7471717471</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EmpleadosPage;
