import axios from 'axios';
import { Checkpoint } from '../types/Checkpoint';
import { Lot } from '../types/Lot';
import { Tractor } from '../types/Tractor';
import { Route } from '../types/Route';
import { UserInfo } from '../types/UserInfo';

const API_BASE_URL = process.env.REACT_APP_TRAFFIC_MANAGER_API_URL;
const userId = localStorage.getItem('user_id');

// GET /lots/traffic-managers/{traffic_manager_id}
export const getLotsByTrafficManagerId = async (): Promise<Lot[] | null> => {
    try {
        const response = await axios.get<Lot[]>(`${API_BASE_URL}/lots/traffic-managers/${userId}`);
        if (response.status === 204)
            return null;
        else
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
        if (response.status === 204)
            return null;
        else
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
        if (response.status === 204)
            return null;
        else
            return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// GET /lots/{lot_id}/traffic_manager
export const getTrafficManagerByLotId = async (lotId: string): Promise<UserInfo | null> => {
    try {
        const response = await axios.get<UserInfo>(`${API_BASE_URL}/lots/${lotId}/traffic_manager`);
        if (response.status === 204)
            return null;
        else
            return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// GET /tractors/{tractor_id}/traffic_manager
export const getTrafficManagerByTractorId = async (tractorId: string): Promise<UserInfo | null> => {
    try {
        const response = await axios.get<UserInfo>(`${API_BASE_URL}/tractors/${tractorId}/traffic_manager`);
        if (response.status === 204)
            return null;
        else
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
        if (response.status === 204)
            return null;
        else
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

// PUT /routes/{route_id}/tractors/{tractor_id}
export const assignRouteToTractor = async (routeId: string, tractorId: string) => {
    return axios.put(`${API_BASE_URL}/routes/${routeId}/tractors/${tractorId}`);
};

// POST /routes/{traffic_manager_id}
export const createRoute = async (data: any) => {
    return axios.post(`${API_BASE_URL}/routes/${userId}`, data);
};

// POST /tractors/{tractor_id}/actions/start
export const startTractor = async (tractorId: string) => {
    return axios.post(`${API_BASE_URL}/tractors/${tractorId}/actions/start`);
};

// POST /tractors/{tractor_id}/actions/stop
export const stopTractor = async (tractorId: string) => {
    return axios.post(`${API_BASE_URL}/tractors/${tractorId}/actions/stop`);
};

// DELETE /routes/tractors/{tractor_id}
export const unassignRouteFromTractor = async (tractorId: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/routes/tractors/${tractorId}`);
};