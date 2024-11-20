import axios from 'axios';
import { Lot } from '../types/Lot';
import { Tractor } from '../types/Tractor';

const API_BASE_URL = process.env.REACT_APP_STOCK_EXCHANGE_API_URL;
const userId = localStorage.getItem('user_id');

// GET /traders/lots/{trader_id}
export const getLotsByTraderId = async (): Promise<Lot[]> => {
    const response = await axios.get<Lot[]>(`${API_BASE_URL}/traders/lots/${userId}`);
    return response.data;
};

// GET /traders/tractors/{trader_id}
export const getTractorsByTraderId = async (): Promise<Tractor[]> => {
    const response = await axios.get<Tractor[]>(`${API_BASE_URL}/offers/tractors/${userId}`);
    return response.data;
};