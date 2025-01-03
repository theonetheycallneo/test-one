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
var NavigationContainer_native_exports = {};
__export(NavigationContainer_native_exports, {
  default: () => NavigationContainer_native_default
});
module.exports = __toCommonJS(NavigationContainer_native_exports);
var import_jsx_runtime = require("react/jsx-runtime"), import_core = require("@react-navigation/core"), import_native = require("@react-navigation/native"), import_useDocumentTitle_native = __toESM(require("@react-navigation/native/lib/module/useDocumentTitle.native.js"), 1), import_useThenable = __toESM(require("@react-navigation/native/lib/module/useThenable.js"), 1), React = __toESM(require("react"), 1), import_useLinking = __toESM(require("./useLinking"), 1);
global.REACT_NAVIGATION_DEVTOOLS = /* @__PURE__ */ new WeakMap();
function NavigationContainerInner(param, ref) {
  var { theme = import_native.DefaultTheme, linking, fallback = null, documentTitle, onReady, ...rest } = param, isLinkingEnabled = linking ? linking.enabled !== !1 : !1;
  linking != null && linking.config && (0, import_core.validatePathConfig)(linking.config);
  var refContainer = React.useRef(null);
  (0, import_useDocumentTitle_native.default)(refContainer, documentTitle);
  var { getInitialState } = (0, import_useLinking.default)(refContainer, {
    // independent: rest.independent,
    enabled: isLinkingEnabled,
    prefixes: [],
    ...linking
  });
  React.useEffect(function() {
    refContainer.current && global.REACT_NAVIGATION_DEVTOOLS.set(refContainer.current, {
      get linking() {
        var _linking_prefixes, _linking_getStateFromPath, _linking_getPathFromState, _linking_getActionFromState;
        return {
          ...linking,
          enabled: isLinkingEnabled,
          prefixes: (_linking_prefixes = linking == null ? void 0 : linking.prefixes) !== null && _linking_prefixes !== void 0 ? _linking_prefixes : [],
          getStateFromPath: (_linking_getStateFromPath = linking == null ? void 0 : linking.getStateFromPath) !== null && _linking_getStateFromPath !== void 0 ? _linking_getStateFromPath : import_core.getStateFromPath,
          getPathFromState: (_linking_getPathFromState = linking == null ? void 0 : linking.getPathFromState) !== null && _linking_getPathFromState !== void 0 ? _linking_getPathFromState : import_core.getPathFromState,
          getActionFromState: (_linking_getActionFromState = linking == null ? void 0 : linking.getActionFromState) !== null && _linking_getActionFromState !== void 0 ? _linking_getActionFromState : import_core.getActionFromState
        };
      }
    });
  });
  var [isResolved, initialState] = (0, import_useThenable.default)(getInitialState);
  React.useImperativeHandle(ref, function() {
    return refContainer.current;
  });
  var linkingContext = React.useMemo(function() {
    return {
      options: linking
    };
  }, [
    linking
  ]), isReady = rest.initialState != null || !isLinkingEnabled || isResolved, onReadyRef = React.useRef(onReady);
  return React.useEffect(function() {
    onReadyRef.current = onReady;
  }), React.useEffect(function() {
    if (isReady) {
      var _onReadyRef_current;
      (_onReadyRef_current = onReadyRef.current) === null || _onReadyRef_current === void 0 || _onReadyRef_current.call(onReadyRef);
    }
  }, [
    isReady
  ]), isReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_native.LinkingContext.Provider, {
    value: linkingContext,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_native.ThemeProvider, {
      value: theme,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_core.BaseNavigationContainer, {
        ...rest,
        initialState: rest.initialState == null ? initialState : rest.initialState,
        ref: refContainer
      })
    })
  }) : fallback;
}
var NavigationContainer = /* @__PURE__ */ React.forwardRef(NavigationContainerInner), NavigationContainer_native_default = NavigationContainer;
//# sourceMappingURL=NavigationContainer.native.js.map
