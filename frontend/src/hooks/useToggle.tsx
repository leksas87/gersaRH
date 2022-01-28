import { useState } from 'react';

//Recibe el valor bolean
export const useToggle = (defaultValue: any) => {
	//Uso de useState
	const [value, setValue] = useState(defaultValue);

	function toggleValue(value: any) {
		//Cambia el valor del toggle por el opuesto
		setValue((currentValue: any) =>
			//si el valor que recive toggleValue es boolean(true|false) cambia el toggle por ese valor,
			//Si  no cambia por el opuesto del valor actual.
			typeof value === 'boolean' ? value : !currentValue
		);
	}
	//Retorna el valor y la funcion toggleValue
	return [value, toggleValue];
};
