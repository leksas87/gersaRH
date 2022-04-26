import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	downloadTamplateExcel,
	getUsers,
	sendInvitationsMassive,
} from '../../actions/usersActions/usersActions';
import { RootSote } from '../../store/Store';
import ModalNuevoEmpleado from './ModalNuevoEmpleado';
import './EmpleadosPage.css';
import TablaEmpleados from './TablaEmpleados';
import ModalSeleccionarExcel from './ModalSeleccionarExcel';
import * as bootstrap from 'bootstrap';

const EmpleadosPage = () => {
	//Dispatch para ejetur la accion.
	const dispatch = useDispatch();
	//Senecesita el state que indica si el usuario está autenticado o no
	const { empleados } = useSelector((state: RootSote) => state.users);
	//Senecesita el state que indica el roll, nombre y apellido del usuario
	const { rollTypeId } = useSelector((state: RootSote) => state.auth);
	//Filter para mostrar empreados que propiedad isEmployee = true
	const empleadosActivos = empleados.filter(
		(empleado) => empleado.isEmployeeActive === true
	);

	//Efecto que ejecuta la accion getUsers cada que carga el componente.
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	//funcion para descargar tempalte
	const downloadTamplate = () => {
		downloadTamplateExcel();
	};

	const sendInvitationsAll = () => {
		console.log('enviando a TOdos');
		dispatch(sendInvitationsMassive());
	};
	const showDropDown = () => {
		let searchDropdown = new bootstrap.Dropdown('#btnMenuEmpleadosMas');
		searchDropdown.show();
	};
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
					{rollTypeId === 1 && (
						<div className='custm-btnNuevoEmpleadoContainer'>
							{/* Modal Seleccionar Archivo Excel */}
							<ModalSeleccionarExcel />
							{/* Boton Nuevo Empleado */}
							<ModalNuevoEmpleado />
							{/* <button className='btn custm-btnMasEmpleado custmBtnActions'>●●●</button> */}
							<div className='dropdown'>
								{/* Boton para activar ventana DropDown */}
								<button
									className='btn custm-btnMasEmpleado custmBtnActions'
									type='button'
									id='btnMenuEmpleadosMas'
									data-bs-toggle='dropdown'
									aria-expanded='false'
									onClick={showDropDown}
								>
									●●●
								</button>

								{/* Ventana DropDown*/}
								<ul
									className='dropdown-menu custm-dropDownBtnMas'
									aria-labelledby='btnMenuEmpleadosMas'
								>
									<li>
										{/* Boton para mostrar Modal SeleccionarExcel */}
										<button
											className='dropdown-item custm-dropdown-item custm-dropItem'
											type='button'
											data-bs-toggle='modal'
											data-bs-target='#ModalSeleccionarExcel'
										>
											<div className='fs-4'>Importar empleados</div>
											<div className='custm-dropItemText'>
												Importa nuevos empleados en masa
											</div>
											<div className='custm-dropItemText'>
												desde la plantilla de excel.
											</div>
										</button>
									</li>
									<li>
										<button
											className='dropdown-item custm-dropdown-item custm-dropItem'
											type='button'
											onClick={downloadTamplate}
										>
											<div className='fs-4'>Descarga la plantilla</div>
											<div className='fs-4'>excel</div>
											<div className='custm-dropItemText'>
												Descarga la plantilla en formato Excel.
											</div>
										</button>
									</li>
									<li>
										<button
											className='dropdown-item custm-dropdown-item custm-dropItem'
											type='button'
											onClick={sendInvitationsAll}
										>
											<div className='fs-4'>
												Enviar invitaciones{' '}
												<i style={{ color: '#2890BD' }} className='bi bi-send-fill' />
											</div>
											<div className='custm-dropItemText'>
												Enviar invitaciones a todas las cuentas
											</div>
											<div className='custm-dropItemText'>
												con correo pendiente de activación.
											</div>
										</button>
									</li>
								</ul>
							</div>
						</div>
					)}
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
								<div>{empleadosActivos.length}</div>
								<div>Empleados</div>
							</div>
						</div>
					</div>
					<TablaEmpleados empleados={empleadosActivos} />
				</div>
			</div>
		</>
	);
};

export default EmpleadosPage;
