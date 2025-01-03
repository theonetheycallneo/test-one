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
var constants_exports = {};
__export(constants_exports, {
  CACHE_KEY: () => CACHE_KEY,
  LOADER_JS_POSTFIX: () => LOADER_JS_POSTFIX,
  LOADER_JS_POSTFIX_REGEX: () => LOADER_JS_POSTFIX_REGEX,
  LOADER_JS_POSTFIX_UNCACHED: () => LOADER_JS_POSTFIX_UNCACHED,
  PRELOAD_JS_POSTFIX: () => PRELOAD_JS_POSTFIX,
  isNative: () => isNative,
  isWebClient: () => isWebClient,
  isWebServer: () => isWebServer
});
module.exports = __toCommonJS(constants_exports);
var isWebClient = !1, isWebServer = !1, isNative = !0, _process_env_ONE_CACHE_KEY, CACHE_KEY = `${(_process_env_ONE_CACHE_KEY = process.env.ONE_CACHE_KEY) !== null && _process_env_ONE_CACHE_KEY !== void 0 ? _process_env_ONE_CACHE_KEY : Math.round(Math.random() * 1e8)}`, LOADER_JS_POSTFIX_UNCACHED = "_vxrn_loader.js", LOADER_JS_POSTFIX_REGEX = new RegExp(`_\\d+${LOADER_JS_POSTFIX_UNCACHED}$`), LOADER_JS_POSTFIX = `_${CACHE_KEY}${LOADER_JS_POSTFIX_UNCACHED}`, PRELOAD_JS_POSTFIX = `_${CACHE_KEY}_preload.js`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CACHE_KEY,
  LOADER_JS_POSTFIX,
  LOADER_JS_POSTFIX_REGEX,
  LOADER_JS_POSTFIX_UNCACHED,
  PRELOAD_JS_POSTFIX,
  isNative,
  isWebClient,
  isWebServer
});
//# sourceMappingURL=constants.js.map
