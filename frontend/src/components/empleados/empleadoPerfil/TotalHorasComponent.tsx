import moment from 'moment';
import { useEffect, useState } from 'react';

const TotalHorasComponent = ({ semana }: any) => {
	const [totalHoras, setTotalHoras] = useState<string>('');

	useEffect(() => {
		if (semana) {
			const entrada = semana.find((array: any) => array.eventActionTypeId === 5);
			const salida = semana.find((array: any) => array.eventActionTypeId === 6);

			if (entrada && salida) {
				const horaEntrada = moment(entrada.DateEvent);
				const horaSalida = moment(salida.DateEvent);

				const duration = moment.duration(horaSalida.diff(horaEntrada));
				const minutes = duration.asMinutes();
				setTotalHoras(convertMinsToHrsMins(minutes));
			} else {
				setTotalHoras('');
			}
		}
	}, [semana]);

	function convertMinsToHrsMins(mins: number) {
		let h = Math.floor(mins / 60);
		let m = mins % 60;

		const h1 = h < 10 ? '0' + h : h;
		const m1 = m < 10 ? '0' + m : m;
		return `${h1}:${m1}`;
	}

	return (
		<>
			<div className='d-flex align-items-center justify-content-center text-center'>
				{totalHoras ? (
					<div className='custm-hrsTotal'>{totalHoras}</div>
				) : (
					<div className='custm-hrsTotal'>00:00</div>
				)}
			</div>
		</>
	);
};

export default TotalHorasComponent;
