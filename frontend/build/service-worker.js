if(!self.define){let e,i={};const r=(r,n)=>(r=new URL(r+".js",n).href,i[r]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=i,document.head.appendChild(e)}else e=r,importScripts(r),i()})).then((()=>{let e=i[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(n,s)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(i[l])return;let o={};const c=e=>r(e,l),u={module:{uri:l},exports:o,require:c};i[l]=Promise.all(n.map((e=>u[e]||c(e)))).then((e=>(s(...e),o)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"frontend"}),self.skipWaiting(),e.precacheAndRoute([{url:"android-chrome-192x192.png",revision:"9122adb482f551a3569150ff60dba556"},{url:"android-chrome-512x512.png",revision:"7166d4711cc614c1fa6a7558694269c7"},{url:"apple-touch-icon.png",revision:"76cb69c22d8955939f3acd38a3bbcd39"},{url:"browserconfig.xml",revision:"3330dfb6fbaf85364922089e80911e32"},{url:"css/app.489b834e.css",revision:null},{url:"css/chunk-vendors.6327e3f3.css",revision:null},{url:"favicon-16x16.png",revision:"26a4501492f56aebbb97938b2deedf0c"},{url:"favicon-32x32.png",revision:"cf3a30273504ffd4bc6af481c49884ca"},{url:"img/Header-Image.913b3d31.webp",revision:null},{url:"img/car-image.3a6cc712.svg",revision:null},{url:"img/order-image.8e9dee7e.svg",revision:null},{url:"img/search-image.9bc20ebc.svg",revision:null},{url:"img/semi_androidMyCargonautmdpi.722aa426.png",revision:null},{url:"img/tracking-image.0350533f.svg",revision:null},{url:"index.html",revision:"63150fa9254facbd576e3c1d83bfe102"},{url:"js/243.423b802a.js",revision:null},{url:"js/431.6e784723.js",revision:null},{url:"js/633.aac2b928.js",revision:null},{url:"js/858.549e6d85.js",revision:null},{url:"js/93.23def817.js",revision:null},{url:"js/app.35cc92b0.js",revision:null},{url:"js/chunk-vendors.3adfb042.js",revision:null},{url:"manifest.json",revision:"4b14c64efaf846819b9a229b4193c8b7"},{url:"mstile-150x150.png",revision:"23c8c687ae21c6c15cdd1e2739ce3b10"},{url:"robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"},{url:"safari-pinned-tab.svg",revision:"904f71f13a649091c496111179f2d0d1"},{url:"site.webmanifest",revision:"e998dbd06054f987862b5d4606d05047"}],{})}));
//# sourceMappingURL=service-worker.js.map
