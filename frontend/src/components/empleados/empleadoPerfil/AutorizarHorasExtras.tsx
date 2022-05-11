import moment from 'moment';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootSote } from '../../../store/Store';

const AutorizarHorasExtras = ({ date }: any) => {
	//Se necesita el state que contiene los datos del empleadoSeleccionado
	const { perfilEmpleado } = useSelector((state: RootSote) => state.users);
	useEffect(() => {
		if (date) {
			// const entrada = semana.find((array: any) => array.eventActionTypeId === 5);
			// const salida = semana.find((array: any) => array.eventActionTypeId === 6);
			// if (entrada && salida) {
			// 	const horaEntrada = moment(entrada.DateEvent);
			// 	const horaSalida = moment(salida.DateEvent);
			// 	console.log('AuthTimeE', horaEntrada);
			// 	console.log('AuthTimeS', horaSalida);
			// }
		}
	}, [date]);
	return (
		<>
			<div className='d-flex'>
				<div className='d-flex align-items-center justify-content-center text-center'>
					{/* <div className=''>00:00</div> */}
					{/* <input
						min={0}
						className='form-control  custm-empleadoFormIntput'
						type='number'
						style={{ width: '4rem', background: '#f6f6f6' }}
					/> */}
					<input
						min={0}
						className='form-control  custm-empleadoFormIntput'
						type='text'
						value={date}
						style={{ width: '4rem', background: '#f6f6f6' }}
					/>
					{perfilEmpleado.id && (
						<input
							min={0}
							className='form-control  custm-empleadoFormIntput'
							type='text'
							value={perfilEmpleado.id}
							style={{ width: '4rem', background: '#f6f6f6' }}
						/>
					)}
				</div>
				<button
					className='ms-1 inputSubmit'
					style={{ color: 'white', borderRadius: '10px' }}
				>
					Aceptar
				</button>
			</div>
		</>
	);
};

export default AutorizarHorasExtras;
