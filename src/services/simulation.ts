import axios from 'axios';
import { Tractor } from '../types/Tractor';

const API_BASE_URL = process.env.REACT_APP_SIMULATOR_API_URL;
const userId = localStorage.getItem('user_id');

// GET /date
export const getCurrentDate = async (): Promise<string> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/date`);
        return response.data.date;
    } catch (error) {
        throw error;
    }
};

// GET /traffic-managers/{traffic_manager_id}/packages/{package_id}/tractors
export const getTractorsThatCanFitPackage = async (packageId: string): Promise<Tractor[] | null> => {
    try {
        const response = await axios.get<Tractor[]>(`${API_BASE_URL}/traffic-managers/${userId}/packages/${packageId}/tractors`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};