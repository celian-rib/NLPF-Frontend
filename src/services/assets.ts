import axios from 'axios';
import { Lot } from '../types/Lot';
import { Tractor } from '../types/Tractor';

const API_BASE_URL = process.env.REACT_APP_ASSETS_API_URL;
const userId = localStorage.getItem('user_id');

// GET /lots/clients/{client_id}
export const getLotsByClientId = async (): Promise<Lot[] | null> => {
    try {
        const response = await axios.get<Lot[]>(`${API_BASE_URL}/lots/clients/${userId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// GET /tractors/clients/{client_id}
export const getTractorsByClientId = async (): Promise<Tractor[] | null> => {
    try {
        const response = await axios.get<Tractor[]>(`${API_BASE_URL}/tractors/clients/${userId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// POST /lots
export const createLot = async (data: any) => {
    return axios.post(`${API_BASE_URL}/lots`, data);
};

// POST /tractors
export const createTractor = async (data: any) => {
    return axios.post(`${API_BASE_URL}/tractors`, data);
};

// DELETE /lots/{lot_id}
export const deleteLot = async (lotId: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/lots/${lotId}`);
};

// DELETE /tractors/{tractor_id}
export const deleteTractor = async (tractorId: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/tractors/${tractorId}`);
};