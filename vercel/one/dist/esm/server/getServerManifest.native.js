import { getContextKey, matchGroupName } from "../matchers";
import { sortRoutes } from "../sortRoutes";
function isNotFoundRoute(route) {
  return !!(route.dynamic && route.dynamic[route.dynamic.length - 1].notFound);
}
function getServerManifest(route) {
  function getFlatNodes(route2, layouts) {
    if (route2.children.length)
      return route2.children.flatMap(function(child) {
        return getFlatNodes(child, [
          ...layouts || [],
          route2
        ]);
      });
    var key;
    if (route2.type === "api")
      key = getContextKey(route2.contextKey).replace(/\/index$/, "") || "/";
    else {
      var parentSegments = layouts?.flatMap(function(route3) {
        var key2 = getContextKey(route3.route).replace(/\/index$/, "") || "/";
        return key2 === "/" || key2.startsWith("/(") ? [] : [
          key2
        ];
      });
      key = parentSegments + getContextKey(route2.route).replace(/\/index$/, "") || "/";
    }
    return [
      [
        key,
        {
          ...route2,
          layouts
        }
      ]
    ];
  }
  var flat = getFlatNodes(route).sort(function(param, param1) {
    var [, a] = param, [, b] = param1;
    return sortRoutes(b, a);
  }).reverse(), pathToRoute = {}, _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
  try {
    for (var _iterator = flat[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var [path, _$route] = _step.value;
      pathToRoute[path] && (console.warn(`
[one] \u274C Duplicate routes error`), console.warn("  Multiple routes at the same path! One route will always win over the other."), console.warn(`    path: ${path}`), console.warn(`    first route: ${pathToRoute[path].contextKey}`), console.warn(`    second route: ${_$route.contextKey}
`)), pathToRoute[path] = _$route;
    }
  } catch (err) {
    _didIteratorError = !0, _iteratorError = err;
  } finally {
    try {
      !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
    } finally {
      if (_didIteratorError)
        throw _iteratorError;
    }
  }
  var apiRoutes = [], pageRoutes = [], _iteratorNormalCompletion1 = !0, _didIteratorError1 = !1, _iteratorError1 = void 0;
  try {
    for (var _iterator1 = flat[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = !0) {
      var [path1, node] = _step1.value;
      if (node.type === "api") {
        apiRoutes.push(getGeneratedNamedRouteRegex(path1, node));
        continue;
      }
      pageRoutes.push(getGeneratedNamedRouteRegex(path1, node));
    }
  } catch (err) {
    _didIteratorError1 = !0, _iteratorError1 = err;
  } finally {
    try {
      !_iteratorNormalCompletion1 && _iterator1.return != null && _iterator1.return();
    } finally {
      if (_didIteratorError1)
        throw _iteratorError1;
    }
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
  var result = getNamedRegex(normalizedRoute);
  return {
    file: node.contextKey,
    page: getContextKey(node.route),
    type: node.type,
    namedRegex: result.namedRegex,
    routeKeys: result.routeKeys,
    layouts: node.layouts
  };
}
function buildGetSafeRouteKey() {
  var currentCharCode = 96, currentLength = 1;
  return function() {
    for (var result = "", incrementNext = !0, i = 0; i < currentLength; i++)
      incrementNext && (currentCharCode++, currentCharCode > 122 ? (currentCharCode = 97, incrementNext = !0) : incrementNext = !1), result = String.fromCharCode(currentCharCode) + result;
    return incrementNext && (currentLength++, currentCharCode = 96), result;
  };
}
function removeTrailingSlash(route) {
  return route.replace(/\/$/, "") || "/";
}
function getNamedRegex(route) {
  var segments = removeTrailingSlash(route).slice(1).split("/"), getSafeRouteKey = buildGetSafeRouteKey(), routeKeys = {}, routeSegments = segments.map(function(segment, index) {
    if (segment === "+not-found" && index === segments.length - 1 && (segment = "[...not-found]"), /^\[.*\]$/.test(segment)) {
      var { name, optional, repeat } = parseParam(segment), cleanedKey = name.replace(/\W/g, ""), invalidKey = !1;
      return (cleanedKey.length === 0 || cleanedKey.length > 30) && (invalidKey = !0), Number.isNaN(Number.parseInt(cleanedKey.slice(0, 1), 10)) || (invalidKey = !0), cleanedKey in routeKeys && (invalidKey = !0), invalidKey && (cleanedKey = getSafeRouteKey()), routeKeys[cleanedKey] = name, repeat ? optional ? `(?:/(?<${cleanedKey}>.+?))?` : `/(?<${cleanedKey}>.+?)` : `/(?<${cleanedKey}>[^/]+?)`;
    }
    if (insideParensRegex.test(segment)) {
      var groupName = matchGroupName(segment).split(",").map(function(group) {
        return group.trim();
      }).filter(Boolean);
      if (groupName.length > 1) {
        var optionalSegment = `\\((?:${groupName.map(escapeStringRegexp).join("|")})\\)`;
        return `(?:/${optionalSegment})?`;
      }
      return `(?:/${escapeStringRegexp(segment)})?`;
    }
    return `/${escapeStringRegexp(segment)}`;
  }).join("");
  return {
    namedRegex: `^${routeSegments}(?:/)?$`,
    routeKeys
  };
}
var insideBracketsRegex = /^\[.*\]$/, insideParensRegex = /^\(.*\)$/, tripleDotRegex = /^\.\.\./, replaceRegex = /[|\\{}()[\]^$+*?.-]/g, hasRegExpRegex = /[|\\{}()[\]^$+*?.-]/;
function escapeStringRegexp(str) {
  return hasRegExpRegex.test(str) ? str.replace(replaceRegex, "\\$&") : str;
}
function parseParam(param) {
  var repeat = !1, optional = !1, name = param;
  return insideBracketsRegex.test(name) && (optional = !0, name = name.slice(1, -1)), tripleDotRegex.test(name) && (repeat = !0, name = name.slice(3)), {
    name,
    repeat,
    optional
  };
}
export {
  getServerManifest,
  parseParam
};
//# sourceMappingURL=getServerManifest.js.map
