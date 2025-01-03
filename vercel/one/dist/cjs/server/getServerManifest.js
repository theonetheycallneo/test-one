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
var getServerManifest_exports = {};
__export(getServerManifest_exports, {
  getServerManifest: () => getServerManifest,
  parseParam: () => parseParam
});
module.exports = __toCommonJS(getServerManifest_exports);
var import_matchers = require("../matchers"), import_sortRoutes = require("../sortRoutes");
function isNotFoundRoute(route) {
  return !!(route.dynamic && route.dynamic[route.dynamic.length - 1].notFound);
}
function getServerManifest(route) {
  function getFlatNodes(route2, layouts) {
    if (route2.children.length)
      return route2.children.flatMap((child) => getFlatNodes(child, [...layouts || [], route2]));
    let key;
    return route2.type === "api" ? key = (0, import_matchers.getContextKey)(route2.contextKey).replace(/\/index$/, "") || "/" : key = layouts?.flatMap((route3) => {
      const key2 = (0, import_matchers.getContextKey)(route3.route).replace(/\/index$/, "") || "/";
      return key2 === "/" || key2.startsWith("/(") ? [] : [key2];
    }) + (0, import_matchers.getContextKey)(route2.route).replace(/\/index$/, "") || "/", [[key, { ...route2, layouts }]];
  }
  const flat = getFlatNodes(route).sort(([, a], [, b]) => (0, import_sortRoutes.sortRoutes)(b, a)).reverse(), pathToRoute = {};
  for (const [path, route2] of flat)
    pathToRoute[path] && (console.warn(`
[one] \u274C Duplicate routes error`), console.warn("  Multiple routes at the same path! One route will always win over the other."), console.warn(`    path: ${path}`), console.warn(`    first route: ${pathToRoute[path].contextKey}`), console.warn(`    second route: ${route2.contextKey}
`)), pathToRoute[path] = route2;
  const apiRoutes = [], pageRoutes = [];
  for (const [path, node] of flat) {
    if (node.type === "api") {
      apiRoutes.push(getGeneratedNamedRouteRegex(path, node));
      continue;
    }
    pageRoutes.push(getGeneratedNamedRouteRegex(path, node));
  }
  return {
    apiRoutes,
    pageRoutes
  };
}
function getGeneratedNamedRouteRegex(normalizedRoute, node) {
  return {
    ...getNamedRouteRegex(normalizedRoute, node),
    generated: !0,
    isNotFound: isNotFoundRoute(node)
  };
}
function getNamedRouteRegex(normalizedRoute, node) {
  const result = getNamedRegex(normalizedRoute);
  return {
    file: node.contextKey,
    page: (0, import_matchers.getContextKey)(node.route),
    type: node.type,
    namedRegex: result.namedRegex,
    routeKeys: result.routeKeys,
    layouts: node.layouts
  };
}
function buildGetSafeRouteKey() {
  let currentCharCode = 96, currentLength = 1;
  return () => {
    let result = "", incrementNext = !0;
    for (let i = 0; i < currentLength; i++)
      incrementNext && (currentCharCode++, currentCharCode > 122 ? (currentCharCode = 97, incrementNext = !0) : incrementNext = !1), result = String.fromCharCode(currentCharCode) + result;
    return incrementNext && (currentLength++, currentCharCode = 96), result;
  };
}
function removeTrailingSlash(route) {
  return route.replace(/\/$/, "") || "/";
}
function getNamedRegex(route) {
  const segments = removeTrailingSlash(route).slice(1).split("/"), getSafeRouteKey = buildGetSafeRouteKey(), routeKeys = {};
  return {
    namedRegex: `^${segments.map((segment, index) => {
      if (segment === "+not-found" && index === segments.length - 1 && (segment = "[...not-found]"), /^\[.*\]$/.test(segment)) {
        const { name, optional, repeat } = parseParam(segment);
        let cleanedKey = name.replace(/\W/g, ""), invalidKey = !1;
        return (cleanedKey.length === 0 || cleanedKey.length > 30) && (invalidKey = !0), Number.isNaN(Number.parseInt(cleanedKey.slice(0, 1), 10)) || (invalidKey = !0), cleanedKey in routeKeys && (invalidKey = !0), invalidKey && (cleanedKey = getSafeRouteKey()), routeKeys[cleanedKey] = name, repeat ? optional ? `(?:/(?<${cleanedKey}>.+?))?` : `/(?<${cleanedKey}>.+?)` : `/(?<${cleanedKey}>[^/]+?)`;
      }
      if (insideParensRegex.test(segment)) {
        const groupName = (0, import_matchers.matchGroupName)(segment).split(",").map((group) => group.trim()).filter(Boolean);
        return groupName.length > 1 ? `(?:/${`\\((?:${groupName.map(escapeStringRegexp).join("|")})\\)`})?` : `(?:/${escapeStringRegexp(segment)})?`;
      }
      return `/${escapeStringRegexp(segment)}`;
    }).join("")}(?:/)?$`,
    routeKeys
  };
}
const insideBracketsRegex = /^\[.*\]$/, insideParensRegex = /^\(.*\)$/, tripleDotRegex = /^\.\.\./, replaceRegex = /[|\\{}()[\]^$+*?.-]/g, hasRegExpRegex = /[|\\{}()[\]^$+*?.-]/;
function escapeStringRegexp(str) {
  return hasRegExpRegex.test(str) ? str.replace(replaceRegex, "\\$&") : str;
}
function parseParam(param) {
  let repeat = !1, optional = !1, name = param;
  return insideBracketsRegex.test(name) && (optional = !0, name = name.slice(1, -1)), tripleDotRegex.test(name) && (repeat = !0, name = name.slice(3)), { name, repeat, optional };
}
//# sourceMappingURL=getServerManifest.js.map
