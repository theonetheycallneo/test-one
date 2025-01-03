import { StackRouter, useNavigationBuilder } from "@react-navigation/native";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContextKey } from "../Route.mjs";
import { useFilterScreenChildren } from "../layouts/withLayoutContext.mjs";
import { useSortedScreens } from "../useScreens.mjs";
import { Screen } from "./Screen.mjs";
import { jsx } from "react/jsx-runtime";
const NavigatorContext = React.createContext(null);
process.env.NODE_ENV !== "production" && (NavigatorContext.displayName = "NavigatorContext");
function Navigator({
  initialRouteName,
  screenOptions,
  children,
  router
}) {
  const contextKey = useContextKey(),
    {
      screens,
      children: otherSlot
    } = useFilterScreenChildren(children, {
      isCustomNavigator: !0,
      contextKey
    }),
    sorted = useSortedScreens(screens ?? []);
  return sorted.length ? /* @__PURE__ */jsx(QualifiedNavigator, {
    initialRouteName,
    screenOptions,
    screens: sorted,
    contextKey,
    router,
    children: otherSlot
  }) : (console.warn(`Navigator at "${contextKey}" has no children.`), null);
}
function QualifiedNavigator({
  initialRouteName,
  screenOptions,
  children,
  screens,
  contextKey,
  router = StackRouter
}) {
  const {
      state,
      navigation,
      descriptors,
      NavigationContent
    } = useNavigationBuilder(router, {
      // Used for getting the parent with navigation.getParent('/normalized/path')
      id: contextKey,
      children: screens,
      screenOptions,
      initialRouteName
    }),
    value = React.useMemo(() => ({
      contextKey,
      state,
      navigation,
      descriptors,
      router
    }), [contextKey, state, navigation, descriptors, router]);
  return /* @__PURE__ */jsx(NavigatorContext.Provider, {
    value,
    children: /* @__PURE__ */jsx(NavigationContent, {
      children
    })
  });
}
function useNavigatorContext() {
  const context = React.useContext(NavigatorContext);
  if (!context) throw new Error("useNavigatorContext must be used within a <Navigator />");
  return context;
}
function useSlot() {
  const context = useNavigatorContext(),
    {
      state,
      descriptors
    } = context,
    current = state.routes.find((route, i) => state.index === i);
  return current ? descriptors[current.key]?.render() ?? null : null;
}
const Slot = React.memo(function (props) {
  const contextKey = useContextKey();
  return React.useContext(NavigatorContext)?.contextKey !== contextKey ? /* @__PURE__ */jsx(Navigator, {
    ...props,
    children: /* @__PURE__ */jsx(QualifiedSlot, {})
  }) : /* @__PURE__ */jsx(QualifiedSlot, {});
});
function QualifiedSlot() {
  return useSlot();
}
function DefaultNavigator() {
  return /* @__PURE__ */jsx(SafeAreaView, {
    style: {
      flex: 1
    },
    children: /* @__PURE__ */jsx(Navigator, {
      children: /* @__PURE__ */jsx(QualifiedSlot, {})
    })
  });
}
Navigator.Slot = Slot;
Navigator.useContext = useNavigatorContext;
Navigator.Screen = Screen;
export { DefaultNavigator, Navigator, NavigatorContext, QualifiedSlot, Slot, useNavigatorContext, useSlot };
//# sourceMappingURL=Navigator.mjs.map
