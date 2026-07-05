import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4200', // Мой бекенд
    headers: { 'Content-Type': 'application/json' }
});


// Для вставки токена в заголовок запроса
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default api;