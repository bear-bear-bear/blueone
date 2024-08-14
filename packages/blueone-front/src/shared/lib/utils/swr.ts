import httpClient from '@/shared/api/axios';

export const axiosFetcher = (url: string) => httpClient.get(url).then((res) => res.data);
