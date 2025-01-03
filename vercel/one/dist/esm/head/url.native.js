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
export {
  getStaticUrlFromOneRouter
};
//# sourceMappingURL=url.js.map
