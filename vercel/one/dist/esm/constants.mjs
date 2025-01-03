const isWebClient = typeof window < "u",
  isWebServer = typeof window > "u",
  isNative = !1,
  CACHE_KEY = `${process.env.ONE_CACHE_KEY ?? Math.round(Math.random() * 1e8)}`,
  LOADER_JS_POSTFIX_UNCACHED = "_vxrn_loader.js",
  LOADER_JS_POSTFIX_REGEX = new RegExp(`_\\d+${LOADER_JS_POSTFIX_UNCACHED}$`),
  LOADER_JS_POSTFIX = `_${CACHE_KEY}${LOADER_JS_POSTFIX_UNCACHED}`,
  PRELOAD_JS_POSTFIX = `_${CACHE_KEY}_preload.js`;
export { CACHE_KEY, LOADER_JS_POSTFIX, LOADER_JS_POSTFIX_REGEX, LOADER_JS_POSTFIX_UNCACHED, PRELOAD_JS_POSTFIX, isNative, isWebClient, isWebServer };
//# sourceMappingURL=constants.mjs.map
