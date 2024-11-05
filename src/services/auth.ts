import axios from 'axios';
import { UserInfo } from '../types/UserInfo';

const API_BASE_URL = process.env.REACT_APP_AUTH_API_URL;

interface LoginResponse {
    status: number;
    message: string;
    user_id: string;
    role: string;
}

// POST /signup
export const signupUser = async (username: string, password: string, role: string) => {
    return axios.post(`${API_BASE_URL}/signup`, { username, password, role });
};

// POST /login
export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axios.post<LoginResponse>(`${API_BASE_URL}/login`, { username, password });
        const { user_id, role } = response.data;
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('user_role', role);
        return response;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

// GET /users/:userId
export const getUserInfo = async (): Promise<UserInfo> => {
    const userId = localStorage.getItem('user_id');
    const response = await axios.get<UserInfo>(`${API_BASE_URL}/users/${userId}`);
    return response.data;
};
