const protocolWarningString = '{ plugins: [["router", { origin: "...<URL>..." }]] }';
function memoize(fn) {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const result = fn(...args);
    return cache[key] = result, result;
  };
}
function sanitizeUrl(url) {
  const parsed = new URL(url);
  return !parsed.protocol || parsed.protocol === "http:" || parsed.protocol === "https:" || throwOrAlert(`One Head: Native origin has invalid protocol "${parsed.protocol}" for URL in Config: ${protocolWarningString}.`), parsed.pathname = "", parsed.search = "", parsed.hash = "", parsed.protocol ??= "https:", parsed.toString().replace(/\/$/, "");
}
const memoSanitizeUrl = memoize(sanitizeUrl);
function getUrlFromConstants() {
  const origin = process.env.One_ORIGIN;
  return origin ? (origin.match(/^http(s)?:\/\//) || console.warn(`One Head: origin "${origin}" is missing a \`https://\` protocol. ${protocolWarningString}.`), memoSanitizeUrl(origin)) : (throwOrAlert(`One Head: Add the handoff origin to the Config (requires rebuild). Add the Config Plugin ${protocolWarningString}, where \`origin\` is the hosted URL.`), "https://expo.dev");
}
function throwOrAlert(msg) {
  console.warn(`TODO FIX: ${msg}`);
}
function getStaticUrlFromOneRouter(pathname) {
  return getUrlFromConstants() + pathname;
}
export { getStaticUrlFromOneRouter };
//# sourceMappingURL=url.mjs.map
