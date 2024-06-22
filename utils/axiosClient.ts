import { AxiosClientOptions } from '#/types';
import axios, { AxiosInstance } from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.PI_API_KEY || '/api',
  timeout: 20000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

export default axiosClient;


export const getAxiosClient = (apiKey: string, options: AxiosClientOptions | null): AxiosInstance => {
  return axios.create({
    baseURL: options?.baseURL || "https://api.yourdomain.com",
    timeout: options?.timeout || 10000,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${apiKey}`,
    },
  });
};
