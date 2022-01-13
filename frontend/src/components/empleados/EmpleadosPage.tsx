import './Empleados.css';

const EmpleadosPage = () => {
	return (
		<>
			<div className='custm-empleadosContainer rounded-3 ms-3 shadow'>
				<div className='custm-empleadosHead '>
					<div
						className='textColorSecondary fs-4'
						style={{ textDecoration: 'underline' }}
					>
						Empleados
					</div>
					<div className='custm-btnNuevoEmpleadoContainer'>
						<button className='custm-btnNuevoEmpleado'>+ Nuevo empleado</button>
						<button className='custm-btnMasEmpleado'>●●●</button>
					</div>
				</div>
				<div className='d-flex justify-content-center pt-4'>
					<div className='table-responsive'>
						<table className='table  table-hover' style={{ minWidth: '500px' }}>
							<thead>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>Nombre</th>
									<th scope='col'>Apellido</th>
									<th scope='col'>....</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope='row'>1</th>
									<td>Ivan</td>
									<td>Santana</td>
									<td>@ios</td>
								</tr>
								<tr>
									<th scope='row'>2</th>
									<td>Miguel</td>
									<td>Herrera</td>
									<td>@MM</td>
								</tr>
								<tr>
									<th scope='row'>3</th>
									<td>Larry</td>
									<td>the Bird</td>
									<td>@twitter</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export default EmpleadosPage;
