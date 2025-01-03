import { NavigationRouteContext } from "@react-navigation/native";
import React, { createContext } from "react";
import { router } from "./imperative-api";
import { navigationRef, useStoreRootState, useStoreRouteInfo } from "./router/router";
import { jsx } from "react/jsx-runtime";
function useRootNavigationState() {
  return useStoreRootState();
}
function useRouteInfo() {
  return useStoreRouteInfo();
}
function useNavigationContainerRef() {
  return navigationRef;
}
const FrozeContext = createContext(!1);
function Frozen({ on = !1, children }) {
  return typeof window > "u" ? children : /* @__PURE__ */ jsx(FrozeContext.Provider, { value: on, children: /* @__PURE__ */ jsx(
    "div",
    {
      inert: !0,
      style: { display: "contents" },
      children
    }
  ) });
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
const useLocalSearchParams = useParams, useGlobalSearchParams = useActiveParams;
function useParams() {
  const params = React.useContext(NavigationRouteContext)?.params ?? {};
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (Array.isArray(value))
        return [
          key,
          value.map((v) => {
            try {
              return decodeURIComponent(v);
            } catch {
              return v;
            }
          })
        ];
      try {
        return [key, decodeURIComponent(value)];
      } catch {
        return [key, value];
      }
    })
  );
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
