try{self["workbox:core:6.5.3"]&&_()}catch{}const O=(a,...e)=>{let t=a;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t},x=O;class l extends Error{constructor(e,t){const s=x(e,t);super(s);this.name=e,this.details=t}}const f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration!="undefined"?registration.scope:""},k=a=>[f.prefix,a,f.suffix].filter(e=>e&&e.length>0).join("-"),M=a=>{for(const e of Object.keys(f))a(e)},b={updateDetails:a=>{M(e=>{typeof a[e]=="string"&&(f[e]=a[e])})},getGoogleAnalyticsName:a=>a||k(f.googleAnalytics),getPrecacheName:a=>a||k(f.precache),getPrefix:()=>f.prefix,getRuntimeName:a=>a||k(f.runtime),getSuffix:()=>f.suffix};function N(a,e){const t=e();return a.waitUntil(t),t}try{self["workbox:precaching:6.5.3"]&&_()}catch{}const I="__WB_REVISION__";function S(a){if(!a)throw new l("add-to-cache-list-unexpected-type",{entry:a});if(typeof a=="string"){const r=new URL(a,location.href);return{cacheKey:r.href,url:r.href}}const{revision:e,url:t}=a;if(!t)throw new l("add-to-cache-list-unexpected-type",{entry:a});if(!e){const r=new URL(t,location.href);return{cacheKey:r.href,url:r.href}}const s=new URL(t,location.href),n=new URL(t,location.href);return s.searchParams.set(I,e),{cacheKey:s.href,url:n.href}}class W{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){const n=t.originalRequest.url;s?this.notUpdatedURLs.push(n):this.updatedURLs.push(n)}return s}}}class A{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:s})=>{const n=(s==null?void 0:s.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return n?new Request(n,{headers:t.headers}):t},this._precacheController=e}}let y;function D(){if(y===void 0){const a=new Response("");if("body"in a)try{new Response(a.body),y=!0}catch{y=!1}y=!1}return y}async function q(a,e){let t=null;if(a.url&&(t=new URL(a.url).origin),t!==self.location.origin)throw new l("cross-origin-copy-response",{origin:t});const s=a.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},r=e?e(n):n,c=D()?s.body:await s.blob();return new Response(c,r)}const F=a=>new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),"");function T(a,e){const t=new URL(a);for(const s of e)t.searchParams.delete(s);return t.href}async function j(a,e,t,s){const n=T(e.url,t);if(e.url===n)return a.match(e,s);const r=Object.assign(Object.assign({},s),{ignoreSearch:!0}),c=await a.keys(e,r);for(const i of c){const o=T(i.url,t);if(n===o)return a.match(i,s)}}class H{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}const B=new Set;async function J(){for(const a of B)await a()}function $(a){return new Promise(e=>setTimeout(e,a))}try{self["workbox:strategies:6.5.3"]&&_()}catch{}function R(a){return typeof a=="string"?new Request(a):a}class G{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new H,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=R(e);if(s.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const c=await t.preloadResponse;if(c)return c}const n=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const c of this.iterateCallbacks("requestWillFetch"))s=await c({request:s.clone(),event:t})}catch(c){if(c instanceof Error)throw new l("plugin-error-request-will-fetch",{thrownErrorMessage:c.message})}const r=s.clone();try{let c;c=await fetch(s,s.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const i of this.iterateCallbacks("fetchDidSucceed"))c=await i({event:t,request:r,response:c});return c}catch(c){throw n&&await this.runCallbacks("fetchDidFail",{error:c,event:t,originalRequest:n.clone(),request:r.clone()}),c}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=R(e);let s;const{cacheName:n,matchOptions:r}=this._strategy,c=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(c,i);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await o({cacheName:n,matchOptions:r,cachedResponse:s,request:c,event:this.event})||void 0;return s}async cachePut(e,t){const s=R(e);await $(0);const n=await this.getCacheKey(s,"write");if(!t)throw new l("cache-put-with-no-response",{url:F(n.url)});const r=await this._ensureResponseSafeToCache(t);if(!r)return!1;const{cacheName:c,matchOptions:i}=this._strategy,o=await self.caches.open(c),h=this.hasCallback("cacheDidUpdate"),p=h?await j(o,n.clone(),["__WB_REVISION__"],i):null;try{await o.put(n,h?r.clone():r)}catch(u){if(u instanceof Error)throw u.name==="QuotaExceededError"&&await J(),u}for(const u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:c,oldResponse:p,newResponse:r.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let n=e;for(const r of this.iterateCallbacks("cacheKeyWillBeUsed"))n=R(await r({mode:t,request:n,event:this.event,params:this.params}));this._cacheKeys[s]=n}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const s=this._pluginStateMap.get(t);yield r=>{const c=Object.assign(Object.assign({},r),{state:s});return t[e](c)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const n of this.iterateCallbacks("cacheWillUpdate"))if(t=await n({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&t.status!==200&&(t=void 0),t}}class V{constructor(e={}){this.cacheName=b.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s=typeof e.request=="string"?new Request(e.request):e.request,n="params"in e?e.params:void 0,r=new G(this,{event:t,request:s,params:n}),c=this._getResponse(r,s,t),i=this._awaitComplete(c,r,s,t);return[c,i]}async _getResponse(e,t,s){await e.runCallbacks("handlerWillStart",{event:s,request:t});let n;try{if(n=await this._handle(t,e),!n||n.type==="error")throw new l("no-response",{url:t.url})}catch(r){if(r instanceof Error){for(const c of e.iterateCallbacks("handlerDidError"))if(n=await c({error:r,event:s,request:t}),n)break}if(!n)throw r}for(const r of e.iterateCallbacks("handlerWillRespond"))n=await r({event:s,request:t,response:n});return n}async _awaitComplete(e,t,s,n){let r,c;try{r=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await t.doneWaiting()}catch(i){i instanceof Error&&(c=i)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:c}),t.destroy(),c)throw c}}class d extends V{constructor(e={}){e.cacheName=b.getPrecacheName(e.cacheName);super(e);this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(d.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;const n=t.params||{};if(this._fallbackToNetwork){const r=n.integrity,c=e.integrity,i=!c||c===r;s=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?c||r:void 0})),r&&i&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,s.clone()))}else throw new l("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new l("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==d.copyRedirectedCacheableResponsesPlugin&&(n===d.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);t===0?this.plugins.push(d.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}d.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:a}){return!a||a.status>=400?null:a}};d.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:a}){return a.redirected?await q(a):a}};class Q{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new d({cacheName:b.getPrecacheName(e),plugins:[...t,new A({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const s of e){typeof s=="string"?t.push(s):s&&s.revision===void 0&&t.push(s.url);const{cacheKey:n,url:r}=S(s),c=typeof s!="string"&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(r)&&this._urlsToCacheKeys.get(r)!==n)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(r),secondEntry:n});if(typeof s!="string"&&s.integrity){if(this._cacheKeysToIntegrities.has(n)&&this._cacheKeysToIntegrities.get(n)!==s.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:r});this._cacheKeysToIntegrities.set(n,s.integrity)}if(this._urlsToCacheKeys.set(r,n),this._urlsToCacheModes.set(r,c),t.length>0){const i=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(i)}}}install(e){return N(e,async()=>{const t=new W;this.strategy.plugins.push(t);for(const[r,c]of this._urlsToCacheKeys){const i=this._cacheKeysToIntegrities.get(c),o=this._urlsToCacheModes.get(r),h=new Request(r,{integrity:i,cache:o,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:c},request:h,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}})}activate(e){return N(e,async()=>{const t=await self.caches.open(this.strategy.cacheName),s=await t.keys(),n=new Set(this._urlsToCacheKeys.values()),r=[];for(const c of s)n.has(c.url)||(await t.delete(c),r.push(c.url));return{deletedURLs:r}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new l("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let U;const v=()=>(U||(U=new Q),U);try{self["workbox:routing:6.5.3"]&&_()}catch{}const E="GET",C=a=>a&&typeof a=="object"?a:{handle:a};class m{constructor(e,t,s=E){this.handler=C(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=C(e)}}class z extends m{constructor(e,t,s){const n=({url:r})=>{const c=e.exec(r.href);if(!!c&&!(r.origin!==location.origin&&c.index!==0))return c.slice(1)};super(n,t,s)}}class X{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(n=>{typeof n=="string"&&(n=[n]);const r=new Request(...n);return this.handleRequest({request:r,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:c}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=c&&c.handler;const o=e.method;if(!i&&this._defaultHandlerMap.has(o)&&(i=this._defaultHandlerMap.get(o)),!i)return;let h;try{h=i.handle({url:s,request:e,event:t,params:r})}catch(u){h=Promise.reject(u)}const p=c&&c.catchHandler;return h instanceof Promise&&(this._catchHandler||p)&&(h=h.catch(async u=>{if(p)try{return await p.handle({url:s,request:e,event:t,params:r})}catch(K){K instanceof Error&&(u=K)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw u})),h}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const r=this._routes.get(s.method)||[];for(const c of r){let i;const o=c.match({url:e,sameOrigin:t,request:s,event:n});if(o)return i=o,(Array.isArray(i)&&i.length===0||o.constructor===Object&&Object.keys(o).length===0||typeof o=="boolean")&&(i=void 0),{route:c,params:i}}return{}}setDefaultHandler(e,t=E){this._defaultHandlerMap.set(t,C(e))}setCatchHandler(e){this._catchHandler=C(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new l("unregister-route-route-not-registered")}}let w;const Y=()=>(w||(w=new X,w.addFetchListener(),w.addCacheListener()),w);function Z(a,e,t){let s;if(typeof a=="string"){const r=new URL(a,location.href),c=({url:i})=>i.href===r.href;s=new m(c,e,t)}else if(a instanceof RegExp)s=new z(a,e,t);else if(typeof a=="function")s=new m(a,e,t);else if(a instanceof m)s=a;else throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return Y().registerRoute(s),s}function ee(a,e=[]){for(const t of[...a.searchParams.keys()])e.some(s=>s.test(t))&&a.searchParams.delete(t);return a}function*te(a,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={}){const r=new URL(a,location.href);r.hash="",yield r.href;const c=ee(r,e);if(yield c.href,t&&c.pathname.endsWith("/")){const i=new URL(c.href);i.pathname+=t,yield i.href}if(s){const i=new URL(c.href);i.pathname+=".html",yield i.href}if(n){const i=n({url:r});for(const o of i)yield o.href}}class se extends m{constructor(e,t){const s=({request:n})=>{const r=e.getURLsToCacheKeys();for(const c of te(n.url,t)){const i=r.get(c);if(i){const o=e.getIntegrityForCacheKey(i);return{cacheKey:i,integrity:o}}}};super(s,e.strategy)}}function ae(a){const e=v(),t=new se(e,a);Z(t)}const ne="-precache-",re=async(a,e=ne)=>{const s=(await self.caches.keys()).filter(n=>n.includes(e)&&n.includes(self.registration.scope)&&n!==a);return await Promise.all(s.map(n=>self.caches.delete(n))),s};function ce(){self.addEventListener("activate",a=>{const e=b.getPrecacheName();a.waitUntil(re(e).then(t=>{}))})}function ie(a){v().precache(a)}function oe(a,e){ie(a),ae(e)}function le(){self.addEventListener("activate",()=>self.clients.claim())}ce();oe([{"revision":null,"url":"assets/Comp_PW_Vergessen.245bdd17.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.2978f977.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.30a7b2cb.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.38b1c50f.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.39872d95.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.568676ce.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.6006a3f8.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.654420c1.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.673bc2cc.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.8e7ad81a.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.9604ef69.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.9d0bd9b9.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.9eeff9ee.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.a709c4b8.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.bae493c2.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.d2f37580.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.e74965c6.js"},{"revision":null,"url":"assets/Comp_PW_Vergessen.e9ff8cda.js"},{"revision":null,"url":"assets/index.07cee0f5.css"},{"revision":null,"url":"assets/index.093dcf05.js"},{"revision":null,"url":"assets/index.31e70cda.js"},{"revision":null,"url":"assets/index.368e722d.js"},{"revision":null,"url":"assets/index.36ef189f.js"},{"revision":null,"url":"assets/index.489d51e6.js"},{"revision":null,"url":"assets/index.51d8d024.js"},{"revision":null,"url":"assets/index.579f3fd1.js"},{"revision":null,"url":"assets/index.58e01fbe.js"},{"revision":null,"url":"assets/index.596aba7c.js"},{"revision":null,"url":"assets/index.59e5e112.js"},{"revision":null,"url":"assets/index.7c6dce76.css"},{"revision":null,"url":"assets/index.80b0cd20.js"},{"revision":null,"url":"assets/index.8f6d8274.js"},{"revision":null,"url":"assets/index.9061ebe7.css"},{"revision":null,"url":"assets/index.90ec4f8b.css"},{"revision":null,"url":"assets/index.a437bd72.js"},{"revision":null,"url":"assets/index.a4feef94.js"},{"revision":null,"url":"assets/index.b7f97714.js"},{"revision":null,"url":"assets/index.ce7ba8eb.js"},{"revision":null,"url":"assets/index.e48aadcb.js"},{"revision":null,"url":"assets/index.ea757572.js"},{"revision":null,"url":"assets/index.eac67298.css"},{"revision":null,"url":"assets/vendor.20f53d23.js"},{"revision":null,"url":"assets/vendor.4cc44bb7.js"},{"revision":null,"url":"assets/vendor.eb245332.js"},{"revision":"3d5ef2bf867c4054a2f336cdbad9e1dc","url":"css/all.min.css"},{"revision":"8d1a3c3af0d88d9dfd6f4db513289a63","url":"index.html"},{"revision":"85c24f504d767d105ee990e7889d115b","url":"WebsiteIcons/favicon.ico"},{"revision":"7eb158f57472a3794cc8f80a93d77604","url":"WebsiteIcons/apple-touch-icon.png"},{"revision":"78d2f7723519a9240c91918e822df938","url":"WebsiteIcons/pwa-192x192.png"},{"revision":"382ed1169e8c39561e1ec89fdd08ddaf","url":"WebsiteIcons/pwa-512x512.png"},{"revision":"bb1ef377ca6d35fa429659df93c99f2f","url":"manifest.webmanifest"}]);self.skipWaiting();le();self.addEventListener("message",a=>{a.data&&a.data.type==="SKIP_WAITING"&&self.skipWaiting()});var L=null,g=null,P=null;self.addEventListener("message",a=>{let{type:e,userId:t,payload:s}=JSON.parse(a.data);switch(e){case"userConnect":let{email:n,ws_devMode:r}=s;console.log("DEVMODE: "+r),L=n,r?P=" ws://localhost:2410":P="wss://coming-home-safe-hosting.onrender.com",g=new WebSocket(P,n.replace("@","|"));break;case"startTracking":break;case"tracking":g.send(JSON.stringify({type:"sendPosition",daten:s}));break;case"endTracking":break;case"sendMessageFromUser":break;case"sendMessageFromMitarbeiter":break;case"setAlarm":g.send(JSON.stringify({type:"alarm",daten:s}));let c=g.addEventListener("message",i=>{const{type:o,data:h}=JSON.parse(i.data);o=="stopAlarmAsClient"&&h==L&&(a.source.postMessage(JSON.stringify({type:"alarmStopped",data:"Useralarm abschalten"})),g.removeEventListener(c))});break;case"userDisconnect":L=null,g.close();break}});
