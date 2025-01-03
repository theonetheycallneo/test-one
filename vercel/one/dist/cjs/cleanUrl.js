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
var cleanUrl_exports = {};
__export(cleanUrl_exports, {
  getLoaderPath: () => getLoaderPath,
  getPathFromLoaderPath: () => getPathFromLoaderPath,
  getPreloadPath: () => getPreloadPath
});
module.exports = __toCommonJS(cleanUrl_exports);
var import_constants = require("./constants"), import_getURL = require("./getURL"), import_removeSearch = require("./utils/removeSearch");
function cleanUrl(path) {
  return (0, import_removeSearch.removeSearch)(path).replaceAll("/", "_").replace(/_$/, "");
}
const isClient = typeof window < "u", clientSideURL = isClient ? (0, import_getURL.getURL)() : "";
function getPreloadPath(currentPath) {
  return `${clientSideURL}/assets/${cleanUrl(currentPath.slice(1))}${import_constants.PRELOAD_JS_POSTFIX}`;
}
function getLoaderPath(currentPath, includeUrl = import_constants.isNative) {
  const baseURL = includeUrl ? (0, import_getURL.getURL)() : "", devPath = process.env.NODE_ENV === "development" ? "/_one" : "", currentPathUrl = new URL(
    currentPath,
    "http://example.com"
    /* not important, just for `new URL()` to work */
  );
  return `${baseURL}${devPath}/assets/${cleanUrl(currentPathUrl.pathname.slice(1))}${import_constants.LOADER_JS_POSTFIX}`;
}
function getPathFromLoaderPath(loaderPath) {
  return loaderPath.replace(import_constants.LOADER_JS_POSTFIX_REGEX, "").replace(/^(\/_one)?\/assets/, "").replaceAll(/_/g, "/");
}
//# sourceMappingURL=cleanUrl.js.map
