import { jsx as _jsx } from "react/jsx-runtime";
import { StackRouter, useNavigationBuilder } from "@react-navigation/native";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContextKey } from "../Route";
import { useFilterScreenChildren } from "../layouts/withLayoutContext";
import { useSortedScreens } from "../useScreens";
import { Screen } from "./Screen";
var NavigatorContext = /* @__PURE__ */ React.createContext(null);
process.env.NODE_ENV !== "production" && (NavigatorContext.displayName = "NavigatorContext");
function Navigator(param) {
  var { initialRouteName, screenOptions, children, router } = param, contextKey = useContextKey(), { screens, children: otherSlot } = useFilterScreenChildren(children, {
    isCustomNavigator: !0,
    contextKey
  }), sorted = useSortedScreens(screens ?? []);
  return sorted.length ? /* @__PURE__ */ _jsx(QualifiedNavigator, {
    initialRouteName,
    screenOptions,
    screens: sorted,
    contextKey,
    router,
    children: otherSlot
  }) : (console.warn(`Navigator at "${contextKey}" has no children.`), null);
}
function QualifiedNavigator(param) {
  var { initialRouteName, screenOptions, children, screens, contextKey, router = StackRouter } = param, { state, navigation, descriptors, NavigationContent } = useNavigationBuilder(router, {
    // Used for getting the parent with navigation.getParent('/normalized/path')
    id: contextKey,
    children: screens,
    screenOptions,
    initialRouteName
  }), value = React.useMemo(function() {
    return {
      contextKey,
      state,
      navigation,
      descriptors,
      router
    };
  }, [
    contextKey,
    state,
    navigation,
    descriptors,
    router
  ]);
  return /* @__PURE__ */ _jsx(NavigatorContext.Provider, {
    value,
    children: /* @__PURE__ */ _jsx(NavigationContent, {
      children
    })
  });
}
function useNavigatorContext() {
  var context = React.useContext(NavigatorContext);
  if (!context)
    throw new Error("useNavigatorContext must be used within a <Navigator />");
  return context;
}
function useSlot() {
  var _descriptors_current_key, context = useNavigatorContext(), { state, descriptors } = context, current = state.routes.find(function(route, i) {
    return state.index === i;
  });
  if (!current)
    return null;
  var _descriptors_current_key_render;
  return (_descriptors_current_key_render = (_descriptors_current_key = descriptors[current.key]) === null || _descriptors_current_key === void 0 ? void 0 : _descriptors_current_key.render()) !== null && _descriptors_current_key_render !== void 0 ? _descriptors_current_key_render : null;
}
var Slot = /* @__PURE__ */ React.memo(function(props) {
  var contextKey = useContextKey(), context = React.useContext(NavigatorContext);
  return context?.contextKey !== contextKey ? /* @__PURE__ */ _jsx(Navigator, {
    ...props,
    children: /* @__PURE__ */ _jsx(QualifiedSlot, {})
  }) : /* @__PURE__ */ _jsx(QualifiedSlot, {});
});
function QualifiedSlot() {
  return useSlot();
}
function DefaultNavigator() {
  return /* @__PURE__ */ _jsx(SafeAreaView, {
    style: {
      flex: 1
    },
    children: /* @__PURE__ */ _jsx(Navigator, {
      children: /* @__PURE__ */ _jsx(QualifiedSlot, {})
    })
  });
}
Navigator.Slot = Slot;
Navigator.useContext = useNavigatorContext;
Navigator.Screen = Screen;
export {
  DefaultNavigator,
  Navigator,
  NavigatorContext,
  QualifiedSlot,
  Slot,
  useNavigatorContext,
  useSlot
};
//# sourceMappingURL=Navigator.js.map
