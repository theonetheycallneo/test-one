import { useEffect, useRef } from "react";
import { getLoaderPath } from "./cleanUrl";
import { useActiveParams, useParams } from "./hooks";
import { resolveHref } from "./link/href";
import { useRouteNode } from "./Route";
import { preloadingLoader } from "./router/router";
import { dynamicImport } from "./utils/dynamicImport";
import { weakKey } from "./utils/weakKey";
const promises = {}, errors = {}, loadedData = {};
function useLoader(loader) {
  const preloadedProps = globalThis.__vxrnLoaderProps__;
  if (typeof window > "u")
    return useAsyncFn(
      loader,
      preloadedProps || {
        params: useActiveParams()
      }
    );
  const isNative = !1, routeNode = useRouteNode(), params = useParams(), pathName = "/" + resolveHref({ pathname: routeNode?.route || "", params }).replace(/index$/, ""), currentPath = (isNative ? null : globalThis.__vxrntodopath) || // @zetavg: not sure why we're using `globalThis['__vxrntodopath']` here, but this breaks native when switching between tabs where the value stays with the previous path, so ignoring this on native
  // TODO likely either not needed or needs proper path from server side
  (typeof window < "u" ? window.location?.pathname || pathName : "/"), preloadedData = preloadedProps?.path === currentPath ? globalThis.__vxrnLoaderData__ : void 0, currentData = useRef(preloadedData);
  if (useEffect(() => {
    preloadedData && (loadedData[currentPath] = preloadedData, delete globalThis.__vxrnLoaderData__);
  }, [preloadedData]), errors[currentPath])
    throw errors[currentPath];
  const loaded = loadedData[currentPath];
  if (typeof loaded < "u")
    return loaded;
  if (!preloadedData) {
    if (preloadingLoader[currentPath] && (typeof preloadingLoader[currentPath] == "function" && (preloadingLoader[currentPath] = preloadingLoader[currentPath]()), promises[currentPath] = preloadingLoader[currentPath].then((val) => {
      loadedData[currentPath] = val;
    }).catch((err) => {
      console.error("Error loading loader", err), errors[currentPath] = err, delete promises[currentPath], delete preloadingLoader[currentPath];
    })), !promises[currentPath]) {
      const getData = async () => {
        const loaderJSUrl = getLoaderPath(currentPath, !0);
        try {
          const response = await (async () => {
            if (isNative) {
              const nativeLoaderJSUrl = `${loaderJSUrl}?platform=ios`;
              try {
                const loaderJsCodeResp = await fetch(nativeLoaderJSUrl);
                if (!loaderJsCodeResp.ok)
                  throw new Error(`Response not ok: ${loaderJsCodeResp.status}`);
                const loaderJsCode = await loaderJsCodeResp.text(), result = eval(
                  `() => { var exports = {}; ${loaderJsCode}; return exports; }`
                )();
                if (typeof result.loader != "function")
                  throw new Error("Loader code isn't exporting a `loader` function");
                return result;
              } catch (e) {
                return console.error(`Error fetching loader from URL: ${nativeLoaderJSUrl}, ${e}`), { loader: () => ({}) };
              }
            }
            return await dynamicImport(loaderJSUrl);
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
const results = /* @__PURE__ */ new Map(), started = /* @__PURE__ */ new Map();
function useAsyncFn(val, props) {
  const key = (val ? weakKey(val) : "") + JSON.stringify(props);
  if (val && !started.get(key)) {
    started.set(key, !0);
    let next = val(props);
    next instanceof Promise && (next = next.then((final) => {
      results.set(key, final);
    }).catch((err) => {
      console.error("Error running loader()", err), results.set(key, void 0);
    })), results.set(key, next);
  }
  const current = results.get(key);
  if (current instanceof Promise)
    throw current;
  return current;
}
export {
  useLoader
};
//# sourceMappingURL=useLoader.js.map
