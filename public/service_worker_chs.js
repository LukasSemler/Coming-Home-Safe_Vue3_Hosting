try{self["workbox:core:6.5.3"]&&_()}catch{}const v=(a,...e)=>{let t=a;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t},E=v;class l extends Error{constructor(e,t){const s=E(e,t);super(s);this.name=e,this.details=t}}const d={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration!="undefined"?registration.scope:""},U=a=>[d.prefix,a,d.suffix].filter(e=>e&&e.length>0).join("-"),S=a=>{for(const e of Object.keys(d))a(e)},k={updateDetails:a=>{S(e=>{typeof a[e]=="string"&&(d[e]=a[e])})},getGoogleAnalyticsName:a=>a||U(d.googleAnalytics),getPrecacheName:a=>a||U(d.precache),getPrefix:()=>d.prefix,getRuntimeName:a=>a||U(d.runtime),getSuffix:()=>d.suffix};function K(a,e){const t=e();return a.waitUntil(t),t}try{self["workbox:precaching:6.5.3"]&&_()}catch{}const I="__WB_REVISION__";function x(a){if(!a)throw new l("add-to-cache-list-unexpected-type",{entry:a});if(typeof a=="string"){const r=new URL(a,location.href);return{cacheKey:r.href,url:r.href}}const{revision:e,url:t}=a;if(!t)throw new l("add-to-cache-list-unexpected-type",{entry:a});if(!e){const r=new URL(t,location.href);return{cacheKey:r.href,url:r.href}}const s=new URL(t,location.href),n=new URL(t,location.href);return s.searchParams.set(I,e),{cacheKey:s.href,url:n.href}}class M{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){const n=t.originalRequest.url;s?this.notUpdatedURLs.push(n):this.updatedURLs.push(n)}return s}}}class W{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:s})=>{const n=(s==null?void 0:s.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return n?new Request(n,{headers:t.headers}):t},this._precacheController=e}}let y;function A(){if(y===void 0){const a=new Response("");if("body"in a)try{new Response(a.body),y=!0}catch{y=!1}y=!1}return y}async function D(a,e){let t=null;if(a.url&&(t=new URL(a.url).origin),t!==self.location.origin)throw new l("cross-origin-copy-response",{origin:t});const s=a.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},r=e?e(n):n,c=A()?s.body:await s.blob();return new Response(c,r)}const q=a=>new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),"");function N(a,e){const t=new URL(a);for(const s of e)t.searchParams.delete(s);return t.href}async function F(a,e,t,s){const n=N(e.url,t);if(e.url===n)return a.match(e,s);const r=Object.assign(Object.assign({},s),{ignoreSearch:!0}),c=await a.keys(e,r);for(const i of c){const o=N(i.url,t);if(n===o)return a.match(i,s)}}class j{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}const H=new Set;async function B(){for(const a of H)await a()}function $(a){return new Promise(e=>setTimeout(e,a))}try{self["workbox:strategies:6.5.3"]&&_()}catch{}function R(a){return typeof a=="string"?new Request(a):a}class J{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new j,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=R(e);if(s.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const c=await t.preloadResponse;if(c)return c}const n=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const c of this.iterateCallbacks("requestWillFetch"))s=await c({request:s.clone(),event:t})}catch(c){if(c instanceof Error)throw new l("plugin-error-request-will-fetch",{thrownErrorMessage:c.message})}const r=s.clone();try{let c;c=await fetch(s,s.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const i of this.iterateCallbacks("fetchDidSucceed"))c=await i({event:t,request:r,response:c});return c}catch(c){throw n&&await this.runCallbacks("fetchDidFail",{error:c,event:t,originalRequest:n.clone(),request:r.clone()}),c}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=R(e);let s;const{cacheName:n,matchOptions:r}=this._strategy,c=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(c,i);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await o({cacheName:n,matchOptions:r,cachedResponse:s,request:c,event:this.event})||void 0;return s}async cachePut(e,t){const s=R(e);await $(0);const n=await this.getCacheKey(s,"write");if(!t)throw new l("cache-put-with-no-response",{url:q(n.url)});const r=await this._ensureResponseSafeToCache(t);if(!r)return!1;const{cacheName:c,matchOptions:i}=this._strategy,o=await self.caches.open(c),h=this.hasCallback("cacheDidUpdate"),p=h?await F(o,n.clone(),["__WB_REVISION__"],i):null;try{await o.put(n,h?r.clone():r)}catch(u){if(u instanceof Error)throw u.name==="QuotaExceededError"&&await B(),u}for(const u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:c,oldResponse:p,newResponse:r.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let n=e;for(const r of this.iterateCallbacks("cacheKeyWillBeUsed"))n=R(await r({mode:t,request:n,event:this.event,params:this.params}));this._cacheKeys[s]=n}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const s=this._pluginStateMap.get(t);yield r=>{const c=Object.assign(Object.assign({},r),{state:s});return t[e](c)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const n of this.iterateCallbacks("cacheWillUpdate"))if(t=await n({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&t.status!==200&&(t=void 0),t}}class G{constructor(e={}){this.cacheName=k.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s=typeof e.request=="string"?new Request(e.request):e.request,n="params"in e?e.params:void 0,r=new J(this,{event:t,request:s,params:n}),c=this._getResponse(r,s,t),i=this._awaitComplete(c,r,s,t);return[c,i]}async _getResponse(e,t,s){await e.runCallbacks("handlerWillStart",{event:s,request:t});let n;try{if(n=await this._handle(t,e),!n||n.type==="error")throw new l("no-response",{url:t.url})}catch(r){if(r instanceof Error){for(const c of e.iterateCallbacks("handlerDidError"))if(n=await c({error:r,event:s,request:t}),n)break}if(!n)throw r}for(const r of e.iterateCallbacks("handlerWillRespond"))n=await r({event:s,request:t,response:n});return n}async _awaitComplete(e,t,s,n){let r,c;try{r=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await t.doneWaiting()}catch(i){i instanceof Error&&(c=i)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:c}),t.destroy(),c)throw c}}class g extends G{constructor(e={}){e.cacheName=k.getPrecacheName(e.cacheName);super(e);this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(g.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;const n=t.params||{};if(this._fallbackToNetwork){const r=n.integrity,c=e.integrity,i=!c||c===r;s=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?c||r:void 0})),r&&i&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,s.clone()))}else throw new l("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new l("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==g.copyRedirectedCacheableResponsesPlugin&&(n===g.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);t===0?this.plugins.push(g.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}g.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:a}){return!a||a.status>=400?null:a}};g.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:a}){return a.redirected?await D(a):a}};class V{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new g({cacheName:k.getPrecacheName(e),plugins:[...t,new W({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const s of e){typeof s=="string"?t.push(s):s&&s.revision===void 0&&t.push(s.url);const{cacheKey:n,url:r}=x(s),c=typeof s!="string"&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(r)&&this._urlsToCacheKeys.get(r)!==n)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(r),secondEntry:n});if(typeof s!="string"&&s.integrity){if(this._cacheKeysToIntegrities.has(n)&&this._cacheKeysToIntegrities.get(n)!==s.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:r});this._cacheKeysToIntegrities.set(n,s.integrity)}if(this._urlsToCacheKeys.set(r,n),this._urlsToCacheModes.set(r,c),t.length>0){const i=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(i)}}}install(e){return K(e,async()=>{const t=new M;this.strategy.plugins.push(t);for(const[r,c]of this._urlsToCacheKeys){const i=this._cacheKeysToIntegrities.get(c),o=this._urlsToCacheModes.get(r),h=new Request(r,{integrity:i,cache:o,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:c},request:h,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}})}activate(e){return K(e,async()=>{const t=await self.caches.open(this.strategy.cacheName),s=await t.keys(),n=new Set(this._urlsToCacheKeys.values()),r=[];for(const c of s)n.has(c.url)||(await t.delete(c),r.push(c.url));return{deletedURLs:r}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new l("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let L;const T=()=>(L||(L=new V),L);try{self["workbox:routing:6.5.3"]&&_()}catch{}const O="GET",b=a=>a&&typeof a=="object"?a:{handle:a};class m{constructor(e,t,s=O){this.handler=b(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=b(e)}}class Q extends m{constructor(e,t,s){const n=({url:r})=>{const c=e.exec(r.href);if(!!c&&!(r.origin!==location.origin&&c.index!==0))return c.slice(1)};super(n,t,s)}}class z{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(n=>{typeof n=="string"&&(n=[n]);const r=new Request(...n);return this.handleRequest({request:r,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:c}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=c&&c.handler;const o=e.method;if(!i&&this._defaultHandlerMap.has(o)&&(i=this._defaultHandlerMap.get(o)),!i)return;let h;try{h=i.handle({url:s,request:e,event:t,params:r})}catch(u){h=Promise.reject(u)}const p=c&&c.catchHandler;return h instanceof Promise&&(this._catchHandler||p)&&(h=h.catch(async u=>{if(p)try{return await p.handle({url:s,request:e,event:t,params:r})}catch(P){P instanceof Error&&(u=P)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw u})),h}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const r=this._routes.get(s.method)||[];for(const c of r){let i;const o=c.match({url:e,sameOrigin:t,request:s,event:n});if(o)return i=o,(Array.isArray(i)&&i.length===0||o.constructor===Object&&Object.keys(o).length===0||typeof o=="boolean")&&(i=void 0),{route:c,params:i}}return{}}setDefaultHandler(e,t=O){this._defaultHandlerMap.set(t,b(e))}setCatchHandler(e){this._catchHandler=b(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new l("unregister-route-route-not-registered")}}let w;const X=()=>(w||(w=new z,w.addFetchListener(),w.addCacheListener()),w);function Y(a,e,t){let s;if(typeof a=="string"){const r=new URL(a,location.href),c=({url:i})=>i.href===r.href;s=new m(c,e,t)}else if(a instanceof RegExp)s=new Q(a,e,t);else if(typeof a=="function")s=new m(a,e,t);else if(a instanceof m)s=a;else throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return X().registerRoute(s),s}function Z(a,e=[]){for(const t of[...a.searchParams.keys()])e.some(s=>s.test(t))&&a.searchParams.delete(t);return a}function*ee(a,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={}){const r=new URL(a,location.href);r.hash="",yield r.href;const c=Z(r,e);if(yield c.href,t&&c.pathname.endsWith("/")){const i=new URL(c.href);i.pathname+=t,yield i.href}if(s){const i=new URL(c.href);i.pathname+=".html",yield i.href}if(n){const i=n({url:r});for(const o of i)yield o.href}}class te extends m{constructor(e,t){const s=({request:n})=>{const r=e.getURLsToCacheKeys();for(const c of ee(n.url,t)){const i=r.get(c);if(i){const o=e.getIntegrityForCacheKey(i);return{cacheKey:i,integrity:o}}}};super(s,e.strategy)}}function se(a){const e=T(),t=new te(e,a);Y(t)}const ae="-precache-",ne=async(a,e=ae)=>{const s=(await self.caches.keys()).filter(n=>n.includes(e)&&n.includes(self.registration.scope)&&n!==a);return await Promise.all(s.map(n=>self.caches.delete(n))),s};function re(){self.addEventListener("activate",a=>{const e=k.getPrecacheName();a.waitUntil(ne(e).then(t=>{}))})}function ce(a){T().precache(a)}function ie(a,e){ce(a),se(e)}function oe(){self.addEventListener("activate",()=>self.clients.claim())}re();ie([{"revision":null,"url":"assets/Comp_PW_Vergessen.0222cc96.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.028f2c15.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.061f1ee0.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.09d55cc2.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.0f248d75.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.0fdde3be.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.15df1328.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.16f45195.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.1a88d9d7.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.1edae75b.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.1fbc8359.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.245bdd17.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.26cd4895.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.2783aaaf.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.2978f977.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.2abe1854.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.2e5d8e2d.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.30a7b2cb.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.32559984.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.36c86876.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.38b1c50f.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.39872d95.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.3c8af46d.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.3d269f2d.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.40cdda35.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.417aef63.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.449c0d2c.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.4a025d2f.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.4a90ef61.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.4d4a1a3a.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.4f3ec2f0.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.567a1cec.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.568676ce.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.57b21cb9.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.5a14477c.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.5fd9d841.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.6006a3f8.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.60532ce9.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.64059117.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.654420c1.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.673bc2cc.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.6759ba19.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.69d240e2.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.6dbd2dbe.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.6e3cb9e0.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.733b262f.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.7387e0de.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.7397d01c.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.763aa18a.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.7667da6b.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.7943abd1.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.7a1b0138.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.7e95796d.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.802eaea3.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.8385ebfb.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.8644fc69.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.88725d0a.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.8899ccf5.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.8d4c4153.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.8e77dbb9.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.8e7ad81a.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.9110eb21.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.916304ef.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.91c94268.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.9604ef69.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.9924890b.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.9bc6dac5.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.9bd43f71.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.9d0bd9b9.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.9eeff9ee.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.9f5e9cb4.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.a1649656.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.a4b1d8ea.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.a4cc24b9.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.a709c4b8.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.adb09eda.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.b05350d6.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.b20cb7a1.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.b32d1f9e.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.b3ae5002.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.b80c8f41.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.b99f1a23.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.b9e306f1.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.baaf3088.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.bae493c2.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.bc306593.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.c1f4a681.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.c3942df8.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.c4158e4d.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.c973c947.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.cb68a02e.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.d17f1b37.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.d2f37580.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.d3daabc0.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.d4e36690.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.d7bb683a.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.d81083ff.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.daee5960.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.dbb7f137.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.dc458b5c.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.dfd03c33.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.e0c364a9.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.e3a908f4.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.e74965c6.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.e88befac.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.e893e0a7.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.e9e1d45d.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.e9ff8cda.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.ea06e78b.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.eac92b02.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.eae07398.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.ee2c62b9.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.f2c3e01e.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.f56a42b2.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.f7c096b2.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.f9432073.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.fac5d9c1.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.fe9e44c4.js"},{"revision":null,"url":"assets/index.04e857db.js"},{"revision":null,"url":"assets/index.0607d431.js"},{"revision":null,"url":"assets/index.07cee0f5.css"},{"revision":null,"url":"assets/index.093dcf05.js"},{"revision":null,"url":"assets/index.096fb843.js"},{"revision":null,"url":"assets/index.0a37de80.js"},{"revision":null,"url":"assets/index.0b3fade5.js"},{"revision":null,"url":"assets/index.0c3a7754.js"},{"revision":null,"url":"assets/index.0f39f055.js"},{"revision":null,"url":"assets/index.112a1c83.js"},{"revision":null,"url":"assets/index.11e2e6d0.js"},{"revision":null,"url":"assets/index.13d3d1cb.js"},{"revision":null,"url":"assets/index.13d7083c.js"},{"revision":null,"url":"assets/index.14f015c4.js"},{"revision":null,"url":"assets/index.1732a62f.js"},{"revision":null,"url":"assets/index.174f39fd.js"},{"revision":null,"url":"assets/index.1ee5ad42.js"},{"revision":null,"url":"assets/index.1f57b0e4.js"},{"revision":null,"url":"assets/index.1feffd4d.js"},{"revision":null,"url":"assets/index.22ad9c07.css"},{"revision":null,"url":"assets/index.248c5227.js"},{"revision":null,"url":"assets/index.280ac8f7.js"},{"revision":null,"url":"assets/index.2a01f4c2.js"},{"revision":null,"url":"assets/index.2ca51b45.js"},{"revision":null,"url":"assets/index.2dc1b736.js"},{"revision":null,"url":"assets/index.3114689a.js"},{"revision":null,"url":"assets/index.31e70cda.js"},{"revision":null,"url":"assets/index.368e722d.js"},{"revision":null,"url":"assets/index.36ef189f.js"},{"revision":null,"url":"assets/index.3aeeaaf9.js"},{"revision":null,"url":"assets/index.3b888347.js"},{"revision":null,"url":"assets/index.422fa9a6.js"},{"revision":null,"url":"assets/index.434805d4.js"},{"revision":null,"url":"assets/index.44a18c30.js"},{"revision":null,"url":"assets/index.455703f3.js"},{"revision":null,"url":"assets/index.476470d7.js"},{"revision":null,"url":"assets/index.489d51e6.js"},{"revision":null,"url":"assets/index.4a2b0bba.css"},{"revision":null,"url":"assets/index.4f4f5691.js"},{"revision":null,"url":"assets/index.51a48787.js"},{"revision":null,"url":"assets/index.51d8d024.js"},{"revision":null,"url":"assets/index.579f3fd1.js"},{"revision":null,"url":"assets/index.58e01fbe.js"},{"revision":null,"url":"assets/index.596aba7c.js"},{"revision":null,"url":"assets/index.59e5e112.js"},{"revision":null,"url":"assets/index.5b838e56.js"},{"revision":null,"url":"assets/index.5c92d089.js"},{"revision":null,"url":"assets/index.5d0544b0.js"},{"revision":null,"url":"assets/index.5e880f89.js"},{"revision":null,"url":"assets/index.5f4732a5.js"},{"revision":null,"url":"assets/index.5fd7af0f.js"},{"revision":null,"url":"assets/index.61128661.js"},{"revision":null,"url":"assets/index.671a08a9.js"},{"revision":null,"url":"assets/index.6d5c398d.js"},{"revision":null,"url":"assets/index.6daa1f14.js"},{"revision":null,"url":"assets/index.6ee6f746.js"},{"revision":null,"url":"assets/index.6f5e29f1.css"},{"revision":null,"url":"assets/index.71cb9c6e.js"},{"revision":null,"url":"assets/index.7254945d.js"},{"revision":null,"url":"assets/index.74fc0c40.js"},{"revision":null,"url":"assets/index.79791dde.js"},{"revision":null,"url":"assets/index.797d349f.js"},{"revision":null,"url":"assets/index.7bac2433.js"},{"revision":null,"url":"assets/index.7c6dce76.css"},{"revision":null,"url":"assets/index.803568f4.js"},{"revision":null,"url":"assets/index.80b0cd20.js"},{"revision":null,"url":"assets/index.858927b7.js"},{"revision":null,"url":"assets/index.8657dac4.js"},{"revision":null,"url":"assets/index.86ff3717.js"},{"revision":null,"url":"assets/index.880e49a9.js"},{"revision":null,"url":"assets/index.89fe4d27.js"},{"revision":null,"url":"assets/index.8a82070d.js"},{"revision":null,"url":"assets/index.8ed13177.js"},{"revision":null,"url":"assets/index.8f6d8274.js"},{"revision":null,"url":"assets/index.9061ebe7.css"},{"revision":null,"url":"assets/index.90ec4f8b.css"},{"revision":null,"url":"assets/index.92903dd2.js"},{"revision":null,"url":"assets/index.9401f037.js"},{"revision":null,"url":"assets/index.9a2a9a00.js"},{"revision":null,"url":"assets/index.9b96cfb9.js"},{"revision":null,"url":"assets/index.9d1a655e.js"},{"revision":null,"url":"assets/index.a0ac0351.js"},{"revision":null,"url":"assets/index.a2f00309.js"},{"revision":null,"url":"assets/index.a437bd72.js"},{"revision":null,"url":"assets/index.a4feef94.js"},{"revision":null,"url":"assets/index.aa032d9c.js"},{"revision":null,"url":"assets/index.abae8d76.css"},{"revision":null,"url":"assets/index.ad59641d.js"},{"revision":null,"url":"assets/index.adac60ac.js"},{"revision":null,"url":"assets/index.b13a2132.js"},{"revision":null,"url":"assets/index.b300afda.js"},{"revision":null,"url":"assets/index.b7d4e89c.js"},{"revision":null,"url":"assets/index.b7f97714.js"},{"revision":null,"url":"assets/index.b8f10f26.js"},{"revision":null,"url":"assets/index.bb9850ee.js"},{"revision":null,"url":"assets/index.bda45f33.js"},{"revision":null,"url":"assets/index.be0dae12.css"},{"revision":null,"url":"assets/index.c35a6751.js"},{"revision":null,"url":"assets/index.c3b7c35a.js"},{"revision":null,"url":"assets/index.c480f528.js"},{"revision":null,"url":"assets/index.cc1aa369.js"},{"revision":null,"url":"assets/index.cca4985a.js"},{"revision":null,"url":"assets/index.ccc7b0e6.js"},{"revision":null,"url":"assets/index.ce7ba8eb.js"},{"revision":null,"url":"assets/index.d1cbaf16.js"},{"revision":null,"url":"assets/index.d72f16b6.js"},{"revision":null,"url":"assets/index.d7aec0cb.js"},{"revision":null,"url":"assets/index.d85ee582.js"},{"revision":null,"url":"assets/index.db837b24.js"},{"revision":null,"url":"assets/index.dd004e4e.js"},{"revision":null,"url":"assets/index.dd290ab1.js"},{"revision":null,"url":"assets/index.ddfd370b.js"},{"revision":null,"url":"assets/index.df842f30.js"},{"revision":null,"url":"assets/index.dfa3c991.js"},{"revision":null,"url":"assets/index.e04743dd.js"},{"revision":null,"url":"assets/index.e271cea2.js"},{"revision":null,"url":"assets/index.e48aadcb.js"},{"revision":null,"url":"assets/index.e81dec60.js"},{"revision":null,"url":"assets/index.ea687265.js"},{"revision":null,"url":"assets/index.ea757572.js"},{"revision":null,"url":"assets/index.eac67298.css"},{"revision":null,"url":"assets/index.eb727639.js"},{"revision":null,"url":"assets/index.ec36a3cf.js"},{"revision":null,"url":"assets/index.efc2577a.js"},{"revision":null,"url":"assets/index.f35f89e2.js"},{"revision":null,"url":"assets/index.f4a20f10.js"},{"revision":null,"url":"assets/index.fb9db90b.js"},{"revision":null,"url":"assets/index.feb19180.js"},{"revision":null,"url":"assets/vendor.20f53d23.js"},{"revision":null,"url":"assets/vendor.3aa2f85f.js"},{"revision":null,"url":"assets/vendor.4cc44bb7.js"},{"revision":null,"url":"assets/vendor.ae2b6058.js"},{"revision":null,"url":"assets/vendor.db25fd4c.js"},{"revision":null,"url":"assets/vendor.e8263742.js"},{"revision":null,"url":"assets/vendor.eb245332.js"},{"revision":"3d5ef2bf867c4054a2f336cdbad9e1dc","url":"css/all.min.css"},{"revision":"93795f46e8a1f2840e49a71117290409","url":"index.html"},{"revision":"85c24f504d767d105ee990e7889d115b","url":"WebsiteIcons/favicon.ico"},{"revision":"7eb158f57472a3794cc8f80a93d77604","url":"WebsiteIcons/apple-touch-icon.png"},{"revision":"78d2f7723519a9240c91918e822df938","url":"WebsiteIcons/pwa-192x192.png"},{"revision":"382ed1169e8c39561e1ec89fdd08ddaf","url":"WebsiteIcons/pwa-512x512.png"},{"revision":"807701081ba4df3fa86d1210e49193d8","url":"manifest.webmanifest"}]);self.skipWaiting();oe();self.addEventListener("message",a=>{a.data&&a.data.type==="SKIP_WAITING"&&self.skipWaiting()});var f=null,C=null;self.addEventListener("message",a=>{let{type:e,userId:t,payload:s}=JSON.parse(a.data);switch(e){case"userConnect":let{email:n,ws_devMode:r}=s;console.log("DEVMODE: "+r),r?C="ws://localhost:2410":C="wss://chstest.onrender.com",f=new WebSocket(C,n.replace("@","|")),setInterval(()=>{console.log(`ReadyState: ${f.readyState}`),f.readyState===3&&(f=new WebSocket(C,n.replace("@","|")))},100);break;case"IamAlive":f.send(JSON.stringify({type:"IamAlive",daten:""}));break;case"startTracking":break;case"tracking":f.send(JSON.stringify({type:"sendPosition",daten:s})),console.log(`TRACKING: (${s.lat}/${s.lng})`);break;case"endTracking":f.send(JSON.stringify({type:"useralarmstopped",daten:s}));break;case"sendMessageFromUser":break;case"sendMessageFromMitarbeiter":break;case"setAlarm":f.send(JSON.stringify({type:"setalarm",daten:s})),f.addEventListener("message",c=>{const{type:i,data:o}=JSON.parse(c.data);i=="useralarmstopped"&&(console.log("USERALARMSTOPPED IM SW"),a.source.postMessage(JSON.stringify({type:"useralarmstopped",data:o})))});break;case"userDisconnect":f.close();break}});
