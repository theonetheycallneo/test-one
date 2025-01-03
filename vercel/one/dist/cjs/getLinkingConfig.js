var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var getLinkingConfig_exports = {};
__export(getLinkingConfig_exports, {
  getLinkingConfig: () => getLinkingConfig,
  getNavigationConfig: () => getNavigationConfig,
  stateCache: () => stateCache
});
module.exports = __toCommonJS(getLinkingConfig_exports);
var import_native = require("@react-navigation/native"), import_getReactNavigationConfig = require("./getReactNavigationConfig"), import_linking = require("./link/linking");
function getNavigationConfig(routes, metaOnly = !0) {
  return (0, import_getReactNavigationConfig.getReactNavigationConfig)(routes, metaOnly);
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
    getInitialURL: import_linking.getInitialURL,
    subscribe: import_linking.addEventListener,
    getStateFromPath: getStateFromPathMemoized,
    getPathFromState(state, options) {
      return (0, import_linking.getPathFromState)(state, {
        screens: [],
        ...this.config,
        ...options
      }) ?? "/";
    },
    // Add all functions to ensure the types never need to fallback.
    // This is a convenience for usage in the package.
    getActionFromState: import_native.getActionFromState
  };
}
const stateCache = /* @__PURE__ */ new Map();
function getStateFromPathMemoized(path, options) {
  const cached = stateCache.get(path);
  if (cached)
    return cached;
  const result = (0, import_linking.getStateFromPath)(path, options);
  return stateCache.set(path, result), result;
}
//# sourceMappingURL=getLinkingConfig.js.map
