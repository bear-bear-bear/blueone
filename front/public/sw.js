if(!self.define){let s,e={};const o=(o,t)=>(o=new URL(o+".js",t).href,e[o]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=o,s.onload=e,document.head.appendChild(s)}else s=o,importScripts(o),e()})).then((()=>{let s=e[o];if(!s)throw new Error(`Module ${o} didn’t register its module`);return s})));self.define=(t,n)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let a={};const c=s=>o(s,i),r={module:{uri:i},exports:a,require:c};e[i]=Promise.all(t.map((s=>r[s]||c(s)))).then((s=>(n(...s),a)))}}define(["./workbox-1846d813"],(function(s){"use strict";importScripts("fallback-wuszCC3vYqzxRwZjs6ui_.js"),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/static/chunks/208-b5fe6cde78124946.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/249-224c50a950679ad1.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/252f366e-084a9d69dffdbd7a.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/281-86c31d7517ccbe91.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/350-5e235f9e9380a8dd.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/475-1325fc48e681f229.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/647-6f014793c30fc936.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/651.70519a1b23de9131.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/675-e17a243b2dfce569.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/716-810454094aa85aa6.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/744-9aaec0d724c013b5.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/78-cbb1dcca45f248fa.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/7f0c75c1-e2234140452946e0.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/805-b38b3bf02c4c473c.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/d7eeaac4-8140fcb089b4a174.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/framework-dc33c0b5493501f0.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/main-69d1356d41b5b227.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/pages/_app-48565c9bc2a1e46e.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/pages/_error-1c73f16032aa4f7f.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/pages/_offline-303c4575f8b0ca67.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/pages/index-5fc031cf5250210f.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/pages/login-1d4795e4f45e431d.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/pages/temp-807a6a006442158f.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/pages/worker-7805c3910c3fab14.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/pages/worker/notice-8175c2eacca8c66f.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/pages/worker/setting-dddecd60c2605cce.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/chunks/webpack-a8bf1cd0a7451cfe.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/css/056144d866949747.css",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/css/25f385a78be266fa.css",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/css/314775c47723b1fa.css",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/css/4e3aa612aac09ac2.css",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/css/5260e982e7815acc.css",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/css/665d3293701007f1.css",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/css/8d0e9a2730051fc6.css",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/css/8d17a3ae782ca8b8.css",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/css/8fd895fc40ac936d.css",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/css/95ae9eb0000ccae1.css",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/css/e5173f8de510a1af.css",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/wuszCC3vYqzxRwZjs6ui_/_buildManifest.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/wuszCC3vYqzxRwZjs6ui_/_middlewareManifest.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_next/static/wuszCC3vYqzxRwZjs6ui_/_ssgManifest.js",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/_offline",revision:"wuszCC3vYqzxRwZjs6ui_"},{url:"/favicon.ico",revision:"9ade3e63bf4d58e81af3396894eb8aa7"},{url:"/fonts/NotoSans-subset/NotoSans-Black.eot",revision:"dbd5cc437ee73dcc82a9fe11bf978ae5"},{url:"/fonts/NotoSans-subset/NotoSans-Black.otf",revision:"aff1213b31842e487d0c819e8837c368"},{url:"/fonts/NotoSans-subset/NotoSans-Black.woff",revision:"0961c58cc3d39491087853f7cfb259a2"},{url:"/fonts/NotoSans-subset/NotoSans-Black.woff2",revision:"4e7476a09ed213f08995035ddd27ddcb"},{url:"/fonts/NotoSans-subset/NotoSans-Bold.eot",revision:"160e617ab431e6e945fe8186a2e63bb0"},{url:"/fonts/NotoSans-subset/NotoSans-Bold.otf",revision:"e6ee53a57ffdf40754eba4d482b52b65"},{url:"/fonts/NotoSans-subset/NotoSans-Bold.woff",revision:"a123e4ed0d51aa4487d91274a452a981"},{url:"/fonts/NotoSans-subset/NotoSans-Bold.woff2",revision:"c18403ddf95b7cb8dd61b1f2539b11dd"},{url:"/fonts/NotoSans-subset/NotoSans-DemiLight.eot",revision:"53abcd80ce413970f785275539cc3dab"},{url:"/fonts/NotoSans-subset/NotoSans-DemiLight.otf",revision:"3426347778e03cce25b4dcde35ffabc7"},{url:"/fonts/NotoSans-subset/NotoSans-DemiLight.woff",revision:"0cebeac099c6b89e86bdc5a41622181a"},{url:"/fonts/NotoSans-subset/NotoSans-DemiLight.woff2",revision:"01d4df1243276135ff8c79dbdc178f2e"},{url:"/fonts/NotoSans-subset/NotoSans-Light.eot",revision:"39bc3dc0347163b6ddda1d24b334371e"},{url:"/fonts/NotoSans-subset/NotoSans-Light.otf",revision:"30866b9214957b5fa386a220f1ecf998"},{url:"/fonts/NotoSans-subset/NotoSans-Light.woff",revision:"d04dd8702c5cc108a75e99f43ba7fcbb"},{url:"/fonts/NotoSans-subset/NotoSans-Light.woff2",revision:"e67b35e51331f8ea136fa956fa4b594c"},{url:"/fonts/NotoSans-subset/NotoSans-Medium.eot",revision:"57efe8cefcd18f317aee1a426c22d08f"},{url:"/fonts/NotoSans-subset/NotoSans-Medium.otf",revision:"0a5198a63f97cd747e8960b73367c3f5"},{url:"/fonts/NotoSans-subset/NotoSans-Medium.woff",revision:"024dc32a28bc99fe1a3e5f7628989a65"},{url:"/fonts/NotoSans-subset/NotoSans-Medium.woff2",revision:"eb76c0603e9bb040d829fe315211423b"},{url:"/fonts/NotoSans-subset/NotoSans-Regular.eot",revision:"0589d1a2545498ab34da041416b4a3a9"},{url:"/fonts/NotoSans-subset/NotoSans-Regular.otf",revision:"49c56daa4f52da2c09465803c7cfdff1"},{url:"/fonts/NotoSans-subset/NotoSans-Regular.woff",revision:"53e1309e4fc9372afba4fd8f872a7aa5"},{url:"/fonts/NotoSans-subset/NotoSans-Regular.woff2",revision:"4e2910267e88d635a5b26172ee62786a"},{url:"/fonts/NotoSans-subset/NotoSans-Thin.eot",revision:"ed7fd4d82bb717d78350ff60a9e6261d"},{url:"/fonts/NotoSans-subset/NotoSans-Thin.otf",revision:"41773ad959625a5b68efc3a9f4856801"},{url:"/fonts/NotoSans-subset/NotoSans-Thin.woff",revision:"7adb7d46ce6f8afd982e430b90c52619"},{url:"/fonts/NotoSans-subset/NotoSans-Thin.woff2",revision:"5b87b6725168ebf12d4837da4848962b"},{url:"/fonts/NotoSans-subset/README.md",revision:"8db21d4aff4d6e3618f37772a17ae042"},{url:"/fonts/NotoSans-subset/korean2350.txt",revision:"c898f932c81e09d5a617231cbde4825d"},{url:"/fonts/Roboto-subset/README.md",revision:"cd4050db17cd1d87965bee20959128cf"},{url:"/fonts/Roboto-subset/Roboto-Black.eot",revision:"633bc89ec588af9281baf7757359e145"},{url:"/fonts/Roboto-subset/Roboto-Black.ttf",revision:"19f994d42e795fe58feb293580919c27"},{url:"/fonts/Roboto-subset/Roboto-Black.woff",revision:"ed053c057f7dd0c90bbed8e45178f729"},{url:"/fonts/Roboto-subset/Roboto-Black.woff2",revision:"d449f4a228a4fb94df76c7fbb6fa12cb"},{url:"/fonts/Roboto-subset/Roboto-Bold.eot",revision:"189b1a3af30e5111ae049daee6c525d9"},{url:"/fonts/Roboto-subset/Roboto-Bold.ttf",revision:"3d154e98c4396ec69ed62ef76eaaf3a7"},{url:"/fonts/Roboto-subset/Roboto-Bold.woff",revision:"d6fdc448ac6fbb5bfd7a1bf3b4f278c4"},{url:"/fonts/Roboto-subset/Roboto-Bold.woff2",revision:"48ad639a521f61b8165aa7aa62eae16e"},{url:"/fonts/Roboto-subset/Roboto-Light.eot",revision:"05458dfb3dadee90e4dcbdbc0499512a"},{url:"/fonts/Roboto-subset/Roboto-Light.ttf",revision:"6e6abf5d6bd20361df458586e9f1e105"},{url:"/fonts/Roboto-subset/Roboto-Light.woff",revision:"7a4fc7764d8c57c84e77078e31efded0"},{url:"/fonts/Roboto-subset/Roboto-Light.woff2",revision:"3b91604f10f7252153322f3f8ba338f7"},{url:"/fonts/Roboto-subset/Roboto-Medium.eot",revision:"a4e561ae97ee45f3bb4760aa6019f335"},{url:"/fonts/Roboto-subset/Roboto-Medium.ttf",revision:"93279d2151850ddeb8c4b700ae754bd5"},{url:"/fonts/Roboto-subset/Roboto-Medium.woff",revision:"a832c92ae1c7c486f1a45feba1a80c42"},{url:"/fonts/Roboto-subset/Roboto-Medium.woff2",revision:"bd2ea24013d5823617e2434adb2debf0"},{url:"/fonts/Roboto-subset/Roboto-Regular.eot",revision:"64a8b344dff9b1fd739b18c0f4a435dc"},{url:"/fonts/Roboto-subset/Roboto-Regular.ttf",revision:"0e97a2dd373c05a1595a3c63bee2098f"},{url:"/fonts/Roboto-subset/Roboto-Regular.woff",revision:"ac2aecfd8fbcff3824f066ce7df71f9b"},{url:"/fonts/Roboto-subset/Roboto-Regular.woff2",revision:"9636bacf7ca70eb9134e75c00226b4dc"},{url:"/fonts/Roboto-subset/Roboto-Thin.eot",revision:"7a10de7a86fed689e0147c0486af770b"},{url:"/fonts/Roboto-subset/Roboto-Thin.ttf",revision:"08f8047dc120cb30ded5138b36cd724d"},{url:"/fonts/Roboto-subset/Roboto-Thin.woff",revision:"2b63bb3edd0b3fb7396f23d08e933550"},{url:"/fonts/Roboto-subset/Roboto-Thin.woff2",revision:"6948f3eb387d1566cc6eea889ac02e29"},{url:"/fonts/Roboto-subset/Roboto-ThinItalic.eot",revision:"343e3383f88d7d95cefb056d5c27f7d9"},{url:"/fonts/Roboto-subset/Roboto-ThinItalic.ttf",revision:"542506658e68b80d782584a6c9813161"},{url:"/fonts/Roboto-subset/Roboto-ThinItalic.woff",revision:"fc67951f43f85351ca62afc2e4dbe6f0"},{url:"/fonts/Roboto-subset/Roboto-ThinItalic.woff2",revision:"4e917a4a384ba5823db5035c39efb82f"},{url:"/icon_empty.svg",revision:"7e115c8082dfaf270dd828a8bd2104ac"},{url:"/icon_fill.svg",revision:"83efb78cb59d29bf10216473c17bb175"},{url:"/icon_white.svg",revision:"4578d9278ab3e69f23bdcee5cf6ddf9c"},{url:"/logo_fill.svg",revision:"07774c8669e645779a165adcb0cf9114"},{url:"/logo_white.svg",revision:"f2f18679dab91d41c8174b5e84a8e645"},{url:"/manifest.json",revision:"45361dd4b6449d467fc07f7fa4bbb395"},{url:"/preloader.gif",revision:"c86c97083562ba05bf3ba71b615d1f95"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:o,state:t})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e},{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET")}));
