(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 35202:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "swr"
var external_swr_ = __webpack_require__(549);
// EXTERNAL MODULE: external "@emotion/react"
var react_ = __webpack_require__(72805);
// EXTERNAL MODULE: ./utils/media.ts
var media = __webpack_require__(91819);
;// CONCATENATED MODULE: ./globalStyles/_Resets.tsx

const Resets = react_.css`
  // -- CSS resets --

  // http://meyerweb.com/eric/tools/css/reset/
  //  v2.0 | 20110126
  //  License: none (public domain)

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-style: inherit;
    vertical-align: baseline;
    text-decoration: none;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
    overflow: visible;
    text-transform: none;
  }

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }
`;
/* harmony default export */ const _Resets = (Resets);
;// CONCATENATED MODULE: ./globalStyles/_FontFace.tsx

const ROBOTO_DIR = '/fonts/Roboto-subset';
const NOTOSANS_DIR = '/fonts/NotoSans-subset';
const NOTOSANS_REMOTE = '//fonts.gstatic.com/ea/notosanskr/v2';
const FontFace = react_.css`
  /* ---------------------------------------------------------------------------------------- */
  /* -- Roboto -- */
  // 숫자, 영문 기본 폰트 (body에 적용)
  // font-weight: 100 300 400 500 700 900
  /* ---------------------------------------------------------------------------------------- */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 100;
    src: local('Roboto Thin'), local('Roboto-Thin'),
      url(${ROBOTO_DIR}/Roboto-Thin.woff2) format('woff2'),
      url(${ROBOTO_DIR}/Roboto-Thin.woff) format('woff'),
      url(${ROBOTO_DIR}/Roboto-Thin.otf) format('opentype');
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: local('Roboto Light'), local('Roboto-Light'),
      url(${ROBOTO_DIR}/Roboto-Light.woff2) format('woff2'),
      url(${ROBOTO_DIR}/Roboto-Light.woff) format('woff'),
      url(${ROBOTO_DIR}/Roboto-Light.otf) format('opentype');
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Regular'), local('Roboto-Regular'),
      url(${ROBOTO_DIR}/Roboto-Regular.woff2) format('woff2'),
      url(${ROBOTO_DIR}/Roboto-Regular.woff) format('woff'),
      url(${ROBOTO_DIR}/Roboto-Regular.otf) format('opentype');
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: local('Roboto Medium'), local('Roboto-Medium'),
      url(${ROBOTO_DIR}/Roboto-Medium.woff2) format('woff2'),
      url(${ROBOTO_DIR}/Roboto-Medium.woff) format('woff'),
      url(${ROBOTO_DIR}/Roboto-Medium.otf) format('opentype');
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    src: local('Roboto Bold'), local('Roboto-Bold'),
      url(${ROBOTO_DIR}/Roboto-Bold.woff2) format('woff2'),
      url(${ROBOTO_DIR}/Roboto-Bold.woff) format('woff'),
      url(${ROBOTO_DIR}/Roboto-Bold.otf) format('opentype');
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    src: local('Roboto Black'), local('Roboto-Black'),
      url(${ROBOTO_DIR}/Roboto-Black.woff2) format('woff2'),
      url(${ROBOTO_DIR}/Roboto-Black.woff) format('woff'),
      url(${ROBOTO_DIR}/Roboto-Black.otf) format('opentype');
  }

  /* ---------------------------------------------------------------------------------------- */
  /* Noto Sans KR */
  // 한글 기본 폰트 ( body에 적용 )
  // font-weight: 100 300 400 500 700 900
  /* ---------------------------------------------------------------------------------------- */
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 100;
    src: url(${NOTOSANS_DIR}/NotoSans-Thin.woff2) format('woff2'),
      url(${NOTOSANS_DIR}/NotoSans-Thin.woff) format('woff'),
      url(${NOTOSANS_DIR}/NotoSans-Thin.otf) format('opentype'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Thin.woff2) format('woff2'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Thin.woff) format('woff'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Thin.otf) format('opentype');
    unicode-range: U+1100-11FF, U+3130-318F, U+A960-A97F, U+AC00-D7A3,
      U+D7B0-D7FF;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 300;
    src: url(${NOTOSANS_DIR}/NotoSans-Light.woff2) format('woff2'),
      url(${NOTOSANS_DIR}/NotoSans-Light.woff) format('woff'),
      url(${NOTOSANS_DIR}/NotoSans-Light.otf) format('opentype'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Light.woff2) format('woff2'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Light.woff) format('woff'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Light.otf) format('opentype');
    unicode-range: U+1100-11FF, U+3130-318F, U+A960-A97F, U+AC00-D7A3,
      U+D7B0-D7FF;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    src: url(${NOTOSANS_DIR}/NotoSans-Regular.woff2) format('woff2'),
      url(${NOTOSANS_DIR}/NotoSans-Regular.woff) format('woff'),
      url(${NOTOSANS_DIR}/NotoSans-Regular.otf) format('opentype'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Regular.woff2) format('woff2'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Regular.woff) format('woff'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Regular.otf) format('opentype');
    unicode-range: U+1100-11FF, U+3130-318F, U+A960-A97F, U+AC00-D7A3,
      U+D7B0-D7FF;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    src: url(${NOTOSANS_DIR}/NotoSans-Medium.woff2) format('woff2'),
      url(${NOTOSANS_DIR}/NotoSans-Medium.woff) format('woff'),
      url(${NOTOSANS_DIR}/NotoSans-Medium.otf) format('opentype'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Medium.woff2) format('woff2'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Medium.woff) format('woff'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Medium.otf) format('opentype');
    unicode-range: U+1100-11FF, U+3130-318F, U+A960-A97F, U+AC00-D7A3,
      U+D7B0-D7FF;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    src: url(${NOTOSANS_DIR}/NotoSans-Bold.woff2) format('woff2'),
      url(${NOTOSANS_DIR}/NotoSans-Bold.woff) format('woff'),
      url(${NOTOSANS_DIR}/NotoSans-Bold.otf) format('opentype'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Bold.woff2) format('woff2'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Bold.woff) format('woff'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Bold.otf) format('opentype');
    unicode-range: U+1100-11FF, U+3130-318F, U+A960-A97F, U+AC00-D7A3,
      U+D7B0-D7FF;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 900;
    src: url(${NOTOSANS_DIR}/NotoSans-Black.woff2) format('woff2'),
      url(${NOTOSANS_DIR}/NotoSans-Black.woff) format('woff'),
      url(${NOTOSANS_DIR}/NotoSans-Black.otf) format('opentype'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Black.woff2) format('woff2'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Black.woff) format('woff'),
      url(${NOTOSANS_REMOTE}/NotoSansKR-Black.otf) format('opentype');
    unicode-range: U+1100-11FF, U+3130-318F, U+A960-A97F, U+AC00-D7A3,
      U+D7B0-D7FF;
  }
`;
/* harmony default export */ const _FontFace = (FontFace);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(20997);
;// CONCATENATED MODULE: ./globalStyles/index.tsx







const globalCSS = react_.css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  body > div:first-of-type,
  div#__next,
  div#__next > div {
    min-height: 100vh;
  }

  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    ${media/* default.xs */.Z.xs} {
      font-size: 14.5px;
    }
    ${media/* default.sm */.Z.sm} {
      font-size: 15px;
    }
    ${media/* default.md */.Z.md} {
      font-size: 15px;
    }
    ${media/* default.lg */.Z.lg} {
      font-size: 15.5px;
    }
    ${media/* default.xl */.Z.xl} {
      font-size: 16px;
    }
    ${media/* default.xxl */.Z.xxl} {
      font-size: 16px;
    }
  }

  body {
    // TODO: 폰트 렌더링 최적화하기
    font-family: 'Noto Sans KR', 'Roboto', 'HelveticaNeue', 'Helvetica Neue',
      sans-serif;
  }
