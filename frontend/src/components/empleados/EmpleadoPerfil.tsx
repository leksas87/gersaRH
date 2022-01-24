import { useParams } from 'react-router-dom';

const EmpleadoPerfil = () => {
	//Hook para obtener los parametros del url
	const params = useParams();
	return (
		<>
			<h1>Empleado - {params.empleadoId}</h1>
		</>
	);
};

export default EmpleadoPerfil;
