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
var url_exports = {};
__export(url_exports, {
  getStaticUrlFromOneRouter: () => getStaticUrlFromOneRouter
});
module.exports = __toCommonJS(url_exports);
var protocolWarningString = '{ plugins: [["router", { origin: "...<URL>..." }]] }';
function memoize(fn) {
  var cache = {};
  return function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)
      args[_key] = arguments[_key];
    var key = JSON.stringify(args);
    if (cache[key])
      return cache[key];
    var result = fn(...args);
    return cache[key] = result, result;
  };
}
function sanitizeUrl(url) {
  var _parsed, parsed = new URL(url), validProtocol = !parsed.protocol || parsed.protocol === "http:" || parsed.protocol === "https:";
  validProtocol || throwOrAlert(`One Head: Native origin has invalid protocol "${parsed.protocol}" for URL in Config: ${protocolWarningString}.`), parsed.pathname = "", parsed.search = "", parsed.hash = "";
  var _protocol;
  return (_protocol = (_parsed = parsed).protocol) !== null && _protocol !== void 0 || (_parsed.protocol = "https:"), parsed.toString().replace(/\/$/, "");
}
var memoSanitizeUrl = memoize(sanitizeUrl);
function getUrlFromConstants() {
  var origin = process.env.One_ORIGIN;
  return origin ? (origin.match(/^http(s)?:\/\//) || console.warn(`One Head: origin "${origin}" is missing a \`https://\` protocol. ${protocolWarningString}.`), memoSanitizeUrl(origin)) : (throwOrAlert(`One Head: Add the handoff origin to the Config (requires rebuild). Add the Config Plugin ${protocolWarningString}, where \`origin\` is the hosted URL.`), "https://expo.dev");
}
function throwOrAlert(msg) {
  console.warn(`TODO FIX: ${msg}`);
}
function getStaticUrlFromOneRouter(pathname) {
  return getUrlFromConstants() + pathname;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getStaticUrlFromOneRouter
});
//# sourceMappingURL=url.js.map