`;

const GlobalStyles = () => /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
  children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Global, {
    styles: _Resets
  }), /*#__PURE__*/jsx_runtime_.jsx(react_.Global, {
    styles: _FontFace
  }), /*#__PURE__*/jsx_runtime_.jsx(react_.Global, {
    styles: globalCSS
  })]
});

/* harmony default export */ const globalStyles = (GlobalStyles);
// EXTERNAL MODULE: ./node_modules/antd/dist/antd.css
var antd = __webpack_require__(54722);
;// CONCATENATED MODULE: ./pages/_app.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







function MyApp({
  Component,
  pageProps
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_swr_.SWRConfig, {
    value: {
      errorRetryCount: 3,
      dedupingInterval: 2000,
      errorRetryInterval: 5000
    },
    children: [/*#__PURE__*/jsx_runtime_.jsx(globalStyles, {}), /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps))]
  });
}

/* harmony default export */ const _app = (MyApp);

/***/ }),

/***/ 54722:
/***/ (() => {



/***/ }),

/***/ 72805:
/***/ ((module) => {

"use strict";
module.exports = require("@emotion/react");

/***/ }),

/***/ 20997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 549:
/***/ ((module) => {

"use strict";
module.exports = require("swr");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [819], () => (__webpack_exec__(35202)));
module.exports = __webpack_exports__;

})();