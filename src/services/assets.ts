import axios from 'axios';
import { Package } from '../types/Package';
import { Tractor } from '../types/Tractor';

const API_BASE_URL = process.env.REACT_APP_ASSETS_API_URL;
const userId = localStorage.getItem('user_id');

// GET /packages/clients/{client_id}
export const getPackagesByClientId = async (): Promise<Package[] | null> => {
    try {
        const response = await axios.get<Package[]>(`${API_BASE_URL}/packages/clients/${userId}`);
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

// GET /packages/{package_id}
export const getPackageById = async (packageId: string): Promise<Package | null> => {
    try {
        const response = await axios.get<Package>(`${API_BASE_URL}/packages/${packageId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// GET /tractors/{tractor_id}
export const getTractorById = async (tractorId: string): Promise<Tractor | null> => {
    try {
        const response = await axios.get<Tractor>(`${API_BASE_URL}/tractors/${tractorId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// POST /packages
export const createPackage = async (data: any) => {
    return axios.post(`${API_BASE_URL}/packages`, data);
};

// POST /tractors
export const createTractor = async (data: any) => {
    return axios.post(`${API_BASE_URL}/tractors`, data);
};

// DELETE /packages/{package_id}
export const deletePackage = async (packageId: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/packages/${packageId}`);
};

// DELETE /tractors/{tractor_id}
export const deleteTractor = async (tractorId: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/tractors/${tractorId}`);
};