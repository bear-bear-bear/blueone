import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://54.180.83.42' : 'http://localhost:80',
  withCredentials: true,
});

export default httpClient;
