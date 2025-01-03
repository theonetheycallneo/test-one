var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: !0
  }) : target, mod)),
  __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: !0
  }), mod);
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
var import_native = require("@react-navigation/native"),
  Linking = __toESM(require("expo-linking"), 1),
  import_non_secure = require("nanoid/non-secure"),
  import_react = require("react"),
  import_react_native = require("react-native-web"),
  import_cleanUrl = require("../cleanUrl.cjs"),
  import_getPathFromState = require("../fork/getPathFromState.cjs"),
  import_getStateFromPath = require("../fork/getStateFromPath.cjs"),
  import_getLinkingConfig = require("../getLinkingConfig.cjs"),
  import_getRoutes = require("../getRoutes.cjs"),
  import_href = require("../link/href.cjs"),
  import_path = require("../link/path.cjs"),
  import_matchers = require("../matchers.cjs"),
  import_sortRoutes = require("../sortRoutes.cjs"),
  import_useScreens = require("../useScreens.cjs"),
  import_assertIsReady = require("../utils/assertIsReady.cjs"),
  import_dynamicImport = require("../utils/dynamicImport.cjs"),
  import_removeSearch = require("../utils/removeSearch.cjs"),
  import_url = require("../utils/url.cjs"),
  import_getNormalizedStatePath = require("./getNormalizedStatePath.cjs"),
  import_lastAction = require("./lastAction.cjs");
let routeNode = null,
  rootComponent,
  linking,
  hasAttemptedToHideSplash = !1,
  initialState,
  rootState,
  nextState,
  routeInfo,
  splashScreenAnimationFrame,
  navigationRef = null,
  navigationRefSubscription;
const rootStateSubscribers = /* @__PURE__ */new Set(),
  loadingStateSubscribers = /* @__PURE__ */new Set(),
  storeSubscribers = /* @__PURE__ */new Set();
