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
var hooks_exports = {};
__export(hooks_exports, {
  Frozen: () => Frozen,
  useActiveParams: () => useActiveParams,
  useGlobalSearchParams: () => useGlobalSearchParams,
  useLocalSearchParams: () => useLocalSearchParams,
  useNavigationContainerRef: () => useNavigationContainerRef,
  useParams: () => useParams,
  usePathname: () => usePathname,
  useRootNavigationState: () => useRootNavigationState,
  useRouteInfo: () => useRouteInfo,
  useRouter: () => useRouter,
  useSegments: () => useSegments,
  useUnstableGlobalHref: () => useUnstableGlobalHref
});
module.exports = __toCommonJS(hooks_exports);
var import_jsx_runtime = require("react/jsx-runtime"), import_native = require("@react-navigation/native"), import_react = __toESM(require("react"), 1), import_imperative_api = require("./imperative-api"), import_router = require("./router/router");
function useRootNavigationState() {
  return (0, import_router.useStoreRootState)();
}
function useRouteInfo() {
  return (0, import_router.useStoreRouteInfo)();
}
function useNavigationContainerRef() {
  return import_router.navigationRef;
}
var FrozeContext = /* @__PURE__ */ (0, import_react.createContext)(!1);
function Frozen(param) {
  var { on = !1, children } = param;
  return typeof window > "u" ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrozeContext.Provider, {
    value: on,
    children: (
      /* <Freeze freeze={on}> */
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        // @ts-ignore
        inert: !0,
        style: {
          display: "contents"
        },
        children
      })
    )
  });
}
function useRouter() {
  return import_imperative_api.router;
}
function useUnstableGlobalHref() {
  return (0, import_router.useStoreRouteInfo)().unstable_globalHref;
}
function useSegments() {
  return (0, import_router.useStoreRouteInfo)().segments;
}
function usePathname() {
  return (0, import_router.useStoreRouteInfo)().pathname;
}
function useActiveParams() {
  return (0, import_router.useStoreRouteInfo)().params;
}
var useLocalSearchParams = useParams, useGlobalSearchParams = useActiveParams;
function useParams() {
  var context = import_react.default.useContext(import_native.NavigationRouteContext), _context_params, params = (_context_params = context == null ? void 0 : context.params) !== null && _context_params !== void 0 ? _context_params : {};
  return Object.fromEntries(Object.entries(params).map(function(param) {
    var [key, value] = param;
    if (Array.isArray(value))
      return [
        key,
        value.map(function(v) {
          try {
            return decodeURIComponent(v);
          } catch {
            return v;
          }
        })
      ];
    try {
      return [
        key,
        decodeURIComponent(value)
      ];
    } catch {
      return [
        key,
        value
      ];
    }
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Frozen,
  useActiveParams,
  useGlobalSearchParams,
  useLocalSearchParams,
  useNavigationContainerRef,
  useParams,
  usePathname,
  useRootNavigationState,
  useRouteInfo,
  useRouter,
  useSegments,
  useUnstableGlobalHref
});
//# sourceMappingURL=hooks.js.map