import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR, { SWRConfiguration } from 'swr';
import httpClient from '@utils/axios';
import type { EndPoint } from '@typings';

type UserResponse =
  | EndPoint['GET /user']['responses']['200']
  | EndPoint['GET /user']['responses']['401'];
interface Props {
  redirectTo?: `/${string}`;
  redirectIfFound?: boolean;
}

const SWR_KEY = '/user';
const SWROptions: SWRConfiguration<UserResponse> = {
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // Never url
    if (key === SWR_KEY) return;

    // count
    if (retryCount >= 10) return;

    setTimeout(() => revalidate({ retryCount }), 5000);
  },
};
const axiosFetcher = (url: string) => httpClient.get(url).then((res) => res.data);

/**
 * @desc
 * swr 을 사용하여 user 정보를 받아와 리디렉션과 static generation 을 담당합니다.
 * user 정보는 액세스 토큰으로 요청하며,
 * swr fetcher 가 axios 함수이므로 유저 정보 패치 전 인터셉터를 통해 현재 액세스 토큰의 유효성 여부 판단과 그에 따른 갱신 또한 이뤄지게 됩니다.
 * 요청에 대한 응답이 400, 401, 403, 404 등일 때, 재요청 폴링을 금지합니다.
 * ---
 * @param redirectTo {`/${string}`} (optional) 리디렉션 경로
 * @param redirectIfFound {boolean} (optional) Authorization 이 필요하지 않은 페이지에서 true 로 설정
 */
export default function useUser({ redirectTo, redirectIfFound = false }: Props = {}) {
  const router = useRouter();

  // TODO: axiosFetcher 혹은 SWRMiddleware에서 isLoggedIn을 부여할 수 있을지 체크해보기 (서버 의존성 제거)
  // FIXME: 현재 서버 측에서 로그인 검증 미들웨어 내에서 401 응답 시 isLoggedIn prop을 포함하지 않아 리디렉션이 안되는 문제 발생 중
  const { data: user, mutate: mutateUser } = useSWR<UserResponse>(
    SWR_KEY,
    axiosFetcher,
    SWROptions,
  );

  console.log('user', user);

  useEffect(() => {
    // 리디렉트가 필요하지 않다면 return
    if (!redirectTo) return;
    if (!user) return;

    if (
      // Authorization 이 필요한 페이지인데 사용자 비로그인 상태라면 리디렉션
      (!redirectIfFound && !user.isLoggedIn) ||
      // Authorization 이 필요하지 않은 페이지인데 사용자가 로그인 상태라면 리디렉션
      (redirectIfFound && user.isLoggedIn)
    ) {
      console.log('리다이렉팅');
      router.push(redirectTo);
    }
  }, [redirectIfFound, redirectTo, router, user]);

  return { user, mutateUser };
}
