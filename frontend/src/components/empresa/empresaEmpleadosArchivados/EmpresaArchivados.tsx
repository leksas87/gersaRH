import { useSelector } from 'react-redux';
import { RootSote } from '../../../store/Store';
import TablaEmpleados from '../../empleados/TablaEmpleados';

const EmpresaArchivados = () => {
	//Senecesita el state que indica si el usuario está autenticado o no
	const { empleados } = useSelector((state: RootSote) => state.users);
	//Filter para mostrar empreados que propiedad isEmployee = false
	const empleadosArchivados = empleados.filter(
		(empleado) => empleado.isEmployeeActive === false
	);
	return (
		<>
			<div className='d-flex flex-column justify-content-center pt-4 '>
				<div className='custm-coninerTituloEmpleados d-flex  justify-content-between ms-3'>
					<div>
						<div className='d-flex '>
							<div className='custm-empleadosIcon'>
								<i className='bi bi-person-rolodex' />
								<i className='bi bi-lock fs-1' />
							</div>
							<div className='d-flex ms-2 align-items-center'>
								<label className='fs-3  textColorSecondary'>
									Empleados Archivados.
								</label>
							</div>
						</div>
						<div className=' custm-descEmpleados textColorLight fw-light pb-3'>
							Aquí estan todos los empleados archivados (No laboran más en tu empresa).
						</div>
					</div>
				</div>
				<TablaEmpleados empleados={empleadosArchivados} />
			</div>
		</>
	);
};

export default EmpresaArchivados;
