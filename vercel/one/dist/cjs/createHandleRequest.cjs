var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var createHandleRequest_exports = {};
__export(createHandleRequest_exports, {
  createHandleRequest: () => createHandleRequest
});
module.exports = __toCommonJS(createHandleRequest_exports);
var import_cleanUrl = require("./cleanUrl.cjs"),
  import_constants = require("./constants.cjs"),
  import_isResponse = require("./utils/isResponse.cjs"),
  import_promiseWithResolvers = require("./utils/promiseWithResolvers.cjs"),
  import_getManifest = require("./vite/getManifest.cjs");
function createHandleRequest(options, handlers) {
  const manifest = (0, import_getManifest.getManifest)();
  if (!manifest) throw new Error("No routes manifest");
  const apiRoutesMap = manifest.apiRoutes.reduce((acc, cur) => (acc[cur.page] = {
      ...cur,
      compiledRegex: new RegExp(cur.namedRegex)
    }, acc), {}),
    apiRoutesList = Object.values(apiRoutesMap),
    activeRequests = {},
    pageRoutes = manifest.pageRoutes.map(route => ({
      ...route,
      workingRegex: new RegExp(route.namedRegex)
    }));
  return {
    manifest,
    handler: async function (request) {
      const urlString = request.url || "",
        url = new URL(urlString || "", request.headers.get("host") ? `http://${request.headers.get("host")}` : ""),
        {
          pathname,
          search
        } = url;
      if (process.env.NODE_ENV !== "production" && activeRequests[pathname]) return await activeRequests[pathname];
      if (pathname === "/__vxrnhmr" || pathname.startsWith("/@")) return null;
      if (handlers.handleAPI) {
        const apiRoute = apiRoutesList.find(route => route.compiledRegex.test(pathname));
        if (apiRoute) {
          const params = getRouteParams(pathname, apiRoute);
          try {
            return await handlers.handleAPI({
              request,
              route: apiRoute,
              url,
              loaderProps: {
                path: pathname,
                params
              }
            });
          } catch (err) {
            if ((0, import_isResponse.isResponse)(err)) return err;
            throw err;
          }
        }
      }
      if (request.method !== "GET") return null;
      if (handlers.handleLoader && pathname.endsWith(import_constants.LOADER_JS_POSTFIX_UNCACHED)) {
        const originalUrl = (0, import_cleanUrl.getPathFromLoaderPath)(pathname),
          finalUrl = new URL(originalUrl, url.origin);
        for (const route of pageRoutes) {
          if (route.file === "" || !route.workingRegex.test(finalUrl.pathname)) continue;
          process.env.NODE_ENV === "development" && console.info(` \u2776 Running loader for route: ${finalUrl.pathname}`);
          const headers = new Headers();
          headers.set("Content-Type", "text/javascript");
          try {
            const loaderResponse = await handlers.handleLoader({
              request,
              route,
              url,
              loaderProps: {
                path: finalUrl.pathname,
                request: route.type === "ssr" ? request : void 0,
                params: getLoaderParams(finalUrl, route)
              }
            });
            return new Response(loaderResponse, {
              headers
            });
          } catch (err) {
            if ((0, import_isResponse.isResponse)(err)) return err;
            throw console.error(`Error running loader: ${err}`), err;
          }
        }
        return process.env.NODE_ENV === "development" && console.error("No matching route found!", {
          originalUrl,
          routes: manifest.pageRoutes
        }), Response.error();
      }
      if (handlers.handleSSR) {
        const {
          promise,
          reject,
          resolve
        } = (0, import_promiseWithResolvers.promiseWithResolvers)();
        activeRequests[pathname] = promise;
        try {
          for (const route of pageRoutes) {
            if (!route.workingRegex.test(pathname)) continue;
            const ssrResponse = await handlers.handleSSR({
              request,
              route,
              url,
              loaderProps: {
                path: pathname + search,
                params: getLoaderParams(url, route)
              }
            });
            return resolve(ssrResponse), ssrResponse;
          }
        } catch (err) {
          throw reject(err), err;
        } finally {
          delete activeRequests[pathname];
        }
      }
      return null;
    }
  };
}
function getLoaderParams(url, config) {
  const params = {},
    match = new RegExp(config.workingRegex).exec(url.pathname);
  if (match?.groups) for (const [key, value] of Object.entries(match.groups)) {
    const namedKey = config.routeKeys[key];
    params[namedKey] = value;
  }
  return params;
}
function getRouteParams(pathname, route) {
  const match = new RegExp(route.namedRegex).exec(pathname);
  return match ? Object.fromEntries(Object.entries(route.routeKeys).map(([key, value]) => [value, match.groups?.[key] || ""])) : {};
}