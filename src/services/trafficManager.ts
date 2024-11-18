import axios from 'axios';
import { Checkpoint } from '../types/Checkpoint';
import { Lot } from '../types/Lot';
import { Tractor } from '../types/Tractor';
import { Route } from '../types/Route';

const API_BASE_URL = process.env.REACT_APP_TRAFFIC_MANAGER_API_URL;
const userId = localStorage.getItem('user_id');

// GET /lots/traffic-managers/{traffic_manager_id}
export const getLotsByTrafficManagerId = async (): Promise<Lot[] | null> => {
    try {
        const response = await axios.get<Lot[]>(`${API_BASE_URL}/lots/traffic-managers/${userId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// GET /tractors/traffic-managers/{traffic_manager_id}
export const getTractorsByTrafficManagerId = async (): Promise<Tractor[] | null> => {
    try {
        const response = await axios.get<Tractor[]>(`${API_BASE_URL}/tractors/traffic-managers/${userId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// GET /routes/traffic-managers/{traffic_manager_id}
export const getRoutesByTrafficManagerId = async (): Promise<Route[] | null> => {
    try {
        const response = await axios.get<Route[]>(`${API_BASE_URL}/routes/traffic-managers/${userId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// GET /checkpoints
export const getAllCheckpoints = async (): Promise<Checkpoint[] | null> => {
    try {
        const response = await axios.get<Checkpoint[]>(`${API_BASE_URL}/checkpoints`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// PUT /lots/{lot_id}/trafic-managers/{traffic_manager_id}
export const assignLotToTrafficManager = async (lotId: string, trafficManagerId: string) => {
    return axios.put(`${API_BASE_URL}/lots/${lotId}/traffic-managers/${trafficManagerId}`);
};

// PUT /tractors/{tractor_id}/trafic-managers/{traffic_manager_id}
export const assignTractorToTrafficManager = async (tractorId: string, trafficManagerId: string) => {
    return axios.put(`${API_BASE_URL}/tractors/${tractorId}/traffic-managers/${trafficManagerId}`);
};

// POST /routes/{traffic_manager_id}
export const createRoute = async (data: any) => {
    return axios.post(`${API_BASE_URL}/routes/${userId}`, data);
};