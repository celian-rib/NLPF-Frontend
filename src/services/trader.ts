import axios from 'axios';
import { Package } from '../types/Package';
import { Tractor } from '../types/Tractor';

const API_BASE_URL = process.env.REACT_APP_TRADER_API_URL;
const userId = localStorage.getItem('user_id');

// GET /traders/packages/{trader_id}
export const getPackagesByTraderId = async (): Promise<Package[] | null> => {
    try {
        const response = await axios.get<Package[]>(`${API_BASE_URL}/traders/packages/${userId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// GET /traders/tractors/{trader_id}
export const getTractorsByTraderId = async (): Promise<Tractor[] | null> => {
    try {
        const response = await axios.get<Tractor[]>(`${API_BASE_URL}/traders/tractors/${userId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// POST /traders/packages/{package_id}
export const assignPackageToTrader = async (packageId: string) => {
    return axios.post(`${API_BASE_URL}/traders/packages/${packageId}`);
};

// POST /traders/tractors/{tractor_id}
export const assignTractorToTrader = async (tractorId: string) => {
    return axios.post(`${API_BASE_URL}/traders/tractors/${tractorId}`);
};