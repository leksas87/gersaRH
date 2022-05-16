import { useDispatch, useSelector } from 'react-redux';
import { sendEmployeeHoursAccepted } from '../../../actions/eventsActions/eventsActions';
import { useForm } from '../../../hooks/useForm';
import { RootSote } from '../../../store/Store';

const AutorizarHorasExtras = ({ date, fechaInicio, fechaFin }: any) => {
	const dispatch = useDispatch();
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilEmpleado } = useSelector((state: RootSote) => state.users);
	const { empleadoData } = useSelector((state: RootSote) => state.auth);

	interface iHorasAceptadas {
		horasAceptadas: string;
	}
	//objeto user para formulario Registro
	const newForm: iHorasAceptadas = {
		horasAceptadas: '',
	};
	//Uso de hook useForm para manejo de campos en el formulario
	const [formValues, handleInputChange, reset] = useForm(newForm);
	//Desestructuracion de propiedades
	const { horasAceptadas } = formValues;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (perfilEmpleado.id) {
			dispatch(
				sendEmployeeHoursAccepted(
					{
						employeeId: perfilEmpleado.id,
						fechaEvento: date,
						horasAceptadas: horasAceptadas,
						employeeIdAutorizo: empleadoData.id,
					},
					perfilEmpleado.id,
					fechaInicio,
					fechaFin
				)
			);
			reset();
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit} className='d-flex'>
				<div className='d-flex align-items-center justify-content-center text-center'>
					<input
						min={0}
						required
						className='form-control  custm-empleadoFormIntput'
						type='text'
						style={{ width: '4rem', background: '#f6f6f6' }}
						value={horasAceptadas}
						name='horasAceptadas'
						onChange={handleInputChange}
					/>
				</div>
				<button
					type='submit'
					className='ms-1 inputSubmit'
					style={{ color: 'white', borderRadius: '10px' }}
				>
					Aceptar
				</button>
			</form>
		</>
	);
};

export default AutorizarHorasExtras;
