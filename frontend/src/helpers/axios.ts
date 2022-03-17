import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('gersa-tkn') || '';

//Cliente axios
export const axiosClientWithToken = axios.create({
	baseURL: baseURL,
	headers: {
		Authorization: `Bearer ${token}`,
	},
});
//Cliente axios
export const axiosClientWithoutToken = axios.create({
	baseURL: baseURL,
	headers: {
		'Content-type': 'application/json',
	},
});

//EXAMPLE OF A PETITION USING THE AXIOSCLIENT- WHIT TOKEN
// axiosClient
// 	.get(`users/${id}`)
// 	.then((respuesta) => {
// 		if (respuesta.status === 200) {
// 			console.log('good200!!');
// 		}
// 	})
// 	.catch((error) => {
// 		if (error.response) {
// 			console.log('axiosData', error.response.data);
// 			console.log('axiosStatuss', error.response.status);
// 		}
// 	});

//EXAMPLE OF A PETITION USING THE AXIOSCLIENT- WHITOUT TOKEN
// axiosClientWithoutToken
// 			.post('users/authenticate', {
// 				username: email,
// 				password: password,
// 			})
// 			.then((res) => {
// 				console.log('axiosEXampleLogin', res);
// 			})
// 			.catch((err) => console.log('axiosEXampleLoginErr', err));
