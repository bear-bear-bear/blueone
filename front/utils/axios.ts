import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://blueone.app' : 'http://localhost:80',
  withCredentials: true,
});

export default httpClient;
