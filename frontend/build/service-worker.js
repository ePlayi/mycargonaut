if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,n)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(i[l])return;let o={};const u=e=>s(e,l),c={module:{uri:l},exports:o,require:u};i[l]=Promise.all(r.map((e=>c[e]||u(e)))).then((e=>(n(...e),o)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"frontend"}),self.skipWaiting(),e.precacheAndRoute([{url:"css/app.14059c9a.css",revision:null},{url:"css/chunk-vendors.6327e3f3.css",revision:null},{url:"img/Header-Image.913b3d31.webp",revision:null},{url:"img/car-image.3a6cc712.svg",revision:null},{url:"img/order-image.8e9dee7e.svg",revision:null},{url:"img/search-image.9bc20ebc.svg",revision:null},{url:"img/semi_androidMyCargonautmdpi.722aa426.png",revision:null},{url:"img/tracking-image.0350533f.svg",revision:null},{url:"index.html",revision:"1dfb5d958b112bddc56293a072aa00d5"},{url:"js/243.423b802a.js",revision:null},{url:"js/431.6e784723.js",revision:null},{url:"js/633.aac2b928.js",revision:null},{url:"js/858.549e6d85.js",revision:null},{url:"js/93.23def817.js",revision:null},{url:"js/app.5ae7b25b.js",revision:null},{url:"js/chunk-vendors.17526fc2.js",revision:null},{url:"manifest.json",revision:"4b14c64efaf846819b9a229b4193c8b7"},{url:"robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
