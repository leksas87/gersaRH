import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { changePath } from '../../actions/usersActions/usersActions';
import { iEmpleado } from '../../actions/usersActions/usersActionTypes';
import { sortEmployees } from '../../helpers/sortEmployees';
import './TablaEmpleados.css';

//interface para las props del componente
interface iTablaEmpleadosProps {
	empleados: iEmpleado[];
}

const TablaEmpleados = ({ empleados }: iTablaEmpleadosProps) => {
	//useLocation para conocer el path
	const { pathname } = useLocation();
	//dispatch para ejecutar Actions
	const dispatch = useDispatch();

	//hook searchParams
	const [searchParams, setSearchParams] = useSearchParams();
	const filter = searchParams.get('filter') ?? '';

	const [busqueda, setBusqueda] = useState('Nombre');

	//state para manejo de sort by
	const [isAscending, setIsAscending] = useState<boolean>(true);
	//hook useNavigate
	const navigate = useNavigate();

	//Metodo para navegar al perfil del empleado
	const irEmpleado = (id: number) => {
		navigate(`${pathname}/${id}/perfil`);
		//usando solo el is convertido en string (Es lo mismo por que las rutas se créan relativas a la ruta actual).
		// navigate(id.toString());
	};

	const handleFilter = (e: any) => {
		setSearchParams({ filter: e.target.value });
	};

	useEffect(() => {
		dispatch(changePath(pathname));
	}, [pathname]);

	return (
		<>
			<div className='custm-tableEmpleados'>
				<div className='d-flex flex-column custm-tableHead'>
					<div className='custm-tableSearchBar d-flex flex-wrap align-items-center ms-3'>
						<div className='d-flex'>
							<div className='d-flex align-items-center'>Buscar por</div>
							<select
								value={busqueda}
								className='form-select'
								aria-label='Default select example'
								style={{ width: '150px', marginLeft: '10px' }}
								onChange={(e) => {
									const selectedSearch = e.target.value;
									setBusqueda(selectedSearch);
								}}
							>
								<option value='Nombre'>Nombre</option>
								<option value='Apellidos'>Apellidos</option>
								<option value='Correo'>Correo</option>
								<option value='Telefono'>Telefono</option>
							</select>
						</div>
						<input
							className='form-control custm-inputSearch'
							type='text'
							placeholder='Buscar...'
							aria-label='default input example'
							value={filter}
							onChange={handleFilter}
						/>
					</div>
				</div>
				<div className='table-responsive cutm-tablaResponsive'>
					<table className='table table-hover '>
						<thead className='custm-tableThead'>
							<tr>
								<th scope='col'></th>
								<th scope='col' className='custm-col'>
									Nombre
									<i
										className='custm-icon bi bi-arrow-down-up'
										onClick={() => {
											sortEmployees(empleados, 'Nombre', isAscending);
											isAscending ? setIsAscending(false) : setIsAscending(true);
										}}
									/>
								</th>
								<th scope='col' className='custm-col'>
									Apellidos
									<i
										className='custm-icon bi bi-arrow-down-up'
										onClick={() => {
											sortEmployees(empleados, 'Apellidos', isAscending);
											isAscending ? setIsAscending(false) : setIsAscending(true);
										}}
									/>
								</th>
								<th scope='col' className='custm-col'>
									Correo
									<i
										className='custm-icon bi bi-arrow-down-up'
										onClick={() => {
											sortEmployees(empleados, 'Correo', isAscending);
											isAscending ? setIsAscending(false) : setIsAscending(true);
										}}
									/>
								</th>
								<th scope='col' className='custm-col'>
									Telefono
									<i
										className='custm-icon bi bi-arrow-down-up'
										onClick={() => {
											sortEmployees(empleados, 'Telefono', isAscending);
											isAscending ? setIsAscending(false) : setIsAscending(true);
										}}
									/>
								</th>
							</tr>
						</thead>
						<tbody>
							{empleados
								.filter((empleado) => {
									if (!filter) return true;

									const name = empleado.firstName.toLowerCase();
									const lastName = empleado.lastName.toLowerCase();
									const userName = empleado.username.toLowerCase();
									const phone = empleado.phone.toLowerCase();
									switch (busqueda) {
										case 'Nombre':
											return name.includes(filter.toLowerCase());
										case 'Apellidos':
											return lastName.includes(filter.toLowerCase());
										case 'Correo':
											return userName.includes(filter.toLowerCase());
										case 'Telefono':
											return phone.includes(filter.toLowerCase());
										default:
											return name.includes(filter.toLowerCase());
									}
								})
								.map((empleado: iEmpleado) => (
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
