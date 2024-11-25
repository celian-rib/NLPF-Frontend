import axios from 'axios';
import { LotOffer } from '../types/LotOffer';
import { TractorOffer } from '../types/TractorOffer';
import { LotBid } from '../types/LotBid';
import { TractorBid } from '../types/TractorBid';

const API_BASE_URL = process.env.REACT_APP_STOCK_EXCHANGE_API_URL;

// GET /offers/lots
export const getLotOffers = async (): Promise<LotOffer[] | null> => {

    try {
        const response = await axios.get<LotOffer[]>(`${API_BASE_URL}/offers/lots`);
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

// GET /offers/lots/users/{user_id}/bids
export const getLotBidsByUserId = async (userId: string): Promise<LotBid[] | null> => {
    try {
        const response = await axios.get<LotBid[]>(`${API_BASE_URL}/offers/lots/users/${userId}/bids`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// GET /offers/tractors/users/{user_id}/bids
export const getTractorBidsByUserId = async (userId: string): Promise<TractorBid[] | null> => {
    try {
        const response = await axios.get<TractorBid[]>(`${API_BASE_URL}/offers/tractors/users/${userId}/bids`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
};

// POST /offers/lots
export const createLotOffer = async (data: any) => {
    return axios.post(`${API_BASE_URL}/offers/lots`, data);
};

// POST /offers/tractors
export const createTractorOffer = async (data: any) => {
    return axios.post(`${API_BASE_URL}/offers/tractors`, data);
};

// POST /offers/lots/{offer_id}/bids
export const bidOnLot = async (offerId: string, data: any) => {
    return axios.post(`${API_BASE_URL}/offers/lots/${offerId}/bids`, data);
};

// POST /offers/tractors/{offer_id}/bids
export const bidOnTractor = async (offerId: string, data: any) => {
    return axios.post(`${API_BASE_URL}/offers/tractors/${offerId}/bids`, data);
};