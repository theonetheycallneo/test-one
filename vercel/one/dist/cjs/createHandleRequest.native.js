"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var createHandleRequest_exports = {};
__export(createHandleRequest_exports, {
  createHandleRequest: () => createHandleRequest
});
module.exports = __toCommonJS(createHandleRequest_exports);
var import_cleanUrl = require("./cleanUrl"), import_constants = require("./constants"), import_isResponse = require("./utils/isResponse"), import_promiseWithResolvers = require("./utils/promiseWithResolvers"), import_getManifest = require("./vite/getManifest");
function createHandleRequest(options, handlers) {
  var manifest = (0, import_getManifest.getManifest)();
  if (!manifest)
    throw new Error("No routes manifest");
  var apiRoutesMap = manifest.apiRoutes.reduce(function(acc, cur) {
    return acc[cur.page] = {
      ...cur,
      compiledRegex: new RegExp(cur.namedRegex)
    }, acc;
  }, {}), apiRoutesList = Object.values(apiRoutesMap), activeRequests = {}, pageRoutes = manifest.pageRoutes.map(function(route) {
    return {
      ...route,
      workingRegex: new RegExp(route.namedRegex)
    };
  });
  return {
    manifest,
    handler: async function(request) {
      var urlString = request.url || "", url = new URL(urlString || "", request.headers.get("host") ? `http://${request.headers.get("host")}` : ""), { pathname, search } = url;
      if (process.env.NODE_ENV !== "production" && activeRequests[pathname])
        return await activeRequests[pathname];
      if (pathname === "/__vxrnhmr" || pathname.startsWith("/@"))
        return null;
      if (handlers.handleAPI) {
        var apiRoute = apiRoutesList.find(function(route2) {
          var regex = route2.compiledRegex;
          return regex.test(pathname);
        });
        if (apiRoute) {
          var params = getRouteParams(pathname, apiRoute);
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
            if ((0, import_isResponse.isResponse)(err))
              return err;
            throw err;
          }
        }
      }
      if (request.method !== "GET")
        return null;
      if (handlers.handleLoader) {
        var isClientRequestingNewRoute = pathname.endsWith(import_constants.LOADER_JS_POSTFIX_UNCACHED);
        if (isClientRequestingNewRoute) {
          var originalUrl = (0, import_cleanUrl.getPathFromLoaderPath)(pathname), finalUrl = new URL(originalUrl, url.origin), _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
          try {
            for (var _iterator = pageRoutes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
              var route = _step.value;
              if (route.file !== "" && route.workingRegex.test(finalUrl.pathname)) {
                process.env.NODE_ENV === "development" && console.info(` \u2776 Running loader for route: ${finalUrl.pathname}`);
                var headers = new Headers();
                headers.set("Content-Type", "text/javascript");
                try {
                  var loaderResponse = await handlers.handleLoader({
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
                  if ((0, import_isResponse.isResponse)(err))
                    return err;
                  throw console.error(`Error running loader: ${err}`), err;
                }
              }
            }
          } catch (err) {
            _didIteratorError = !0, _iteratorError = err;
          } finally {
            try {
              !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
            } finally {
              if (_didIteratorError)
                throw _iteratorError;
            }
          }
          return process.env.NODE_ENV === "development" && console.error("No matching route found!", {
            originalUrl,
            routes: manifest.pageRoutes
          }), Response.error();
        }
      }
      if (handlers.handleSSR) {
        var { promise, reject, resolve } = (0, import_promiseWithResolvers.promiseWithResolvers)();
        activeRequests[pathname] = promise;
        try {
          var _iteratorNormalCompletion1 = !0, _didIteratorError1 = !1, _iteratorError1 = void 0;
          try {
            for (var _iterator1 = pageRoutes[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = !0) {
              var route1 = _step1.value;
              if (route1.workingRegex.test(pathname)) {
                var ssrResponse = await handlers.handleSSR({
                  request,
                  route: route1,
                  url,
                  loaderProps: {
                    path: pathname + search,
                    params: getLoaderParams(url, route1)
                  }
                });
                return resolve(ssrResponse), ssrResponse;
              }
            }
          } catch (err) {
            _didIteratorError1 = !0, _iteratorError1 = err;
          } finally {
            try {
              !_iteratorNormalCompletion1 && _iterator1.return != null && _iterator1.return();
            } finally {
              if (_didIteratorError1)
                throw _iteratorError1;
            }
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
  var params = {}, match = new RegExp(config.workingRegex).exec(url.pathname);
  if (match != null && match.groups) {
    var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
    try {
      for (var _iterator = Object.entries(match.groups)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
        var [key, value] = _step.value, namedKey = config.routeKeys[key];
        params[namedKey] = value;
      }
    } catch (err) {
      _didIteratorError = !0, _iteratorError = err;
    } finally {
      try {
        !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
      } finally {
        if (_didIteratorError)
          throw _iteratorError;
      }
    }
  }
  return params;
}
function getRouteParams(pathname, route) {
  var regex = new RegExp(route.namedRegex), match = regex.exec(pathname);
  return match ? Object.fromEntries(Object.entries(route.routeKeys).map(function(param) {
    var [key, value] = param, _match_groups;
    return [
      value,
      ((_match_groups = match.groups) === null || _match_groups === void 0 ? void 0 : _match_groups[key]) || ""
    ];
  })) : {};
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createHandleRequest
});
//# sourceMappingURL=createHandleRequest.js.map
