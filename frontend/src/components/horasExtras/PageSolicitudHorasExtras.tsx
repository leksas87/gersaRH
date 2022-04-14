import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	cleanEmployeeList,
	getEmployeesByParams,
	registerNewTimeRequest,
} from '../../actions/timeRequest/timeRequestActions';
import { useForm } from '../../hooks/useForm';
import { RootSote } from '../../store/Store';

const PageSolicitudHorasExtras = () => {
	//dispatch para ejecutar las actions
	const dispatch = useDispatch();
	//Senecesita el state que indica el empleadoData
	const { empleadoData } = useSelector((state: RootSote) => state.auth);
	const { employeesListInvitation } = useSelector(
		(state: RootSote) => state.timeRequest
	);
	//Senecesita el state que indica  el array de empleados
	const { employeesParams } = useSelector(
		(state: RootSote) => state.timeRequest
	);

	//objeto user para formulario Registro
	const newRequest = {
		employeeName: '',
		employeeId: '',
		fechaAsignacion: '',
		horaAsignacion: '',
		lugarApoyo: '',
		statusId: 1,
		descripcion: '',
		employeeIdRequest: empleadoData.id,
	};
	//Uso de hook useForm para manejo de campos en el formulario
	const [formValues, handleInputChange, reset] = useForm(newRequest);

	//Desestructuracion de propiedades
	const {
		employeeName,
		employeeId,
		fechaAsignacion,
		horaAsignacion,
		lugarApoyo,
		descripcion,
	} = formValues;

	//Submit del formulario
	const handdleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (empleadoData.id) {
			dispatch(
				registerNewTimeRequest(
					{
						employeeId: employeeName,
						fechaAsignacion: fechaAsignacion,
						horaAsignacion: horaAsignacion,
						LugarApoyo: lugarApoyo,
						statusId: 1,
						descripcion: descripcion,
						employeeIdRequest: empleadoData.id,
					},
					employeeName
				)
			);
		} else console.log('Falta perfilEmpleado.id');
	};
	useEffect(() => {
		dispatch(getEmployeesByParams(employeeName));
	}, [employeeName, dispatch]);

	const cleanList = () => {
		reset();
		dispatch(cleanEmployeeList());
	};

	return (
		<>
			<div className='d-flex flex-column justify-content-center pt-4 p-4'>
				<div className='d-flex flex-column align-items-center'>
					<div className='d-flex '>
						<div>
							<i
								style={{ fontSize: '3rem', color: 'var(--colorSecondary)' }}
								className='bi bi-stopwatch'
							/>
						</div>
						<div className='d-flex flex-column align-items-center custm-width100'>
							<div
								className='text-center fs-5 textColorLight'
								style={{ maxWidth: '400px' }}
							>
								Aquí puedes realizar la solicitud de horas extras a tus empleados.
							</div>
							<div style={{ color: 'var(--textColorLink)' }}>____________</div>
						</div>
					</div>

					<div className='d-flex flex-column align-items-center custm-PageHistoryContainer mt-4'>
						<div className='d-flex justify-content-center custm-Width100 p-1'>
							<div className='textColorSecondary fs-5'>Nueva solicitud</div>
						</div>
						{/* Inicio */}
						<form
							onSubmit={handdleSubmit}
							className='d-flex flex-wrap custm-UnderLineSectionDark mt-4'
						>
							{/* Derecha */}
							<div className='d-flex flex-column  custmContainer50pading custm-solicitudContaiter50'>
								<div className='d-flex flex-column mb-4 mt-1'>
									<label htmlFor='employeeDataList' className='pt-2 textColorSecondary'>
										Empleado*
									</label>
									<input
										className='form-control custm-empleadoFormIntput'
										list='datalistOptions'
										id='exampleDataList'
										placeholder='Nombre de un empleado...'
										value={employeeName}
										name='employeeName'
										onChange={handleInputChange}
										required
										// disabled={!infoBasicavalue}
									/>
									<datalist id='datalistOptions'>
										{employeesParams.map((employee) => (
											<option key={employee.id} value={employee.id}>
												{employee.User.firstName} {employee.User.lastName}
											</option>
										))}
									</datalist>
								</div>
								<div className='d-flex textColorSecondary mt-3'>
									<div style={{ width: '40%' }}>Fecha de asignación:</div>
									<div style={{ width: '60%' }}>
										<input
											className='form-control  custm-empleadoFormIntput'
											type='date'
											name='fechaAsignacion'
											value={fechaAsignacion}
											onChange={handleInputChange}
											required
										/>
									</div>
								</div>
								<div className='d-flex textColorSecondary mt-3'>
									<div style={{ width: '40%' }}>Hora de asignación:</div>
									<div style={{ width: '60%' }}>
										<input
											className='form-control  custm-empleadoFormIntput'
											type='time'
											name='horaAsignacion'
											value={horaAsignacion}
											onChange={handleInputChange}
											required
										/>
									</div>
								</div>
								<div className='d-flex textColorSecondary mt-3'>
									<div style={{ width: '40%' }}>Lugar de asignación:</div>
									<div style={{ width: '60%' }}>
										<input
											className='form-control  custm-empleadoFormIntput'
											type='text'
											name='lugarApoyo'
											value={lugarApoyo}
											onChange={handleInputChange}
											required
										/>
									</div>
								</div>
							</div>
							{/* Izquierda */}
							<div className='custm-solicitudContaiter50 d-flex justify-content-center'>
								<div className='mt-5'>
									<div className='d-flex flex-column align-items-center'>
										<label className='textColorLight custm-Width100 ms-5'>Detalle*</label>
										<textarea
											// form='usrform'
											className='form-control  custm-empleadoFormIntput'
											style={{ width: '90%' }}
											rows={6}
											cols={50}
											name='descripcion'
											value={descripcion}
											onChange={handleInputChange}
											placeholder='Escribe un detalle breve.'
											required
										></textarea>
									</div>
									<div className='d-flex justify-content-end mt-4 me-4'>
										<button type='submit' className='custm-btnFormSubmit inputSubmit'>
											Enviar
										</button>
									</div>
								</div>
							</div>
						</form>
						{/* Tabla */}
						<div className='custm-tableEmpleados mt-3' style={{ width: '90%' }}>
							<div className='table-responsive'>
								<table className='table table align-middle'>
									<thead className=''>
										<tr>
											<th scope='col'>
												<div className='d-flex justify-content-center'>
													Solicitud enviada
												</div>
											</th>
											<th scope='col'>
												<div className='d-flex justify-content-center'>Nombre</div>
											</th>
											<th scope='col'>
												<div className='d-flex justify-content-center'>Apellidos</div>
											</th>
											<th scope='col'>
												<div className='d-flex justify-content-center'>Correo</div>
											</th>
										</tr>
									</thead>
									<tbody>
										{employeesListInvitation.map((empleado, i) => (
											<tr key={i} style={{ height: '4rem' }}>
												<th scope='row'>
													<div className='d-flex align-items-center justify-content-center text-center'>
														<i
															className='bi bi-check-circle-fill fs-4'
															style={{ color: 'var(--colorVerde)' }}
														/>
													</div>
												</th>
												<td>
													<div className='d-flex align-items-center justify-content-center'>
														<span>{empleado.firstName}</span>
													</div>
												</td>
												<td>
													<div className='d-flex align-items-center justify-content-center'>
														<span>{empleado.lastName}</span>
													</div>
												</td>
												<td>
													<div className='d-flex align-items-center justify-content-center'>
														<span>{empleado.username}</span>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
						<div
							className='d-flex justify-content-end mt-4 mb-5  custm-Width100'
							style={{ width: '90%' }}
						>
							<button
								type='button'
								className='btn p-2 ps-3 pe-3 custm-empleadoFormSubmit'
								onClick={cleanList}
							>
								Limpiar
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageSolicitudHorasExtras;
