import { StackActions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { nanoid } from "nanoid/non-secure";
import { Fragment, startTransition, useSyncExternalStore } from "react";
import { Platform } from "react-native-web";
import { getLoaderPath, getPreloadPath } from "../cleanUrl.mjs";
import { deepEqual, getPathDataFromState } from "../fork/getPathFromState.mjs";
import { stripBaseUrl } from "../fork/getStateFromPath.mjs";
import { getLinkingConfig } from "../getLinkingConfig.mjs";
import { getRoutes } from "../getRoutes.mjs";
import { resolveHref } from "../link/href.mjs";
import { resolve } from "../link/path.mjs";
import { matchDynamicName } from "../matchers.mjs";
import { sortRoutes } from "../sortRoutes.mjs";
import { getQualifiedRouteComponent } from "../useScreens.mjs";
import { assertIsReady } from "../utils/assertIsReady.mjs";
import { dynamicImport } from "../utils/dynamicImport.mjs";
import { removeSearch } from "../utils/removeSearch.mjs";
import { shouldLinkExternally } from "../utils/url.mjs";
import { getNormalizedStatePath } from "./getNormalizedStatePath.mjs";
import { setLastAction } from "./lastAction.mjs";
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
  if (cleanUpState(), routeNode = getRoutes(context, {
    ignoreEntryPoints: !0,
    platform: Platform.OS
  }), rootComponent = routeNode ? getQualifiedRouteComponent(routeNode) : Fragment, !routeNode && process.env.NODE_ENV === "production") throw new Error("No routes found");
  navigationRef = ref, setupLinking(initialLocation), subscribeToNavigationChanges();
}
function cleanUpState() {
  initialState = void 0, rootState = void 0, nextState = void 0, routeInfo = void 0, linking = void 0, navigationRefSubscription?.(), rootStateSubscribers.clear(), storeSubscribers.clear();
}
function setupLinking(initialLocation) {
  routeNode && (linking = getLinkingConfig(routeNode), initialLocation && (linking.getInitialURL = () => initialLocation.toString(), initialState = linking.getStateFromPath?.(initialLocation.pathname + (initialLocation.search || ""), linking.config))), initialState ? (rootState = initialState, routeInfo = getRouteInfo(initialState)) : routeInfo = {
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
function setParams(params = {}) {
  return assertIsReady(navigationRef), navigationRef?.current?.setParams(
  // @ts-expect-error
  params);
}
function dismissAll() {
  navigationRef?.dispatch(StackActions.popToTop());
}
function goBack() {
  assertIsReady(navigationRef), navigationRef?.current?.goBack();
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
  return routeNode.children.filter(route => !route.internal).sort(sortRoutes);
}
function updateState(state, nextStateParam = state) {
  rootState = state, nextState = nextStateParam;
  const nextRouteInfo = getRouteInfo(state);
  deepEqual(routeInfo, nextRouteInfo) || (routeInfo = nextRouteInfo);
}
function getRouteInfo(state) {
  return getRouteInfoFromState((state2, asPath) => getPathDataFromState(state2, {
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
    pathname: stripBaseUrl(path, baseUrl).split("?")[0],
    isIndex: isIndexPath(state),
    ...getNormalizedStatePath(qualified, baseUrl)
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
  return useSyncExternalStore(subscribeToStore, snapshot, snapshot);
}
function syncStoreRootState() {
  if (!navigationRef) throw new Error("No navigationRef, possible duplicate One dep");
  if (navigationRef.isReady()) {
    const currentState = navigationRef.getRootState();
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
    const [_preload, loader] = await Promise.all([dynamicImport(getPreloadPath(href)), dynamicImport(getLoaderPath(href))]);
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
  if (shouldLinkExternally(href)) {
    Linking.openURL(href);
    return;
  }
  assertIsReady(navigationRef);
  const current = navigationRef.current;
  if (current == null) throw new Error("Couldn't find a navigation object. Is your component inside NavigationContainer?");
  if (!linking) throw new Error("Attempted to link to route when no routes are present");
  if (setLastAction(), href === ".." || href === "../") {
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
    routeInfo?.isIndex || (base += "/.."), href = resolve(base, href);
  }
  const state = linking.getStateFromPath(href, linking.config);
  if (!state || state.routes.length === 0) {
    console.error("Could not generate a valid navigation state for the given path: " + href), console.error("linking.config", linking.config), console.error("routes", getSortedRoutes());
    return;
  }
  setLoadingState("loading"), globalThis.__vxrntodopath = removeSearch(href), preloadRoute(href);
  const rootState2 = navigationRef.getRootState(),
    action = getNavigateAction(state, rootState2, event);
  nextOptions = options ?? null, startTransition(() => {
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
      dynamicName = matchDynamicName(actionStateRoute.name);
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
export { canDismiss, canGoBack, cleanup, dismiss, dismissAll, getRouteInfo, getSortedRoutes, goBack, hasAttemptedToHideSplash, initialState, initialize, linkTo, linking, navigate, navigationRef, preloadRoute, preloadingLoader, push, replace, rootComponent, rootState, rootStateSnapshot, routeInfo, routeInfoSnapshot, routeNode, setLoadingState, setParams, snapshot, subscribeToLoadingState, subscribeToRootState, subscribeToStore, updateState, useOneRouter, useStoreRootState, useStoreRouteInfo };
//# sourceMappingURL=router.mjs.map
