import axios from 'axios';
import { Tractor } from '../types/Tractor';

const API_BASE_URL = process.env.REACT_APP_SIMULATOR_API_URL;
const userId = localStorage.getItem('user_id');

// GET /traffic-managers/{traffic_manager_id}/lots/{lot_id}/tractors
export const getTractorsThatCanFitLot = async (lotId: string): Promise<Tractor[] | null> => {
    try {
        const response = await axios.get<Tractor[]>(`${API_BASE_URL}/traffic-managers/${userId}/lots/${lotId}/tractors`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};