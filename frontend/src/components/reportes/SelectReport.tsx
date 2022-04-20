import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { patchReportListById } from '../../actions/reportsActions/reportsActions';
import { useForm } from '../../hooks/useForm';

const SelectReport = ({ report }: any) => {
	//dispatch para ejecutar las actions
	const dispatch = useDispatch();
	//objeto user para select
	const reportState = {
		reportID: report.statusId,
	};

	//Uso de hook useForm para manejo de campos en el formulario
	const [formValues, handleInputChange] = useForm(reportState);

	//Desestructuracion de propiedades
	const { reportID } = formValues;

	useEffect(() => {
		if (reportID !== report.statusId) {
			// console.log('CAMBIANDO id: ', report.id, reportID);
			console.log(reportID);
			dispatch(
				patchReportListById(report.id, {
					statusId: reportID,
				})
			);
		}
	}, [reportID, dispatch, report.id, report.statusId]);

	return (
		<>
			<select
				id={`select${report.id}`}
				className={
					report.statusId === 1
						? 'form-select custm-selectPending form-control'
						: 'form-select custm-selectAttended form-control'
				}
				style={{ width: '130px', backgroundColor: 'transparent' }}
				name='reportID'
				value={reportID}
				onChange={handleInputChange}
				// disabled={!horasLabValue}
				// disabled={!infoBasicavalue}
			>
				<option className='custm-Status3' value='1'>
					Pendiente
				</option>
				<option className='custm-Status2' value='4'>
					Revisado
				</option>
			</select>
		</>
	);
};

export default SelectReport;
