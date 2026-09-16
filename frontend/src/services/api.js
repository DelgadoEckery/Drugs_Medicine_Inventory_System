import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api', timeout: 10000 });
api.interceptors.request.use((config) => { const token = localStorage.getItem('inventory_token'); if (token) config.headers.Authorization = `Bearer ${token}`; return config; });
api.interceptors.response.use((response) => response, (error) => { if (error.response?.status === 401 && !error.config?.url?.endsWith('/login')) { localStorage.removeItem('inventory_token'); window.location.assign('/login'); } return Promise.reject(error); });
export const messageFor = (error) => error.response?.data?.message || (error.code === 'ECONNABORTED' ? 'The request timed out.' : 'Unable to reach the server. Please try again.');
export default api;