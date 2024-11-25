import axios from 'axios';
import { Lot } from '../types/Lot';
import { Tractor } from '../types/Tractor';

const API_BASE_URL = process.env.REACT_APP_TRADER_API_URL;
const userId = localStorage.getItem('user_id');

// GET /traders/lots/{trader_id}
export const getLotsByTraderId = async (): Promise<Lot[] | null> => {
    try {
        const response = await axios.get<Lot[]>(`${API_BASE_URL}/traders/lots/${userId}`);
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
        const response = await axios.get<Tractor[]>(`${API_BASE_URL}/offers/tractors/${userId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// POST /traders/lots/{lot_id}
export const assignLotToTrader = async (lotId: string) => {
    return axios.post(`${API_BASE_URL}/traders/lots/${lotId}`);
};

// POST /traders/tractors/{tractor_id}
export const assignTractorToTrader = async (tractorId: string) => {
    return axios.post(`${API_BASE_URL}/traders/tractors/${tractorId}`);
};