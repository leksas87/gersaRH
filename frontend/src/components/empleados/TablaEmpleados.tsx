import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { changePath } from '../../actions/usersActions/usersActions';
import { iEmpleado } from '../../actions/usersActions/usersActionTypes';
import { sortEmployees } from '../../helpers/sortEmployees';
import { RootSote } from '../../store/Store';
import './TablaEmpleados.css';

//interface para las props del componente
interface iTablaEmpleadosProps {
	empleados: iEmpleado[];
}

//Inicia componente
const TablaEmpleados = ({ empleados }: iTablaEmpleadosProps) => {
	//State that save the Array with the pagination
	const [employees, setEmployees] = useState<iEmpleado[]>(empleados);
	//dispatch para ejecutar Actions
	const dispatch = useDispatch();
	//useLocation para conocer el path
	const { pathname } = useLocation();
	//Senecesita el state que indica el roll, nombre y apellido del usuario
	const { rollTypeId } = useSelector((state: RootSote) => state.auth);

	//hook searchParams
	const [searchParams, setSearchParams] = useSearchParams();
	//obtener el filtrado si hay o ''
	const filter = searchParams.get('filter') ?? '';
	//state para tipos de busqueda.
	const [busqueda, setBusqueda] = useState('Nombre');

	//Paginación
	//State that save the Array with the pagination
	const [displayListArr, setDisplayListArr] = useState<iEmpleado[]>([]);
	//State to save the current page
	const [currentPage, setCurrentPage] = useState(1);
	//variables & Constantes
	const itemPerPage = 6;
	const totalPages = Math.ceil(employees.length / itemPerPage);

	//state para manejo de sort by
	const [isAscending, setIsAscending] = useState<boolean>(true);
	//hook useNavigate
	const navigate = useNavigate();
	//Metodo para navegar al perfil del empleado
	const irEmpleado = (id: number) => {
		if (rollTypeId === 1) navigate(`${pathname}/${id}/perfil`);
		if (rollTypeId === 3) navigate(`${pathname}/${id}/controlhorario`);
	};
	//Metodo para filtrado (Bisqueda)
	const handleFilter = (e: any) => {
		setSearchParams({ filter: e.target.value });
	};

	useEffect(() => {
		setEmployees(
			empleados.filter((empleado) => {
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
		);
	}, [searchParams, empleados, busqueda, filter]);

	//Efecto que se ejecuta cuando hay un cambio de path
	useEffect(() => {
		dispatch(changePath(pathname));
	}, [pathname, dispatch]);

	// Effect to create the pagination
	useEffect(() => {
		if (employees.length === 0) return;

		//This get the element where the buttons of pagination ar gonna showing
		const paginationElement = document.querySelector('#paginationEmployees');

		//Return the array per pages.
		function DisplayList(
			arrayList: iEmpleado[],
			itemPerPage: number,
			page: number
		) {
			page--;
			const start = itemPerPage * page;
			const end = start + itemPerPage;
			const paginatedItems = arrayList.slice(start, end);
			return paginatedItems;
		}

		//Function to create all the buttons we need
		function SetupPagination(
			array: iEmpleado[],
			wrapper: any,
			rows_per_page: number
		) {
			wrapper.innerHTML = '';
			//get the total pages
			const totalPages = Math.ceil(array.length / rows_per_page);
			//for each page makes a button
			for (let i = 1; i < totalPages + 1; i++) {
				const btn = PaginationButton(i);
				wrapper.appendChild(btn);
			}
			if (totalPages === 0) return;
			else if (currentPage > totalPages) setCurrentPage(totalPages);
		}

		//Funcition to create the buttons for the pagination
		function PaginationButton(page: any) {
			//Create a button
			const button = document.createElement('button');
			//Add the conten in this case is a number
			button.innerText = page;
			//Add the active class for the button that matches the current page
			if (currentPage === page) button.classList.add('active');
			//Add the event for the button
			button.addEventListener('click', function () {
				setCurrentPage(page);
			});
			return button;
		}

		//return the Arry with the pagination
		const displayListREturner = DisplayList(employees, itemPerPage, currentPage);

		//Save the pagination on the State
		setDisplayListArr(displayListREturner);
		//Function to create the buttons
		SetupPagination(employees, paginationElement, itemPerPage);
	}, [employees, currentPage]);

	//Functions
	// Function to go to the next page (Button)
	const btnNext = () => {
		const totalPages = Math.ceil(employees.length / itemPerPage);
		if (currentPage === totalPages) return;
		setCurrentPage(currentPage + 1);
	};
	// Function to go to the previous page(Button)
	const btnPrevious = () => {
		if (currentPage === 1) return;
		setCurrentPage(currentPage - 1);
	};

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
							{displayListArr.map((empleado: iEmpleado) => (
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
				{/* The pagination is shown here */}
				<div
					className='d-flex justify-content-center align-items-center paginationStyles pagination'
					// style={{ backgroundColor: 'tomato' }}
				>
					{currentPage !== 1 ? (
						<button
							onClick={btnPrevious}
							type='button'
							className='btn btn-hover textTittle textBold page-item'
						>
							&laquo;
						</button>
					) : null}

					<div className='pagenumbers' id='paginationEmployees'>
						{' '}
					</div>
					{currentPage !== totalPages ? (
						<button
							onClick={btnNext}
							className='btn btn-hover textTittle textBold page-item'
						>
							&raquo;
						</button>
					) : null}
				</div>
			</div>
		</>
	);
};

export default TablaEmpleados;
