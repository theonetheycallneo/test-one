var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: !0
  }) : target, mod)),
  __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: !0
  }), mod);
var extractPathFromURL_exports = {};
__export(extractPathFromURL_exports, {
  adjustPathname: () => adjustPathname,
  extractExpoPathFromURL: () => extractExpoPathFromURL
});
module.exports = __toCommonJS(extractPathFromURL_exports);
var import_url_parse = __toESM(require("url-parse"), 1);
function extractExactPathFromURL(url) {
  if (
  // If a universal link / app link / web URL is used, we should use the path
  // from the URL, while stripping the origin.
  url.match(/^https?:\/\//)) {
    const {
      origin,
      href
    } = new import_url_parse.default(url);
    return href.replace(origin, "");
  }
  return fromDeepLink(url);
}
function isExpoDevelopmentClient(url) {
  return !!url.hostname.match(/^expo-development-client$/);
}
function fromDeepLink(url) {
  const res = new import_url_parse.default(url, !0);
  if (isExpoDevelopmentClient(res)) {
    if (!res.query || !res.query.url) return "";
    const incomingUrl = res.query.url;
    return extractExactPathFromURL(decodeURI(incomingUrl));
  }
  const qs = res.query ? Object.entries(res.query).map(([k, v]) => `${k}=${decodeURIComponent(v)}`).join("&") : "";
  let results = "";
  return res.host && (results += res.host), res.pathname && (results += res.pathname), qs && (results += "?" + qs), results;
}
function extractExpoPathFromURL(url = "") {
  return extractExactPathFromURL(url).replace(/^\//, "");
}
function adjustPathname(url) {
  return url.hostname === "exp.host" || url.hostname === "u.expo.dev" ? url.pathname.split("/").slice(2).join("/") : url.pathname;
}