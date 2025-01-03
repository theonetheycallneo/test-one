import escape from "escape-string-regexp";
import { matchGroupName, stripGroupSegmentsFromPath } from "../matchers.mjs";
import { findFocusedRoute } from "./findFocusedRoute.mjs";
import validatePathConfig from "./validatePathConfig.mjs";
function getUrlWithReactNavigationConcessions(path, baseUrl = process.env.EXPO_BASE_URL) {
  let parsed;
  try {
    parsed = new URL(path, baseUrl || "http://phony.example");
  } catch (err) {
    return console.warn(`Error parsing url ${path}: ${err?.message}`), {
      nonstandardPathname: path,
      inputPathnameWithoutHash: path.replace(/#.*$/g, ""),
      url: null
    };
  }
  const pathname = parsed.pathname;
  return {
    // The slashes are at the end, not the beginning
    nonstandardPathname: stripBaseUrl(pathname, baseUrl).replace(/^\/+/g, "").replace(/\/+$/g, "") + "/",
    url: parsed
  };
}
function getStateFromPath(path, options) {
  const {
    initialRoutes,
    configs
  } = getMatchableRouteConfigs(options);
  return getStateFromPathWithConfigs(path, configs, initialRoutes);
}
function getMatchableRouteConfigs(options) {
  options && validatePathConfig(options);
  const screens = options?.screens;
  if (!screens) throw Error("You must pass a 'screens' object to 'getStateFromPath' to generate a path.");
  const initialRoutes = [];
  options?.initialRouteName && initialRoutes.push({
    initialRouteName: options.initialRouteName,
    parentScreens: []
  });
  const converted = Object.keys(screens).flatMap(key => createNormalizedConfigs(key, screens, [], initialRoutes)).flat(),
    resolvedInitialPatterns = initialRoutes.map(route => joinPaths(...route.parentScreens, route.initialRouteName)),
    configs = converted.map(config => ({
      ...config,
      // TODO: Probably a safer way to do this
      // Mark initial routes to give them potential priority over other routes that match.
      isInitial: resolvedInitialPatterns.includes(config.routeNames.join("/"))
    })).sort(sortConfigs);
  return assertConfigDuplicates(configs), {
    configs,
    initialRoutes
  };
}
function assertConfigDuplicates(configs) {
  configs.reduce((acc, config) => {
    const indexedKey = config.regex?.toString() ?? config.pattern,
      alpha = acc[indexedKey];
    if (alpha && !alpha.hasChildren && !config.hasChildren) {
      const a = alpha.routeNames,
        b = config.routeNames;
      if (!(a.length > b.length ? b.every((it, i) => a[i] === it) : a.every((it, i) => b[i] === it))) {
        const last = config.pattern.split("/").pop();
        if (!last?.match(/^\*not-found$/)) {
          const routeType = last?.startsWith(":") ? "dynamic route" : last?.startsWith("*") ? "dynamic-rest route" : "route";
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
  if (a.pattern === b.pattern) return b.routeNames.join(">").localeCompare(a.routeNames.join(">"));
  if (a.pattern.startsWith(b.pattern) &&
  // NOTE: This is a hack to make sure that `*` is always at the end
  b.screen !== "index") return -1;
  if (b.pattern.startsWith(a.pattern) && a.screen !== "index") return 1;
  const aParts = a.pattern.split("/").filter(part => matchGroupName(part) == null);
  (a.screen === "index" || a.screen.match(/\/index$/)) && aParts.push("index");
  const bParts = b.pattern.split("/").filter(part => matchGroupName(part) == null);
  (b.screen === "index" || b.screen.match(/\/index$/)) && bParts.push("index");
  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    if (aParts[i] == null) return 1;
    if (bParts[i] == null) return -1;
    const aWildCard = aParts[i].startsWith("*"),
      bWildCard = bParts[i].startsWith("*");
    if (aWildCard && bWildCard) {
      const aNotFound = aParts[i].match(/^[*]not-found$/),
        bNotFound = bParts[i].match(/^[*]not-found$/);
      if (aNotFound && bNotFound) continue;
      if (aNotFound) return 1;
      if (bNotFound) return -1;
      continue;
    }
    if (aWildCard) return 1;
    if (bWildCard) return -1;
    const aSlug = aParts[i].startsWith(":"),
      bSlug = bParts[i].startsWith(":");
    if (aSlug && bSlug) {
      const aNotFound = aParts[i].match(/^[*]not-found$/),
        bNotFound = bParts[i].match(/^[*]not-found$/);
      if (aNotFound && bNotFound) continue;
      if (aNotFound) return 1;
      if (bNotFound) return -1;
      continue;
    }
    if (aSlug) return 1;
    if (bSlug) return -1;
  }
  return a.isInitial && !b.isInitial ? -1 : !a.isInitial && b.isInitial ? 1 : bParts.length - aParts.length;
}
function getStateFromEmptyPathWithConfigs(path, hash, configs, initialRoutes) {
  const leafNodes = configs.filter(config => !config.hasChildren).map(value => ({
      ...value,
      // Collapse all levels of group segments before testing.
      // This enables `app/(one)/(two)/index.js` to be matched.
      path: stripGroupSegmentsFromPath(value.path)
    })),
    match = leafNodes.find(config =>
    // NOTE: Test leaf node index routes that either don't have a regex or match an empty string.
    config.path === "" && (!config.regex || config.regex.test(""))) ?? leafNodes.find(config =>
    // NOTE: Test leaf node dynamic routes that match an empty string.
    config.path.startsWith(":") && config.regex.test("")) ??
    // NOTE: Test leaf node deep dynamic routes that match a slash.
    // This should be done last to enable dynamic routes having a higher priority.
    leafNodes.find(config => config.path.startsWith("*") && config.regex.test("/"));
  if (!match) return;
  const routes = match.routeNames.map(name => match._route ? {
    name,
    _route: match._route
  } : {
    name
  });
  return createNestedStateObject(path, hash, routes, configs, initialRoutes);
}
function getStateFromPathWithConfigs(path, configs, initialRoutes, baseUrl = process.env.EXPO_BASE_URL) {
  const formattedPaths = getUrlWithReactNavigationConcessions(path);
  if (!formattedPaths.url) {
    console.warn(`No url found for ${path}`);
    return;
  }
  let cleanPath = stripBaseUrl(stripGroupSegmentsFromPath(formattedPaths.url.pathname), baseUrl) + formattedPaths.url.search;
  if (path.startsWith("/") || (cleanPath = cleanPath.slice(1)), formattedPaths.nonstandardPathname === "/") return getStateFromEmptyPathWithConfigs(cleanPath, formattedPaths.url.hash.slice(1), configs, initialRoutes);
  const routes = matchAgainstConfigs(formattedPaths.nonstandardPathname, configs);
  if (routes != null) return createNestedStateObject(cleanPath, formattedPaths.url.hash.slice(1), routes, configs, initialRoutes);
}
const joinPaths = (...paths) => [].concat(...paths.map(p => p.split("/"))).filter(Boolean).join("/");
function matchAgainstConfigs(remaining, configs) {
  let routes,
    remainingPath = remaining;
  for (const config of configs) {
    if (!config.regex) continue;
    const match = remainingPath.match(config.regex);
    if (!match) continue;
    const matchedParams = config.pattern?.split("/").filter(p => p.match(/^[:*]/)).reduce((acc, p, i) => p.match(/^\*/) ? {
        ...acc,
        [p]: match[(i + 1) * 2]
        //?.replace(/\//, ""),
      } : Object.assign(acc, {
        // The param segments appear every second item starting from 2 in the regex match result.
        // This will only work if we ensure groups aren't included in the match.
        [p]: match[(i + 1) * 2]?.replace(/\//, "")
      }), {}),
      routeFromName = name => {
        const config2 = configs.find(c => c.screen === name);
        if (!config2?.path) return {
          name
        };
        const segments = config2.path.split("/"),
          params = {};
        return segments.filter(p => p.match(/^[:*]/)).forEach(p => {
          let value = matchedParams[p];
          if (value) {
            p.match(/^\*/) && (value = value?.split("/").filter(Boolean));
            const key = p.replace(/^[:*]/, "").replace(/\?$/, "");
            params[key] = config2.parse?.[key] ? config2.parse[key](value) : value;
          }
        }), params && Object.keys(params).length ? {
          name,
          params
        } : {
          name
        };
      };
    routes = config.routeNames.map(name => config._route ? {
      ...routeFromName(name),
      _route: config._route
    } : {
      ...routeFromName(name)
    });
    const combinedParams = routes.reduce((acc, r) => Object.assign(acc, r.params), {}),
      hasCombinedParams = Object.keys(combinedParams).length > 0;
    routes = routes.map(r => (hasCombinedParams && (r.params = combinedParams), r)), remainingPath = remainingPath.replace(match[1], "");
    break;
  }
  return routes;
}
function equalHeritage(a, b) {
  if (a.length !== b.length) return !1;
  for (let i = 0; i < a.length; i++) if (a[i].localeCompare(b[i]) !== 0) return !1;
  return !0;
}
const createNormalizedConfigs = (screen, routeConfig, routeNames = [], initials = [], parentScreens = [], parentPattern) => {
  const configs = [];
  routeNames.push(screen), parentScreens.push(screen);
  const config = routeConfig[screen];
  if (typeof config == "string") {
    const pattern = parentPattern ? joinPaths(parentPattern, config) : config;
    configs.push(createConfigItem(screen, routeNames, pattern, config, !1));
  } else if (typeof config == "object") {
    let pattern;
    const {
      _route
    } = config;
    if (typeof config.path == "string") {
      if (config.exact && config.path === void 0) throw new Error("A 'path' needs to be specified when specifying 'exact: true'. If you don't want this screen in the URL, specify it as empty string, e.g. `path: ''`.");
      pattern = config.exact !== !0 ? joinPaths(parentPattern || "", config.path || "") : config.path || "", configs.push(createConfigItem(screen, routeNames, pattern, config.path, config.screens ? !!Object.keys(config.screens)?.length : !1, config.parse, _route));
    }
    config.screens && (config.initialRouteName && initials.push({
      initialRouteName: config.initialRouteName,
      parentScreens
    }), Object.keys(config.screens).forEach(nestedConfig => {
      const result = createNormalizedConfigs(nestedConfig, config.screens, routeNames, initials, [...parentScreens], pattern ?? parentPattern);
      configs.push(...result);
    }));
  }
  return routeNames.pop(), configs;
};
function formatRegexPattern(it) {
  return it = it.replace(" ", "%20"), it.startsWith(":") ? `(([^/]+\\/)${it.endsWith("?") ? "?" : ""})` : it.startsWith("*") ? `((.*\\/)${it.endsWith("?") ? "?" : ""})` : matchGroupName(it) != null ? `(?:${escape(it)}\\/)?` : escape(it) + "\\/";
}
const createConfigItem = (screen, routeNames, pattern, path, hasChildren, parse, _route) => {
    pattern = pattern.split("/").filter(Boolean).join("/");
    const regex = pattern ? new RegExp(`^(${pattern.split("/").map(formatRegexPattern).join("")})$`) : void 0;
    return {
      screen,
      regex,
      pattern,
      path,
      // The routeNames array is mutated, so copy it to keep the current state
      routeNames: [...routeNames],
      parse,
      userReadableName: [...routeNames.slice(0, -1), path || screen].join("/"),
      hasChildren: !!hasChildren,
      _route
    };
  },
  findParseConfigForRoute = (routeName, routeConfigs) => {
    for (const config of routeConfigs) if (routeName === config.routeNames[config.routeNames.length - 1]) return config.parse;
  },
  findInitialRoute = (routeName, parentScreens, initialRoutes) => {
    for (const config of initialRoutes) if (equalHeritage(parentScreens, config.parentScreens)) return routeName !== config.initialRouteName ? config.initialRouteName : void 0;
  },
  createStateObject = (route, isEmpty, initialRoute) => isEmpty ? initialRoute ? {
    index: 1,
    routes: [{
      name: initialRoute
    }, route]
  } : {
    routes: [route]
  } : initialRoute ? {
    index: 1,
    routes: [{
      name: initialRoute
    }, {
      ...route,
      state: {
        routes: []
      }
    }]
  } : {
    routes: [{
      ...route,
      state: {
        routes: []
      }
    }]
  },
  createNestedStateObject = (path, hash, routes, routeConfigs, initialRoutes) => {
    let route = routes.shift();
    const parentScreens = [];
    let initialRoute = findInitialRoute(route.name, parentScreens, initialRoutes);
    parentScreens.push(route.name);
    const state = createStateObject(route, routes.length === 0, initialRoute);
    if (routes.length > 0) {
      let nestedState = state;
      for (; route = routes.shift();) {
        initialRoute = findInitialRoute(route.name, parentScreens, initialRoutes);
        const nestedStateIndex = nestedState.index || nestedState.routes.length - 1;
        nestedState.routes[nestedStateIndex].state = createStateObject(route, routes.length === 0, initialRoute), routes.length > 0 && (nestedState = nestedState.routes[nestedStateIndex].state), parentScreens.push(route.name);
      }
    }
    route = findFocusedRoute(state), route.path = path;
    const params = parseQueryParams(route.path, findParseConfigForRoute(route.name, routeConfigs));
    if (params) {
      route.params = Object.assign(/* @__PURE__ */Object.create(null), route.params);
      for (const [name, value] of Object.entries(params)) if (route.params?.[name] && process.env.NODE_ENV !== "production" && console.warn(`Route '/${route.name}' with param '${name}' was specified both in the path and as a param, removing from path`), !route.params?.[name]) {
        route.params[name] = value;
        continue;
      }
      Object.keys(route.params).length === 0 && delete route.params;
    }
    return hash && (route.params = Object.assign(/* @__PURE__ */Object.create(null), route.params), route.params["#"] = hash), state;
  },
  parseQueryParams = (path, parseConfig) => {
    const query = path.split("?")[1],
      searchParams = new URLSearchParams(query),
      params = Object.fromEntries(
      // @ts-ignore: [Symbol.iterator] is indeed, available on every platform.
      searchParams);
    return parseConfig && Object.keys(params).forEach(name => {
      Object.hasOwnProperty.call(parseConfig, name) && typeof params[name] == "string" && (params[name] = parseConfig[name](params[name]));
    }), Object.keys(params).length ? params : void 0;
  },
  baseUrlCache = /* @__PURE__ */new Map();
function getBaseUrlRegex(baseUrl) {
  if (baseUrlCache.has(baseUrl)) return baseUrlCache.get(baseUrl);
  const regex = new RegExp(`^\\/?${escape(baseUrl)}`, "g");
  return baseUrlCache.set(baseUrl, regex), regex;
}
function stripBaseUrl(path, baseUrl = process.env.EXPO_BASE_URL) {
  if (process.env.NODE_ENV !== "development" && baseUrl) {
    const reg = getBaseUrlRegex(baseUrl);
    return path.replace(/^\/+/g, "/").replace(reg, "");
  }
  return path;
}
export { getStateFromPath as default, getMatchableRouteConfigs, getUrlWithReactNavigationConcessions, stripBaseUrl };
//# sourceMappingURL=getStateFromPath.mjs.map
