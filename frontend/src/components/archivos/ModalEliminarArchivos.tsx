import React from 'react';
import { useDispatch } from 'react-redux';
import { eliminarArchivo } from '../../actions/archivosActions/archivosActions';
import { iFileList } from '../../actions/archivosActions/archivosActionTypes';

interface propsTypes {
	file: iFileList;
	employeeId: number | null;
	tipoDocumento: number;
	ubicacionCarpeta: string;
}
const ModalEliminarArchivos = ({
	file,
	employeeId,
	tipoDocumento,
	ubicacionCarpeta,
}: propsTypes) => {
	// dispatch para ejecutar las Actions
	const dispatch = useDispatch();
	//handleSubmit para el envio de lso datos del modal al Back
	const hanleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Eliminando...');

		if (employeeId) {
			dispatch(
				eliminarArchivo(
					file.id,
					`modalEliminarArchivo${file.id}`,
					employeeId,
					tipoDocumento,
					ubicacionCarpeta
				)
			);
		}
	};
	return (
		<div>
			{/* <!-- Button para activar modal --> */}
			<button
				type='button'
				className='btn btn-outline-danger'
				style={{ height: 'auto' }}
				data-bs-toggle='modal'
				data-bs-target={`#modalEliminarArchivo${file.id}`}
			>
				<i className='bi bi-trash-fill' /> Eliminar
			</button>

			{/* <!-- Modal --> */}
			<div
				className='modal fade'
				id={`modalEliminarArchivo${file.id}`}
				tabIndex={-1}
				aria-labelledby={`modalEliminarArchivo${file.id}`}
				aria-hidden='true'
			>
				<div className='modal-dialog d-flex justify-content-center'>
					<div className='modal-content custm-modalContent'>
						<div
							className='modal-header'
							style={{
								border: 'none',
								borderRadius: '50px',
							}}
						>
							<div className='custm-modalIcon d-flex justify-content-center align-items-center'>
								<i className='bi bi-folder-x textColorError2' />
							</div>
							<button
								type='button'
								className='btn-close custm-iconExit'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div
							className='d-flex justify-content-center custm-Width100'
							style={{
								height: '50%',
							}}
						>
							<div
								className='d-flex flex-column justify-content-between'
								style={{ width: '82%' }}
							>
								<div
									className='d-flex flex-column'
									style={{ maxWidth: '100%', lineHeight: '28px', marginTop: '1rem' }}
								>
									<label className='textColorPrimary fs-2 mt-3'>Eliminar archivo</label>
									<label
										className='textColorLight fw-light mt-4'
										style={{
											lineHeight: '20px',
											marginTop: '1rem',
											textAlign: 'justify',
											letterSpacing: '.5px',
										}}
									>
										El archivo "{file.nombreArchivo}" será eliminado de manera permanente.
									</label>
								</div>
								<form onSubmit={hanleSubmit}>
									<div className='d-flex justify-content-end pt-5'>
										<button
											className='btn btn-outline-secondary m-1'
											type='button'
											data-bs-dismiss='modal'
											aria-label='Close'
										>
											Cancelar
										</button>
										<button type='submit' className=' btn btn-outline-danger m-1'>
											Eliminar
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalEliminarArchivos;
