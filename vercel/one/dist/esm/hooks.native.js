import { jsx as _jsx } from "react/jsx-runtime";
import { NavigationRouteContext } from "@react-navigation/native";
import React, { createContext } from "react";
import { router } from "./imperative-api";
import { navigationRef, useStoreRootState, useStoreRouteInfo } from "./router/router";
function useRootNavigationState() {
  return useStoreRootState();
}
function useRouteInfo() {
  return useStoreRouteInfo();
}
function useNavigationContainerRef() {
  return navigationRef;
}
var FrozeContext = /* @__PURE__ */ createContext(!1);
function Frozen(param) {
  var { on = !1, children } = param;
  return typeof window > "u" ? children : /* @__PURE__ */ _jsx(FrozeContext.Provider, {
    value: on,
    children: (
      /* <Freeze freeze={on}> */
      /* @__PURE__ */ _jsx("div", {
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
  return router;
}
function useUnstableGlobalHref() {
  return useStoreRouteInfo().unstable_globalHref;
}
function useSegments() {
  return useStoreRouteInfo().segments;
}
function usePathname() {
  return useStoreRouteInfo().pathname;
}
function useActiveParams() {
  return useStoreRouteInfo().params;
}
var useLocalSearchParams = useParams, useGlobalSearchParams = useActiveParams;
function useParams() {
  var context = React.useContext(NavigationRouteContext), _context_params, params = (_context_params = context?.params) !== null && _context_params !== void 0 ? _context_params : {};
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
export {
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
};
//# sourceMappingURL=hooks.js.map
