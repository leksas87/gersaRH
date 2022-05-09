import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilesEmpresa } from '../../actions/archivosActions/archivosActions';
import { RootSote } from '../../store/Store';
import ModalEliminarArchivos from './ModalEliminarArchivos';
import ModalNuevoArchivoEmpresa from './ModalNuevoArchivoEmpresa';
const baseUrlRequestFilesS3 = process.env.REACT_APP_GERSA_REQUEST_BUCKET_S3;

const ArchivosEmpresa = () => {
	const dispatch = useDispatch();
	const { empleadoData } = useSelector((state: RootSote) => state.auth);
	const { filesList } = useSelector((state: RootSote) => state.files);
	//Effect para obtener mis archivos
	useEffect(() => {
		if (empleadoData.id) {
			dispatch(getFilesEmpresa());
		}
	}, [dispatch, empleadoData.id]);
	return (
		<>
			<div className='d-flex flex-column align-items-center'>
				<div className='d-flex flex-column justify-content-center custm-Width100'>
					<div className='d-flex justify-content-end'>
						<ModalNuevoArchivoEmpresa />
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
								className='text-center  textColorSecondary'
								style={{ maxWidth: '400px' }}
							>
								Archivos / Empresa.
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
											<tr key={file.id} className='custm-table-tr textColorLight'>
												<th
													scope='row'
													onClick={() => {
														window.open(`${baseUrlRequestFilesS3}${file.url}`);
													}}
												>
													<i className='bi bi-file-earmark-text pe-1' />
													{file.nombreArchivo}
												</th>
												<td
													onClick={() => {
														window.open(`${baseUrlRequestFilesS3}${file.url}`);
													}}
												>
													{file.fechaCreacion}
												</td>
												<td className='textColorError2'>
													<ModalEliminarArchivos
														file={file}
														employeeId={empleadoData.id}
														tipoDocumento={2}
														ubicacionCarpeta={'empresa'}
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

export default ArchivosEmpresa;
