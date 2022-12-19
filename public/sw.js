/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-16e0634d'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "assets/Comp_PW_Vergessen.04b552a8.js",
    "revision": null
  }, {
    "url": "assets/Comp_PW_Vergessen.5175a842.js",
    "revision": null
  }, {
    "url": "assets/Comp_PW_Vergessen.6db24551.js",
    "revision": null
  }, {
    "url": "assets/Comp_PW_Vergessen.86b8b132.js",
    "revision": null
  }, {
    "url": "assets/Comp_PW_Vergessen.a88f1152.js",
    "revision": null
  }, {
    "url": "assets/Comp_PW_Vergessen.ab1ed571.js",
    "revision": null
  }, {
    "url": "assets/Comp_PW_Vergessen.dcd58266.js",
    "revision": null
  }, {
    "url": "assets/Comp_PW_Vergessen.f5658b1a.js",
    "revision": null
  }, {
    "url": "assets/index.23f11d6c.js",
    "revision": null
  }, {
    "url": "assets/index.2c532fb3.js",
    "revision": null
  }, {
    "url": "assets/index.48d0990f.js",
    "revision": null
  }, {
    "url": "assets/index.4f54bb6e.js",
    "revision": null
  }, {
    "url": "assets/index.9b8c0503.js",
    "revision": null
  }, {
    "url": "assets/index.c85004c4.js",
    "revision": null
  }, {
    "url": "assets/index.df01567f.js",
    "revision": null
  }, {
    "url": "assets/index.ec5e8a24.css",
    "revision": null
  }, {
    "url": "assets/index.f52fea65.js",
    "revision": null
  }, {
    "url": "assets/vendor.1b0edbf0.js",
    "revision": null
  }, {
    "url": "assets/vendor.cb6128ae.js",
    "revision": null
  }, {
    "url": "css/all.min.css",
    "revision": "3d5ef2bf867c4054a2f336cdbad9e1dc"
  }, {
    "url": "index.html",
    "revision": "1af158e6393a61a8025652476d0bfb4c"
  }, {
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "WebsiteIcons/android-chrome-192x192.png",
    "revision": "59d6e78ac293ba6137f34bdc143cef08"
  }, {
    "url": "WebsiteIcons/android-chrome-512x512.png",
    "revision": "7821a21110151289c7c7a52a327f7d0f"
  }, {
    "url": "WebsiteIcons/apple-touch-icon.png",
    "revision": "136988764d43d205fe83ab36e7366805"
  }, {
    "url": "WebsiteIcons/ComingHomeSafe.png",
    "revision": "f7189b2a2e0fecb5edb556779ce5db0f"
  }, {
    "url": "WebsiteIcons/favicon-16x16.png",
    "revision": "2ba99e227e0328284fa5bf385c41f85a"
  }, {
    "url": "WebsiteIcons/favicon-32x32.png",
    "revision": "bc5c2edcb516b8bb6d547857a2852d29"
  }, {
    "url": "WebsiteIcons/favicon.ico",
    "revision": "3b989dc9e6156caa088a0a62646160a0"
  }, {
    "url": "WebsiteIcons/mstile-150x150.png",
    "revision": "b261e88539e08037f9957e0e8acd088e"
  }, {
    "url": "WebsiteIcons/pwa-192x192.png",
    "revision": "78d2f7723519a9240c91918e822df938"
  }, {
    "url": "WebsiteIcons/pwa-512x512.png",
    "revision": "382ed1169e8c39561e1ec89fdd08ddaf"
  }, {
    "url": "WebsiteIcons/safari-pinned-tab.svg",
    "revision": "deadead5a862def2876709b74812b04a"
  }, {
    "url": "WebsiteIcons/pwa-192x192.png",
    "revision": "78d2f7723519a9240c91918e822df938"
  }, {
    "url": "WebsiteIcons/pwa-512x512.png",
    "revision": "382ed1169e8c39561e1ec89fdd08ddaf"
  }, {
    "url": "manifest.webmanifest",
    "revision": "f80dd6d3ec85c10f0ffea53fc5ca9b94"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
