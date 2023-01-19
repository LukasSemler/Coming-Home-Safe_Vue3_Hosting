try{self["workbox:core:6.5.3"]&&_()}catch{}const N=(a,...e)=>{let t=a;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t},x=N;class l extends Error{constructor(e,t){const s=x(e,t);super(s);this.name=e,this.details=t}}const f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration!="undefined"?registration.scope:""},b=a=>[f.prefix,a,f.suffix].filter(e=>e&&e.length>0).join("-"),E=a=>{for(const e of Object.keys(f))a(e)},C={updateDetails:a=>{E(e=>{typeof a[e]=="string"&&(f[e]=a[e])})},getGoogleAnalyticsName:a=>a||b(f.googleAnalytics),getPrecacheName:a=>a||b(f.precache),getPrefix:()=>f.prefix,getRuntimeName:a=>a||b(f.runtime),getSuffix:()=>f.suffix};function k(a,e){const t=e();return a.waitUntil(t),t}try{self["workbox:precaching:6.5.3"]&&_()}catch{}const v="__WB_REVISION__";function I(a){if(!a)throw new l("add-to-cache-list-unexpected-type",{entry:a});if(typeof a=="string"){const r=new URL(a,location.href);return{cacheKey:r.href,url:r.href}}const{revision:e,url:t}=a;if(!t)throw new l("add-to-cache-list-unexpected-type",{entry:a});if(!e){const r=new URL(t,location.href);return{cacheKey:r.href,url:r.href}}const s=new URL(t,location.href),n=new URL(t,location.href);return s.searchParams.set(v,e),{cacheKey:s.href,url:n.href}}class O{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){const n=t.originalRequest.url;s?this.notUpdatedURLs.push(n):this.updatedURLs.push(n)}return s}}}class M{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:s})=>{const n=(s==null?void 0:s.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return n?new Request(n,{headers:t.headers}):t},this._precacheController=e}}let p;function W(){if(p===void 0){const a=new Response("");if("body"in a)try{new Response(a.body),p=!0}catch{p=!1}p=!1}return p}async function S(a,e){let t=null;if(a.url&&(t=new URL(a.url).origin),t!==self.location.origin)throw new l("cross-origin-copy-response",{origin:t});const s=a.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},r=e?e(n):n,c=W()?s.body:await s.blob();return new Response(c,r)}const D=a=>new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),"");function P(a,e){const t=new URL(a);for(const s of e)t.searchParams.delete(s);return t.href}async function A(a,e,t,s){const n=P(e.url,t);if(e.url===n)return a.match(e,s);const r=Object.assign(Object.assign({},s),{ignoreSearch:!0}),c=await a.keys(e,r);for(const i of c){const o=P(i.url,t);if(n===o)return a.match(i,s)}}class q{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}const H=new Set;async function j(){for(const a of H)await a()}function F(a){return new Promise(e=>setTimeout(e,a))}try{self["workbox:strategies:6.5.3"]&&_()}catch{}function m(a){return typeof a=="string"?new Request(a):a}class B{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new q,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=m(e);if(s.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const c=await t.preloadResponse;if(c)return c}const n=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const c of this.iterateCallbacks("requestWillFetch"))s=await c({request:s.clone(),event:t})}catch(c){if(c instanceof Error)throw new l("plugin-error-request-will-fetch",{thrownErrorMessage:c.message})}const r=s.clone();try{let c;c=await fetch(s,s.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const i of this.iterateCallbacks("fetchDidSucceed"))c=await i({event:t,request:r,response:c});return c}catch(c){throw n&&await this.runCallbacks("fetchDidFail",{error:c,event:t,originalRequest:n.clone(),request:r.clone()}),c}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=m(e);let s;const{cacheName:n,matchOptions:r}=this._strategy,c=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(c,i);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await o({cacheName:n,matchOptions:r,cachedResponse:s,request:c,event:this.event})||void 0;return s}async cachePut(e,t){const s=m(e);await F(0);const n=await this.getCacheKey(s,"write");if(!t)throw new l("cache-put-with-no-response",{url:D(n.url)});const r=await this._ensureResponseSafeToCache(t);if(!r)return!1;const{cacheName:c,matchOptions:i}=this._strategy,o=await self.caches.open(c),h=this.hasCallback("cacheDidUpdate"),g=h?await A(o,n.clone(),["__WB_REVISION__"],i):null;try{await o.put(n,h?r.clone():r)}catch(u){if(u instanceof Error)throw u.name==="QuotaExceededError"&&await j(),u}for(const u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:c,oldResponse:g,newResponse:r.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let n=e;for(const r of this.iterateCallbacks("cacheKeyWillBeUsed"))n=m(await r({mode:t,request:n,event:this.event,params:this.params}));this._cacheKeys[s]=n}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const s=this._pluginStateMap.get(t);yield r=>{const c=Object.assign(Object.assign({},r),{state:s});return t[e](c)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const n of this.iterateCallbacks("cacheWillUpdate"))if(t=await n({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&t.status!==200&&(t=void 0),t}}class ${constructor(e={}){this.cacheName=C.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s=typeof e.request=="string"?new Request(e.request):e.request,n="params"in e?e.params:void 0,r=new B(this,{event:t,request:s,params:n}),c=this._getResponse(r,s,t),i=this._awaitComplete(c,r,s,t);return[c,i]}async _getResponse(e,t,s){await e.runCallbacks("handlerWillStart",{event:s,request:t});let n;try{if(n=await this._handle(t,e),!n||n.type==="error")throw new l("no-response",{url:t.url})}catch(r){if(r instanceof Error){for(const c of e.iterateCallbacks("handlerDidError"))if(n=await c({error:r,event:s,request:t}),n)break}if(!n)throw r}for(const r of e.iterateCallbacks("handlerWillRespond"))n=await r({event:s,request:t,response:n});return n}async _awaitComplete(e,t,s,n){let r,c;try{r=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await t.doneWaiting()}catch(i){i instanceof Error&&(c=i)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:c}),t.destroy(),c)throw c}}class d extends ${constructor(e={}){e.cacheName=C.getPrecacheName(e.cacheName);super(e);this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(d.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;const n=t.params||{};if(this._fallbackToNetwork){const r=n.integrity,c=e.integrity,i=!c||c===r;s=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?c||r:void 0})),r&&i&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,s.clone()))}else throw new l("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new l("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==d.copyRedirectedCacheableResponsesPlugin&&(n===d.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);t===0?this.plugins.push(d.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}d.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:a}){return!a||a.status>=400?null:a}};d.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:a}){return a.redirected?await S(a):a}};class G{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new d({cacheName:C.getPrecacheName(e),plugins:[...t,new M({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const s of e){typeof s=="string"?t.push(s):s&&s.revision===void 0&&t.push(s.url);const{cacheKey:n,url:r}=I(s),c=typeof s!="string"&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(r)&&this._urlsToCacheKeys.get(r)!==n)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(r),secondEntry:n});if(typeof s!="string"&&s.integrity){if(this._cacheKeysToIntegrities.has(n)&&this._cacheKeysToIntegrities.get(n)!==s.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:r});this._cacheKeysToIntegrities.set(n,s.integrity)}if(this._urlsToCacheKeys.set(r,n),this._urlsToCacheModes.set(r,c),t.length>0){const i=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(i)}}}install(e){return k(e,async()=>{const t=new O;this.strategy.plugins.push(t);for(const[r,c]of this._urlsToCacheKeys){const i=this._cacheKeysToIntegrities.get(c),o=this._urlsToCacheModes.get(r),h=new Request(r,{integrity:i,cache:o,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:c},request:h,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}})}activate(e){return k(e,async()=>{const t=await self.caches.open(this.strategy.cacheName),s=await t.keys(),n=new Set(this._urlsToCacheKeys.values()),r=[];for(const c of s)n.has(c.url)||(await t.delete(c),r.push(c.url));return{deletedURLs:r}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new l("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let U;const K=()=>(U||(U=new G),U);try{self["workbox:routing:6.5.3"]&&_()}catch{}const T="GET",R=a=>a&&typeof a=="object"?a:{handle:a};class w{constructor(e,t,s=T){this.handler=R(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=R(e)}}class V extends w{constructor(e,t,s){const n=({url:r})=>{const c=e.exec(r.href);if(!!c&&!(r.origin!==location.origin&&c.index!==0))return c.slice(1)};super(n,t,s)}}class J{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(n=>{typeof n=="string"&&(n=[n]);const r=new Request(...n);return this.handleRequest({request:r,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:c}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=c&&c.handler;const o=e.method;if(!i&&this._defaultHandlerMap.has(o)&&(i=this._defaultHandlerMap.get(o)),!i)return;let h;try{h=i.handle({url:s,request:e,event:t,params:r})}catch(u){h=Promise.reject(u)}const g=c&&c.catchHandler;return h instanceof Promise&&(this._catchHandler||g)&&(h=h.catch(async u=>{if(g)try{return await g.handle({url:s,request:e,event:t,params:r})}catch(L){L instanceof Error&&(u=L)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw u})),h}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const r=this._routes.get(s.method)||[];for(const c of r){let i;const o=c.match({url:e,sameOrigin:t,request:s,event:n});if(o)return i=o,(Array.isArray(i)&&i.length===0||o.constructor===Object&&Object.keys(o).length===0||typeof o=="boolean")&&(i=void 0),{route:c,params:i}}return{}}setDefaultHandler(e,t=T){this._defaultHandlerMap.set(t,R(e))}setCatchHandler(e){this._catchHandler=R(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new l("unregister-route-route-not-registered")}}let y;const Q=()=>(y||(y=new J,y.addFetchListener(),y.addCacheListener()),y);function z(a,e,t){let s;if(typeof a=="string"){const r=new URL(a,location.href),c=({url:i})=>i.href===r.href;s=new w(c,e,t)}else if(a instanceof RegExp)s=new V(a,e,t);else if(typeof a=="function")s=new w(a,e,t);else if(a instanceof w)s=a;else throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return Q().registerRoute(s),s}function X(a,e=[]){for(const t of[...a.searchParams.keys()])e.some(s=>s.test(t))&&a.searchParams.delete(t);return a}function*Y(a,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={}){const r=new URL(a,location.href);r.hash="",yield r.href;const c=X(r,e);if(yield c.href,t&&c.pathname.endsWith("/")){const i=new URL(c.href);i.pathname+=t,yield i.href}if(s){const i=new URL(c.href);i.pathname+=".html",yield i.href}if(n){const i=n({url:r});for(const o of i)yield o.href}}class Z extends w{constructor(e,t){const s=({request:n})=>{const r=e.getURLsToCacheKeys();for(const c of Y(n.url,t)){const i=r.get(c);if(i){const o=e.getIntegrityForCacheKey(i);return{cacheKey:i,integrity:o}}}};super(s,e.strategy)}}function ee(a){const e=K(),t=new Z(e,a);z(t)}const te="-precache-",se=async(a,e=te)=>{const s=(await self.caches.keys()).filter(n=>n.includes(e)&&n.includes(self.registration.scope)&&n!==a);return await Promise.all(s.map(n=>self.caches.delete(n))),s};function ae(){self.addEventListener("activate",a=>{const e=C.getPrecacheName();a.waitUntil(se(e).then(t=>{}))})}function ne(a){K().precache(a)}function re(a,e){ne(a),ee(e)}function ce(){self.addEventListener("activate",()=>self.clients.claim())}ae();re([{"revision":null,"url":"assets/Comp_PW_Vergessen.04b552a8.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.06381ff9.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.067fe552.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.0d35931a.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.173d0ff4.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.17e0d93e.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.2143a1aa.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.26a823f7.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.2a159f64.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.2bd96dd8.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.3910a5b1.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.4359fb1e.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.4a53d301.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.4fcaffb5.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.5175a842.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.530d86c3.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.53a73e28.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.5ad8fd50.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.5f478372.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.61d3f67e.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.6399ecbc.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.6628f4a3.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.6db24551.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.7621b758.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.7d79d746.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.83bbe2a9.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.86b8b132.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.86b8b199.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.888e6e8a.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.911b02e6.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.980e7a7c.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.9dbc6eea.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.9faf7c4c.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.a02eb8c5.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.a4f2f372.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.a81416dc.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.a88f1152.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.ab1ed571.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.af945bed.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.b31fc7e1.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.b8b35ad0.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.bcd96af4.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.c1f4e24c.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.c57e5c7a.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.cd9c0a1e.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.d3150c09.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.d3d6862e.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.d8e7d3b3.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.dc55e32f.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.dcd58266.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.e0dfe4b7.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.e422ada5.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.ea146147.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.ea30ce99.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.f5658b1a.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.f89c1634.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.faa80fe7.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.fb15f7bd.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.fc32bbef.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.ff1b6462.js"},{"revision":null,"url":"assets/index.01062941.js"},{"revision":null,"url":"assets/index.0f36eb94.js"},{"revision":null,"url":"assets/index.13407b55.js"},{"revision":null,"url":"assets/index.14d5f197.js"},{"revision":null,"url":"assets/index.1515881b.js"},{"revision":null,"url":"assets/index.183e1ab6.css"},{"revision":null,"url":"assets/index.23f11d6c.js"},{"revision":null,"url":"assets/index.26a08ae6.js"},{"revision":null,"url":"assets/index.2a657dbd.js"},{"revision":null,"url":"assets/index.2c532fb3.js"},{"revision":null,"url":"assets/index.33bbb024.js"},{"revision":null,"url":"assets/index.359fc084.js"},{"revision":null,"url":"assets/index.396b1362.js"},{"revision":null,"url":"assets/index.3f663347.js"},{"revision":null,"url":"assets/index.3fa84653.js"},{"revision":null,"url":"assets/index.4276250e.js"},{"revision":null,"url":"assets/index.4648fbec.js"},{"revision":null,"url":"assets/index.48d0990f.js"},{"revision":null,"url":"assets/index.4d188d97.js"},{"revision":null,"url":"assets/index.4f54bb6e.js"},{"revision":null,"url":"assets/index.565ca5f5.js"},{"revision":null,"url":"assets/index.56fce70c.css"},{"revision":null,"url":"assets/index.598e3186.js"},{"revision":null,"url":"assets/index.5e858b82.js"},{"revision":null,"url":"assets/index.5fec5803.js"},{"revision":null,"url":"assets/index.60b5dd6e.js"},{"revision":null,"url":"assets/index.622fb630.js"},{"revision":null,"url":"assets/index.645ff98c.js"},{"revision":null,"url":"assets/index.648ae7c7.js"},{"revision":null,"url":"assets/index.669c38a8.js"},{"revision":null,"url":"assets/index.672160f7.css"},{"revision":null,"url":"assets/index.67d357aa.js"},{"revision":null,"url":"assets/index.6d721ff3.js"},{"revision":null,"url":"assets/index.6f10bddf.js"},{"revision":null,"url":"assets/index.6f8ecd59.js"},{"revision":null,"url":"assets/index.730efde5.js"},{"revision":null,"url":"assets/index.75f1239d.js"},{"revision":null,"url":"assets/index.821596dc.js"},{"revision":null,"url":"assets/index.82669bb7.js"},{"revision":null,"url":"assets/index.838511e1.js"},{"revision":null,"url":"assets/index.839e5089.js"},{"revision":null,"url":"assets/index.8e429fee.js"},{"revision":null,"url":"assets/index.90db22ec.js"},{"revision":null,"url":"assets/index.925e3222.js"},{"revision":null,"url":"assets/index.951dd633.js"},{"revision":null,"url":"assets/index.9a71003c.js"},{"revision":null,"url":"assets/index.9b8c0503.js"},{"revision":null,"url":"assets/index.a91c267e.js"},{"revision":null,"url":"assets/index.aabd9294.css"},{"revision":null,"url":"assets/index.b8c2b0b3.js"},{"revision":null,"url":"assets/index.b929ef7c.js"},{"revision":null,"url":"assets/index.bc8dd3ad.js"},{"revision":null,"url":"assets/index.c0779eed.js"},{"revision":null,"url":"assets/index.c24f71f0.js"},{"revision":null,"url":"assets/index.c85004c4.js"},{"revision":null,"url":"assets/index.cbca447c.js"},{"revision":null,"url":"assets/index.df01567f.js"},{"revision":null,"url":"assets/index.dff9e338.js"},{"revision":null,"url":"assets/index.e9fb0a11.js"},{"revision":null,"url":"assets/index.ec5e8a24.css"},{"revision":null,"url":"assets/index.ef79067c.js"},{"revision":null,"url":"assets/index.f4db1142.js"},{"revision":null,"url":"assets/index.f52fea65.js"},{"revision":null,"url":"assets/index.f83a2dd3.js"},{"revision":null,"url":"assets/index.fe4b0687.js"},{"revision":null,"url":"assets/vendor.1b0edbf0.js"},{"revision":null,"url":"assets/vendor.7870df73.js"},{"revision":null,"url":"assets/vendor.cb6128ae.js"},{"revision":null,"url":"assets/vendor.da953d82.js"},{"revision":null,"url":"assets/vendor.ebd414f3.js"},{"revision":"3d5ef2bf867c4054a2f336cdbad9e1dc","url":"css/all.min.css"},{"revision":"a8a42d8e8d27edeb70246160946eac52","url":"index.html"},{"revision":"10166fb746110f724e2d069e2540a7b5","url":"registerSW.js"},{"revision":"a5e532f1894296941e2aadfb4fb98203","url":"sw.js"},{"revision":"0a1a74cf1678ffd224256b8ec1ec0322","url":"workbox-16e0634d.js"},{"revision":"78d2f7723519a9240c91918e822df938","url":"WebsiteIcons/pwa-192x192.png"},{"revision":"382ed1169e8c39561e1ec89fdd08ddaf","url":"WebsiteIcons/pwa-512x512.png"},{"revision":"f80dd6d3ec85c10f0ffea53fc5ca9b94","url":"manifest.webmanifest"}]);self.skipWaiting();ce();self.addEventListener("message",a=>{a.data&&a.data.type==="SKIP_WAITING"&&self.skipWaiting()});self.addEventListener("message",a=>{let{type:e,payload:t}=JSON.parse(a.data);switch(e){case"HelloWorld":console.log("Say, HelloWorld");break}});