function initialize(context, ref, initialLocation) {
  if (cleanUpState(), routeNode = (0, import_getRoutes.getRoutes)(context, {
    ignoreEntryPoints: !0,
    platform: import_react_native.Platform.OS
  }), rootComponent = routeNode ? (0, import_useScreens.getQualifiedRouteComponent)(routeNode) : import_react.Fragment, !routeNode && process.env.NODE_ENV === "production") throw new Error("No routes found");
  navigationRef = ref, setupLinking(initialLocation), subscribeToNavigationChanges();
}
function cleanUpState() {
  initialState = void 0, rootState = void 0, nextState = void 0, routeInfo = void 0, linking = void 0, navigationRefSubscription?.(), rootStateSubscribers.clear(), storeSubscribers.clear();
}
function setupLinking(initialLocation) {
  routeNode && (linking = (0, import_getLinkingConfig.getLinkingConfig)(routeNode), initialLocation && (linking.getInitialURL = () => initialLocation.toString(), initialState = linking.getStateFromPath?.(initialLocation.pathname + (initialLocation.search || ""), linking.config))), initialState ? (rootState = initialState, routeInfo = getRouteInfo(initialState)) : routeInfo = {
    unstable_globalHref: "",
    pathname: "",
    isIndex: !1,
    params: {},
    segments: []
  };
}
function subscribeToNavigationChanges() {
  navigationRefSubscription = navigationRef.addListener("state", data => {
    const state = data.data.state;
    hasAttemptedToHideSplash || (hasAttemptedToHideSplash = !0, splashScreenAnimationFrame = requestAnimationFrame(() => {})), nextOptions && (state.linkOptions = nextOptions, nextOptions = null);
    let shouldUpdateSubscribers = nextState === state;
    if (nextState = void 0, state && state !== rootState && (updateState(state, void 0), shouldUpdateSubscribers = !0), shouldUpdateSubscribers) for (const subscriber of rootStateSubscribers) subscriber(state);
  }), updateSnapshot();
  for (const subscriber of storeSubscribers) subscriber();
}
function navigate(url, options) {
  return linkTo((0, import_href.resolveHref)(url), "NAVIGATE", options);
}
function push(url, options) {
  return linkTo((0, import_href.resolveHref)(url), "PUSH", options);
}
function dismiss(count) {
  navigationRef?.dispatch(import_native.StackActions.pop(count));
}
function replace(url, options) {
  return linkTo((0, import_href.resolveHref)(url), "REPLACE", options);
}
function setParams(params = {}) {
  return (0, import_assertIsReady.assertIsReady)(navigationRef), navigationRef?.current?.setParams(
  // @ts-expect-error
  params);
}
function dismissAll() {
  navigationRef?.dispatch(import_native.StackActions.popToTop());
}
function goBack() {
  (0, import_assertIsReady.assertIsReady)(navigationRef), navigationRef?.current?.goBack();
}
function canGoBack() {
  return navigationRef.isReady() ? navigationRef?.current?.canGoBack() ?? !1 : !1;
}
function canDismiss() {
  let state = rootState;
  for (; state;) {
    if (state.type === "stack" && state.routes.length > 1) return !0;
    if (state.index === void 0) return !1;
    state = state.routes?.[state.index]?.state;
  }
  return !1;
}
function getSortedRoutes() {
  if (!routeNode) throw new Error("No routes");
  return routeNode.children.filter(route => !route.internal).sort(import_sortRoutes.sortRoutes);
}
function updateState(state, nextStateParam = state) {
  rootState = state, nextState = nextStateParam;
  const nextRouteInfo = getRouteInfo(state);
  (0, import_getPathFromState.deepEqual)(routeInfo, nextRouteInfo) || (routeInfo = nextRouteInfo);
}
function getRouteInfo(state) {
  return getRouteInfoFromState((state2, asPath) => (0, import_getPathFromState.getPathDataFromState)(state2, {
    screens: [],
    ...linking?.config,
    preserveDynamicRoutes: asPath,
    preserveGroups: asPath
  }), state);
}
function getRouteInfoFromState(getPathFromState, state, baseUrl) {
  const {
      path
    } = getPathFromState(state, !1),
    qualified = getPathFromState(state, !0);
  return {
    unstable_globalHref: path,
    pathname: (0, import_getStateFromPath.stripBaseUrl)(path, baseUrl).split("?")[0],
    isIndex: isIndexPath(state),
    ...(0, import_getNormalizedStatePath.getNormalizedStatePath)(qualified, baseUrl)
  };
}
function subscribeToRootState(subscriber) {
  return rootStateSubscribers.add(subscriber), () => {
    rootStateSubscribers.delete(subscriber);
  };
}
function subscribeToStore(subscriber) {
  return storeSubscribers.add(subscriber), () => {
    storeSubscribers.delete(subscriber);
  };
}
function subscribeToLoadingState(subscriber) {
  return loadingStateSubscribers.add(subscriber), () => {
    loadingStateSubscribers.delete(subscriber);
  };
}
function setLoadingState(state) {
  for (const listener of loadingStateSubscribers) listener(state);
}
let currentSnapshot = null;
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
  if (!navigationRef) throw new Error("No navigationRef, possible duplicate One dep");
  if (navigationRef.isReady()) {
    const currentState = navigationRef.getRootState();
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
  const route = getActualLastRoute(state.routes[state.index ?? state.routes.length - 1]);
  return route.state ? isIndexPath(route.state) : route.name === "index" ? !0 : route.params && "screen" in route.params ? route.params.screen === "index" : !!route.name.match(/.+\/index$/);
}
function getActualLastRoute(routeLike) {
  if (routeLike.name[0] === "(" && routeLike.state?.routes) {
    const routes = routeLike.state.routes;
    return getActualLastRoute(routes[routes.length - 1]);
  }
  return routeLike;
}
function cleanup() {
  splashScreenAnimationFrame && cancelAnimationFrame(splashScreenAnimationFrame);
}
const preloadingLoader = {};
function setupPreload(href) {
  preloadingLoader[href] || (preloadingLoader[href] = async () => {
    const [_preload, loader] = await Promise.all([(0, import_dynamicImport.dynamicImport)((0, import_cleanUrl.getPreloadPath)(href)), (0, import_dynamicImport.dynamicImport)((0, import_cleanUrl.getLoaderPath)(href))]);
    try {
      return await (await loader).loader?.();
    } catch (err) {
      return console.error(`Error preloading loader: ${err}`), null;
    }
  });
}
function preloadRoute(href) {
  process.env.NODE_ENV !== "development" && (setupPreload(href), typeof preloadingLoader[href] == "function" && preloadingLoader[href]());
}
async function linkTo(href, event, options) {
  if (href[0] === "#") return;
  if ((0, import_url.shouldLinkExternally)(href)) {
    Linking.openURL(href);
    return;
  }
  (0, import_assertIsReady.assertIsReady)(navigationRef);
  const current = navigationRef.current;
  if (current == null) throw new Error("Couldn't find a navigation object. Is your component inside NavigationContainer?");
  if (!linking) throw new Error("Attempted to link to route when no routes are present");
  if ((0, import_lastAction.setLastAction)(), href === ".." || href === "../") {
    current.goBack();
    return;
  }
  if (href.startsWith(".")) {
    let base = routeInfo?.segments?.map(segment => {
      if (!segment.startsWith("[")) return segment;
      if (segment.startsWith("[...")) {
        segment = segment.slice(4, -1);
        const params = routeInfo?.params?.[segment];
        return Array.isArray(params) ? params.join("/") : params?.split(",")?.join("/") ?? "";
      }
      return segment = segment.slice(1, -1), routeInfo?.params?.[segment];
    }).filter(Boolean).join("/") ?? "/";
    routeInfo?.isIndex || (base += "/.."), href = (0, import_path.resolve)(base, href);
  }
  const state = linking.getStateFromPath(href, linking.config);
  if (!state || state.routes.length === 0) {
    console.error("Could not generate a valid navigation state for the given path: " + href), console.error("linking.config", linking.config), console.error("routes", getSortedRoutes());
    return;
  }
  setLoadingState("loading"), globalThis.__vxrntodopath = (0, import_removeSearch.removeSearch)(href), preloadRoute(href);
  const rootState2 = navigationRef.getRootState(),
    action = getNavigateAction(state, rootState2, event);
  nextOptions = options ?? null, (0, import_react.startTransition)(() => {
    const current2 = navigationRef.getCurrentRoute();
    navigationRef.dispatch(action);
    let warningTm;
    const interval = setInterval(() => {
      const next = navigationRef.getCurrentRoute();
      current2 !== next && setTimeout(() => {
        setLoadingState("loaded");
      }), clearTimeout(warningTm), clearTimeout(interval);
    }, 16);
    process.env.NODE_ENV === "development" && (warningTm = setTimeout(() => {
      console.warn("Routing took more than 8 seconds");
    }, 1e3));
  });
}
let nextOptions = null;
function getNavigateAction(actionState, navigationState, type = "NAVIGATE") {
  let actionStateRoute;
  for (; actionState && navigationState;) {
    const stateRoute = navigationState.routes[navigationState.index];
    actionStateRoute = actionState.routes[actionState.routes.length - 1];
    const childState = actionStateRoute.state,
      nextNavigationState = stateRoute.state,
      dynamicName = (0, import_matchers.matchDynamicName)(actionStateRoute.name);
    if (actionStateRoute.name !== stateRoute.name || !childState || !nextNavigationState || dynamicName && actionStateRoute.params?.[dynamicName] !== stateRoute.params?.[dynamicName]) break;
    actionState = childState, navigationState = nextNavigationState;
  }
  const rootPayload = {
    params: {}
  };
  let payload = rootPayload,
    params = payload.params;
  for (; actionStateRoute;) Object.assign(params, {
    ...actionStateRoute.params
  }), payload.screen = actionStateRoute.name, payload.params = {
    ...actionStateRoute.params
  }, actionStateRoute = actionStateRoute.state?.routes[actionStateRoute.state?.routes.length - 1], payload.params ??= {}, payload = payload.params, params = payload;
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