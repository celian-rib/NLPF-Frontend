import axios from 'axios';
import { Checkpoint } from '../types/Checkpoint';
import { Lot } from '../types/Lot';
import { Tractor } from '../types/Tractor';

const API_BASE_URL = process.env.REACT_APP_TRAFFIC_MANAGER_API_URL;
const userId = localStorage.getItem('user_id');

// GET /lots/traffic-managers/{traffic_manager_id}
export const getLotsByTrafficManagerId = async (): Promise<Lot[]> => {
    const response = await axios.get<Lot[]>(`${API_BASE_URL}/lots/traffic-managers/${userId}`);
    return response.data;
};

// GET /tractors/traffic-managers/{traffic_manager_id}
export const getTractorsByTrafficManagerId = async (): Promise<Tractor[]> => {
    const response = await axios.get<Tractor[]>(`${API_BASE_URL}/tractors/traffic-managers/${userId}`);
    return response.data;
};

// GET /checkpoints
export const getAllCheckpoints = async (): Promise<Checkpoint[]> => {
    const response = await axios.get<Checkpoint[]>(`${API_BASE_URL}/checkpoints`);
    return response.data;
};

// PUT /lots/{lot_id}/trafic-managers/{traffic_manager_id}
export const assignLotToTrafficManager = async (lotId: string, trafficManagerId: string) => {
    return axios.put(`${API_BASE_URL}/lots/${lotId}/trafic-managers/${trafficManagerId}`);
};

// PUT /tractors/{tractor_id}/trafic-managers/{traffic_manager_id}
export const assignTractorToTrafficManager = async (tractorId: string, trafficManagerId: string) => {
    return axios.put(`${API_BASE_URL}/tractors/${tractorId}/trafic-managers/${trafficManagerId}`);
};