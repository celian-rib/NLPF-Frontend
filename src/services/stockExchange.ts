import axios from 'axios';
import { LotOffer } from '../types/LotOffer';
import { TractorOffer } from '../types/TractorOffer';

const API_BASE_URL = process.env.REACT_APP_STOCK_EXCHANGE_API_URL;

// GET /offers/lots
export const getLotOffers = async (): Promise<LotOffer[]> => {
    const response = await axios.get<LotOffer[]>(`${API_BASE_URL}/offers/lots`);
    return response.data;
};

// GET /offers/tractors
export const getTractorOffers = async (): Promise<TractorOffer[]> => {
    const response = await axios.get<TractorOffer[]>(`${API_BASE_URL}/offers/tractors`);
    return response.data;
};