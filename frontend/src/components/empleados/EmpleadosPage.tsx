import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../actions/usersActions/usersActions';
import { RootSote } from '../../store/Store';
import ModalNuevoEmpleado from './ModalNuevoEmpleado';
import './EmpleadosPage.css';
import TablaEmpleados from './TablaEmpleados';

const EmpleadosPage = () => {
	//Dispatch para ejetur la accion.
	const dispatch = useDispatch();
	//Senecesita el state que indica si el usuario está autenticado o no
	const { empleados } = useSelector((state: RootSote) => state.users);

	//Efecto que ejecuta la accion getUsers cada que carga el componente.
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	return (
		<>
			<div className='custm-empleadosContainer rounded-3 shadow mt-4'>
				<div className='custm-empleadosHead'>
					<div
						className='textColorSecondary fs-4'
						style={{ textDecoration: 'underline' }}
					>
						Empleados
					</div>
					<div className='custm-btnNuevoEmpleadoContainer'>
						{/* Boton Nuevo Empleado */}
						<ModalNuevoEmpleado />
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
					<TablaEmpleados empleados={empleados} />
				</div>
			</div>
		</>
	);
};

export default EmpleadosPage;
