import URL from "url-parse";
function extractExactPathFromURL(url) {
  if (
  // If a universal link / app link / web URL is used, we should use the path
  // from the URL, while stripping the origin.
  url.match(/^https?:\/\//)) {
    const {
      origin,
      href
    } = new URL(url);
    return href.replace(origin, "");
  }
  return fromDeepLink(url);
}
function isExpoDevelopmentClient(url) {
  return !!url.hostname.match(/^expo-development-client$/);
}
function fromDeepLink(url) {
  const res = new URL(url, !0);
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
export { adjustPathname, extractExpoPathFromURL };
//# sourceMappingURL=extractPathFromURL.mjs.map
