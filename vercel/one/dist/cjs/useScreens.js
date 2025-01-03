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
var useScreens_exports = {};
__export(useScreens_exports, {
  Group: () => Group,
  Screen: () => Screen,
  createGetIdForRoute: () => createGetIdForRoute,
  getQualifiedRouteComponent: () => getQualifiedRouteComponent,
  useSortedScreens: () => useSortedScreens
});
module.exports = __toCommonJS(useScreens_exports);
var import_core = require("@react-navigation/core"), import_react = __toESM(require("react"), 1), import_Route = require("./Route"), import_sortRoutes = require("./sortRoutes"), import_getPageExport = require("./utils/getPageExport"), import_EmptyRoute = require("./views/EmptyRoute"), import_RootErrorBoundary = require("./views/RootErrorBoundary"), import_Try = require("./views/Try"), import_jsx_runtime = require("react/jsx-runtime"), import_react2 = require("react");
const { Screen, Group } = (0, import_core.createNavigatorFactory)({})();
function getSortedChildren(children, order, initialRouteName) {
  if (!order?.length)
    return children.sort((0, import_sortRoutes.sortRoutesWithInitial)(initialRouteName)).map((route) => ({ route, props: {} }));
  const entries = [...children], ordered = order.map(({ name, redirect, initialParams, listeners, options, getId }) => {
    if (!entries.length)
      return console.warn(`[Layout children]: Too many screens defined. Route "${name}" is extraneous.`), null;
    const matchIndex = entries.findIndex((child) => child.route === name);
    if (matchIndex === -1)
      return console.warn(
        `[Layout children]: No route named "${name}" exists in nested children:`,
        children.map(({ route }) => route)
      ), null;
    const match = entries[matchIndex];
    if (entries.splice(matchIndex, 1), redirect) {
      if (typeof redirect == "string")
        throw new Error("Redirecting to a specific route is not supported yet.");
      return null;
    }
    return {
      route: match,
      props: { initialParams, listeners, options, getId }
    };
  }).filter(Boolean);
  return ordered.push(
    ...entries.sort((0, import_sortRoutes.sortRoutesWithInitial)(initialRouteName)).map((route) => ({ route, props: {} }))
  ), ordered;
}
function useSortedScreens(order) {
  const node = (0, import_Route.useRouteNode)();
  return import_react.default.useMemo(() => (node?.children?.length ? getSortedChildren(node.children, order, node.initialRouteName) : []).map((value) => routeToScreen(value.route, value.props)), [node?.children, node?.initialRouteName, order]);
}
function fromImport({ ErrorBoundary, ...component }) {
  if (ErrorBoundary)
    return {
      default: import_react.default.forwardRef((props, ref) => {
        const children = import_react.default.createElement((0, import_getPageExport.getPageExport)(component) || import_EmptyRoute.EmptyRoute, {
          ...props,
          ref
        });
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Try.Try, { catch: ErrorBoundary, children });
      })
    };
  if (process.env.NODE_ENV !== "production") {
    const exported = (0, import_getPageExport.getPageExport)(component);
    if (exported && typeof exported == "object" && Object.keys(exported).length === 0)
      return { default: import_EmptyRoute.EmptyRoute };
  }
  return { default: (0, import_getPageExport.getPageExport)(component) };
}
const qualifiedStore = /* @__PURE__ */ new WeakMap();
function getQualifiedRouteComponent(value) {
  if (value && qualifiedStore.has(value))
    return qualifiedStore.get(value);
  let ScreenComponent;
  ScreenComponent = import_react.default.forwardRef((props, ref) => {
    const res = value.loadRoute(), Component = (0, import_getPageExport.getPageExport)(fromImport(res));
    return process.env.NODE_ENV === "development" && process.env.DEBUG === "one" && (console.groupCollapsed(`Render ${props.key}`), console.info("res", res), console.info("value", value), console.info("fromImport", fromImport(res)), console.info("Component", Component), console.groupEnd()), // <Suspense fallback={null}>
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { ...props, ref });
  });
  const wrapSuspense = (children) => children, getLoadable = (props, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_RootErrorBoundary.RootErrorBoundary, { children: wrapSuspense(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ScreenComponent,
      {
        ...props,
        ref,
        // Expose the template segment path, e.g. `(home)`, `[foo]`, `index`
        // the intention is to make it possible to deduce shared routes.
        segment: value.route
      }
    )
  ) }), SuspenseFallback = ({ route }) => ((0, import_react.useEffect)(() => {
  }, [route]), null), QualifiedRoute = import_react.default.forwardRef(
    ({
      // Remove these React Navigation props to
      // enforce usage of router hooks (where the query params are correct).
      route,
      navigation,
      // Pass all other props to the component
      ...props
    }, ref) => {
      const loadable = getLoadable(props, ref);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Route.Route, { node: value, children: loadable });
    }
  );
  return QualifiedRoute.displayName = `Route(${value.route})`, qualifiedStore.set(value, QualifiedRoute), QualifiedRoute;
}
function createGetIdForRoute(route) {
  const include = /* @__PURE__ */ new Map();
  if (route.dynamic)
    for (const segment of route.dynamic)
      include.set(segment.name, segment);
  return ({ params = {} } = {}) => {
    const segments = [];
    for (const dynamic of include.values()) {
      const value = params?.[dynamic.name];
      Array.isArray(value) && value.length > 0 ? segments.push(value.join("/")) : value && !Array.isArray(value) ? segments.push(value) : dynamic.deep ? segments.push(`[...${dynamic.name}]`) : segments.push(`[${dynamic.name}]`);
    }
    return segments.join("/") ?? route.contextKey;
  };
}
function routeToScreen(route, { options, ...props } = {}) {
  return /* @__PURE__ */ (0, import_react2.createElement)(
    Screen,
    {
      getId: createGetIdForRoute(route),
      ...props,
      name: route.route,
      key: route.route,
      options: (args) => {
        const staticOptions = route.generated ? route.loadRoute()?.getNavOptions : null, staticResult = typeof staticOptions == "function" ? staticOptions(args) : staticOptions, dynamicResult = typeof options == "function" ? options?.(args) : options, output = {
          ...staticResult,
          ...dynamicResult
        };
        return route.generated && (output.tabBarButton = () => null, output.drawerItemStyle = { height: 0, display: "none" }), output;
      },
      getComponent: () => getQualifiedRouteComponent(route)
    }
  );
}
//# sourceMappingURL=useScreens.js.map
