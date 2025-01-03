import URL from "url-parse";
function extractExactPathFromURL(url) {
  if (
    // If a universal link / app link / web URL is used, we should use the path
    // from the URL, while stripping the origin.
    url.match(/^https?:\/\//)
  ) {
    var { origin, href } = new URL(url);
    return href.replace(origin, "");
  }
  return fromDeepLink(url);
}
function isExpoDevelopmentClient(url) {
  return !!url.hostname.match(/^expo-development-client$/);
}
function fromDeepLink(url) {
  var res = new URL(url, !0);
  if (isExpoDevelopmentClient(res)) {
    if (!res.query || !res.query.url)
      return "";
    var incomingUrl = res.query.url;
    return extractExactPathFromURL(decodeURI(incomingUrl));
  }
  var qs = res.query ? Object.entries(res.query).map(function(param) {
    var [k, v] = param;
    return `${k}=${decodeURIComponent(v)}`;
  }).join("&") : "", results = "";
  return res.host && (results += res.host), res.pathname && (results += res.pathname), qs && (results += "?" + qs), results;
}
function extractExpoPathFromURL() {
  var url = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  return extractExactPathFromURL(url).replace(/^\//, "");
}
function adjustPathname(url) {
  return url.hostname === "exp.host" || url.hostname === "u.expo.dev" ? url.pathname.split("/").slice(2).join("/") : url.pathname;
}
export {
  adjustPathname,
  extractExpoPathFromURL
};
//# sourceMappingURL=extractPathFromURL.js.map
