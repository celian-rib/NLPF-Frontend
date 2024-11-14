import axios from 'axios';
import { Checkpoint } from '../types/Checkpoint';

const API_BASE_URL = process.env.REACT_APP_TRAFFIC_MANAGER_API_URL;

// GET /checkpoints
export const getAllCheckpoints = async (): Promise<Checkpoint[]> => {
    const response = await axios.get<Checkpoint[]>(`${API_BASE_URL}/checkpoints`);
    return response.data;
};
