import { getActionFromState } from "@react-navigation/native";
import { getReactNavigationConfig } from "./getReactNavigationConfig.mjs";
import { addEventListener, getInitialURL, getPathFromState, getStateFromPath } from "./link/linking.mjs";
function getNavigationConfig(routes, metaOnly = !0) {
  return getReactNavigationConfig(routes, metaOnly);
}
function getLinkingConfig(routes, metaOnly = !0) {
  return {
    prefixes: [],
    // @ts-expect-error
    config: getNavigationConfig(routes, metaOnly),
    // A custom getInitialURL is used on native to ensure the app always starts at
    // the root path if it's launched from something other than a deep link.
    // This helps keep the native functionality working like the web functionality.
    // For example, if you had a root navigator where the first screen was `/settings` and the second was `/index`
    // then `/index` would be used on web and `/settings` would be used on native.
    getInitialURL,
    subscribe: addEventListener,
    getStateFromPath: getStateFromPathMemoized,
    getPathFromState(state, options) {
      return getPathFromState(state, {
        screens: [],
        ...this.config,
        ...options
      }) ?? "/";
    },
    // Add all functions to ensure the types never need to fallback.
    // This is a convenience for usage in the package.
    getActionFromState
  };
}
const stateCache = /* @__PURE__ */new Map();
function getStateFromPathMemoized(path, options) {
  const cached = stateCache.get(path);
  if (cached) return cached;
  const result = getStateFromPath(path, options);
  return stateCache.set(path, result), result;
}
export { getLinkingConfig, getNavigationConfig, stateCache };
//# sourceMappingURL=getLinkingConfig.mjs.map
