import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const signupUser = async (username: string, password: string, role: string) => {
    return axios.post(`${API_BASE_URL}/auth/signup`, { username, password, role });
};

export const loginUser = async (username: string, password: string) => {
    return axios.post(`${API_BASE_URL}/auth/login`, { username, password });
};