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
var NavigationContainer_exports = {};
__export(NavigationContainer_exports, {
  default: () => NavigationContainer_default
});
module.exports = __toCommonJS(NavigationContainer_exports);
var import_core = require("@react-navigation/core"),
  import_native = require("@react-navigation/native"),
  React = __toESM(require("react"), 1),
  import_useLinking = __toESM(require("./useLinking.cjs"), 1),
  import_jsx_runtime = require("react/jsx-runtime");
global.REACT_NAVIGATION_DEVTOOLS = /* @__PURE__ */new WeakMap();
function NavigationContainerInner({
  theme = import_native.DefaultTheme,
  linking,
  fallback = null,
  documentTitle,
  onReady,
  ...rest
}, ref) {
  const isLinkingEnabled = linking ? linking.enabled !== !1 : !1;
  linking?.config && (0, import_core.validatePathConfig)(linking.config);
  const refContainer = React.useRef(null),
    {
      getInitialState
    } = (0, import_useLinking.default)(refContainer, {
      independent: rest.independent,
      enabled: isLinkingEnabled,
      prefixes: [],
      ...linking
    });
  if (React.useEffect(() => {
    refContainer.current && REACT_NAVIGATION_DEVTOOLS.set(refContainer.current, {
      get linking() {
        return {
          ...linking,
          enabled: isLinkingEnabled,
          prefixes: linking?.prefixes ?? [],
          getStateFromPath: linking?.getStateFromPath ?? import_core.getStateFromPath,
          getPathFromState: linking?.getPathFromState ?? import_core.getPathFromState,
          getActionFromState: linking?.getActionFromState ?? import_core.getActionFromState
        };
      }
    });
  }), cache.val === 0 && (cache.promise = new Promise(res => {
    getInitialState().then(val => {
      cache.val = val, cache.done = !0, res();
    });
  })), !cache.done) throw cache.promise;
  const initialState = cache.val;
  React.useImperativeHandle(ref, () => refContainer.current);
  const linkingContext = React.useMemo(() => ({
    options: linking
  }), [linking]);
  return React.useEffect(() => {
    onReady?.();
  }, [onReady]), /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_native.LinkingContext.Provider, {
    value: linkingContext,
    children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_native.ThemeProvider, {
      value: theme,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_core.BaseNavigationContainer, {
        ...rest,
        initialState: rest.initialState == null ? initialState : rest.initialState,
        ref: refContainer
      })
    })
  });
}
const cache = {
    done: !1,
    promise: null,
    val: 0
  },
  NavigationContainer = React.forwardRef(NavigationContainerInner);
var NavigationContainer_default = NavigationContainer;