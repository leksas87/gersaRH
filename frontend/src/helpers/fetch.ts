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
		}).catch((error) => {
			console.log(error.message, 'Error');
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
	const token = localStorage.getItem('gersa-tkn') || '';

	//Si la peticion es un GET
	if (method === 'GET') {
		return fetch(url, {
			method,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).catch((error) => {
			console.log(error.message);
			console.log('geteerror');
		});
	} else {
		//Si la peticion es POST, PUT, DELETE
		return fetch(url, {
			method,
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		}).catch((error) => {
			console.log(error.message);
		});
	}
};
//Metodo para hacer fetch Multipart FormDAta con Token
export const fetchMultipartFormDataConToken = (
	endpoint: string,
	data: FormData,
	method: string = 'GET'
) => {
	//Se une el endpoint con la baseURL
	const url = `${baseUrl}/${endpoint}`;
	//Se recupera el token guardado el localStorage
	const token = localStorage.getItem('gersa-tkn') || '';

	//Si la peticion es POST, PUT, DELETE
	return fetch(url, {
		method,
		headers: {
			Authorization: `Bearer ${token}`,
			// uploadfile: `multipart/form-data ${data}`,
		},
		body: data,
	}).catch((error) => {
		console.log(error.message);
	});
};
//Metodo para mandar el AccesCode (GET)
export const fetchConTokenCheck = (
	endpoint: string,
	accesCode: number,
	method: string = 'GET'
) => {
	//Se une el endpoint con la baseURL
	const url = `${baseUrl}/${endpoint}`;

	//Se hace la peticion
	return fetch(url, {
		method,
		headers: {
			accessCode: JSON.stringify(accesCode),
		},
	}).catch((error) => {
		console.log(error.message);
	});
};
//Metodo para hacer CheckIn AccessCode con Token y DATA
export const fetchCheckconData = (
	endpoint: string,
	accesCode: number,
	data: object,
	method: string
) => {
	//Se une el endpoint con la baseURL
	const url = `${baseUrl}/${endpoint}`;

	console.log('desde fetch2', data, url, accesCode, method);
	//Se hace la peticion
	return fetch(url, {
		method,
		headers: {
			accessCode: JSON.stringify(accesCode),
			'Content-type': 'application/json',
		},
		body: JSON.stringify(data),
	}).catch((error) => {
		console.log(error.message);
	});
};
