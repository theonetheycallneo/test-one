import { isNative, LOADER_JS_POSTFIX, LOADER_JS_POSTFIX_REGEX, PRELOAD_JS_POSTFIX } from "./constants";
import { getURL } from "./getURL";
import { removeSearch } from "./utils/removeSearch";
function cleanUrl(path) {
  return removeSearch(path).replaceAll("/", "_").replace(/_$/, "");
}
var isClient = typeof window < "u", clientSideURL = isClient ? getURL() : "";
function getPreloadPath(currentPath) {
  return `${clientSideURL}/assets/${cleanUrl(currentPath.slice(1))}${PRELOAD_JS_POSTFIX}`;
}
function getLoaderPath(currentPath) {
  var includeUrl = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : isNative, baseURL = includeUrl ? getURL() : "", devPath = process.env.NODE_ENV === "development" ? "/_one" : "", currentPathUrl = new URL(currentPath, "http://example.com");
  return `${baseURL}${devPath}/assets/${cleanUrl(currentPathUrl.pathname.slice(1))}${LOADER_JS_POSTFIX}`;
}
function getPathFromLoaderPath(loaderPath) {
  return loaderPath.replace(LOADER_JS_POSTFIX_REGEX, "").replace(/^(\/_one)?\/assets/, "").replaceAll(/_/g, "/");
}
export {
  getLoaderPath,
  getPathFromLoaderPath,
  getPreloadPath
};
//# sourceMappingURL=cleanUrl.js.map
