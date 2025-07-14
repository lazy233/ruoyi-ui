import axios from 'axios';

const API = axios.create({
    baseURL: '/api', // 更新baseURL
});

// 用户相关API
export const login = (data) => API.post('/users/login', data);
export const register = (data) => API.post('/users/register', data);

// 课程相关API
export const getCourseDetail = (courseId) => API.get(`/course-detail/${courseId}`);
export const getCourseList = (params) => API.post('/courses/list', params);
export const addCourse = (data) => API.post('/courses/addCourse', data);
export const updateCourse = (courseId, data) => API.put(`/courses/updateCourse/${courseId}`, data);
export const deleteCourse = (courseId) => API.delete(`/courses/deleteCourse/${courseId}`);