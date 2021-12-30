"use strict";
exports.id = 57;
exports.ids = [57];
exports.modules = {

/***/ 62:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Layout)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(16689);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(41664);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(71853);
// EXTERNAL MODULE: external "react-icons/ai"
var ai_ = __webpack_require__(99847);
// EXTERNAL MODULE: external "@emotion/styled"
var styled_ = __webpack_require__(81480);
var styled_default = /*#__PURE__*/__webpack_require__.n(styled_);
// EXTERNAL MODULE: ./utils/media.ts
var media = __webpack_require__(91819);
;// CONCATENATED MODULE: ./components/User/Layout/styles.tsx


const CenterLayout = (styled_default()).section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BOX_ITEM_PADDING = '0.66rem 1rem';
const Box = (styled_default()).section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #141414;

  ${media/* default.sm */.Z.sm} {
    border: 1px solid #ddd;
    border-radius: 2px;
    width: 27rem;
  }
`;
const BoxHeader = (styled_default()).header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.33rem;
  padding: ${BOX_ITEM_PADDING};
  padding-top: 1rem;
  gap: 1rem;

  h1 {
    font-size: 1.1rem;
    font-weight: 300;
    color: #fff;
  }
`;
const BoxMain = (styled_default()).main`
  flex: 1;
  padding: ${({
  noPadding
}) => noPadding ? 'initial' : BOX_ITEM_PADDING};
  position: relative;
`;
const BoxFooter = (styled_default()).footer`
  nav {
    display: flex;
    justify-content: space-between;
    padding: ${BOX_ITEM_PADDING};
    background-color: #000;
  }
`;
const ActiveAnchor = (styled_default()).a`
  flex: 1;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  gap: 0.33rem;
  color: ${({
  active
}) => active ? '#fff' : '#aaa'} !important;

  p {
    font-size: 10px;
    font-weight: 100;
  }
`;
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(20997);
;// CONCATENATED MODULE: ./components/User/Layout/index.tsx







const navItems = [{
  href: '/worker',
  outlineIcon: /*#__PURE__*/jsx_runtime_.jsx(ai_.AiOutlineCar, {
    size: 20
  }),
  fillIcon: /*#__PURE__*/jsx_runtime_.jsx(ai_.AiFillCar, {
    size: 20
  }),
  text: '업무'
}, {
  href: '/worker/notice',
  outlineIcon: /*#__PURE__*/jsx_runtime_.jsx(ai_.AiOutlineNotification, {
    size: 20
  }),
  fillIcon: /*#__PURE__*/jsx_runtime_.jsx(ai_.AiFillNotification, {
    size: 20
  }),
  text: '공지사항'
}, {
  href: '/worker/setting',
  outlineIcon: /*#__PURE__*/jsx_runtime_.jsx(ai_.AiOutlineSetting, {
    size: 20
  }),
  fillIcon: /*#__PURE__*/jsx_runtime_.jsx(ai_.AiFillSetting, {
    size: 20
  }),
  text: '설정'
}];

const ActiveLink = ({
  item,
  active
}) => /*#__PURE__*/jsx_runtime_.jsx(next_link["default"], {
  href: item.href,
  passHref: true,
  children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(ActiveAnchor, {
    active: active,
    children: [active ? item.fillIcon : item.outlineIcon, /*#__PURE__*/jsx_runtime_.jsx("p", {
      children: item.text
    })]
  })
});

const UserLayout = ({
  children,
  bodyNoPadding
}) => {
  const router = (0,router_.useRouter)();
  const headerText = (0,external_react_.useMemo)(() => navItems.find(item => item.href === router.asPath).text, [router.asPath]);
  return /*#__PURE__*/jsx_runtime_.jsx(CenterLayout, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(Box, {
      children: [/*#__PURE__*/jsx_runtime_.jsx(BoxHeader, {
        children: /*#__PURE__*/jsx_runtime_.jsx("h1", {
          children: headerText
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(BoxMain, {
        noPadding: bodyNoPadding,
        children: children
      }), /*#__PURE__*/jsx_runtime_.jsx(BoxFooter, {
        children: /*#__PURE__*/jsx_runtime_.jsx("nav", {
          children: navItems.map(item => /*#__PURE__*/jsx_runtime_.jsx(ActiveLink, {
            item: item,
            active: item.href === router.asPath
          }, item.href))
        })
      })]
    })
  });
};

/* harmony default export */ const Layout = (UserLayout);

/***/ })

};
;