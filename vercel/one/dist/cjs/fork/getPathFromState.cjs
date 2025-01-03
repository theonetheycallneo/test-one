var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var getPathFromState_exports = {};
__export(getPathFromState_exports, {
  appendBaseUrl: () => appendBaseUrl,
  deepEqual: () => deepEqual,
  default: () => getPathFromState,
  getPathDataFromState: () => getPathDataFromState
});
module.exports = __toCommonJS(getPathFromState_exports);
var import_core = require("@react-navigation/core"),
  import_matchers = require("../matchers.cjs");
const DEFAULT_SCREENS = {},
  getActiveRoute = state => {
    const route = typeof state.index == "number" ? state.routes[state.index] : state.routes[state.routes.length - 1];
    return route.state ? getActiveRoute(route.state) : route && isInvalidParams(route.params) ? getActiveRoute(createFakeState(route.params)) : route;
  };
function createFakeState(params) {
  return {
    stale: !1,
    type: "UNKNOWN",
    key: "UNKNOWN",
    index: 0,
    routeNames: [],
    routes: [{
      key: "UNKNOWN",
      name: params.screen,
      params: params.params,
      path: params.path
    }]
  };
}
function segmentMatchesConvention(segment) {
  return segment === "index" || (0, import_matchers.matchDynamicName)(segment) != null || (0, import_matchers.matchGroupName)(segment) != null || (0, import_matchers.matchDeepDynamicRouteName)(segment) != null;
}
function encodeURIComponentPreservingBrackets(str) {
  return encodeURIComponent(str).replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getPathFromState(state, _options) {
  return getPathDataFromState(state, _options).path;
}
function getPathDataFromState(state, _options = {
  screens: DEFAULT_SCREENS
}) {
  if (state == null) throw Error("Got 'undefined' for the navigation state. You must pass a valid state object.");
  const {
    preserveGroups,
    preserveDynamicRoutes,
    ...options
  } = _options;
  if ((0, import_core.validatePathConfig)(options), Object.is(options.screens, DEFAULT_SCREENS)) throw Error("You must pass a 'screens' object to 'getPathFromState' to generate a path.");
  return getPathFromResolvedState(state,
  // Create a normalized configs object which will be easier to use
  createNormalizedConfigs(options.screens), {
    preserveGroups,
    preserveDynamicRoutes
  });
}
function processParamsWithUserSettings(configItem, params) {
  const stringify = configItem?.stringify;
  return Object.fromEntries(Object.entries(params).map(([key, value]) => [key,
  // TODO: Strip nullish values here.
  stringify?.[key] ? stringify[key](value) :
  // Preserve rest params
  Array.isArray(value) ? value : String(value)]));
}
function deepEqual(a, b) {
  if (a === b) return !0;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return !1;
    for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return !1;
    return !0;
  }
  if (typeof a == "object" && typeof b == "object") {
    const keysA = Object.keys(a),
      keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return !1;
    for (const key of keysA) if (!deepEqual(a[key], b[key])) return !1;
    return !0;
  }
  return !1;
}
function walkConfigItems(route, focusedRoute, configs, {
  preserveDynamicRoutes
}) {
  !route.state && isInvalidParams(route.params) && (route.state = createFakeState(route.params));
  let pattern = null,
    focusedParams,
    hash;
  const collectedParams = {};
  for (; route.name in configs;) {
    const configItem = configs[route.name],
      inputPattern = configItem.pattern;
    if (inputPattern == null) throw new Error("Unexpected: No pattern found for route " + route.name);
    if (pattern = inputPattern, route.params) {
      route.params["#"] && (hash = route.params["#"], delete route.params["#"]);
      const params = processParamsWithUserSettings(configItem, route.params);
      pattern != null && Object.assign(collectedParams, params), deepEqual(focusedRoute, route) && (preserveDynamicRoutes ? focusedParams = params : focusedParams = getParamsWithConventionsCollapsed({
        params,
        pattern,
        routeName: route.name
      }));
    }
    if (!route.state && isInvalidParams(route.params) && (route.state = createFakeState(route.params)), !configItem.screens || route.state === void 0) {
      configItem.initialRouteName && configItem.screens && configItem.initialRouteName in configItem.screens && configItem.screens[configItem.initialRouteName]?.pattern && (pattern = configItem.screens[configItem.initialRouteName].pattern, focusedParams && (preserveDynamicRoutes || (focusedParams = getParamsWithConventionsCollapsed({
        params: focusedParams,
        pattern,
        routeName: route.name
      }))));
      break;
    }
    const index = route.state.index ?? route.state.routes.length - 1,
      nextRoute = route.state.routes[index],
      nestedScreens = configItem.screens;
    if (nestedScreens && nextRoute.name in nestedScreens) route = nextRoute, configs = nestedScreens;else break;
  }
  if (pattern == null) throw new Error(`No pattern found for route "${route.name}". Options are: ${Object.keys(configs).join(", ")}.`);
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
function getPathFromResolvedState(state, configs, {
  preserveGroups,
  preserveDynamicRoutes
}) {
  let path = "",
    current = state,
    hash;
  const allParams = {};
  for (; current;) {
    path += "/";
    const route = current.routes[current.index ?? 0];
    !route.state && isInvalidParams(route.params) && (route.state = createFakeState(route.params));
    const {
      pattern,
      params: params2,
      nextRoute,
      focusedParams,
      hash: $hash
    } = walkConfigItems(route, getActiveRoute(current), {
      ...configs
    }, {
      preserveDynamicRoutes
    });
    if ($hash && (hash = $hash), Object.assign(allParams, params2), path += getPathWithConventionsCollapsed({
      pattern,
      routePath: nextRoute.path,
      params: allParams,
      initialRouteName: configs[nextRoute.name]?.initialRouteName,
      preserveGroups,
      preserveDynamicRoutes
    }), nextRoute.state &&
    // NOTE: The upstream implementation allows for sending in synthetic states (states that weren't generated by `getStateFromPath`)
    // and any invalid routes will simply be ignored.
    // Because of this, we need to check if the next route is valid before continuing, otherwise our more strict
    // implementation will throw an error.
    configs[nextRoute.state.routes?.[nextRoute.state?.index ?? 0]?.name]) current = nextRoute.state;else {
      if (focusedParams &&
      // note: using [...route] is returning an array which shouldn't go on search, this is just
      // an initial hacky test to work around this as we dont want to pass that to search
      !Array.isArray(focusedParams)) {
        for (const param in focusedParams) focusedParams[param] === "undefined" && delete focusedParams[param];
        const query = new URLSearchParams(focusedParams).toString();
        query && (path += `?${query}`);
      }
      break;
    }
  }
  hash && (allParams["#"] = hash, path += `#${hash}`);
  const params = decodeParams(allParams);
  return {
    path: appendBaseUrl(basicSanitizePath(path)),
    params
  };
}
function decodeParams(params) {
  const parsed = {};
  for (const [key, value] of Object.entries(params)) try {
    Array.isArray(value) ? parsed[key] = value.map(v => decodeURIComponent(v)) : parsed[key] = decodeURIComponent(value);
  } catch {
    parsed[key] = value;
  }
  return parsed;
}
function getPathWithConventionsCollapsed({
  pattern,
  routePath,
  params,
  preserveGroups,
  preserveDynamicRoutes,
  initialRouteName
}) {
  const segments = pattern.split("/");
  return segments.map((p, i) => {
    const name = getParamName(p);
    return p.startsWith("*") ? preserveDynamicRoutes ? name === "not-found" ? "+not-found" : `[...${name}]` : params[name] ? Array.isArray(params[name]) ? params[name].join("/") : params[name] : i === 0 ? routePath : routePath?.split("/").slice(i + 1).join("/") : p.startsWith(":") ? preserveDynamicRoutes ? `[${name}]` : params[name] : !preserveGroups && (0, import_matchers.matchGroupName)(p) != null ? segments.length - 1 === i && initialRouteName ? segmentMatchesConvention(initialRouteName) ? "" : encodeURIComponentPreservingBrackets(initialRouteName) : "" : encodeURIComponentPreservingBrackets(p);
  }).map(v => v ?? "").join("/");
}
function getParamsWithConventionsCollapsed({
  pattern,
  routeName,
  params
}) {
  const processedParams = {
      ...params
    },
    segments = pattern.split("/");
  if (segments.filter(segment => segment.startsWith(":")).forEach(segment => {
    const name = getParamName(segment);
    delete processedParams[name];
  }), segments.some(segment => segment.startsWith("*"))) {
    const name = (0, import_matchers.testNotFound)(routeName) ? "not-found" : (0, import_matchers.matchDeepDynamicRouteName)(routeName) ?? routeName;
    delete processedParams[name];
  }
  return processedParams;
}
function basicSanitizePath(path) {
  const simplifiedPath = path.replace(/\/+/g, "/");
  return simplifiedPath.length <= 1 ? simplifiedPath : simplifiedPath.replace(/\/$/, "");
}
function isInvalidParams(params) {
  return params ? "params" in params && typeof params.params == "object" && params.params ? !0 : "initial" in params && typeof params.initial == "boolean" &&
  // "path" in params &&
  "screen" in params : !1;
}
const getParamName = pattern => pattern.replace(/^[:*]/, "").replace(/\?$/, ""),
  joinPaths = (...paths) => [].concat(...paths.map(p => p.split("/"))).filter(Boolean).join("/"),
  createConfigItem = (config, parentPattern) => {
    if (typeof config == "string") return {
      pattern: parentPattern ? joinPaths(parentPattern, config) : config
    };
    if (config.exact && config.path === void 0) throw new Error("A 'path' needs to be specified when specifying 'exact: true'. If you don't want this screen in the URL, specify it as empty string, e.g. `path: ''`.");
    const pattern = config.exact !== !0 ? joinPaths(parentPattern || "", config.path || "") : config.path || "",
      screens = config.screens ? createNormalizedConfigs(config.screens, pattern) : void 0;
    return {
      // Normalize pattern to remove any leading, trailing slashes, duplicate slashes etc.
      pattern: pattern?.split("/").filter(Boolean).join("/"),
      stringify: config.stringify,
      screens,
      initialRouteName: config.initialRouteName
    };
  },
  createNormalizedConfigs = (options, pattern) => Object.fromEntries(Object.entries(options).map(([name, c]) => [name, createConfigItem(c, pattern)]));
function appendBaseUrl(path, baseUrl = process.env.EXPO_BASE_URL) {
  return process.env.NODE_ENV !== "development" && baseUrl ? `/${baseUrl.replace(/^\/+/, "").replace(/\/$/, "")}${path}` : path;
}