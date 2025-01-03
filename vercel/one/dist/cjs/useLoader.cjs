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
var useLoader_exports = {};
__export(useLoader_exports, {
  useLoader: () => useLoader
});
module.exports = __toCommonJS(useLoader_exports);
var import_react = require("react"),
  import_cleanUrl = require("./cleanUrl.cjs"),
  import_hooks = require("./hooks.cjs"),
  import_href = require("./link/href.cjs"),
  import_Route = require("./Route.cjs"),
  import_router = require("./router/router.cjs"),
  import_dynamicImport = require("./utils/dynamicImport.cjs"),
  import_weakKey = require("./utils/weakKey.cjs");
const promises = {},
  errors = {},
  loadedData = {};
function useLoader(loader) {
  const preloadedProps = globalThis.__vxrnLoaderProps__;
  if (typeof window > "u") return useAsyncFn(loader, preloadedProps || {
    params: (0, import_hooks.useActiveParams)()
  });
  const isNative = !1,
    routeNode = (0, import_Route.useRouteNode)(),
    params = (0, import_hooks.useParams)(),
    pathName = "/" + (0, import_href.resolveHref)({
      pathname: routeNode?.route || "",
      params
    }).replace(/index$/, ""),
    currentPath = (isNative ? null : globalThis.__vxrntodopath) || (
    // @zetavg: not sure why we're using `globalThis['__vxrntodopath']` here, but this breaks native when switching between tabs where the value stays with the previous path, so ignoring this on native
    // TODO likely either not needed or needs proper path from server side
    typeof window < "u" ? window.location?.pathname || pathName : "/"),
    preloadedData = preloadedProps?.path === currentPath ? globalThis.__vxrnLoaderData__ : void 0,
    currentData = (0, import_react.useRef)(preloadedData);
  if ((0, import_react.useEffect)(() => {
    preloadedData && (loadedData[currentPath] = preloadedData, delete globalThis.__vxrnLoaderData__);
  }, [preloadedData]), errors[currentPath]) throw errors[currentPath];
  const loaded = loadedData[currentPath];
  if (typeof loaded < "u") return loaded;
  if (!preloadedData) {
    if (import_router.preloadingLoader[currentPath] && (typeof import_router.preloadingLoader[currentPath] == "function" && (import_router.preloadingLoader[currentPath] = import_router.preloadingLoader[currentPath]()), promises[currentPath] = import_router.preloadingLoader[currentPath].then(val => {
      loadedData[currentPath] = val;
    }).catch(err => {
      console.error("Error loading loader", err), errors[currentPath] = err, delete promises[currentPath], delete import_router.preloadingLoader[currentPath];
    })), !promises[currentPath]) {
      const getData = async () => {
        const loaderJSUrl = (0, import_cleanUrl.getLoaderPath)(currentPath, !0);
        try {
          const response = await (async () => {
            if (isNative) {
              const nativeLoaderJSUrl = `${loaderJSUrl}?platform=ios`;
              try {
                const loaderJsCodeResp = await fetch(nativeLoaderJSUrl);
                if (!loaderJsCodeResp.ok) throw new Error(`Response not ok: ${loaderJsCodeResp.status}`);
                const loaderJsCode = await loaderJsCodeResp.text(),
                  result = eval(`() => { var exports = {}; ${loaderJsCode}; return exports; }`)();
                if (typeof result.loader != "function") throw new Error("Loader code isn't exporting a `loader` function");
                return result;
              } catch (e) {
                return console.error(`Error fetching loader from URL: ${nativeLoaderJSUrl}, ${e}`), {
                  loader: () => ({})
                };
              }
            }
            return await (0, import_dynamicImport.dynamicImport)(loaderJSUrl);
          })();
          return loadedData[currentPath] = response.loader(), loadedData[currentPath];
        } catch (err) {
          return console.error(`Error calling loader: ${err}`), errors[currentPath] = err, delete promises[currentPath], null;
        }
      };
      promises[currentPath] = getData();
    }
    throw promises[currentPath];
  }
  return currentData.current;
}
const results = /* @__PURE__ */new Map(),
  started = /* @__PURE__ */new Map();
function useAsyncFn(val, props) {
  const key = (val ? (0, import_weakKey.weakKey)(val) : "") + JSON.stringify(props);
  if (val && !started.get(key)) {
    started.set(key, !0);
    let next = val(props);
    next instanceof Promise && (next = next.then(final => {
      results.set(key, final);
    }).catch(err => {
      console.error("Error running loader()", err), results.set(key, void 0);
    })), results.set(key, next);
  }
  const current = results.get(key);
  if (current instanceof Promise) throw current;
  return current;
}