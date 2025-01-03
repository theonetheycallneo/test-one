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
var fileSystemRouterPlugin_exports = {};
__export(fileSystemRouterPlugin_exports, {
  createFileSystemRouterPlugin: () => createFileSystemRouterPlugin
});
module.exports = __toCommonJS(fileSystemRouterPlugin_exports);
var import_node_path = require("node:path"), import_perfect_debounce = require("perfect-debounce"), import_vite = require("vite"), import_createHandleRequest = require("../../createHandleRequest"), import_isResponse = require("../../utils/isResponse"), import_isStatus = require("../../utils/isStatus"), import_promiseWithResolvers = require("../../utils/promiseWithResolvers"), import_constants = require("../../vite/constants"), import_replaceLoader = require("../../vite/replaceLoader"), import_resolveAPIRequest = require("../../vite/resolveAPIRequest"), import_virtualEntryPlugin = require("./virtualEntryPlugin");
function _type_of(obj) {
  "@swc/helpers - typeof";
  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var USE_SERVER_ENV = !1;
//!!process.env.USE_SERVER_ENV
function createFileSystemRouterPlugin(options) {
  var preloads = [
    "/@vite/client",
    import_virtualEntryPlugin.virtalEntryIdClient
  ], runner, server, handleRequest = createRequestHandler(), renderPromise = null;
  function createRequestHandler() {
    return (0, import_createHandleRequest.createHandleRequest)(options, {
      async handleSSR(param) {
        var { route, url, loaderProps } = param;
        if (console.info(` \u24F5  [${route.type}] ${url} resolved to ${route.file}`), route.type === "spa")
          return `<html><head>
            <script>globalThis['global'] = globalThis</script>
            <script>globalThis['__vxrnIsSPA'] = true</script>
            <script type="module">
              import { injectIntoGlobalHook } from "/@react-refresh";
              injectIntoGlobalHook(window);
              window.$RefreshReg$ = () => {};
              window.$RefreshSig$ = () => (type) => type;
            </script>
            <script type="module" src="/@vite/client" async=""></script>
            <script type="module" src="/@id/__x00__virtual:one-entry" async=""></script>
          </head></html>`;
        renderPromise && await renderPromise;
        var { promise, resolve } = (0, import_promiseWithResolvers.promiseWithResolvers)();
        renderPromise = promise;
        try {
          var _globalThis___vxrnresetState, _globalThis, _exported_loader, routeFile = (0, import_node_path.join)("app", route.file);
          runner.clearCache(), (_globalThis___vxrnresetState = (_globalThis = globalThis).__vxrnresetState) === null || _globalThis___vxrnresetState === void 0 || _globalThis___vxrnresetState.call(_globalThis);
          var exported = routeFile === "" ? {} : await runner.import(routeFile), loaderData = await ((_exported_loader = exported.loader) === null || _exported_loader === void 0 ? void 0 : _exported_loader.call(exported, loaderProps));
          eval("process.env.TAMAGUI_IS_SERVER = '1'");
          var entry = await runner.import(import_virtualEntryPlugin.virtualEntryId), render = entry.default.render;
          globalThis.__vxrnLoaderData__ = loaderData, globalThis.__vxrnLoaderProps__ = loaderProps, import_constants.LoaderDataCache[route.file] = loaderData;
          var is404 = route.isNotFound || !exported.default, html = await render({
            loaderData,
            loaderProps,
            path: (loaderProps == null ? void 0 : loaderProps.path) || "/",
            preloads
          });
          return is404 ? new Response(html, {
            status: 404,
            headers: {
              "Content-Type": "text/html"
            }
          }) : html;
        } catch (err) {
          console.error(`SSR error while loading file ${route.file} from URL ${url.href}
`, err);
          var title = `Error rendering ${url.pathname} on server`, message = err instanceof Error ? err.message : `${err}`, stack = err instanceof Error && err.stack || "", isDuplicateReactError = /at (useEffect|useState|useReducer|useContext|useLayoutEffect)\s*\(.*?react\.development\.js/g.test(stack), subMessage = isDuplicateReactError ? `
            <h2>Duplicate React Error</h2>
            <p style="font-size: 18px; line-height: 24px; max-width: 850px;">Note: These types of errors happen during SSR because One needs all dependencies that use React to be optimized. Find the dependency on the line after the react.development.js line below to find the failing dependency. So long as that dependency has "react" as a sub-dependency, you can add it to your package.json and One will optimize it automatically. If it doesn't list it properly, you can fix this manually by changing your vite.config.ts One plugin to add "one({ deps: { depName: true })" so One optimizes depName.</p>
          ` : "";
          return console.error(`${title}
 ${message}

${stack}
`), `
            <html>
              <body style="background: #000; color: #fff; padding: 5%; font-family: monospace; line-height: 2rem;">
                <h1 style="display: inline-flex; background: red; color: white; padding: 5px; margin: -5px;">${title}</h1>
                <h2>${message}</h2>
                ${subMessage}
                ${stack ? `<pre style="font-size: 15px; line-height: 24px; white-space: pre;">
                    ${stack}
                </pre>` : ""}
              </body>
            </html>
          `;
        } finally {
          resolve();
        }
      },
      async handleLoader(param2) {
        var { request, route: route2, url: url2, loaderProps: loaderProps2 } = param2, _this, _exported_loader2, routeFile2 = (0, import_node_path.join)("app", route2.file), transformedJS = (_this = await server.transformRequest(routeFile2)) === null || _this === void 0 ? void 0 : _this.code;
        if (!transformedJS)
          throw new Error("No transformed js returned");
        var exported2 = await runner.import(routeFile2), loaderData2 = await ((_exported_loader2 = exported2.loader) === null || _exported_loader2 === void 0 ? void 0 : _exported_loader2.call(exported2, loaderProps2));
        loaderData2 && (transformedJS = (0, import_replaceLoader.replaceLoader)({
          code: transformedJS,
          loaderData: loaderData2
        }));
        var platform = url2.searchParams.get("platform");
        if (platform === "ios" || platform === "android") {
          var environment = server.environments[platform || ""];
          if (!environment)
            throw new Error(`[handleLoader] No Vite environment found for platform '${platform}'`);
          var nativeTransformedJS = `exports.loader = () => (${JSON.stringify(loaderData2)});`;
          return nativeTransformedJS;
        }
        return transformedJS;
      },
      async handleAPI(param2) {
        var { request, route: route2, url: url2, loaderProps: loaderProps2 } = param2, result = await (0, import_resolveAPIRequest.resolveAPIRequest)(function() {
          return runner.import((0, import_node_path.join)("app", route2.file));
        }, request, (loaderProps2 == null ? void 0 : loaderProps2.params) || {});
        return result;
      }
    });
  }
  return {
    name: "one-router-fs",
    enforce: "post",
    apply: "serve",
    async config(userConfig) {
      if (handleRequest.manifest.pageRoutes) {
        var routesAndLayouts = [
          ...new Set(handleRequest.manifest.pageRoutes.flatMap(function(route2) {
            var _route_layouts;
            return [
              (0, import_node_path.join)("app", route2.file),
              ...((_route_layouts = route2.layouts) === null || _route_layouts === void 0 ? void 0 : _route_layouts.map(function(layout) {
                return (0, import_node_path.join)("app", layout.contextKey);
              })) || []
            ];
          }))
        ];
        return {
          optimizeDeps: {
            /**
            * This adds all our routes and layouts as entries which fixes initial load making
            * optimizeDeps be triggered which causes hard refreshes (also on initial navigations)
            *
            * see: https://vitejs.dev/config/dep-optimization-options.html#optimizedeps-entries
            * and: https://github.com/remix-run/remix/pull/9921
            */
            entries: routesAndLayouts
          }
        };
      }
    },
    // if (USE_SERVER_ENV) {
    //   return {
    //     appType: 'custom',
    //     environments: {
    //       server: {
    //         resolve: {
    //           dedupe: optimizeDeps.include,
    //           external: [],
    //           noExternal: optimizeDeps.include,
    //           conditions: ['vxrn-web'],
    //           alias: {
    //             react: '@vxrn/vendor/react-19',
    //             'react-dom': '@vxrn/vendor/react-dom-19',
    //           },
    //         },
    //         // webCompatible: true,
    //         nodeCompatible: true,
    //         dev: {
    //           optimizeDeps,
    //           createEnvironment(name, config) {
    //             const worker = new Worker(join(import.meta.dirname, 'server.js'))
    //             // const hot = new
    //             return new DevEnvironment(name, config, {
    //               hot: false,
    //               runner: {
    //                 transport: new RemoteEnvironmentTransport({
    //                   send: (data) => worker.postMessage(data),
    //                   onMessage: (listener) => worker.on('message', listener),
    //                 }),
    //               },
    //             })
    //           },
    //         },
    //       },
    //     },
    //   }
    // }
    configureServer(serverIn) {
      server = serverIn, runner = (0, import_vite.createServerModuleRunner)(USE_SERVER_ENV ? server.environments.server : server.environments.ssr);
      var appDir = (0, import_node_path.join)(process.cwd(), "app"), fileWatcherChangeListener = (0, import_perfect_debounce.debounce)(async function(type, path) {
        (type === "add" || type === "delete") && path.startsWith(appDir) && (handleRequest = createRequestHandler());
      }, 100);
      return server.watcher.addListener("all", fileWatcherChangeListener), function() {
        server.middlewares.use(async function(req, res, next) {
          try {
            var _options_web, redirects = (_options_web = options.web) === null || _options_web === void 0 ? void 0 : _options_web.redirects;
            if (redirects) {
              var url2 = new URL(req.url || "", `http://${req.headers.host}`), _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
              try {
                for (var _loop = function() {
                  var redirect = _step.value, regexStr = `^${redirect.source.replace(/:\w+/g, "([^/]+)")}$`, match = url2.pathname.match(new RegExp(regexStr));
                  if (match) {
                    var destination = redirect.destination, params = redirect.source.match(/:\w+/g);
                    return params && params.forEach(function(param2, index) {
                      destination = destination.replace(param2, match[index + 1] || "");
                    }), console.warn(` [one] redirecting via redirect: ${destination}`), res.writeHead(redirect.permanent ? 301 : 302, {
                      Location: destination
                    }), res.end(), {
                      v: void 0
                    };
                  }
                }, _iterator = redirects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
                  var _ret = _loop();
                  if (_type_of(_ret) === "object") return _ret.v;
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
            var reply = await handleRequest.handler(await convertIncomingMessageToRequest(req));
            if (!reply)
              return next();
            if (typeof reply != "string" && (0, import_isResponse.isResponse)(reply)) {
              if (reply.headers.forEach(function(value, key) {
                if (key === "set-cookie") {
                  var cookies = value.split(", "), _iteratorNormalCompletion2 = !0, _didIteratorError2 = !1, _iteratorError2 = void 0;
                  try {
                    for (var _iterator2 = cookies[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = !0) {
                      var cookie = _step2.value;
                      res.appendHeader("Set-Cookie", cookie);
                    }
                  } catch (err) {
                    _didIteratorError2 = !0, _iteratorError2 = err;
                  } finally {
                    try {
                      !_iteratorNormalCompletion2 && _iterator2.return != null && _iterator2.return();
                    } finally {
                      if (_didIteratorError2)
                        throw _iteratorError2;
                    }
                  }
                } else
                  res.setHeader(key, value);
              }), (0, import_isStatus.isStatusRedirect)(reply.status)) {
                var location = `${reply.headers.get("location") || ""}`;
                if (console.info(` \u21A6 Redirect ${location}`), location) {
                  res.writeHead(reply.status, {
                    Location: location
                  }), res.end();
                  return;
                }
                console.error("No location provided to redirected status reply", reply);
              }
              res.statusCode = reply.status, res.statusMessage = reply.statusText;
              var outString = "";
              reply.body && reply.body.locked && console.warn("Body is locked??");
              try {
                outString = reply.body ? await streamToString(reply.body) : "";
              } catch (err) {
                console.warn(`Error converting body in dev mode: ${err}`);
              }
              res.write(outString), res.end();
              return;
            }
            if (reply && typeof reply == "object") {
              res.setHeader("Content-Type", "application/json"), res.write(JSON.stringify(reply)), res.end();
              return;
            }
            res.write(reply), res.end();
            return;
          } catch (error) {
            console.error(`One routing error: ${error}`), next(error);
          }
          console.warn(`SSR handler didn't send a response for url: ${req.url}`);
        });
      };
    }
  };
}
async function streamToString(stream) {
  var reader = stream.getReader(), decoder = new TextDecoder(), result = "";
  try {
    for (; ; ) {
      var { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, {
        stream: !0
      });
    }
  } catch (error) {
    console.error("Error reading the stream:", error);
  } finally {
    reader.releaseLock();
  }
  return result;
}
var convertIncomingMessageToRequest = async function(req) {
  if (!req.originalUrl)
    throw new Error("Can't convert");
  var urlBase = `http://${req.headers.host}`, urlString = req.originalUrl || "", url2 = new URL(urlString, urlBase), headers = new Headers();
  for (var key in req.headers)
    req.headers[key] && headers.append(key, req.headers[key]);
  return new Request(url2, {
    method: req.method,
    body: [
      "POST",
      "PUT",
      "PATCH",
      "DELETE"
    ].includes(req.method || "") ? await readStream(req) : null,
    headers
  });
};
function readStream(stream) {
  return new Promise(function(resolve2, reject) {
    var chunks = [];
    stream.on("data", function(chunk) {
      return chunks.push(chunk);
    }), stream.on("end", function() {
      return resolve2(Buffer.concat(chunks));
    }), stream.on("error", reject);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createFileSystemRouterPlugin
});
//# sourceMappingURL=fileSystemRouterPlugin.js.map
