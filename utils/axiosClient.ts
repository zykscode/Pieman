import axios from 'axios';

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
