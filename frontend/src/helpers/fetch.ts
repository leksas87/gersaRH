const baseUrl = process.env.REACT_APP_API_URL;

//Metodo para hacer fetch sin Token
export const fetchSinToken = (
	endpoint: string,
	data: {},
	method: string = 'GET'
) => {
	const url = `${baseUrl}/${endpoint}`;

	//Si la peticion es un GET
	if (method === 'GET') {
		return fetch(url);
	} else {
		//Si la peticion es POST, PUT, DELETE
		return fetch(url, {
			method,
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}
};

//Metodo para hacer fetch con Token
export const fetchConToken = (
	endpoint: string,
	data: {},
	method: string = 'GET'
) => {
	//Se une el endpoint con la baseURL
	const url = `${baseUrl}/${endpoint}`;
	//Se recupera el token guardado el localStorage
	const token = localStorage.getItem('token') || '';

	//Si la peticion es un GET
	if (method === 'GET') {
		return fetch(url, {
			method,
			headers: {
				'x-token': token,
			},
		});
	} else {
		//Si la peticion es POST, PUT, DELETE
		return fetch(url, {
			method,
			headers: {
				'Content-type': 'application/json',
				'x-token': token,
			},
			body: JSON.stringify(data),
		});
	}
};
