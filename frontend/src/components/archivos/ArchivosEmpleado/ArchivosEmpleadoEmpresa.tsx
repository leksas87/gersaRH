import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { RootSote } from '../../../store/Store';
import ModalNuevoArchivoEmpleadoEmpresa from './ModalNuevoArchivoEmpleadoEmpresa';

const ArchivosEmpleadoEmpresa = () => {
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilEmpleado, perfilUsuario } = useSelector(
		(state: RootSote) => state.users
	);
	//Hook para obtener los parametros del url
	const params = useParams();
	const location = useLocation();
	console.log(params);
	console.log(location.pathname);
	return (
		<>
			<div className='d-flex flex-column align-items-center'>
				<div className='d-flex flex-column justify-content-center custm-Width100'>
					<div className='d-flex justify-content-end'>
						<ModalNuevoArchivoEmpleadoEmpresa />
					</div>
					<div className='d-flex justify-content-center'>
						<div>
							<i
								style={{ fontSize: '3rem', color: 'var(--colorSecondary)' }}
								className='bi bi-folder-fill'
							/>
						</div>
						<div className='d-flex flex-column align-items-center justify-content-center custm-width100 ms-2'>
							<div
								className='text-center textColorSecondary'
								style={{ maxWidth: '400px' }}
							>
								Archivos / Empleado / Empresa.
							</div>
						</div>
					</div>
				</div>
				<div className='d-flex justify-content-center  mt-3 custm-Width100'>
					<div className='custm-tableArchivos mt-3'>
						<div className='table-responsive '>
							<table className='table align-middle'>
								<thead className='custm-tableThead'>
									<tr>
										<th scope='col' className='custm-col textColorLight'>
											Nombre
										</th>
										<th scope='col' className='custm-col textColorLight'>
											Fecha creación
										</th>
										<th scope='col' className='custm-col textColorLight'>
											Acciones
										</th>
									</tr>
								</thead>
								<tbody>
									<tr
										className='custm-table-tr textColorLight'
										// onClick={() => {
										// 	irEmpleado(empleado.id);
										// }}
									>
										<th scope='row'>
											<i className='bi bi-file-earmark-text pe-1' />
											Imagen.png
										</th>
										<td>22/04/22</td>
										<td className='textColorError2'>
											<i className='bi bi-trash-fill' /> Eliminar
										</td>
									</tr>
									<tr
										className='custm-table-tr textColorLight'
										// onClick={() => {
										// 	irEmpleado(empleado.id);
										// }}
									>
										<th scope='row'>
											<i className='bi bi-file-earmark-text pe-1' />
											Imagen.png
										</th>
										<td>22/04/22</td>
										<td className='textColorError2'>
											<i className='bi bi-trash-fill' /> Eliminar
										</td>
									</tr>
									<tr
										className='custm-table-tr textColorLight'
										// onClick={() => {
										// 	irEmpleado(empleado.id);
										// }}
									>
										<th scope='row'>
											<i className='bi bi-file-earmark-text pe-1' />
											Imagen.png
										</th>
										<td>22/04/22</td>
										<td
											className='textColorError2'
											onClick={() => {
												console.log('eliminando');
											}}
										>
											<i className='bi bi-trash-fill' /> Eliminar
										</td>
									</tr>
									<tr
										className='custm-table-tr textColorLight'
										// onClick={() => {
										// 	irEmpleado(empleado.id);
										// }}
									>
										<th scope='row'>
											<i className='bi bi-file-earmark-text pe-1' />
											Imagen.png
										</th>
										<td>22/04/22</td>
										<td
											className='textColorError2'
											onClick={() => {
												console.log('eliminando');
											}}
										>
											<i className='bi bi-trash-fill' /> Eliminar
										</td>
									</tr>
									<tr
										className='custm-table-tr textColorLight'
										// onClick={() => {
										// 	irEmpleado(empleado.id);
										// }}
									>
										<th scope='row'>
											<i className='bi bi-file-earmark-text pe-1' />
											Imagen.png
										</th>
										<td>22/04/22</td>
										<td
											className='textColorError2'
											onClick={() => {
												console.log('eliminando');
											}}
										>
											<i className='bi bi-trash-fill' /> Eliminar
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ArchivosEmpleadoEmpresa;
