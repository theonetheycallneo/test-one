import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { createNavigatorFactory } from "@react-navigation/core";
import React, { Suspense, useEffect } from "react";
import { Route, useRouteNode } from "./Route";
import { sortRoutesWithInitial } from "./sortRoutes";
import { getPageExport } from "./utils/getPageExport";
import { EmptyRoute } from "./views/EmptyRoute";
import { RootErrorBoundary } from "./views/RootErrorBoundary";
import { Try } from "./views/Try";
var { Screen, Group } = createNavigatorFactory({})();
function getSortedChildren(children, order, initialRouteName) {
  if (!order?.length)
    return children.sort(sortRoutesWithInitial(initialRouteName)).map(function(route) {
      return {
        route,
        props: {}
      };
    });
  var entries = [
    ...children
  ], ordered = order.map(function(param) {
    var { name, redirect, initialParams, listeners, options, getId } = param;
    if (!entries.length)
      return console.warn(`[Layout children]: Too many screens defined. Route "${name}" is extraneous.`), null;
    var matchIndex = entries.findIndex(function(child) {
      return child.route === name;
    });
    if (matchIndex === -1)
      return console.warn(`[Layout children]: No route named "${name}" exists in nested children:`, children.map(function(param2) {
        var { route } = param2;
        return route;
      })), null;
    var match = entries[matchIndex];
    if (entries.splice(matchIndex, 1), redirect) {
      if (typeof redirect == "string")
        throw new Error("Redirecting to a specific route is not supported yet.");
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
  return ordered.push(...entries.sort(sortRoutesWithInitial(initialRouteName)).map(function(route) {
    return {
      route,
      props: {}
    };
  })), ordered;
}
function useSortedScreens(order) {
  var node = useRouteNode(), sortedScreens = React.useMemo(function() {
    var _node_children, sorted = !(node == null || (_node_children = node.children) === null || _node_children === void 0) && _node_children.length ? getSortedChildren(node.children, order, node.initialRouteName) : [];
    return sorted.map(function(value) {
      return routeToScreen(value.route, value.props);
    });
  }, [
    node?.children,
    node?.initialRouteName,
    order
  ]);
  return sortedScreens;
}
function fromImport(param) {
  var { ErrorBoundary, ...component } = param;
  if (ErrorBoundary)
    return {
      default: /* @__PURE__ */ React.forwardRef(function(props, ref) {
        var children = /* @__PURE__ */ React.createElement(getPageExport(component) || EmptyRoute, {
          ...props,
          ref
        });
        return /* @__PURE__ */ _jsx(Try, {
          catch: ErrorBoundary,
          children
        });
      })
    };
  if (process.env.NODE_ENV !== "production") {
    var exported = getPageExport(component);
    if (exported && typeof exported == "object" && Object.keys(exported).length === 0)
      return {
        default: EmptyRoute
      };
  }
  return {
    default: getPageExport(component)
  };
}
var qualifiedStore = /* @__PURE__ */ new WeakMap();
function getQualifiedRouteComponent(value) {
  if (value && qualifiedStore.has(value))
    return qualifiedStore.get(value);
  var ScreenComponent;
  ScreenComponent = /* @__PURE__ */ React.forwardRef(function(props, ref) {
    var res = value.loadRoute(), Component = getPageExport(fromImport(res));
    return process.env.NODE_ENV === "development" && process.env.DEBUG === "one" && (console.groupCollapsed(`Render ${props.key}`), console.info("res", res), console.info("value", value), console.info("fromImport", fromImport(res)), console.info("Component", Component), console.groupEnd()), // <Suspense fallback={null}>
    /* @__PURE__ */ _jsx(Component, {
      ...props,
      ref
    });
  });
  var wrapSuspense = function(children) {
    return /* @__PURE__ */ _jsx(Suspense, {
      fallback: /* @__PURE__ */ _jsx(SuspenseFallback, {
        route: value
      }),
      children
    });
  }, getLoadable = function(props, ref) {
    return /* @__PURE__ */ _jsx(RootErrorBoundary, {
      children: wrapSuspense(/* @__PURE__ */ _jsx(ScreenComponent, {
        ...props,
        ref,
        // Expose the template segment path, e.g. `(home)`, `[foo]`, `index`
        // the intention is to make it possible to deduce shared routes.
        segment: value.route
      }))
    });
  }, SuspenseFallback = function(param) {
    var { route } = param;
    return useEffect(
      function() {
      },
      // console.info(`⚠️ Suspended:`, route)
      [
        route
      ]
    ), null;
  }, QualifiedRoute = /* @__PURE__ */ React.forwardRef(function(param, ref) {
    var {
      // Remove these React Navigation props to
      // enforce usage of router hooks (where the query params are correct).
      route,
      navigation,
      // Pass all other props to the component
      ...props
    } = param, loadable = getLoadable(props, ref);
    return /* @__PURE__ */ _jsx(Route, {
      node: value,
      children: loadable
    });
  });
  return QualifiedRoute.displayName = `Route(${value.route})`, qualifiedStore.set(value, QualifiedRoute), QualifiedRoute;
}
function createGetIdForRoute(route) {
  var include = /* @__PURE__ */ new Map();
  if (route.dynamic) {
    var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
    try {
      for (var _iterator = route.dynamic[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
        var segment = _step.value;
        include.set(segment.name, segment);
      }
    } catch (err) {
      _didIteratorError = !0, _iteratorError = err;
    } finally {
      try {
        !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
      } finally {
        if (_didIteratorError)
          throw _iteratorError;
      }
    }
  }
  return function() {
    var { params = {} } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, segments = [], _iteratorNormalCompletion2 = !0, _didIteratorError2 = !1, _iteratorError2 = void 0;
    try {
      for (var _iterator2 = include.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = !0) {
        var dynamic = _step2.value, value = params?.[dynamic.name];
        Array.isArray(value) && value.length > 0 ? segments.push(value.join("/")) : value && !Array.isArray(value) ? segments.push(value) : dynamic.deep ? segments.push(`[...${dynamic.name}]`) : segments.push(`[${dynamic.name}]`);
      }
    } catch (err) {
      _didIteratorError2 = !0, _iteratorError2 = err;
    } finally {
      try {
        !_iteratorNormalCompletion2 && _iterator2.return != null && _iterator2.return();
      } finally {
        if (_didIteratorError2)
          throw _iteratorError2;
      }
    }
    var _segments_join;
    return (_segments_join = segments.join("/")) !== null && _segments_join !== void 0 ? _segments_join : route.contextKey;
  };
}
function routeToScreen(route) {
  var { options, ...props } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return /* @__PURE__ */ _createElement(Screen, {
    // Users can override the screen getId function.
    getId: createGetIdForRoute(route),
    ...props,
    name: route.route,
    key: route.route,
    options: function(args) {
      var _route_loadRoute, staticOptions = route.generated ? (_route_loadRoute = route.loadRoute()) === null || _route_loadRoute === void 0 ? void 0 : _route_loadRoute.getNavOptions : null, staticResult = typeof staticOptions == "function" ? staticOptions(args) : staticOptions, dynamicResult = typeof options == "function" ? options?.(args) : options, output = {
        ...staticResult,
        ...dynamicResult
      };
      return route.generated && (output.tabBarButton = function() {
        return null;
      }, output.drawerItemStyle = {
        height: 0,
        display: "none"
      }), output;
    },
    getComponent: function() {
      return getQualifiedRouteComponent(route);
    }
  });
}
export {
  Group,
  Screen,
  createGetIdForRoute,
  getQualifiedRouteComponent,
  useSortedScreens
};
//# sourceMappingURL=useScreens.js.map
