import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iEmpleado } from '../../actions/usersActions/usersActionTypes';
import { sortEmployees } from '../../helpers/sortEmployees';
import './TablaEmpleados.css';

//interface para las props del componente
interface iTablaEmpleadosProps {
	empleados: iEmpleado[];
}

const TablaEmpleados = ({ empleados }: iTablaEmpleadosProps) => {

	const [isAscending, setIsAscending] = useState<boolean>(true);
	const navigate = useNavigate();
	

	//Metodo para navegar al perfil del empleado
	const irEmpleado = (id: number) => {
		navigate(`/${id}`);
		console.log('id empleado: ', id);
	};

	return (
		<>
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
								<th scope='col' className='custm-col'>Nombre     
									<i 
										className="custm-icon bi bi-arrow-down-up" 
										onClick={() => {
											sortEmployees(empleados,"Nombre",isAscending);
											isAscending ? setIsAscending(false) 
														: setIsAscending(true)
											
										}}
									/>
								</th>
								<th scope='col' className='custm-col'>Apellidos
									<i 
										className="custm-icon bi bi-arrow-down-up" 
										onClick={() => {
											sortEmployees(empleados,"Apellidos",isAscending);
											isAscending ? setIsAscending(false) 
														: setIsAscending(true)
										}}
									/>
								</th>
								<th scope='col' className='custm-col'>Correo
									<i 
										className="custm-icon bi bi-arrow-down-up" 
										onClick={() => {
											sortEmployees(empleados,"Correo",isAscending);
											isAscending ? setIsAscending(false) 
														: setIsAscending(true)
										}}
									/>
								</th>
								<th scope='col' className='custm-col'>Telefono
									<i 
										className="custm-icon bi bi-arrow-down-up" 
										onClick={() => {
											sortEmployees(empleados,"Telefono",isAscending);
											isAscending ? setIsAscending(false) 
														: setIsAscending(true)
										}}
									/>
								</th>
							</tr>
						</thead>
						<tbody>
							{empleados.map((empleado: iEmpleado) => (
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
		</>
	);
};

export default TablaEmpleados;
