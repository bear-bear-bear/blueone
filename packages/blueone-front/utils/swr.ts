import httpClient from '@utils/axios';

export const axiosFetcher = (url: string) => httpClient.get(url).then((res) => res.data);
