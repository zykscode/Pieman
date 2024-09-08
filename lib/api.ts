import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUserProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const fetchWalletBalance = async () => {
  try {
    const response = await api.get('/wallet/balance');
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    throw error;
  }
};

export const fetchTransactions = async (limit: number = 5) => {
  try {
    const response = await api.get(`/transactions?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const createExchange = async (
  type: 'buy' | 'sell',
  amount: number,
  currency: string,
) => {
  try {
    const response = await api.post('/exchange', { type, amount, currency });
    return response.data;
  } catch (error) {
    console.error('Error creating exchange:', error);
    throw error;
  }
};

interface UserProfileData {
  name?: string;
  email?: string;
  // Add other relevant fields
}

export const updateUserProfile = async (userData: UserProfileData) => {
  try {
    const response = await api.put('/user/profile', userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const verifyUser = async () => {
  try {
    const response = await api.post('/user/verify');
    return response.data;
  } catch (error) {
    console.error('Error verifying user:', error);
    throw error;
  }
};

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
