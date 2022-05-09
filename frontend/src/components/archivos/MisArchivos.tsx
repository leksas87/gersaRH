import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilesByParams } from '../../actions/archivosActions/archivosActions';
import { RootSote } from '../../store/Store';
import ModalNuevoArchivo from './ModalNuevoArchivo';

const MisArchivos = () => {
	const dispatch = useDispatch();
	const { firstName, lastName, empleadoData } = useSelector(
		(state: RootSote) => state.auth
	);
	const { filesList } = useSelector((state: RootSote) => state.files);

	//Tomar Solo el primer nombre y el primer apellido
	const indiceName = firstName.indexOf(' ');
	const indiceLastname = lastName.indexOf(' ');
	const myName = firstName.substring(0, indiceName);
	const myLastName = lastName.substring(0, indiceLastname);

	//Effect para obtener mis archivos
	useEffect(() => {
		if (empleadoData.id) {
			dispatch(getFilesByParams(empleadoData.id, 1, 'empleado/personales'));
		}
	}, [dispatch, empleadoData.id]);

	return (
		<>
			<div className='custm-empleadosContainer rounded-3 shadow  p-4'>
				<div className='custm-empleadosHead'>
					<div
						className='textColorSecondary fs-4 d-flex justify-content-center align-items-center p-4'
						style={{ textDecoration: 'underline' }}
					>
						<div className='custm-imgCount me-2'>
							<i className=' d-flex bi bi-person-circle m-0 sidebarIcon' />
						</div>
						<div className='fs-4 textColorSecondary'>
							<span className='text-capitalize'>
								{myName ? myName : firstName}
								{` `}
								{myLastName ? myLastName : lastName}
							</span>
						</div>
					</div>
				</div>
				<div className='d-flex flex-column align-items-center'>
					<div className='d-flex flex-column justify-content-center custm-Width100'>
						<div className='d-flex justify-content-end'>
							<ModalNuevoArchivo />
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
									className='text-center fs-4 textColorSecondary'
									style={{ maxWidth: '400px' }}
								>
									Mis archivos / Personales.
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
										</tr>
									</thead>
									<tbody>
										{filesList
											.map((file) => (
												<tr
													key={file.id}
													className='custm-table-tr textColorLight'
													onClick={() => {
														console.log('verArchivo');
													}}
												>
													<th scope='row'>
														<i className='bi bi-file-earmark-text pe-1' />
														{file.nombreArchivo}
													</th>
													<td>{file.fechaCreacion}</td>
												</tr>
											))
											.reverse()}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MisArchivos;
