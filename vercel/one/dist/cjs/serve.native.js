"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var serve_exports = {};
__export(serve_exports, {
  serve: () => serve
});
module.exports = __toCommonJS(serve_exports);
var import_polyfills_server = require("./polyfills-server"), import_fs_extra = __toESM(require("fs-extra"), 1), import_node_path = require("node:path"), import_serve = require("vxrn/serve");
process.on("uncaughtException", function(err) {
  console.error("[one] Uncaught exception", (err == null ? void 0 : err.stack) || err);
});
async function serve() {
  var args = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, buildInfo = await import_fs_extra.default.readJSON("dist/buildInfo.json");
  process.env.ONE_CACHE_KEY = buildInfo.constants.CACHE_KEY;
  var { labelProcess } = await import("./cli/label-process"), { removeUndefined } = await import("./utils/removeUndefined"), { loadUserOneOptions } = await import("./vite/one");
  labelProcess("serve"), (0, import_serve.loadEnv)("production");
  var oneOptions = await loadUserOneOptions("serve");
  return process.env.VXRN_REACT_19 = "1", await (0, import_serve.serve)({
    server: {
      // fallback to one plugin
      ...oneOptions.server,
      // override with any flags given to cli
      ...removeUndefined({
        port: args.port ? +args.port : void 0,
        host: args.host,
        compress: args.compress,
        platform: args.platform,
        cacheHeaders: args.cacheHeaders
      }),
      async beforeStart(options, app) {
        var _oneOptions_server_beforeStart, _oneOptions_server;
        await ((_oneOptions_server = oneOptions.server) === null || _oneOptions_server === void 0 || (_oneOptions_server_beforeStart = _oneOptions_server.beforeStart) === null || _oneOptions_server_beforeStart === void 0 ? void 0 : _oneOptions_server_beforeStart.call(_oneOptions_server, options, app)), await oneServe(oneOptions, options, buildInfo, app);
      }
    }
  });
}
async function oneServe(options, vxrnOptions, buildInfo, app) {
  var _options_web, _options_build_api, _options_build, { createHandleRequest } = await import("./createHandleRequest"), { isResponse } = await import("./utils/isResponse"), { isStatusRedirect } = await import("./utils/isStatus"), { resolveAPIRequest } = await import("./vite/resolveAPIRequest"), isAPIRequest = /* @__PURE__ */ new WeakMap(), root = vxrnOptions.root || ".", redirects = (_options_web = options.web) === null || _options_web === void 0 ? void 0 : _options_web.redirects;
  if (redirects) {
    var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
    try {
      for (var _loop = function() {
        var redirect = _step.value;
        app.get(redirect.source, function(context) {
          var destinationUrl = redirect.destination.replace(/:\w+/g, function(param) {
            var paramName = param.substring(1);
            return context.req.param(paramName) || "";
          });
          return context.redirect(destinationUrl, redirect.permanent ? 301 : 302);
        });
      }, _iterator = redirects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) _loop();
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
  if (!buildInfo)
    throw new Error("No build info found, have you run build?");
  var { routeMap, builtRoutes } = buildInfo, routeToBuildInfo = {}, _iteratorNormalCompletion1 = !0, _didIteratorError1 = !1, _iteratorError1 = void 0;
  try {
    for (var _iterator1 = builtRoutes[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = !0) {
      var route = _step1.value;
      routeToBuildInfo[route.cleanPath] = route;
      var bracketRoutePath = route.cleanPath.split("/").map(function(part) {
        return part[0] === ":" ? `[${part.slice(1)}]` : part;
      }).join("/");
      routeToBuildInfo[bracketRoutePath] = route;
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
  var serverOptions = {
    ...options,
    root
  }, entryServer = (0, import_serve.getServerEntry)(serverOptions), entry = await import(entryServer), render = entry.default.render, apiCJS = ((_options_build = options.build) === null || _options_build === void 0 || (_options_build_api = _options_build.api) === null || _options_build_api === void 0 ? void 0 : _options_build_api.outputFormat) === "cjs", handleRequest = createHandleRequest({}, {
    async handleAPI(param) {
      var { route: route2, request, loaderProps } = param, apiFile = (0, import_node_path.join)(process.cwd(), "dist", "api", route2.page.replace("[", "_").replace("]", "_") + (apiCJS ? ".cjs" : ".js"));
      return isAPIRequest.set(request, !0), resolveAPIRequest(async function() {
        try {
          return await import(apiFile);
        } catch (err) {
          return console.error(`
 [one] Error importing API route at ${apiFile}:

  ${err}

  If this is an import error, you can likely fix this by adding this dependency to
  the "optimizeDeps.include" array in your vite.config.ts.

  \u{1F41E} For a better error message run "node" and enter:

  import('${apiFile}')

`), {};
        }
      }, request, (loaderProps == null ? void 0 : loaderProps.params) || {});
    },
    async handleSSR(param) {
      var { route: route2, url, loaderProps } = param;
      if (route2.type === "ssr") {
        var _$buildInfo = routeToBuildInfo[route2.page];
        if (!_$buildInfo)
          throw new Error(`No buildinfo found for ${url}, route: ${route2.page}, in keys: ${Object.keys(routeToBuildInfo)}`);
        try {
          var _exported_loader, exported = await import(_$buildInfo.serverJsPath), loaderData = await ((_exported_loader = exported.loader) === null || _exported_loader === void 0 ? void 0 : _exported_loader.call(exported, loaderProps)), preloads = _$buildInfo.preloads, headers = new Headers();
          return headers.set("content-type", "text/html"), new Response(await render({
            loaderData,
            loaderProps,
            path: (loaderProps == null ? void 0 : loaderProps.path) || "/",
            preloads
          }), {
            headers
          });
        } catch (err) {
          var _err_stack;
          console.error(`[one] Error rendering SSR route ${route2.page}

  ${(_err_stack = err == null ? void 0 : err.stack) !== null && _err_stack !== void 0 ? _err_stack : err}

  url: ${url}`);
        }
      }
    }
  }), htmlFiles = {};
  for (var key in routeMap) {
    var info = routeToBuildInfo[key];
    (info == null ? void 0 : info.type) !== "ssr" && (htmlFiles[key] = await import_fs_extra.default.readFile((0, import_node_path.join)("dist/client", routeMap[key]), "utf-8"));
  }
  app.use(async function(context, next) {
    var html = htmlFiles[context.req.path];
    if (html)
      return context.html(html);
    try {
      var request = context.req.raw, response = await handleRequest.handler(request);
      if (response) {
        if (isResponse(response)) {
          if (isStatusRedirect(response.status)) {
            var location = `${response.headers.get("location") || ""}`;
            return response.headers.forEach(function(value, key2) {
              context.header(key2, value);
            }), context.redirect(location, response.status);
          }
          if (isAPIRequest.get(request))
            try {
              response.headers.set("Cache-Control", "no-store");
            } catch (err) {
              console.info(`Error udpating cache header on api route "${context.req.path}" to no-store, it is ${response.headers.get("cache-control")}, continue`, err);
            }
          return response;
        }
        return context.json(response, 200, isAPIRequest.get(request) ? {
          "Cache-Control": "no-store"
        } : void 0);
      }
    } catch (err) {
      console.error(` [one] Error handling request: ${err.stack}`);
    }
    await next();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  serve
});
//# sourceMappingURL=serve.js.map
