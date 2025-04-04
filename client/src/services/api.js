import axios from 'axios';

const api = axios.create({baseURL: 'http://localhost:5000/api',});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

const apiService = {
	//Register new user
	register: async (userData) => {
		const response = await api.post('/users/register', userData);
		return response.data;
	},

	//Get user profile
	getProfile: async() => {
		const response = await api.get('/users/profile');
		return response.data;
	},
};

export default apiService;