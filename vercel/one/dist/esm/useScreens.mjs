import { createNavigatorFactory } from "@react-navigation/core";
import React, { useEffect } from "react";
import { Route, useRouteNode } from "./Route.mjs";
import { sortRoutesWithInitial } from "./sortRoutes.mjs";
import { getPageExport } from "./utils/getPageExport.mjs";
import { EmptyRoute } from "./views/EmptyRoute.mjs";
import { RootErrorBoundary } from "./views/RootErrorBoundary.mjs";
import { Try } from "./views/Try.mjs";
import { jsx } from "react/jsx-runtime";
import { createElement } from "react";
const {
  Screen,
  Group
} = createNavigatorFactory({})();
function getSortedChildren(children, order, initialRouteName) {
  if (!order?.length) return children.sort(sortRoutesWithInitial(initialRouteName)).map(route => ({
    route,
    props: {}
  }));
  const entries = [...children],
    ordered = order.map(({
      name,
      redirect,
      initialParams,
      listeners,
      options,
      getId
    }) => {
      if (!entries.length) return console.warn(`[Layout children]: Too many screens defined. Route "${name}" is extraneous.`), null;
      const matchIndex = entries.findIndex(child => child.route === name);
      if (matchIndex === -1) return console.warn(`[Layout children]: No route named "${name}" exists in nested children:`, children.map(({
        route
      }) => route)), null;
      const match = entries[matchIndex];
      if (entries.splice(matchIndex, 1), redirect) {
        if (typeof redirect == "string") throw new Error("Redirecting to a specific route is not supported yet.");
        return null;
      }
      return {
        route: match,
        props: {
          initialParams,
          listeners,
          options,
          getId
        }
      };
    }).filter(Boolean);
  return ordered.push(...entries.sort(sortRoutesWithInitial(initialRouteName)).map(route => ({
    route,
    props: {}
  }))), ordered;
}
function useSortedScreens(order) {
  const node = useRouteNode();
  return React.useMemo(() => (node?.children?.length ? getSortedChildren(node.children, order, node.initialRouteName) : []).map(value => routeToScreen(value.route, value.props)), [node?.children, node?.initialRouteName, order]);
}
function fromImport({
  ErrorBoundary,
  ...component
}) {
  if (ErrorBoundary) return {
    default: React.forwardRef((props, ref) => {
      const children = React.createElement(getPageExport(component) || EmptyRoute, {
        ...props,
        ref
      });
      return /* @__PURE__ */jsx(Try, {
        catch: ErrorBoundary,
        children
      });
    })
  };
  if (process.env.NODE_ENV !== "production") {
    const exported = getPageExport(component);
    if (exported && typeof exported == "object" && Object.keys(exported).length === 0) return {
      default: EmptyRoute
    };
  }
  return {
    default: getPageExport(component)
  };
}
const qualifiedStore = /* @__PURE__ */new WeakMap();
function getQualifiedRouteComponent(value) {
  if (value && qualifiedStore.has(value)) return qualifiedStore.get(value);
  let ScreenComponent;
  ScreenComponent = React.forwardRef((props, ref) => {
    const res = value.loadRoute(),
      Component = getPageExport(fromImport(res));
    return process.env.NODE_ENV === "development" && process.env.DEBUG === "one" && (console.groupCollapsed(`Render ${props.key}`), console.info("res", res), console.info("value", value), console.info("fromImport", fromImport(res)), console.info("Component", Component), console.groupEnd()),
    // <Suspense fallback={null}>
    /* @__PURE__ */
    jsx(Component, {
      ...props,
      ref
    });
  });
  const wrapSuspense = children => children,
    getLoadable = (props, ref) => /* @__PURE__ */jsx(RootErrorBoundary, {
      children: wrapSuspense(/* @__PURE__ */jsx(ScreenComponent, {
        ...props,
        ref,
        // Expose the template segment path, e.g. `(home)`, `[foo]`, `index`
        // the intention is to make it possible to deduce shared routes.
        segment: value.route
      }))
    }),
    SuspenseFallback = ({
      route
    }) => (useEffect(() => {}, [route]), null),
    QualifiedRoute = React.forwardRef(({
      // Remove these React Navigation props to
      // enforce usage of router hooks (where the query params are correct).
      route,
      navigation,
      // Pass all other props to the component
      ...props
    }, ref) => {
      const loadable = getLoadable(props, ref);
      return /* @__PURE__ */jsx(Route, {
        node: value,
        children: loadable
      });
    });
  return QualifiedRoute.displayName = `Route(${value.route})`, qualifiedStore.set(value, QualifiedRoute), QualifiedRoute;
}
function createGetIdForRoute(route) {
  const include = /* @__PURE__ */new Map();
  if (route.dynamic) for (const segment of route.dynamic) include.set(segment.name, segment);
  return ({
    params = {}
  } = {}) => {
    const segments = [];
    for (const dynamic of include.values()) {
      const value = params?.[dynamic.name];
      Array.isArray(value) && value.length > 0 ? segments.push(value.join("/")) : value && !Array.isArray(value) ? segments.push(value) : dynamic.deep ? segments.push(`[...${dynamic.name}]`) : segments.push(`[${dynamic.name}]`);
    }
    return segments.join("/") ?? route.contextKey;
  };
}
function routeToScreen(route, {
  options,
  ...props
} = {}) {
  return /* @__PURE__ */createElement(Screen, {
    getId: createGetIdForRoute(route),
    ...props,
    name: route.route,
    key: route.route,
    options: args => {
      const staticOptions = route.generated ? route.loadRoute()?.getNavOptions : null,
        staticResult = typeof staticOptions == "function" ? staticOptions(args) : staticOptions,
        dynamicResult = typeof options == "function" ? options?.(args) : options,
        output = {
          ...staticResult,
          ...dynamicResult
        };
      return route.generated && (output.tabBarButton = () => null, output.drawerItemStyle = {
        height: 0,
        display: "none"
      }), output;
    },
    getComponent: () => getQualifiedRouteComponent(route)
  });
}
export { Group, Screen, createGetIdForRoute, getQualifiedRouteComponent, useSortedScreens };
//# sourceMappingURL=useScreens.mjs.map
