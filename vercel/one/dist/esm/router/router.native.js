import { StackActions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { nanoid } from "nanoid/non-secure";
import { Fragment, startTransition, useSyncExternalStore } from "react";
import { Platform } from "react-native";
import { getLoaderPath, getPreloadPath } from "../cleanUrl";
import { deepEqual, getPathDataFromState } from "../fork/getPathFromState";
import { stripBaseUrl } from "../fork/getStateFromPath";
import { getLinkingConfig } from "../getLinkingConfig";
import { getRoutes } from "../getRoutes";
import { resolveHref } from "../link/href";
import { resolve } from "../link/path";
import { matchDynamicName } from "../matchers";
import { sortRoutes } from "../sortRoutes";
import { getQualifiedRouteComponent } from "../useScreens";
import { assertIsReady } from "../utils/assertIsReady";
import { dynamicImport } from "../utils/dynamicImport";
import { removeSearch } from "../utils/removeSearch";
import { shouldLinkExternally } from "../utils/url";
import { getNormalizedStatePath } from "./getNormalizedStatePath";
import { setLastAction } from "./lastAction";
var routeNode = null, rootComponent, linking, hasAttemptedToHideSplash = !1, initialState, rootState, nextState, routeInfo, splashScreenAnimationFrame, navigationRef = null, navigationRefSubscription, rootStateSubscribers = /* @__PURE__ */ new Set(), loadingStateSubscribers = /* @__PURE__ */ new Set(), storeSubscribers = /* @__PURE__ */ new Set();
function initialize(context, ref, initialLocation) {
  if (cleanUpState(), routeNode = getRoutes(context, {
    ignoreEntryPoints: !0,
    platform: Platform.OS
  }), rootComponent = routeNode ? getQualifiedRouteComponent(routeNode) : Fragment, !routeNode && process.env.NODE_ENV === "production")
    throw new Error("No routes found");
  navigationRef = ref, setupLinking(initialLocation), subscribeToNavigationChanges();
}
function cleanUpState() {
  initialState = void 0, rootState = void 0, nextState = void 0, routeInfo = void 0, linking = void 0, navigationRefSubscription?.(), rootStateSubscribers.clear(), storeSubscribers.clear();
}
function setupLinking(initialLocation) {
  if (routeNode && (linking = getLinkingConfig(routeNode), initialLocation)) {
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
  return linkTo(resolveHref(url), "NAVIGATE", options);
}
function push(url, options) {
  return linkTo(resolveHref(url), "PUSH", options);
}
function dismiss(count) {
  navigationRef?.dispatch(StackActions.pop(count));
}
function replace(url, options) {
  return linkTo(resolveHref(url), "REPLACE", options);
}
function setParams() {
  var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _navigationRef_current;
  return assertIsReady(navigationRef), navigationRef == null || (_navigationRef_current = navigationRef.current) === null || _navigationRef_current === void 0 ? void 0 : _navigationRef_current.setParams(
    // @ts-expect-error
    params
  );
}
function dismissAll() {
  navigationRef?.dispatch(StackActions.popToTop());
}
function goBack() {
  var _navigationRef_current;
  assertIsReady(navigationRef), navigationRef == null || (_navigationRef_current = navigationRef.current) === null || _navigationRef_current === void 0 || _navigationRef_current.goBack();
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
  }).sort(sortRoutes);
}
function updateState(state) {
  var nextStateParam = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : state;
  rootState = state, nextState = nextStateParam;
  var nextRouteInfo = getRouteInfo(state);
  deepEqual(routeInfo, nextRouteInfo) || (routeInfo = nextRouteInfo);
}
function getRouteInfo(state) {
  return getRouteInfoFromState(function(state2, asPath) {
    return getPathDataFromState(state2, {
      screens: [],
      ...linking?.config,
      preserveDynamicRoutes: asPath,
      preserveGroups: asPath
    });
  }, state);
}
function getRouteInfoFromState(getPathFromState, state, baseUrl) {
  var { path } = getPathFromState(state, !1), qualified = getPathFromState(state, !0);
  return {
    unstable_globalHref: path,
    pathname: stripBaseUrl(path, baseUrl).split("?")[0],
    isIndex: isIndexPath(state),
    ...getNormalizedStatePath(qualified, baseUrl)
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
  return useSyncExternalStore(subscribeToStore, snapshot, snapshot);
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
  return syncStoreRootState(), useSyncExternalStore(subscribeToRootState, rootStateSnapshot, rootStateSnapshot);
}
function useStoreRouteInfo() {
  return syncStoreRootState(), useSyncExternalStore(subscribeToRootState, routeInfoSnapshot, routeInfoSnapshot);
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
      dynamicImport(getPreloadPath(href)),
      dynamicImport(getLoaderPath(href))
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
    if (shouldLinkExternally(href)) {
      Linking.openURL(href);
      return;
    }
    assertIsReady(navigationRef);
    var current = navigationRef.current;
    if (current == null)
      throw new Error("Couldn't find a navigation object. Is your component inside NavigationContainer?");
    if (!linking)
      throw new Error("Attempted to link to route when no routes are present");
    if (setLastAction(), href === ".." || href === "../") {
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
      routeInfo?.isIndex || (base += "/.."), href = resolve(base, href);
    }
    var state = linking.getStateFromPath(href, linking.config);
    if (!state || state.routes.length === 0) {
      console.error("Could not generate a valid navigation state for the given path: " + href), console.error("linking.config", linking.config), console.error("routes", getSortedRoutes());
      return;
    }
    setLoadingState("loading"), globalThis.__vxrntodopath = removeSearch(href);
    var rootState2 = navigationRef.getRootState(), action = getNavigateAction(state, rootState2, event);
    nextOptions = options ?? null, startTransition(function() {
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
    var childState = actionStateRoute.state, nextNavigationState = stateRoute.state, dynamicName = matchDynamicName(actionStateRoute.name), didActionAndCurrentStateDiverge = actionStateRoute.name !== stateRoute.name || !childState || !nextNavigationState || dynamicName && ((_actionStateRoute_params = actionStateRoute.params) === null || _actionStateRoute_params === void 0 ? void 0 : _actionStateRoute_params[dynamicName]) !== ((_stateRoute_params = stateRoute.params) === null || _stateRoute_params === void 0 ? void 0 : _stateRoute_params[dynamicName]);
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
  return type === "PUSH" && (setLastAction(), type = "NAVIGATE", navigationState.type === "stack" && (rootPayload.key = `${rootPayload.name}-${nanoid()}`)), type === "REPLACE" && navigationState.type === "tab" && (type = "JUMP_TO"), {
    type,
    target: navigationState.key,
    payload: {
      key: rootPayload.key,
      name: rootPayload.screen,
      params: rootPayload.params
    }
  };
}
export {
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
};
//# sourceMappingURL=router.js.map
