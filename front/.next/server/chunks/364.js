"use strict";
exports.id = 364;
exports.ids = [364];
exports.modules = {

/***/ 29364:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useUser)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(549);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(swr__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_swr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(57128);




const SWR_KEY = '/user';
const SWROptions = {
  onErrorRetry: (error, key, config, revalidate, {
    retryCount
  }) => {
    // Never url
    if (key === SWR_KEY) return; // count

    if (retryCount >= 10) return;
    setTimeout(() => revalidate({
      retryCount
    }), 5000);
  }
};
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

function useUser({
  redirectTo,
  redirectIfFound
} = {}) {
  var _error$response;

  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  const {
    data: user,
    mutate: mutateUser,
    error
  } = swr__WEBPACK_IMPORTED_MODULE_2___default()(SWR_KEY, _utils_swr__WEBPACK_IMPORTED_MODULE_3__/* .axiosFetcher */ .F, SWROptions);
  const isLoggedIn = !error && !!user;
  const isNotFetched = !error && !user;
  console.group('SWR Fetched "/user"');
  console.log('data:', user);
  console.log('error:', error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.data.message);
  console.log('isLoggedIn:', isLoggedIn);
  console.log('isNotFetched:', isNotFetched);
  console.groupEnd();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!redirectTo) return;
    if (isNotFetched) return;

    if ( // Authorization 이 필요한 페이지인데 사용자 비로그인 상태라면 리디렉션
    !redirectIfFound && !isLoggedIn || redirectIfFound && isLoggedIn) {
      router.push(redirectTo);
    }
  }, [isLoggedIn, isNotFetched, redirectIfFound, redirectTo, router, user]);
  return {
    user,
    mutateUser,
    isLoggedIn
  };
}

/***/ }),

/***/ 85258:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const httpClient = axios__WEBPACK_IMPORTED_MODULE_0___default().create({
  baseURL: 'http://localhost:8001',
  withCredentials: true
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (httpClient);

/***/ }),

/***/ 57128:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ axiosFetcher)
/* harmony export */ });
/* harmony import */ var _utils_axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85258);

const axiosFetcher = url => _utils_axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get(url).then(res => res.data);

/***/ })

};
;