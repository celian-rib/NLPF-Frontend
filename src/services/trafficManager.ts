import axios from 'axios';
import { Checkpoint } from '../types/Checkpoint';
import { Package } from '../types/Package';
import { Tractor } from '../types/Tractor';
import { Route } from '../types/Route';
import { UserInfo } from '../types/UserInfo';

const API_BASE_URL = process.env.REACT_APP_TRAFFIC_MANAGER_API_URL;
const userId = localStorage.getItem('user_id');

// GET /packages/traffic-managers/{traffic_manager_id}
export const getPackagesByTrafficManagerId = async (): Promise<Package[] | null> => {
    try {
        const response = await axios.get<Package[]>(`${API_BASE_URL}/packages/traffic-managers/${userId}`);
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

// GET /packages/{package_id}/traffic_manager
export const getTrafficManagerByPackageId = async (packageId: string): Promise<UserInfo | null> => {
    try {
        const response = await axios.get<UserInfo>(`${API_BASE_URL}/packages/${packageId}/traffic_manager`);
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

// PUT /packages/{package_id}/trafic-managers/{traffic_manager_id}
export const assignPackageToTrafficManager = async (packageId: string, trafficManagerId: string) => {
    return axios.put(`${API_BASE_URL}/packages/${packageId}/traffic-managers/${trafficManagerId}`);
};

// PUT /tractors/{tractor_id}/trafic-managers/{traffic_manager_id}
export const assignTractorToTrafficManager = async (tractorId: string, trafficManagerId: string) => {
    return axios.put(`${API_BASE_URL}/tractors/${tractorId}/traffic-managers/${trafficManagerId}`);
};

// PUT /routes/{route_id}/tractors/{tractor_id}
export const assignRouteToTractor = async (routeId: string, tractorId: string) => {
    try {
        return axios.put(`${API_BASE_URL}/routes/${routeId}/tractors/${tractorId}`);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400)
        {
            alert('Route can not be assigned to this route.');
            return;
        }
        throw error;
    }
};

// PUT /packages/{package_id}/tractors/{tractor_id}
export const assignTractorToPackage = async (packageId: string, tractorId: string) => {
    try {
        return axios.put(`${API_BASE_URL}/packages/${packageId}/tractors/${tractorId}`);
    } catch (error) {  
        if (axios.isAxiosError(error) && error.response?.status === 400)
        {
            alert('Tractor can not be assigned to this package.');
            return;
        }
        throw error;
    }
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