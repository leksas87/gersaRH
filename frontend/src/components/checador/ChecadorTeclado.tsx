import { useEffect, useState } from 'react';
import './Checador.css';
const ChecadorTeclado = () => {
	const [code, setCode] = useState('');
	const [code2, setCode2] = useState(['1']);

	const uno = code.slice(0, 1);
	const dos = code.slice(1, 2);
	const tres = code.slice(2, 3);
	const cuatro = code.slice(3, 4);

	//Metodo para ingresar los numeros
	const handleClick = (e: any) => {
		if (code.length > 3) return;
		setCode(code.concat(e.target.name));
	};

	//Metodo para eliminar el ultimo caracter
	const handleDelete = () => {
		const strLast = code.slice(0, -1);
		setCode(strLast);
	};

	//Effecto para ingresar codigo de acceso a travez del teclado de la computadora
	useEffect(() => {
		function key(e: any) {
			if (e.key === 'Enter') return;
			if (e.key === ' ') return;
			if (code.length < 4) setCode(code.concat(e.key));
		}
		window.addEventListener('keypress', key);

		return () => {
			window.removeEventListener('keypress', key);
		};
	}, [code, setCode]);

	return (
		<>
			<div className='container containerProject d-flex flex-column justify-content-center align-items-center'>
				<div className='d-flex mb-4'>
					<img
						className='custm-imgCheck'
						src='\assets\gersaLogo.svg'
						alt='gersa-logo'
					/>
				</div>
				<div className='d-flex flex-column align-items-center lh-sm'>
					<div className='fs-2 fw-light textColorSecondary'>Ingresa tu código</div>
				</div>
				<div className='d-flex '>
					<div
						className={
							uno
								? 'p-2 custm-digitCheck custm-digitCheckActive'
								: 'p-2 custm-digitCheck'
						}
					>
						{uno}
					</div>
					<div
						className={
							dos
								? 'p-2 custm-digitCheck custm-digitCheckActive'
								: 'p-2 custm-digitCheck'
						}
					>
						{dos}
					</div>
					<div
						className={
							tres
								? 'p-2 custm-digitCheck custm-digitCheckActive'
								: 'p-2 custm-digitCheck'
						}
					>
						{tres}
					</div>
					<div
						className={
							cuatro
								? 'p-2 custm-digitCheck custm-digitCheckActive'
								: 'p-2 custm-digitCheck'
						}
					>
						{cuatro}
					</div>
				</div>
				<div>
					<div className='d-flex flex-column custm-btnTableCheckContainer'>
						<div className='d-flex'>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='1'
								onClick={handleClick}
							>
								1
							</button>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='2'
								onClick={handleClick}
							>
								2
							</button>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='3'
								onClick={handleClick}
							>
								3
							</button>
						</div>
						<div className='d-flex'>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='4'
								onClick={handleClick}
							>
								4
							</button>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='5'
								onClick={handleClick}
							>
								5
							</button>
							<button
								className='btn custm-btnTableCheck'
								type='button'
								name='6'
								onClick={handleClick}
							>
								6
							</button>
						</div>
						<div className='d-flex'>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='7'
								onClick={handleClick}
							>
								7
							</button>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='8'
								onClick={handleClick}
							>
								8
							</button>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='9'
								onClick={handleClick}
							>
								9
							</button>
						</div>
						<div className='d-flex justify-content-end'>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='0'
								onClick={handleClick}
							>
								0
							</button>
							<button
								className='btn custm-btnTableCheck d-flex justify-content-center align-items-center'
								type='button'
								name='delete'
								onClick={handleDelete}
							>
								<i className='bi bi-backspace-fill' />
							</button>
						</div>
					</div>
					<button
						className='btn custm-Width100 custm-btnCheckSubmit mt-4'
						type='submit'
					>
						CONTINUAR
					</button>
				</div>
			</div>
		</>
	);
};

export default ChecadorTeclado;
