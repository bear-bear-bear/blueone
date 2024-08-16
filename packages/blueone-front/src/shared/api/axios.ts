import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://blueone.app' : 'http://localhost:8001',
  withCredentials: true,
});

export default httpClient;