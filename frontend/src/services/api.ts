import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4200', // Мой бекенд
    headers: { 'Content-Type': 'application/json' }
});



export default api;