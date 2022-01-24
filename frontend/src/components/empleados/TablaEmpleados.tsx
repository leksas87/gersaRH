import  { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { iEmpleado } from '../../actions/usersActions/usersActionTypes';
import { RootSote } from '../../store/Store';
import { sortEmployees } from '../../helpers/sortEmployees';
import './TablaEmpleados.css';

//interface para las props del componente
interface iTablaEmpleadosProps {
	empleados: iEmpleado[];
}

const TablaEmpleados = ({ empleados }: iTablaEmpleadosProps) => {

	const [displayListArr, setDisplayListArr] = useState(empleados);
	const [bandera, setBandera] = useState(true);
	const [bandera1, setBandera1] = useState(true);
	const [bandera2, setBandera2] = useState(true);
	const [bandera3, setBandera3] = useState(true);
	const navigate = useNavigate();
	

	//Senecesita el state que indica si el usuario está autenticado o no
	const { empleados:employees } = useSelector((state: RootSote) => state.users);

	const activeLength= useRef( employees.length );

	useEffect(() => {
        console.log(displayListArr);
        if ( displayListArr.length !== activeLength.current  ) {
			setDisplayListArr(empleados);
			console.log(displayListArr);
        }

    }, [displayListArr, setDisplayListArr, empleados])

	//Metodo para navegar al perfil del empleado
	const irEmpleado = (id: number) => {
		navigate(`/${id}`);
		console.log('id empleado: ', id);
	};

	const handleOrdene = ( num: number) => {
		
		switch (num) {
			case 1:sortEmployees(empleados,num,bandera);
					setDisplayListArr(empleados);
					if(bandera === true){
						setBandera(false);
					}else{
						setBandera(true);
					}
				break;

			case 2:sortEmployees(empleados,num,bandera1);
					setDisplayListArr(empleados);
					if(bandera1 === true){
						setBandera1(false);
					}else{
						setBandera1(true);
					}
				break;
			case 3:sortEmployees(empleados,num,bandera2);
					setDisplayListArr(empleados);
					if(bandera2 === true){
						setBandera2(false);
					}else{
						setBandera2(true);
					}
				break;
			case 4:sortEmployees(empleados,num,bandera3);
					setDisplayListArr(empleados);
					if(bandera3 === true){
						setBandera3(false);
					}else{
						setBandera3(true);
					}
				break;			
			default:
				break;
		}
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
											handleOrdene(1);
										}}
									/>
								</th>
								<th scope='col' className='custm-col'>Apellidos
									<i 
										className="custm-icon bi bi-arrow-down-up" 
										onClick={() => {
											handleOrdene(2);
										}}
									/>
								</th>
								<th scope='col' className='custm-col'>Correo
									<i 
										className="custm-icon bi bi-arrow-down-up" 
										onClick={() => {
											handleOrdene(3);
										}}
									/>
								</th>
								<th scope='col' className='custm-col'>Telefono
									<i 
										className="custm-icon bi bi-arrow-down-up" 
										onClick={() => {
											handleOrdene(4);
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
			</div>
		</>
	);
};

export default TablaEmpleados;
