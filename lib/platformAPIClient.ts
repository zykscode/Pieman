import axios from 'axios';

// Create an Axios instance with your base URL and default headers
const platformAPIClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PLATFORM_API_URL, // Use public variable for the URL
  timeout: 20000,
  headers: { Authorization: `Key ${process.env.PI_API_KEY}` }, // Use server-side variable for the API key
});

export default platformAPIClient;
