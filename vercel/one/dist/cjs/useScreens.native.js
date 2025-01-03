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
var useScreens_exports = {};
__export(useScreens_exports, {
  Group: () => Group,
  Screen: () => Screen,
  createGetIdForRoute: () => createGetIdForRoute,
  getQualifiedRouteComponent: () => getQualifiedRouteComponent,
  useSortedScreens: () => useSortedScreens
});
module.exports = __toCommonJS(useScreens_exports);
var import_jsx_runtime = require("react/jsx-runtime"), import_react = require("react"), import_core = require("@react-navigation/core"), import_react2 = __toESM(require("react"), 1), import_Route = require("./Route"), import_sortRoutes = require("./sortRoutes"), import_getPageExport = require("./utils/getPageExport"), import_EmptyRoute = require("./views/EmptyRoute"), import_RootErrorBoundary = require("./views/RootErrorBoundary"), import_Try = require("./views/Try"), { Screen, Group } = (0, import_core.createNavigatorFactory)({})();
function getSortedChildren(children, order, initialRouteName) {
  if (!(order != null && order.length))
    return children.sort((0, import_sortRoutes.sortRoutesWithInitial)(initialRouteName)).map(function(route) {
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
  return ordered.push(...entries.sort((0, import_sortRoutes.sortRoutesWithInitial)(initialRouteName)).map(function(route) {
    return {
      route,
      props: {}
    };
  })), ordered;
}
function useSortedScreens(order) {
  var node = (0, import_Route.useRouteNode)(), sortedScreens = import_react2.default.useMemo(function() {
    var _node_children, sorted = !(node == null || (_node_children = node.children) === null || _node_children === void 0) && _node_children.length ? getSortedChildren(node.children, order, node.initialRouteName) : [];
    return sorted.map(function(value) {
      return routeToScreen(value.route, value.props);
    });
  }, [
    node == null ? void 0 : node.children,
    node == null ? void 0 : node.initialRouteName,
    order
  ]);
  return sortedScreens;
}
function fromImport(param) {
  var { ErrorBoundary, ...component } = param;
  if (ErrorBoundary)
    return {
      default: /* @__PURE__ */ import_react2.default.forwardRef(function(props, ref) {
        var children = /* @__PURE__ */ import_react2.default.createElement((0, import_getPageExport.getPageExport)(component) || import_EmptyRoute.EmptyRoute, {
          ...props,
          ref
        });
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Try.Try, {
          catch: ErrorBoundary,
          children
        });
      })
    };
  if (process.env.NODE_ENV !== "production") {
    var exported = (0, import_getPageExport.getPageExport)(component);
    if (exported && typeof exported == "object" && Object.keys(exported).length === 0)
      return {
        default: import_EmptyRoute.EmptyRoute
      };
  }
  return {
    default: (0, import_getPageExport.getPageExport)(component)
  };
}
var qualifiedStore = /* @__PURE__ */ new WeakMap();
function getQualifiedRouteComponent(value) {
  if (value && qualifiedStore.has(value))
    return qualifiedStore.get(value);
  var ScreenComponent;
  ScreenComponent = /* @__PURE__ */ import_react2.default.forwardRef(function(props, ref) {
    var res = value.loadRoute(), Component = (0, import_getPageExport.getPageExport)(fromImport(res));
    return process.env.NODE_ENV === "development" && process.env.DEBUG === "one" && (console.groupCollapsed(`Render ${props.key}`), console.info("res", res), console.info("value", value), console.info("fromImport", fromImport(res)), console.info("Component", Component), console.groupEnd()), // <Suspense fallback={null}>
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
      ...props,
      ref
    });
  });
  var wrapSuspense = function(children) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Suspense, {
      fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuspenseFallback, {
        route: value
      }),
      children
    });
  }, getLoadable = function(props, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_RootErrorBoundary.RootErrorBoundary, {
      children: wrapSuspense(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenComponent, {
        ...props,
        ref,
        // Expose the template segment path, e.g. `(home)`, `[foo]`, `index`
        // the intention is to make it possible to deduce shared routes.
        segment: value.route
      }))
    });
  }, SuspenseFallback = function(param) {
    var { route } = param;
    return (0, import_react2.useEffect)(
      function() {
      },
      // console.info(`⚠️ Suspended:`, route)
      [
        route
      ]
    ), null;
  }, QualifiedRoute = /* @__PURE__ */ import_react2.default.forwardRef(function(param, ref) {
    var {
      // Remove these React Navigation props to
      // enforce usage of router hooks (where the query params are correct).
      route,
      navigation,
      // Pass all other props to the component
      ...props
    } = param, loadable = getLoadable(props, ref);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Route.Route, {
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
        var dynamic = _step2.value, value = params == null ? void 0 : params[dynamic.name];
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
  return /* @__PURE__ */ (0, import_react.createElement)(Screen, {
    // Users can override the screen getId function.
    getId: createGetIdForRoute(route),
    ...props,
    name: route.route,
    key: route.route,
    options: function(args) {
      var _route_loadRoute, staticOptions = route.generated ? (_route_loadRoute = route.loadRoute()) === null || _route_loadRoute === void 0 ? void 0 : _route_loadRoute.getNavOptions : null, staticResult = typeof staticOptions == "function" ? staticOptions(args) : staticOptions, dynamicResult = typeof options == "function" ? options == null ? void 0 : options(args) : options, output = {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Group,
  Screen,
  createGetIdForRoute,
  getQualifiedRouteComponent,
  useSortedScreens
});
//# sourceMappingURL=useScreens.js.map
