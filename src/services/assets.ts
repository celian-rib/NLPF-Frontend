import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_ASSETS_API_URL;

// POST /lots
export const createLot = async (data: any) => {
    return axios.post(`${API_BASE_URL}/lots`, data);
};

// POST /tractors
export const createTractor = async (data: any) => {
    return axios.post(`${API_BASE_URL}/tractors`, data);
};
