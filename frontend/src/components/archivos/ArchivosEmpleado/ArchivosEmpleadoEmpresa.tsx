import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilesByParams } from '../../../actions/archivosActions/archivosActions';
import { RootSote } from '../../../store/Store';
import ModalEliminarArchivos from '../ModalEliminarArchivos';
import ModalNuevoArchivoEmpleadoEmpresa from './ModalNuevoArchivoEmpleadoEmpresa';
const baseUrlRequestFilesS3 = process.env.REACT_APP_GERSA_REQUEST_BUCKET_S3;

const ArchivosEmpleadoEmpresa = () => {
	const dispatch = useDispatch();
	const { perfilEmpleado } = useSelector((state: RootSote) => state.users);
	const { filesList } = useSelector((state: RootSote) => state.files);

	//Effect para obtener archivos
	useEffect(() => {
		if (perfilEmpleado.id) {
			dispatch(getFilesByParams(perfilEmpleado.id, 2, 'empleado/empresa'));
		}
	}, [dispatch, perfilEmpleado.id]);
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
									{filesList
										.map((file) => (
											<tr
												className='custm-table-tr textColorLight'
												onClick={() => {
													window.open(`${baseUrlRequestFilesS3}${file.url}`);
												}}
											>
												<th scope='row'>
													<i className='bi bi-file-earmark-text pe-1' />
													{file.nombreArchivo}
												</th>
												<td>{file.fechaCreacion}</td>
												<td className='textColorError2'>
													<ModalEliminarArchivos
														file={file}
														employeeId={perfilEmpleado.id}
														tipoDocumento={2}
														ubicacionCarpeta={'empleado/empresa'}
													/>
												</td>
											</tr>
										))
										.reverse()}
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
