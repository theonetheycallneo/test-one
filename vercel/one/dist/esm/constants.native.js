var isWebClient = !1, isWebServer = !1, isNative = !0, _process_env_ONE_CACHE_KEY, CACHE_KEY = `${(_process_env_ONE_CACHE_KEY = process.env.ONE_CACHE_KEY) !== null && _process_env_ONE_CACHE_KEY !== void 0 ? _process_env_ONE_CACHE_KEY : Math.round(Math.random() * 1e8)}`, LOADER_JS_POSTFIX_UNCACHED = "_vxrn_loader.js", LOADER_JS_POSTFIX_REGEX = new RegExp(`_\\d+${LOADER_JS_POSTFIX_UNCACHED}$`), LOADER_JS_POSTFIX = `_${CACHE_KEY}${LOADER_JS_POSTFIX_UNCACHED}`, PRELOAD_JS_POSTFIX = `_${CACHE_KEY}_preload.js`;
export {
  CACHE_KEY,
  LOADER_JS_POSTFIX,
  LOADER_JS_POSTFIX_REGEX,
  LOADER_JS_POSTFIX_UNCACHED,
  PRELOAD_JS_POSTFIX,
  isNative,
  isWebClient,
  isWebServer
};
//# sourceMappingURL=constants.js.map
