import { getRoutes } from "../getRoutes";
import { isTypedRoute, removeSupportedExtensions } from "../matchers";
var CATCH_ALL = /\[\.\.\..+?\]/g, SLUG = /\[.+?\]/g;
function getTypedRoutesDeclarationFile(ctx) {
  var staticRoutes = /* @__PURE__ */ new Set(), dynamicRoutes = /* @__PURE__ */ new Set(), dynamicRouteContextKeys = /* @__PURE__ */ new Set();
  return walkRouteNode(
    getRoutes(ctx, {
      platformRoutes: !1,
      // We don't need to generate platform specific routes
      ignoreEntryPoints: !0,
      ignoreRequireErrors: !0
    }),
    // importMode: 'async',
    "",
    staticRoutes,
    dynamicRoutes,
    dynamicRouteContextKeys
  ), `
import type { OneRouter } from 'one'

declare module 'one' {
  export namespace OneRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: ${setToUnionType(staticRoutes)}
      DynamicRoutes: ${setToUnionType(dynamicRoutes)}
      DynamicRouteTemplate: ${setToUnionType(dynamicRouteContextKeys)}
      IsTyped: true
    }
  }
}
`.trim();
}
function walkRouteNode(routeNode, parentRoutePath, staticRoutes, dynamicRoutes, dynamicRouteContextKeys) {
  if (routeNode) {
    addRouteNode(routeNode, parentRoutePath, staticRoutes, dynamicRoutes, dynamicRouteContextKeys), parentRoutePath = `${removeSupportedExtensions(`${parentRoutePath}/${routeNode.route}`).replace(/\/?index$/, "")}`;
    var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
    try {
      for (var _iterator = routeNode.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
        var child = _step.value;
        walkRouteNode(child, parentRoutePath, staticRoutes, dynamicRoutes, dynamicRouteContextKeys);
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
  }
}
function addRouteNode(routeNode, parentRoutePath, staticRoutes, dynamicRoutes, dynamicRouteContextKeys) {
  if (routeNode?.route && isTypedRoute(routeNode.route)) {
    var routePath = `${parentRoutePath}/${removeSupportedExtensions(routeNode.route).replace(/\/?index$/, "")}`;
    if (routePath.startsWith("/") || (routePath = `/${routePath}`), routeNode.dynamic) {
      var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
      try {
        for (var _iterator = generateCombinations(routePath)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
          var path = _step.value;
          dynamicRouteContextKeys.add(path), dynamicRoutes.add(`${path.replaceAll(CATCH_ALL, "${string}").replaceAll(SLUG, "${OneRouter.SingleRoutePart<T>}")}`);
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
    } else {
      var _iteratorNormalCompletion1 = !0, _didIteratorError1 = !1, _iteratorError1 = void 0;
      try {
        for (var _iterator1 = generateCombinations(routePath)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = !0) {
          var combination = _step1.value;
          staticRoutes.add(combination);
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
    }
  }
}
var setToUnionType = function(set) {
  return set.size > 0 ? [
    ...set
  ].sort().map(function(s) {
    return `\`${s}\``;
  }).join(" | ") : "never";
};
function generateCombinations(pathname) {
  var groups = pathname.split("/").filter(function(part) {
    return part.startsWith("(") && part.endsWith(")");
  }), combinations = [];
  function generate(currentIndex, currentPath) {
    if (currentIndex === groups.length) {
      combinations.push(currentPath.replace(/\/{2,}/g, "/"));
      return;
    }
    var group = groups[currentIndex], withoutGroup = currentPath.replace(`/${group}`, "");
    generate(currentIndex + 1, withoutGroup), generate(currentIndex + 1, currentPath);
  }
  return generate(0, pathname), combinations;
}
export {
  getTypedRoutesDeclarationFile
};
//# sourceMappingURL=getTypedRoutesDeclarationFile.js.map
