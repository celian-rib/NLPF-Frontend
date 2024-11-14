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
