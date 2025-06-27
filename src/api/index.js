import axios from 'axios';

const API = axios.create({
    baseURL: '/api/users', // 使用相对路径
});

export const login = (data) => API.post('/login', data);
export const register = (data) => API.post('/register', data);