import axios from 'axios';
import { Lot } from '../types/Lot';
import { Tractor } from '../types/Tractor';

const API_BASE_URL = process.env.REACT_APP_ASSETS_API_URL;
const userId = localStorage.getItem('user_id');

// GET /lots/clients/{client_id}
export const getLotsByClientId = async (): Promise<Lot[]> => {
    const response = await axios.get<Lot[]>(`${API_BASE_URL}/lots/clients/${userId}`);
    return response.data;
};

// GET /tractors/clients/{client_id}
export const getTractorsByClientId = async (): Promise<Tractor[]> => {
    const response = await axios.get<Tractor[]>(`${API_BASE_URL}/tractors/clients/${userId}`);
    return response.data;
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