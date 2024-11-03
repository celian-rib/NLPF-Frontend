import axios from 'axios';

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
        const { user_id } = response.data;
        localStorage.setItem('user_id', user_id);
        return response;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};
