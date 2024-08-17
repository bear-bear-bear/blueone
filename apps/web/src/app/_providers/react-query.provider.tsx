'use client';
import { ReactNode } from 'react';
import { message } from 'antd';
import { getErrorMessage } from '@/shared/api/get-error-message';
import isAuthError from '@/shared/api/is-auth-error';
import { FIVE_MINUTES } from '@/shared/config/time';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';

/**
 * @see https://github.com/TanStack/query/issues/6116#issuecomment-1904051005
 */
export default function ReactQueryProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {children}
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        /**
         * @see https://tanstack.com/query/latest/docs/react/guides/advanced-ssr
         *
         * With SSR, we usually want to set some default staleTime
         * above 0 to avoid refetching immediately on the client
         *
         */
        staleTime: FIVE_MINUTES,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (process.env.NODE_ENV === 'development') return false;
          if (isAuthError(error)) return false;
          return failureCount <= 3;
        },
      },
    },
    queryCache: new QueryCache({
      onError: handleBubbledError,
    }),
  });
}

let clientQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  if (!clientQueryClient) clientQueryClient = makeQueryClient();
  return clientQueryClient;
}

function handleBubbledError(error: unknown) {
  const errorMessage = `[ERROR]\n${getErrorMessage(error)}`;

  if (typeof window === 'undefined') {
    console.error(errorMessage);
    return;
  }

  if (isAuthError(error)) {
    if (location.pathname !== '/') {
      location.href = '/';
    }
    return;
  }

  console.error(error);
  message.error(errorMessage);
}
