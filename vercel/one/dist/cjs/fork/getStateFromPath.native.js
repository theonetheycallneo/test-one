"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var getStateFromPath_exports = {};
__export(getStateFromPath_exports, {
  default: () => getStateFromPath,
  getMatchableRouteConfigs: () => getMatchableRouteConfigs,
  getUrlWithReactNavigationConcessions: () => getUrlWithReactNavigationConcessions,
  stripBaseUrl: () => stripBaseUrl
});
module.exports = __toCommonJS(getStateFromPath_exports);
var import_escape_string_regexp = __toESM(require("escape-string-regexp"), 1), import_matchers = require("../matchers"), import_findFocusedRoute = require("./findFocusedRoute"), import_validatePathConfig = __toESM(require("./validatePathConfig"), 1);
function getUrlWithReactNavigationConcessions(path) {
  var baseUrl = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : process.env.EXPO_BASE_URL, parsed;
  try {
    parsed = new URL(path, baseUrl || "http://phony.example");
  } catch (err) {
    return console.warn(`Error parsing url ${path}: ${err == null ? void 0 : err.message}`), {
      nonstandardPathname: path,
      inputPathnameWithoutHash: path.replace(/#.*$/g, ""),
      url: null
    };
  }
  var pathname = parsed.pathname;
  return {
    // The slashes are at the end, not the beginning
    nonstandardPathname: stripBaseUrl(pathname, baseUrl).replace(/^\/+/g, "").replace(/\/+$/g, "") + "/",
    url: parsed
  };
}
function getStateFromPath(path, options) {
  var { initialRoutes, configs } = getMatchableRouteConfigs(options);
  return getStateFromPathWithConfigs(path, configs, initialRoutes);
}
function getMatchableRouteConfigs(options) {
  options && (0, import_validatePathConfig.default)(options);
  var screens = options == null ? void 0 : options.screens;
  if (!screens)
    throw Error("You must pass a 'screens' object to 'getStateFromPath' to generate a path.");
  var initialRoutes = [];
  options != null && options.initialRouteName && initialRoutes.push({
    initialRouteName: options.initialRouteName,
    parentScreens: []
  });
  var converted = Object.keys(screens).flatMap(function(key) {
    return createNormalizedConfigs(key, screens, [], initialRoutes);
  }).flat(), resolvedInitialPatterns = initialRoutes.map(function(route) {
    return joinPaths(...route.parentScreens, route.initialRouteName);
  }), convertedWithInitial = converted.map(function(config) {
    return {
      ...config,
      // TODO: Probably a safer way to do this
      // Mark initial routes to give them potential priority over other routes that match.
      isInitial: resolvedInitialPatterns.includes(config.routeNames.join("/"))
    };
  }), configs = convertedWithInitial.sort(sortConfigs);
  return assertConfigDuplicates(configs), {
    configs,
    initialRoutes
  };
}
function assertConfigDuplicates(configs) {
  configs.reduce(function(acc, config) {
    var _config_regex, _config_regex_toString, indexedKey = (_config_regex_toString = (_config_regex = config.regex) === null || _config_regex === void 0 ? void 0 : _config_regex.toString()) !== null && _config_regex_toString !== void 0 ? _config_regex_toString : config.pattern, alpha = acc[indexedKey];
    if (alpha && !alpha.hasChildren && !config.hasChildren) {
      var a = alpha.routeNames, b = config.routeNames, intersects = a.length > b.length ? b.every(function(it, i) {
        return a[i] === it;
      }) : a.every(function(it, i) {
        return b[i] === it;
      });
      if (!intersects) {
        var last = config.pattern.split("/").pop();
        if (!(last != null && last.match(/^\*not-found$/))) {
          var routeType = last != null && last.startsWith(":") ? "dynamic route" : last != null && last.startsWith("*") ? "dynamic-rest route" : "route";
          throw new Error(`The ${routeType} pattern '${config.pattern || "/"}' resolves to both '${alpha.userReadableName}' and '${config.userReadableName}'. Patterns must be unique and cannot resolve to more than one route.`);
        }
      }
    }
    return Object.assign(acc, {
      [indexedKey]: config
    });
  }, {});
}
function sortConfigs(a, b) {
  if (a.pattern === b.pattern)
    return b.routeNames.join(">").localeCompare(a.routeNames.join(">"));
  if (a.pattern.startsWith(b.pattern) && // NOTE: This is a hack to make sure that `*` is always at the end
  b.screen !== "index")
    return -1;
  if (b.pattern.startsWith(a.pattern) && a.screen !== "index")
    return 1;
  var aParts = a.pattern.split("/").filter(function(part) {
    return (0, import_matchers.matchGroupName)(part) == null;
  });
  (a.screen === "index" || a.screen.match(/\/index$/)) && aParts.push("index");
  var bParts = b.pattern.split("/").filter(function(part) {
    return (0, import_matchers.matchGroupName)(part) == null;
  });
  (b.screen === "index" || b.screen.match(/\/index$/)) && bParts.push("index");
  for (var i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    if (aParts[i] == null)
      return 1;
    if (bParts[i] == null)
      return -1;
    var aWildCard = aParts[i].startsWith("*"), bWildCard = bParts[i].startsWith("*");
    if (aWildCard && bWildCard) {
      var aNotFound = aParts[i].match(/^[*]not-found$/), bNotFound = bParts[i].match(/^[*]not-found$/);
      if (aNotFound && bNotFound)
        continue;
      if (aNotFound)
        return 1;
      if (bNotFound)
        return -1;
      continue;
    }
    if (aWildCard)
      return 1;
    if (bWildCard)
      return -1;
    var aSlug = aParts[i].startsWith(":"), bSlug = bParts[i].startsWith(":");
    if (aSlug && bSlug) {
      var aNotFound1 = aParts[i].match(/^[*]not-found$/), bNotFound1 = bParts[i].match(/^[*]not-found$/);
      if (aNotFound1 && bNotFound1)
        continue;
      if (aNotFound1)
        return 1;
      if (bNotFound1)
        return -1;
      continue;
    }
    if (aSlug)
      return 1;
    if (bSlug)
      return -1;
  }
  return a.isInitial && !b.isInitial ? -1 : !a.isInitial && b.isInitial ? 1 : bParts.length - aParts.length;
}
function getStateFromEmptyPathWithConfigs(path, hash, configs, initialRoutes) {
  var leafNodes = configs.filter(function(config) {
    return !config.hasChildren;
  }).map(function(value) {
    return {
      ...value,
      // Collapse all levels of group segments before testing.
      // This enables `app/(one)/(two)/index.js` to be matched.
      path: (0, import_matchers.stripGroupSegmentsFromPath)(value.path)
    };
  }), _leafNodes_find, _ref, match = (_ref = (_leafNodes_find = leafNodes.find(function(config) {
    return (
      // NOTE: Test leaf node index routes that either don't have a regex or match an empty string.
      config.path === "" && (!config.regex || config.regex.test(""))
    );
  })) !== null && _leafNodes_find !== void 0 ? _leafNodes_find : leafNodes.find(function(config) {
    return (
      // NOTE: Test leaf node dynamic routes that match an empty string.
      config.path.startsWith(":") && config.regex.test("")
    );
  })) !== null && _ref !== void 0 ? _ref : (
    // NOTE: Test leaf node deep dynamic routes that match a slash.
    // This should be done last to enable dynamic routes having a higher priority.
    leafNodes.find(function(config) {
      return config.path.startsWith("*") && config.regex.test("/");
    })
  );
  if (match) {
    var routes = match.routeNames.map(function(name) {
      return match._route ? {
        name,
        _route: match._route
      } : {
        name
      };
    });
    return createNestedStateObject(path, hash, routes, configs, initialRoutes);
  }
}
function getStateFromPathWithConfigs(path, configs, initialRoutes) {
  var baseUrl = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : process.env.EXPO_BASE_URL, formattedPaths = getUrlWithReactNavigationConcessions(path);
  if (!formattedPaths.url) {
    console.warn(`No url found for ${path}`);
    return;
  }
  var cleanPath = stripBaseUrl((0, import_matchers.stripGroupSegmentsFromPath)(formattedPaths.url.pathname), baseUrl) + formattedPaths.url.search;
  if (path.startsWith("/") || (cleanPath = cleanPath.slice(1)), formattedPaths.nonstandardPathname === "/")
    return getStateFromEmptyPathWithConfigs(cleanPath, formattedPaths.url.hash.slice(1), configs, initialRoutes);
  var routes = matchAgainstConfigs(formattedPaths.nonstandardPathname, configs);
  if (routes != null)
    return createNestedStateObject(cleanPath, formattedPaths.url.hash.slice(1), routes, configs, initialRoutes);
}
var joinPaths = function() {
  for (var _len = arguments.length, paths = new Array(_len), _key = 0; _key < _len; _key++)
    paths[_key] = arguments[_key];
  return [].concat(...paths.map(function(p) {
    return p.split("/");
  })).filter(Boolean).join("/");
};
function matchAgainstConfigs(remaining, configs) {
  var routes, remainingPath = remaining, _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
  try {
    for (var _loop = function() {
      var config = _step.value, _config_pattern;
      if (!config.regex)
        return "continue";
      var match = remainingPath.match(config.regex);
      if (!match)
        return "continue";
      var matchedParams = (_config_pattern = config.pattern) === null || _config_pattern === void 0 ? void 0 : _config_pattern.split("/").filter(function(p) {
        return p.match(/^[:*]/);
      }).reduce(function(acc, p, i) {
        var _match_;
        return p.match(/^\*/) ? {
          ...acc,
          [p]: match[(i + 1) * 2]
        } : Object.assign(acc, {
          [p]: (_match_ = match[(i + 1) * 2]) === null || _match_ === void 0 ? void 0 : _match_.replace(/\//, "")
        });
      }, {}), routeFromName = function(name) {
        var config2 = configs.find(function(c) {
          return c.screen === name;
        });
        if (!(config2 != null && config2.path))
          return {
            name
          };
        var segments = config2.path.split("/"), params = {};
        return segments.filter(function(p) {
          return p.match(/^[:*]/);
        }).forEach(function(p) {
          var value = matchedParams[p];
          if (value) {
            var _config_parse;
            p.match(/^\*/) && (value = value == null ? void 0 : value.split("/").filter(Boolean));
            var key = p.replace(/^[:*]/, "").replace(/\?$/, "");
            params[key] = !((_config_parse = config2.parse) === null || _config_parse === void 0) && _config_parse[key] ? config2.parse[key](value) : value;
          }
        }), params && Object.keys(params).length ? {
          name,
          params
        } : {
          name
        };
      };
      routes = config.routeNames.map(function(name) {
        return config._route ? {
          ...routeFromName(name),
          _route: config._route
        } : {
          ...routeFromName(name)
        };
      });
      var combinedParams = routes.reduce(function(acc, r) {
        return Object.assign(acc, r.params);
      }, {}), hasCombinedParams = Object.keys(combinedParams).length > 0;
      return routes = routes.map(function(r) {
        return hasCombinedParams && (r.params = combinedParams), r;
      }), remainingPath = remainingPath.replace(match[1], ""), "break";
    }, _iterator = configs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var _ret = _loop();
      if (_ret === "break") break;
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
  return routes;
}
function equalHeritage(a, b) {
  if (a.length !== b.length)
    return !1;
  for (var i = 0; i < a.length; i++)
    if (a[i].localeCompare(b[i]) !== 0)
      return !1;
  return !0;
}
var createNormalizedConfigs = function(screen, routeConfig) {
  var routeNames = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], initials = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [], parentScreens = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [], parentPattern = arguments.length > 5 ? arguments[5] : void 0, configs = [];
  routeNames.push(screen), parentScreens.push(screen);
  var config = routeConfig[screen];
  if (typeof config == "string") {
    var pattern = parentPattern ? joinPaths(parentPattern, config) : config;
    configs.push(createConfigItem(screen, routeNames, pattern, config, !1));
  } else if (typeof config == "object") {
    var pattern1, { _route } = config;
    if (typeof config.path == "string") {
      var _Object_keys;
      if (config.exact && config.path === void 0)
        throw new Error("A 'path' needs to be specified when specifying 'exact: true'. If you don't want this screen in the URL, specify it as empty string, e.g. `path: ''`.");
      pattern1 = config.exact !== !0 ? joinPaths(parentPattern || "", config.path || "") : config.path || "", configs.push(createConfigItem(screen, routeNames, pattern1, config.path, config.screens ? !!(!((_Object_keys = Object.keys(config.screens)) === null || _Object_keys === void 0) && _Object_keys.length) : !1, config.parse, _route));
    }
    config.screens && (config.initialRouteName && initials.push({
      initialRouteName: config.initialRouteName,
      parentScreens
    }), Object.keys(config.screens).forEach(function(nestedConfig) {
      var result = createNormalizedConfigs(nestedConfig, config.screens, routeNames, initials, [
        ...parentScreens
      ], pattern1 ?? parentPattern);
      configs.push(...result);
    }));
  }
  return routeNames.pop(), configs;
};
function formatRegexPattern(it) {
  return it = it.replace(" ", "%20"), it.startsWith(":") ? `(([^/]+\\/)${it.endsWith("?") ? "?" : ""})` : it.startsWith("*") ? `((.*\\/)${it.endsWith("?") ? "?" : ""})` : (0, import_matchers.matchGroupName)(it) != null ? `(?:${(0, import_escape_string_regexp.default)(it)}\\/)?` : (0, import_escape_string_regexp.default)(it) + "\\/";
}
var createConfigItem = function(screen, routeNames, pattern, path, hasChildren, parse, _route) {
  pattern = pattern.split("/").filter(Boolean).join("/");
  var regex = pattern ? new RegExp(`^(${pattern.split("/").map(formatRegexPattern).join("")})$`) : void 0;
  return {
    screen,
    regex,
    pattern,
    path,
    // The routeNames array is mutated, so copy it to keep the current state
    routeNames: [
      ...routeNames
    ],
    parse,
    userReadableName: [
      ...routeNames.slice(0, -1),
      path || screen
    ].join("/"),
    hasChildren: !!hasChildren,
    _route
  };
}, findParseConfigForRoute = function(routeName, routeConfigs) {
  var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
  try {
    for (var _iterator = routeConfigs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var config = _step.value;
      if (routeName === config.routeNames[config.routeNames.length - 1])
        return config.parse;
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
}, findInitialRoute = function(routeName, parentScreens, initialRoutes) {
  var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
  try {
    for (var _iterator = initialRoutes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var config = _step.value;
      if (equalHeritage(parentScreens, config.parentScreens))
        return routeName !== config.initialRouteName ? config.initialRouteName : void 0;
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
}, createStateObject = function(route, isEmpty, initialRoute) {
  return isEmpty ? initialRoute ? {
    index: 1,
    routes: [
      {
        name: initialRoute
      },
      route
    ]
  } : {
    routes: [
      route
    ]
  } : initialRoute ? {
    index: 1,
    routes: [
      {
        name: initialRoute
      },
      {
        ...route,
        state: {
          routes: []
        }
      }
    ]
  } : {
    routes: [
      {
        ...route,
        state: {
          routes: []
        }
      }
    ]
  };
}, createNestedStateObject = function(path, hash, routes, routeConfigs, initialRoutes) {
  var route = routes.shift(), parentScreens = [], initialRoute = findInitialRoute(route.name, parentScreens, initialRoutes);
  parentScreens.push(route.name);
  var state = createStateObject(route, routes.length === 0, initialRoute);
  if (routes.length > 0)
    for (var nestedState = state; route = routes.shift(); ) {
      initialRoute = findInitialRoute(route.name, parentScreens, initialRoutes);
      var nestedStateIndex = nestedState.index || nestedState.routes.length - 1;
      nestedState.routes[nestedStateIndex].state = createStateObject(route, routes.length === 0, initialRoute), routes.length > 0 && (nestedState = nestedState.routes[nestedStateIndex].state), parentScreens.push(route.name);
    }
  route = (0, import_findFocusedRoute.findFocusedRoute)(state), route.path = path;
  var params = parseQueryParams(route.path, findParseConfigForRoute(route.name, routeConfigs));
  if (params) {
    route.params = Object.assign(/* @__PURE__ */ Object.create(null), route.params);
    var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
    try {
      for (var _iterator = Object.entries(params)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
        var [name, value] = _step.value, _route_params, _route_params1;
        if (!((_route_params = route.params) === null || _route_params === void 0) && _route_params[name] && process.env.NODE_ENV !== "production" && console.warn(`Route '/${route.name}' with param '${name}' was specified both in the path and as a param, removing from path`), !(!((_route_params1 = route.params) === null || _route_params1 === void 0) && _route_params1[name])) {
          route.params[name] = value;
          continue;
        }
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
    Object.keys(route.params).length === 0 && delete route.params;
  }
  return hash && (route.params = Object.assign(/* @__PURE__ */ Object.create(null), route.params), route.params["#"] = hash), state;
}, parseQueryParams = function(path, parseConfig) {
  var query = path.split("?")[1], searchParams = new URLSearchParams(query), params = Object.fromEntries(
    // @ts-ignore: [Symbol.iterator] is indeed, available on every platform.
    searchParams
  );
  return parseConfig && Object.keys(params).forEach(function(name) {
    Object.hasOwnProperty.call(parseConfig, name) && typeof params[name] == "string" && (params[name] = parseConfig[name](params[name]));
  }), Object.keys(params).length ? params : void 0;
}, baseUrlCache = /* @__PURE__ */ new Map();
function getBaseUrlRegex(baseUrl) {
  if (baseUrlCache.has(baseUrl))
    return baseUrlCache.get(baseUrl);
  var regex = new RegExp(`^\\/?${(0, import_escape_string_regexp.default)(baseUrl)}`, "g");
  return baseUrlCache.set(baseUrl, regex), regex;
}
function stripBaseUrl(path) {
  var baseUrl = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : process.env.EXPO_BASE_URL;
  if (process.env.NODE_ENV !== "development" && baseUrl) {
    var reg = getBaseUrlRegex(baseUrl);
    return path.replace(/^\/+/g, "/").replace(reg, "");
  }
  return path;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMatchableRouteConfigs,
  getUrlWithReactNavigationConcessions,
  stripBaseUrl
});
//# sourceMappingURL=getStateFromPath.js.map
