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
var router_exports = {};
__export(router_exports, {
  canDismiss: () => canDismiss,
  canGoBack: () => canGoBack,
  cleanup: () => cleanup,
  dismiss: () => dismiss,
  dismissAll: () => dismissAll,
  getRouteInfo: () => getRouteInfo,
  getSortedRoutes: () => getSortedRoutes,
  goBack: () => goBack,
  hasAttemptedToHideSplash: () => hasAttemptedToHideSplash,
  initialState: () => initialState,
  initialize: () => initialize,
  linkTo: () => linkTo,
  linking: () => linking,
  navigate: () => navigate,
  navigationRef: () => navigationRef,
  preloadRoute: () => preloadRoute,
  preloadingLoader: () => preloadingLoader,
  push: () => push,
  replace: () => replace,
  rootComponent: () => rootComponent,
  rootState: () => rootState,
  rootStateSnapshot: () => rootStateSnapshot,
  routeInfo: () => routeInfo,
  routeInfoSnapshot: () => routeInfoSnapshot,
  routeNode: () => routeNode,
  setLoadingState: () => setLoadingState,
  setParams: () => setParams,
  snapshot: () => snapshot,
  subscribeToLoadingState: () => subscribeToLoadingState,
  subscribeToRootState: () => subscribeToRootState,
  subscribeToStore: () => subscribeToStore,
  updateState: () => updateState,
  useOneRouter: () => useOneRouter,
  useStoreRootState: () => useStoreRootState,
  useStoreRouteInfo: () => useStoreRouteInfo
});
module.exports = __toCommonJS(router_exports);
var import_native = require("@react-navigation/native"), Linking = __toESM(require("expo-linking"), 1), import_non_secure = require("nanoid/non-secure"), import_react = require("react"), import_react_native = require("react-native"), import_cleanUrl = require("../cleanUrl"), import_getPathFromState = require("../fork/getPathFromState"), import_getStateFromPath = require("../fork/getStateFromPath"), import_getLinkingConfig = require("../getLinkingConfig"), import_getRoutes = require("../getRoutes"), import_href = require("../link/href"), import_path = require("../link/path"), import_matchers = require("../matchers"), import_sortRoutes = require("../sortRoutes"), import_useScreens = require("../useScreens"), import_assertIsReady = require("../utils/assertIsReady"), import_dynamicImport = require("../utils/dynamicImport"), import_removeSearch = require("../utils/removeSearch"), import_url = require("../utils/url"), import_getNormalizedStatePath = require("./getNormalizedStatePath"), import_lastAction = require("./lastAction"), routeNode = null, rootComponent, linking, hasAttemptedToHideSplash = !1, initialState, rootState, nextState, routeInfo, splashScreenAnimationFrame, navigationRef = null, navigationRefSubscription, rootStateSubscribers = /* @__PURE__ */ new Set(), loadingStateSubscribers = /* @__PURE__ */ new Set(), storeSubscribers = /* @__PURE__ */ new Set();
function initialize(context, ref, initialLocation) {
  if (cleanUpState(), routeNode = (0, import_getRoutes.getRoutes)(context, {
    ignoreEntryPoints: !0,
    platform: import_react_native.Platform.OS
  }), rootComponent = routeNode ? (0, import_useScreens.getQualifiedRouteComponent)(routeNode) : import_react.Fragment, !routeNode && process.env.NODE_ENV === "production")
    throw new Error("No routes found");
  navigationRef = ref, setupLinking(initialLocation), subscribeToNavigationChanges();
}
function cleanUpState() {
  initialState = void 0, rootState = void 0, nextState = void 0, routeInfo = void 0, linking = void 0, navigationRefSubscription == null || navigationRefSubscription(), rootStateSubscribers.clear(), storeSubscribers.clear();
}
function setupLinking(initialLocation) {
  if (routeNode && (linking = (0, import_getLinkingConfig.getLinkingConfig)(routeNode), initialLocation)) {
    var _linking_getStateFromPath;
    linking.getInitialURL = function() {
      return initialLocation.toString();
    }, initialState = (_linking_getStateFromPath = linking.getStateFromPath) === null || _linking_getStateFromPath === void 0 ? void 0 : _linking_getStateFromPath.call(linking, initialLocation.pathname + (initialLocation.search || ""), linking.config);
  }
  initialState ? (rootState = initialState, routeInfo = getRouteInfo(initialState)) : routeInfo = {
    unstable_globalHref: "",
    pathname: "",
    isIndex: !1,
    params: {},
    segments: []
  };
}
function subscribeToNavigationChanges() {
  navigationRefSubscription = navigationRef.addListener("state", function(data) {
    var state = data.data.state;
    hasAttemptedToHideSplash || (hasAttemptedToHideSplash = !0, splashScreenAnimationFrame = requestAnimationFrame(function() {
    })), nextOptions && (state.linkOptions = nextOptions, nextOptions = null);
    var shouldUpdateSubscribers = nextState === state;
    if (nextState = void 0, state && state !== rootState && (updateState(state, void 0), shouldUpdateSubscribers = !0), shouldUpdateSubscribers) {
      var _iteratorNormalCompletion2 = !0, _didIteratorError2 = !1, _iteratorError2 = void 0;
      try {
        for (var _iterator2 = rootStateSubscribers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = !0) {
          var subscriber2 = _step2.value;
          subscriber2(state);
        }
      } catch (err) {
        _didIteratorError2 = !0, _iteratorError2 = err;
      } finally {
        try {
          !_iteratorNormalCompletion2 && _iterator2.return != null && _iterator2.return();
        } finally {
          if (_didIteratorError2)
            throw _iteratorError2;
        }
      }
    }
  }), updateSnapshot();
  var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
  try {
    for (var _iterator = storeSubscribers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var subscriber = _step.value;
      subscriber();
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
function navigate(url, options) {
  return linkTo((0, import_href.resolveHref)(url), "NAVIGATE", options);
}
function push(url, options) {
  return linkTo((0, import_href.resolveHref)(url), "PUSH", options);
}
function dismiss(count) {
  navigationRef == null || navigationRef.dispatch(import_native.StackActions.pop(count));
}
function replace(url, options) {
  return linkTo((0, import_href.resolveHref)(url), "REPLACE", options);
}
function setParams() {
  var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _navigationRef_current;
  return (0, import_assertIsReady.assertIsReady)(navigationRef), navigationRef == null || (_navigationRef_current = navigationRef.current) === null || _navigationRef_current === void 0 ? void 0 : _navigationRef_current.setParams(
    // @ts-expect-error
    params
  );
}
function dismissAll() {
  navigationRef == null || navigationRef.dispatch(import_native.StackActions.popToTop());
}
function goBack() {
  var _navigationRef_current;
  (0, import_assertIsReady.assertIsReady)(navigationRef), navigationRef == null || (_navigationRef_current = navigationRef.current) === null || _navigationRef_current === void 0 || _navigationRef_current.goBack();
}
function canGoBack() {
  var _navigationRef_current;
  if (!navigationRef.isReady())
    return !1;
  var _navigationRef_current_canGoBack;
  return (_navigationRef_current_canGoBack = navigationRef == null || (_navigationRef_current = navigationRef.current) === null || _navigationRef_current === void 0 ? void 0 : _navigationRef_current.canGoBack()) !== null && _navigationRef_current_canGoBack !== void 0 ? _navigationRef_current_canGoBack : !1;
}
function canDismiss() {
  for (var state = rootState; state; ) {
    var _state_routes_state_index, _state_routes;
    if (state.type === "stack" && state.routes.length > 1)
      return !0;
    if (state.index === void 0)
      return !1;
    state = (_state_routes = state.routes) === null || _state_routes === void 0 || (_state_routes_state_index = _state_routes[state.index]) === null || _state_routes_state_index === void 0 ? void 0 : _state_routes_state_index.state;
  }
  return !1;
}
function getSortedRoutes() {
  if (!routeNode)
    throw new Error("No routes");
  return routeNode.children.filter(function(route) {
    return !route.internal;
  }).sort(import_sortRoutes.sortRoutes);
}
function updateState(state) {
  var nextStateParam = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : state;
  rootState = state, nextState = nextStateParam;
  var nextRouteInfo = getRouteInfo(state);
  (0, import_getPathFromState.deepEqual)(routeInfo, nextRouteInfo) || (routeInfo = nextRouteInfo);
}
function getRouteInfo(state) {
  return getRouteInfoFromState(function(state2, asPath) {
    return (0, import_getPathFromState.getPathDataFromState)(state2, {
      screens: [],
      ...linking == null ? void 0 : linking.config,
      preserveDynamicRoutes: asPath,
      preserveGroups: asPath
    });
  }, state);
}
function getRouteInfoFromState(getPathFromState, state, baseUrl) {
  var { path } = getPathFromState(state, !1), qualified = getPathFromState(state, !0);
  return {
    unstable_globalHref: path,
    pathname: (0, import_getStateFromPath.stripBaseUrl)(path, baseUrl).split("?")[0],
    isIndex: isIndexPath(state),
    ...(0, import_getNormalizedStatePath.getNormalizedStatePath)(qualified, baseUrl)
  };
}
function subscribeToRootState(subscriber) {
  return rootStateSubscribers.add(subscriber), function() {
    rootStateSubscribers.delete(subscriber);
  };
}
function subscribeToStore(subscriber) {
  return storeSubscribers.add(subscriber), function() {
    storeSubscribers.delete(subscriber);
  };
}
function subscribeToLoadingState(subscriber) {
  return loadingStateSubscribers.add(subscriber), function() {
    loadingStateSubscribers.delete(subscriber);
  };
}
function setLoadingState(state) {
  var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
  try {
    for (var _iterator = loadingStateSubscribers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var listener = _step.value;
      listener(state);
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
var currentSnapshot = null;
function updateSnapshot() {
  currentSnapshot = getSnapshot();
}
function snapshot() {
  return currentSnapshot;
}
function getSnapshot() {
  return {
    linkTo,
    routeNode,
    rootComponent,
    linking,
    hasAttemptedToHideSplash,
    initialState,
    rootState,
    nextState,
    routeInfo,
    splashScreenAnimationFrame,
    navigationRef,
    navigationRefSubscription,
    rootStateSubscribers,
    storeSubscribers
  };
}
function rootStateSnapshot() {
  return rootState;
}
function routeInfoSnapshot() {
  return routeInfo;
}
function useOneRouter() {
  return (0, import_react.useSyncExternalStore)(subscribeToStore, snapshot, snapshot);
}
function syncStoreRootState() {
  if (!navigationRef)
    throw new Error("No navigationRef, possible duplicate One dep");
  if (navigationRef.isReady()) {
    var currentState = navigationRef.getRootState();
    rootState !== currentState && updateState(currentState);
  }
}
function useStoreRootState() {
  return syncStoreRootState(), (0, import_react.useSyncExternalStore)(subscribeToRootState, rootStateSnapshot, rootStateSnapshot);
}
function useStoreRouteInfo() {
  return syncStoreRootState(), (0, import_react.useSyncExternalStore)(subscribeToRootState, routeInfoSnapshot, routeInfoSnapshot);
}
function isIndexPath(state) {
  var _state_index, route = getActualLastRoute(state.routes[(_state_index = state.index) !== null && _state_index !== void 0 ? _state_index : state.routes.length - 1]);
  return route.state ? isIndexPath(route.state) : route.name === "index" ? !0 : route.params && "screen" in route.params ? route.params.screen === "index" : !!route.name.match(/.+\/index$/);
}
function getActualLastRoute(routeLike) {
  var _routeLike_state;
  if (routeLike.name[0] === "(" && (!((_routeLike_state = routeLike.state) === null || _routeLike_state === void 0) && _routeLike_state.routes)) {
    var routes = routeLike.state.routes;
    return getActualLastRoute(routes[routes.length - 1]);
  }
  return routeLike;
}
function cleanup() {
  splashScreenAnimationFrame && cancelAnimationFrame(splashScreenAnimationFrame);
}
var preloadingLoader = {};
function setupPreload(href) {
  preloadingLoader[href] || (preloadingLoader[href] = async function() {
    var [_preload, loader] = await Promise.all([
      (0, import_dynamicImport.dynamicImport)((0, import_cleanUrl.getPreloadPath)(href)),
      (0, import_dynamicImport.dynamicImport)((0, import_cleanUrl.getLoaderPath)(href))
    ]);
    try {
      var _response_loader, response = await loader;
      return await ((_response_loader = response.loader) === null || _response_loader === void 0 ? void 0 : _response_loader.call(response));
    } catch (err) {
      return console.error(`Error preloading loader: ${err}`), null;
    }
  });
}
function preloadRoute(href) {
}
async function linkTo(href, event, options) {
  if (href[0] !== "#") {
    if ((0, import_url.shouldLinkExternally)(href)) {
      Linking.openURL(href);
      return;
    }
    (0, import_assertIsReady.assertIsReady)(navigationRef);
    var current = navigationRef.current;
    if (current == null)
      throw new Error("Couldn't find a navigation object. Is your component inside NavigationContainer?");
    if (!linking)
      throw new Error("Attempted to link to route when no routes are present");
    if ((0, import_lastAction.setLastAction)(), href === ".." || href === "../") {
      current.goBack();
      return;
    }
    if (href.startsWith(".")) {
      var _routeInfo_segments, _routeInfo_segments_map_filter_join, base = (_routeInfo_segments_map_filter_join = routeInfo == null || (_routeInfo_segments = routeInfo.segments) === null || _routeInfo_segments === void 0 ? void 0 : _routeInfo_segments.map(function(segment) {
        var _routeInfo_params;
        if (!segment.startsWith("[")) return segment;
        if (segment.startsWith("[...")) {
          var _routeInfo_params1, _params_split;
          segment = segment.slice(4, -1);
          var params = routeInfo == null || (_routeInfo_params1 = routeInfo.params) === null || _routeInfo_params1 === void 0 ? void 0 : _routeInfo_params1[segment];
          if (Array.isArray(params))
            return params.join("/");
          var _params_split_join;
          return (_params_split_join = params == null || (_params_split = params.split(",")) === null || _params_split === void 0 ? void 0 : _params_split.join("/")) !== null && _params_split_join !== void 0 ? _params_split_join : "";
        }
        return segment = segment.slice(1, -1), routeInfo == null || (_routeInfo_params = routeInfo.params) === null || _routeInfo_params === void 0 ? void 0 : _routeInfo_params[segment];
      }).filter(Boolean).join("/")) !== null && _routeInfo_segments_map_filter_join !== void 0 ? _routeInfo_segments_map_filter_join : "/";
      routeInfo != null && routeInfo.isIndex || (base += "/.."), href = (0, import_path.resolve)(base, href);
    }
    var state = linking.getStateFromPath(href, linking.config);
    if (!state || state.routes.length === 0) {
      console.error("Could not generate a valid navigation state for the given path: " + href), console.error("linking.config", linking.config), console.error("routes", getSortedRoutes());
      return;
    }
    setLoadingState("loading"), globalThis.__vxrntodopath = (0, import_removeSearch.removeSearch)(href);
    var rootState2 = navigationRef.getRootState(), action = getNavigateAction(state, rootState2, event);
    nextOptions = options ?? null, (0, import_react.startTransition)(function() {
      var current2 = navigationRef.getCurrentRoute();
      navigationRef.dispatch(action);
      var warningTm, interval = setInterval(function() {
        var next = navigationRef.getCurrentRoute();
        current2 !== next && setTimeout(function() {
          setLoadingState("loaded");
        }), clearTimeout(warningTm), clearTimeout(interval);
      }, 16);
      process.env.NODE_ENV === "development" && (warningTm = setTimeout(function() {
        console.warn("Routing took more than 8 seconds");
      }, 1e3));
    });
  }
}
var nextOptions = null;
function getNavigateAction(actionState, navigationState) {
  for (var type = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "NAVIGATE", actionStateRoute; actionState && navigationState; ) {
    var _actionStateRoute_params, _stateRoute_params, stateRoute = navigationState.routes[navigationState.index];
    actionStateRoute = actionState.routes[actionState.routes.length - 1];
    var childState = actionStateRoute.state, nextNavigationState = stateRoute.state, dynamicName = (0, import_matchers.matchDynamicName)(actionStateRoute.name), didActionAndCurrentStateDiverge = actionStateRoute.name !== stateRoute.name || !childState || !nextNavigationState || dynamicName && ((_actionStateRoute_params = actionStateRoute.params) === null || _actionStateRoute_params === void 0 ? void 0 : _actionStateRoute_params[dynamicName]) !== ((_stateRoute_params = stateRoute.params) === null || _stateRoute_params === void 0 ? void 0 : _stateRoute_params[dynamicName]);
    if (didActionAndCurrentStateDiverge)
      break;
    actionState = childState, navigationState = nextNavigationState;
  }
  for (var rootPayload = {
    params: {}
  }, payload = rootPayload, params = payload.params; actionStateRoute; ) {
    var _actionStateRoute_state, _actionStateRoute_state1, _payload;
    Object.assign(params, {
      ...actionStateRoute.params
    }), payload.screen = actionStateRoute.name, payload.params = {
      ...actionStateRoute.params
    }, actionStateRoute = (_actionStateRoute_state1 = actionStateRoute.state) === null || _actionStateRoute_state1 === void 0 ? void 0 : _actionStateRoute_state1.routes[((_actionStateRoute_state = actionStateRoute.state) === null || _actionStateRoute_state === void 0 ? void 0 : _actionStateRoute_state.routes.length) - 1];
    var _params;
    (_params = (_payload = payload).params) !== null && _params !== void 0 || (_payload.params = {}), payload = payload.params, params = payload;
  }
  return type === "PUSH" && ((0, import_lastAction.setLastAction)(), type = "NAVIGATE", navigationState.type === "stack" && (rootPayload.key = `${rootPayload.name}-${(0, import_non_secure.nanoid)()}`)), type === "REPLACE" && navigationState.type === "tab" && (type = "JUMP_TO"), {
    type,
    target: navigationState.key,
    payload: {
      key: rootPayload.key,
      name: rootPayload.screen,
      params: rootPayload.params
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  canDismiss,
  canGoBack,
  cleanup,
  dismiss,
  dismissAll,
  getRouteInfo,
  getSortedRoutes,
  goBack,
  hasAttemptedToHideSplash,
  initialState,
  initialize,
  linkTo,
  linking,
  navigate,
  navigationRef,
  preloadRoute,
  preloadingLoader,
  push,
  replace,
  rootComponent,
  rootState,
  rootStateSnapshot,
  routeInfo,
  routeInfoSnapshot,
  routeNode,
  setLoadingState,
  setParams,
  snapshot,
  subscribeToLoadingState,
  subscribeToRootState,
  subscribeToStore,
  updateState,
  useOneRouter,
  useStoreRootState,
  useStoreRouteInfo
});
//# sourceMappingURL=router.js.map
