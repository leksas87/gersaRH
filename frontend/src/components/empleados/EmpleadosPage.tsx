import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../actions/usersActions/usersActions';
import { RootSote } from '../../store/Store';
import Empleados from './Empleados';
import './Empleados.css';

const EmpleadosPage = () => {
	const navigate = useNavigate();
	//Dispatch para ejetur la accion.
	const dispatch = useDispatch();
	//Senecesita el state que indica si el usuario está autenticado o no
	const { empleados } = useSelector((state: RootSote) => state.users);

	//Efecto que ejecuta la accion getUsers cada que carga el componente.
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const irEmpleado = (id: number) => {
		navigate(`/${id}`);
		console.log('id empleado: ', id);
	};
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
						{/* Boton Nuevo Empleado */}
						<Empleados />
						<button className='btn custm-btnMasEmpleado custmBtnActions'>●●●</button>
					</div>
				</div>
				<div className='d-flex flex-column justify-content-center pt-4 p-4'>
					<div className='custm-coninerTituloEmpleados d-flex  justify-content-between ms-3'>
						<div>
							<div className='d-flex '>
								<div className='custm-empleadosIcon'>
									<i className='bi bi-people' />
								</div>
								<div className='d-flex ms-2 align-items-center'>
									<label className='fs-3  textColorSecondary'>Empleados</label>
								</div>
							</div>
							<div className=' custm-descEmpleados textColorLight fw-light pb-3'>
								Aquí están todos los empleados de tu empresa.
							</div>
						</div>
						<div className='d-flex align-items-center'>
							<div className='d-flex flex-column align-items-center custm-NumEmpleados mb-3 me-2'>
								<div>{empleados.length}</div>
								<div>Empleados</div>
							</div>
						</div>
					</div>
					<div className='custm-tableEmpleados'>
						<div className='d-flex flex-column custm-tableHead'>
							<div className='custm-tableSearchBar d-flex align-items-center ms-3'>
								<div className='form-floating '>
									<input
										style={{ borderRadius: '30px' }}
										type='text'
										className='form-control'
										id='floatingInput'
										placeholder='Ingresa tu busqueda'
									/>
									<label htmlFor='floatingInput'>Buscar</label>
								</div>
							</div>
						</div>
						<div className='table-responsive cutm-tablaResponsive'>
							<table className='table table-hover '>
								<thead className='custm-tableThead'>
									<tr>
										<th scope='col'></th>
										<th scope='col'>Nombre</th>
										<th scope='col'>Apellidos</th>
										<th scope='col'>Correo</th>
										<th scope='col'>Telefono</th>
									</tr>
								</thead>
								<tbody>
									{empleados.map((empleado) => (
										<tr
											key={empleado.id}
											className='custm-table-tr'
											onClick={() => {
												irEmpleado(empleado.id);
											}}
										>
											<th scope='row'>
												<div className='custm-imgCount ms-2'>
													<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
												</div>
											</th>
											<td>{empleado.firstName}</td>
											<td>{empleado.lastName}</td>
											<td>{empleado.username}</td>
											<td>{empleado.phone}</td>
										</tr>
									))}
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
