if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let r={};const t=e=>a(e,n),f={module:{uri:n},exports:r,require:t};s[n]=Promise.all(i.map((e=>f[e]||t(e)))).then((e=>(c(...e),r)))}}define(["./workbox-86b73f00"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/README.md",revision:"ea37ebd3097e0e8c037c82a655800f2f"},{url:"/_next/static/NJ9YC5NJ5a5UNZWmCPMKz/_buildManifest.js",revision:"da454704446b6d68df7fbbfd02370266"},{url:"/_next/static/NJ9YC5NJ5a5UNZWmCPMKz/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/NJ9YC5NJ5a5UNZWmCPMKz/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/169-ffb09b811240cd2b.js",revision:"ffb09b811240cd2b"},{url:"/_next/static/chunks/202.b7d6f5dcab21b591.js",revision:"b7d6f5dcab21b591"},{url:"/_next/static/chunks/225-db0c8d5f3da55b2f.js",revision:"db0c8d5f3da55b2f"},{url:"/_next/static/chunks/300.ff96dc4c28b0bf3d.js",revision:"ff96dc4c28b0bf3d"},{url:"/_next/static/chunks/322.8240b8cdfd143af6.js",revision:"8240b8cdfd143af6"},{url:"/_next/static/chunks/339-e610e180d25817b1.js",revision:"e610e180d25817b1"},{url:"/_next/static/chunks/389-194882175f99aa97.js",revision:"194882175f99aa97"},{url:"/_next/static/chunks/468.a11e92b15826fa58.js",revision:"a11e92b15826fa58"},{url:"/_next/static/chunks/540.002be5e9e7cfa8a7.js",revision:"002be5e9e7cfa8a7"},{url:"/_next/static/chunks/612.09bf4b5f014164a0.js",revision:"09bf4b5f014164a0"},{url:"/_next/static/chunks/framework-8a7acd6ca71551f3.js",revision:"8a7acd6ca71551f3"},{url:"/_next/static/chunks/main-55cc3079e12429e2.js",revision:"55cc3079e12429e2"},{url:"/_next/static/chunks/pages/_app-063e09e6374b4b64.js",revision:"063e09e6374b4b64"},{url:"/_next/static/chunks/pages/_error-49660a6b20246f2a.js",revision:"49660a6b20246f2a"},{url:"/_next/static/chunks/pages/about-97d0044ac10758ae.js",revision:"97d0044ac10758ae"},{url:"/_next/static/chunks/pages/blog-ab8604b63253aaef.js",revision:"ab8604b63253aaef"},{url:"/_next/static/chunks/pages/blog/%5Bslug%5D-8ff1b3f1a3a94cf3.js",revision:"8ff1b3f1a3a94cf3"},{url:"/_next/static/chunks/pages/donate-5c3ce5a7c6fffdc8.js",revision:"5c3ce5a7c6fffdc8"},{url:"/_next/static/chunks/pages/experience-647814e5e0dd4ff9.js",revision:"647814e5e0dd4ff9"},{url:"/_next/static/chunks/pages/index-00f584324cb065b6.js",revision:"00f584324cb065b6"},{url:"/_next/static/chunks/pages/projects-87cb43751af6aab0.js",revision:"87cb43751af6aab0"},{url:"/_next/static/chunks/pages/skills-bd0e0af15e3f5da6.js",revision:"bd0e0af15e3f5da6"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-a5b2e87141e7e776.js",revision:"a5b2e87141e7e776"},{url:"/_next/static/css/36736b4da833ba98.css",revision:"36736b4da833ba98"},{url:"/_next/static/css/5ba5a2a9f0c6a1d5.css",revision:"5ba5a2a9f0c6a1d5"},{url:"/_next/static/css/5dc8a78e9da182b3.css",revision:"5dc8a78e9da182b3"},{url:"/_next/static/css/6d175a8f885882e1.css",revision:"6d175a8f885882e1"},{url:"/_next/static/css/728b8f693cf17559.css",revision:"728b8f693cf17559"},{url:"/_next/static/css/7aaf3250aa788413.css",revision:"7aaf3250aa788413"},{url:"/_next/static/css/8740af0bdcd514f6.css",revision:"8740af0bdcd514f6"},{url:"/_next/static/css/8bc60d8e0169ab2f.css",revision:"8bc60d8e0169ab2f"},{url:"/_next/static/css/ddd3b23c112ec859.css",revision:"ddd3b23c112ec859"},{url:"/_next/static/css/f0def8d2588ecd18.css",revision:"f0def8d2588ecd18"},{url:"/apple-touch-icon.png",revision:"7b05ae98e62b1c02cae634569bebde97"},{url:"/favicon-32x32.png",revision:"8cf5d6a0a66e03ff4a30ca85b8d67fa5"},{url:"/favicon.png",revision:"897e7cc14143564e33679464d935b990"},{url:"/icon.png",revision:"65e4b67f020e91e3930dcbf13d56a174"},{url:"/icon_x128.png",revision:"3b5dfa0c843621664e5be82e02953c9d"},{url:"/icon_x192.png",revision:"18187610d409cfd709c5e68c82826af4"},{url:"/icon_x384.png",revision:"8b8fd4543293933901fd3db00bcc2341"},{url:"/icon_x48.png",revision:"61224df4f67ca48a50a912a57acf9798"},{url:"/icon_x512.png",revision:"d030b2b5d35f56db9a2bed96ce5de214"},{url:"/icon_x96.png",revision:"a0497201e9cfa418d821e3b7ae4d5d29"},{url:"/images/agsense.png",revision:"54ea50b367f77450b782fe6ae0c263e8"},{url:"/images/blog/code.jpg",revision:"264ee57cfe4ee1e0585ca83a1de1aef8"},{url:"/images/blog/dark-hex-wp.afphoto",revision:"5e7d3aad6df0d6080a11e79698c0001e"},{url:"/images/blog/dark-hex-wp.jpg",revision:"707b2e5c714a489b127ba1cd409442b4"},{url:"/images/blog/dark-hex-wp.webp",revision:"4f37864f089ccac04a11ca4c6ca6de66"},{url:"/images/blog/light-hex-wp.webp",revision:"6b0b9b331f6810349b37ba158cbbaca5"},{url:"/images/blog/roll20-map.jpg",revision:"5a2dad87dd933405d921c088eb108563"},{url:"/images/ddb.png",revision:"f2755615a67c1f53a2acb595056c9fbb"},{url:"/images/dsu.png",revision:"dff3ce386f5d4fef52f90458deb4235f"},{url:"/images/me-icon.webp",revision:"7128248563c37699402800f71ea57f86"},{url:"/images/me1x.webp",revision:"a9707b23671c53251243ef33ac3b403c"},{url:"/images/me2x.webp",revision:"a0765b50111ee42134a0d04ebf4c51d1"},{url:"/images/me3x.webp",revision:"06a214068dc15795d20589aead3e2c9a"},{url:"/images/me4x.webp",revision:"884594e6981483a63dda860ff810caf6"},{url:"/images/mos.png",revision:"b6ba3ddaed0247fefb41efd0d4bb7e02"},{url:"/images/mti.png",revision:"32a79cc2bdc9858438d3e9d335020c48"},{url:"/images/preview-hex-menu.jpg",revision:"6d8eb680ca41dd4ad5c935282620658a"},{url:"/images/preview-hex-menu2.jpg",revision:"b02f3b48b31322cbd9eb52248760b4e0"},{url:"/images/preview-me.jpg",revision:"39003445dee31c8cd2f2fb926d68ac56"},{url:"/images/preview-me2.jpg",revision:"868189d193c8435b6e6e00da476050e3"},{url:"/images/preview-npm.jpg",revision:"4ffe26a36b2be7d4ab41fdddb476e9c3"},{url:"/images/preview-rpg-schedule.jpg",revision:"e7b57dcf98a5a0d0239c2b1ab0c7f312"},{url:"/images/preview-rpgschedule.jpg",revision:"656a59a47b32c0202af4245807fa7bab"},{url:"/images/preview-spacer.jpg",revision:"d7c246c3cf409658fcfcbb9e467feeb3"},{url:"/images/preview-valley-365.jpg",revision:"096151c56a4fc2a0b157e395475b7fd4"},{url:"/images/udemy.svg",revision:"c98cef897035342d1edfd473d13f041e"},{url:"/images/valmont.jpg",revision:"41ee56243043332c097285754f487f45"},{url:"/manifest.webmanifest",revision:"2e5191e25609cfbedaa29d1ba07b4be5"},{url:"/transparent.png",revision:"7c2491b172183fb7bf32438b5200f2f4"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
