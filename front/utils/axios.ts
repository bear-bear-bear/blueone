import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:8001',
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.resolve({ error }),
);

export default httpClient;
