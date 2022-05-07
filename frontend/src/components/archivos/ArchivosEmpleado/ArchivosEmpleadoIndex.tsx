import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { RootSote } from '../../../store/Store';

const ArchivosEmpleadoIndex = () => {
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilEmpleado, perfilUsuario } = useSelector(
		(state: RootSote) => state.users
	);
	//Hook para obtener los parametros del url
	const params = useParams();
	const location = useLocation();

	return (
		<>
			<div className='d-flex flex-column align-items-center'>
				{/* Información general */}
				<div className='d-flex flex-wrap custm-Width100 '>
					{/* Izquierda */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex mt-3 flex-column align-items-start ps-1 custm-Width100'>
							<div className='custm-Width100'>
								<i
									style={{ fontSize: '3rem' }}
									className='bi bi-folder-fill textColorSecondary'
								/>
							</div>
							<div className='fs-5'>
								Archivos / {perfilUsuario.firstName} {perfilUsuario.lastName}
							</div>
							<div className=' textColorLight'>
								Aquí se muestran las carpetas que tienes disponible.
							</div>
							<div className='custm-underLineTittle'></div>
						</div>
					</div>
					{/* Derecha */}
					<div className='custm-empleadoContainerContent'>
						<div className='d-flex flex-column' style={{ width: '70%' }}>
							<div className='textColorLight' style={{ fontSize: '15px' }}>
								Nota: Los archivos dentro de la carpeta “Personales” son los archivos
								que el empleado ha subido a su perfil
							</div>

							<Link
								to={`${location.pathname}/personales`}
								className='custm-btnEmployeeFilesLink shadow-sm mt-2'
							>
								<i
									style={{ fontSize: '2.8rem' }}
									className='bi bi-folder2-open textColorSecondary me-1'
								/>
								<div className='fs-5'>Personales</div>
							</Link>
							<div className='textColorLight mt-4' style={{ fontSize: '15px' }}>
								Nota: Los archivos dentro de la carpeta “Empresa” únicamente son
								visibles por el administrador
							</div>

							<Link
								to={`${location.pathname}/empresa`}
								className='custm-btnEmployeeFilesLink shadow-sm mt-2'
							>
								<i
									style={{ fontSize: '2.8rem' }}
									className='bi bi-folder2-open textColorSecondary me-1'
								/>
								<div className='fs-5'>Empresa</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ArchivosEmpleadoIndex;
