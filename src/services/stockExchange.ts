import axios from 'axios';
import { PackageOffer } from '../types/PackageOffer';
import { TractorOffer } from '../types/TractorOffer';
import { PackageBid } from '../types/PackageBid';
import { TractorBid } from '../types/TractorBid';

const API_BASE_URL = process.env.REACT_APP_STOCK_EXCHANGE_API_URL;
const userId = localStorage.getItem('user_id');

// GET /offers/packages
export const getPackageOffers = async (): Promise<PackageOffer[] | null> => {

    try {
        const response = await axios.get<PackageOffer[]>(`${API_BASE_URL}/offers/packages`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// GET /offers/tractors
export const getTractorOffers = async (): Promise<TractorOffer[] | null> => {
    try {
        const response = await axios.get<TractorOffer[]>(`${API_BASE_URL}/offers/tractors`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// GET /offers/packages/users/{user_id}/bids
export const getPackageBidsByUserId = async (): Promise<PackageBid[] | null> => {
    try {
        const response = await axios.get<PackageBid[]>(`${API_BASE_URL}/offers/packages/users/${userId}/bids`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// GET /offers/tractors/users/{user_id}/bids
export const getTractorBidsByUserId = async (): Promise<TractorBid[] | null> => {
    try {
        const response = await axios.get<TractorBid[]>(`${API_BASE_URL}/offers/tractors/users/${userId}/bids`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// POST /offers/packages
export const createPackageOffer = async (data: any) => {
    return axios.post(`${API_BASE_URL}/offers/packages`, data);
};

// POST /offers/tractors
export const createTractorOffer = async (data: any) => {
    return axios.post(`${API_BASE_URL}/offers/tractors`, data);
};

// POST /offers/packages/{offer_id}/bids
export const bidOnPackage = async (offerId: string, data: any) => {
    return axios.post(`${API_BASE_URL}/offers/packages/${offerId}/bids`, data);
};

// POST /offers/tractors/{offer_id}/bids
export const bidOnTractor = async (offerId: string, data: any) => {
    return axios.post(`${API_BASE_URL}/offers/tractors/${offerId}/bids`, data);
};