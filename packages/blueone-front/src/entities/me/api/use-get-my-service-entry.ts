import { useFetchMeAsync } from './use-fetch-me-async';
import * as Me from '../model/me.model';

export function useGetMyServiceEntry(): () => Promise<string> {
  const fetchMeAsync = useFetchMeAsync();

  return async () => {
    const me = await fetchMeAsync();
    return Me.serviceEntry(me);
  };
}
