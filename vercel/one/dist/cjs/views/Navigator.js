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
var Navigator_exports = {};
__export(Navigator_exports, {
  DefaultNavigator: () => DefaultNavigator,
  Navigator: () => Navigator,
  NavigatorContext: () => NavigatorContext,
  QualifiedSlot: () => QualifiedSlot,
  Slot: () => Slot,
  useNavigatorContext: () => useNavigatorContext,
  useSlot: () => useSlot
});
module.exports = __toCommonJS(Navigator_exports);
var import_native = require("@react-navigation/native"), React = __toESM(require("react"), 1), import_react_native_safe_area_context = require("react-native-safe-area-context"), import_Route = require("../Route"), import_withLayoutContext = require("../layouts/withLayoutContext"), import_useScreens = require("../useScreens"), import_Screen = require("./Screen"), import_jsx_runtime = require("react/jsx-runtime");
const NavigatorContext = React.createContext(null);
process.env.NODE_ENV !== "production" && (NavigatorContext.displayName = "NavigatorContext");
function Navigator({ initialRouteName, screenOptions, children, router }) {
  const contextKey = (0, import_Route.useContextKey)(), { screens, children: otherSlot } = (0, import_withLayoutContext.useFilterScreenChildren)(children, {
    isCustomNavigator: !0,
    contextKey
  }), sorted = (0, import_useScreens.useSortedScreens)(screens ?? []);
  return sorted.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    QualifiedNavigator,
    {
      initialRouteName,
      screenOptions,
      screens: sorted,
      contextKey,
      router,
      children: otherSlot
    }
  ) : (console.warn(`Navigator at "${contextKey}" has no children.`), null);
}
function QualifiedNavigator({
  initialRouteName,
  screenOptions,
  children,
  screens,
  contextKey,
  router = import_native.StackRouter
}) {
  const { state, navigation, descriptors, NavigationContent } = (0, import_native.useNavigationBuilder)(router, {
    // Used for getting the parent with navigation.getParent('/normalized/path')
    id: contextKey,
    children: screens,
    screenOptions,
    initialRouteName
  }), value = React.useMemo(() => ({
    contextKey,
    state,
    navigation,
    descriptors,
    router
  }), [contextKey, state, navigation, descriptors, router]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavigatorContext.Provider, { value, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavigationContent, { children }) });
}
function useNavigatorContext() {
  const context = React.useContext(NavigatorContext);
  if (!context)
    throw new Error("useNavigatorContext must be used within a <Navigator />");
  return context;
}
function useSlot() {
  const context = useNavigatorContext(), { state, descriptors } = context, current = state.routes.find((route, i) => state.index === i);
  return current ? descriptors[current.key]?.render() ?? null : null;
}
const Slot = React.memo(function(props) {
  const contextKey = (0, import_Route.useContextKey)();
  return React.useContext(NavigatorContext)?.contextKey !== contextKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigator, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QualifiedSlot, {}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QualifiedSlot, {});
});
function QualifiedSlot() {
  return useSlot();
}
function DefaultNavigator() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native_safe_area_context.SafeAreaView, { style: { flex: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QualifiedSlot, {}) }) });
}
Navigator.Slot = Slot;
Navigator.useContext = useNavigatorContext;
Navigator.Screen = import_Screen.Screen;
//# sourceMappingURL=Navigator.js.map
