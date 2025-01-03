import { validatePathConfig } from "@react-navigation/core";
import { matchDeepDynamicRouteName, matchDynamicName, matchGroupName, testNotFound } from "../matchers";
var DEFAULT_SCREENS = {}, getActiveRoute = function(state) {
  var route = typeof state.index == "number" ? state.routes[state.index] : state.routes[state.routes.length - 1];
  return route.state ? getActiveRoute(route.state) : route && isInvalidParams(route.params) ? getActiveRoute(createFakeState(route.params)) : route;
};
function createFakeState(params) {
  return {
    stale: !1,
    type: "UNKNOWN",
    key: "UNKNOWN",
    index: 0,
    routeNames: [],
    routes: [
      {
        key: "UNKNOWN",
        name: params.screen,
        params: params.params,
        path: params.path
      }
    ]
  };
}
function segmentMatchesConvention(segment) {
  return segment === "index" || matchDynamicName(segment) != null || matchGroupName(segment) != null || matchDeepDynamicRouteName(segment) != null;
}
function encodeURIComponentPreservingBrackets(str) {
  return encodeURIComponent(str).replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getPathFromState(state, _options) {
  return getPathDataFromState(state, _options).path;
}
function getPathDataFromState(state) {
  var _options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    screens: DEFAULT_SCREENS
  };
  if (state == null)
    throw Error("Got 'undefined' for the navigation state. You must pass a valid state object.");
  var { preserveGroups, preserveDynamicRoutes, ...options } = _options;
  if (validatePathConfig(options), Object.is(options.screens, DEFAULT_SCREENS))
    throw Error("You must pass a 'screens' object to 'getPathFromState' to generate a path.");
  return getPathFromResolvedState(
    state,
    // Create a normalized configs object which will be easier to use
    createNormalizedConfigs(options.screens),
    {
      preserveGroups,
      preserveDynamicRoutes
    }
  );
}
function processParamsWithUserSettings(configItem, params) {
  var stringify = configItem?.stringify;
  return Object.fromEntries(Object.entries(params).map(function(param) {
    var [key, value] = param;
    return [
      key,
      // TODO: Strip nullish values here.
      stringify?.[key] ? stringify[key](value) : (
        // Preserve rest params
        Array.isArray(value) ? value : String(value)
      )
    ];
  }));
}
function deepEqual(a, b) {
  if (a === b)
    return !0;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length)
      return !1;
    for (var i = 0; i < a.length; i++)
      if (!deepEqual(a[i], b[i]))
        return !1;
    return !0;
  }
  if (typeof a == "object" && typeof b == "object") {
    var keysA = Object.keys(a), keysB = Object.keys(b);
    if (keysA.length !== keysB.length)
      return !1;
    var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
    try {
      for (var _iterator = keysA[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
        var key = _step.value;
        if (!deepEqual(a[key], b[key]))
          return !1;
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
    return !0;
  }
  return !1;
}
function walkConfigItems(route, focusedRoute, configs, param) {
  var { preserveDynamicRoutes } = param;
  !route.state && isInvalidParams(route.params) && (route.state = createFakeState(route.params));
  for (var pattern = null, focusedParams, hash, collectedParams = {}; route.name in configs; ) {
    var configItem = configs[route.name], inputPattern = configItem.pattern;
    if (inputPattern == null)
      throw new Error("Unexpected: No pattern found for route " + route.name);
    if (pattern = inputPattern, route.params) {
      route.params["#"] && (hash = route.params["#"], delete route.params["#"]);
      var params = processParamsWithUserSettings(configItem, route.params);
      pattern != null && Object.assign(collectedParams, params), deepEqual(focusedRoute, route) && (preserveDynamicRoutes ? focusedParams = params : focusedParams = getParamsWithConventionsCollapsed({
        params,
        pattern,
        routeName: route.name
      }));
    }
    if (!route.state && isInvalidParams(route.params) && (route.state = createFakeState(route.params)), !configItem.screens || route.state === void 0) {
      var _configItem_screens_configItem_initialRouteName;
      if (configItem.initialRouteName && configItem.screens && configItem.initialRouteName in configItem.screens && (!((_configItem_screens_configItem_initialRouteName = configItem.screens[configItem.initialRouteName]) === null || _configItem_screens_configItem_initialRouteName === void 0) && _configItem_screens_configItem_initialRouteName.pattern)) {
        var initialRouteConfig = configItem.screens[configItem.initialRouteName];
        pattern = initialRouteConfig.pattern, focusedParams && (preserveDynamicRoutes || (focusedParams = getParamsWithConventionsCollapsed({
          params: focusedParams,
          pattern,
          routeName: route.name
        })));
      }
      break;
    }
    var _route_state_index, index = (_route_state_index = route.state.index) !== null && _route_state_index !== void 0 ? _route_state_index : route.state.routes.length - 1, nextRoute = route.state.routes[index], nestedScreens = configItem.screens;
    if (nestedScreens && nextRoute.name in nestedScreens)
      route = nextRoute, configs = nestedScreens;
    else
      break;
  }
  if (pattern == null)
    throw new Error(`No pattern found for route "${route.name}". Options are: ${Object.keys(configs).join(", ")}.`);
  return pattern && !focusedParams && focusedRoute.params && (preserveDynamicRoutes ? focusedParams = focusedRoute.params : focusedParams = getParamsWithConventionsCollapsed({
    params: focusedRoute.params,
    pattern,
    routeName: route.name
  }), Object.assign(focusedParams, collectedParams)), {
    pattern,
    nextRoute: route,
    focusedParams,
    hash,
    params: collectedParams
  };
}
function getPathFromResolvedState(state, configs, param) {
  for (var { preserveGroups, preserveDynamicRoutes } = param, path = "", current = state, hash, allParams = {}; current; ) {
    var _configs_nextRoute_name, _nextRoute_state_routes_, _nextRoute_state, _nextRoute_state_routes;
    path += "/";
    var _current_index, route = current.routes[(_current_index = current.index) !== null && _current_index !== void 0 ? _current_index : 0];
    !route.state && isInvalidParams(route.params) && (route.state = createFakeState(route.params));
    var { pattern, params, nextRoute, focusedParams, hash: $hash } = walkConfigItems(route, getActiveRoute(current), {
      ...configs
    }, {
      preserveDynamicRoutes
    });
    $hash && (hash = $hash), Object.assign(allParams, params), path += getPathWithConventionsCollapsed({
      pattern,
      routePath: nextRoute.path,
      params: allParams,
      initialRouteName: (_configs_nextRoute_name = configs[nextRoute.name]) === null || _configs_nextRoute_name === void 0 ? void 0 : _configs_nextRoute_name.initialRouteName,
      preserveGroups,
      preserveDynamicRoutes
    });
    var _nextRoute_state_index;
    if (nextRoute.state && // NOTE: The upstream implementation allows for sending in synthetic states (states that weren't generated by `getStateFromPath`)
    // and any invalid routes will simply be ignored.
    // Because of this, we need to check if the next route is valid before continuing, otherwise our more strict
    // implementation will throw an error.
    configs[(_nextRoute_state_routes = nextRoute.state.routes) === null || _nextRoute_state_routes === void 0 || (_nextRoute_state_routes_ = _nextRoute_state_routes[(_nextRoute_state_index = (_nextRoute_state = nextRoute.state) === null || _nextRoute_state === void 0 ? void 0 : _nextRoute_state.index) !== null && _nextRoute_state_index !== void 0 ? _nextRoute_state_index : 0]) === null || _nextRoute_state_routes_ === void 0 ? void 0 : _nextRoute_state_routes_.name])
      current = nextRoute.state;
    else {
      if (focusedParams && // note: using [...route] is returning an array which shouldn't go on search, this is just
      // an initial hacky test to work around this as we dont want to pass that to search
      !Array.isArray(focusedParams)) {
        for (var _$param in focusedParams)
          focusedParams[_$param] === "undefined" && delete focusedParams[_$param];
        var query = new URLSearchParams(focusedParams).toString();
        query && (path += `?${query}`);
      }
      break;
    }
  }
  hash && (allParams["#"] = hash, path += `#${hash}`);
  var params1 = decodeParams(allParams);
  return {
    path: appendBaseUrl(basicSanitizePath(path)),
    params: params1
  };
}
function decodeParams(params) {
  var parsed = {}, _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
  try {
    for (var _iterator = Object.entries(params)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var [key, value] = _step.value;
      try {
        Array.isArray(value) ? parsed[key] = value.map(function(v) {
          return decodeURIComponent(v);
        }) : parsed[key] = decodeURIComponent(value);
      } catch {
        parsed[key] = value;
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
  return parsed;
}
function getPathWithConventionsCollapsed(param) {
  var { pattern, routePath, params, preserveGroups, preserveDynamicRoutes, initialRouteName } = param, segments = pattern.split("/");
  return segments.map(function(p, i) {
    var name = getParamName(p);
    return p.startsWith("*") ? preserveDynamicRoutes ? name === "not-found" ? "+not-found" : `[...${name}]` : params[name] ? Array.isArray(params[name]) ? params[name].join("/") : params[name] : i === 0 ? routePath : routePath?.split("/").slice(i + 1).join("/") : p.startsWith(":") ? preserveDynamicRoutes ? `[${name}]` : params[name] : !preserveGroups && matchGroupName(p) != null ? segments.length - 1 === i && initialRouteName ? segmentMatchesConvention(initialRouteName) ? "" : encodeURIComponentPreservingBrackets(initialRouteName) : "" : encodeURIComponentPreservingBrackets(p);
  }).map(function(v) {
    return v ?? "";
  }).join("/");
}
function getParamsWithConventionsCollapsed(param) {
  var { pattern, routeName, params } = param, processedParams = {
    ...params
  }, segments = pattern.split("/");
  if (segments.filter(function(segment) {
    return segment.startsWith(":");
  }).forEach(function(segment) {
    var name2 = getParamName(segment);
    delete processedParams[name2];
  }), segments.some(function(segment) {
    return segment.startsWith("*");
  })) {
    var _matchDeepDynamicRouteName, name = testNotFound(routeName) ? "not-found" : (_matchDeepDynamicRouteName = matchDeepDynamicRouteName(routeName)) !== null && _matchDeepDynamicRouteName !== void 0 ? _matchDeepDynamicRouteName : routeName;
    delete processedParams[name];
  }
  return processedParams;
}
function basicSanitizePath(path) {
  var simplifiedPath = path.replace(/\/+/g, "/");
  return simplifiedPath.length <= 1 ? simplifiedPath : simplifiedPath.replace(/\/$/, "");
}
function isInvalidParams(params) {
  return params ? "params" in params && typeof params.params == "object" && params.params ? !0 : "initial" in params && typeof params.initial == "boolean" && // "path" in params &&
  "screen" in params : !1;
}
var getParamName = function(pattern) {
  return pattern.replace(/^[:*]/, "").replace(/\?$/, "");
}, joinPaths = function() {
  for (var _len = arguments.length, paths = new Array(_len), _key = 0; _key < _len; _key++)
    paths[_key] = arguments[_key];
  return [].concat(...paths.map(function(p) {
    return p.split("/");
  })).filter(Boolean).join("/");
}, createConfigItem = function(config, parentPattern) {
  if (typeof config == "string") {
    var pattern = parentPattern ? joinPaths(parentPattern, config) : config;
    return {
      pattern
    };
  }
  if (config.exact && config.path === void 0)
    throw new Error("A 'path' needs to be specified when specifying 'exact: true'. If you don't want this screen in the URL, specify it as empty string, e.g. `path: ''`.");
  var pattern1 = config.exact !== !0 ? joinPaths(parentPattern || "", config.path || "") : config.path || "", screens = config.screens ? createNormalizedConfigs(config.screens, pattern1) : void 0;
  return {
    // Normalize pattern to remove any leading, trailing slashes, duplicate slashes etc.
    pattern: pattern1?.split("/").filter(Boolean).join("/"),
    stringify: config.stringify,
    screens,
    initialRouteName: config.initialRouteName
  };
}, createNormalizedConfigs = function(options, pattern) {
  return Object.fromEntries(Object.entries(options).map(function(param) {
    var [name, c] = param;
    return [
      name,
      createConfigItem(c, pattern)
    ];
  }));
};
function appendBaseUrl(path) {
  var baseUrl = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : process.env.EXPO_BASE_URL;
  return process.env.NODE_ENV !== "development" && baseUrl ? `/${baseUrl.replace(/^\/+/, "").replace(/\/$/, "")}${path}` : path;
}
export {
  appendBaseUrl,
  deepEqual,
  getPathFromState as default,
  getPathDataFromState
};
//# sourceMappingURL=getPathFromState.js.map
