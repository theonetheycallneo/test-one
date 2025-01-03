import { jsx as _jsx } from "react/jsx-runtime";
import React, { useContext } from "react";
import { getContextKey } from "./matchers";
var CurrentRouteContext = /* @__PURE__ */ React.createContext(null);
process.env.NODE_ENV !== "production" && (CurrentRouteContext.displayName = "RouteNode");
function useRouteNode() {
  return useContext(CurrentRouteContext);
}
function useContextKey() {
  var node = useRouteNode();
  if (node == null)
    throw new Error("No filename found. This is likely a bug in router.");
  return getContextKey(node.contextKey);
}
function Route(param) {
  var { children, node } = param;
  return /* @__PURE__ */ _jsx(CurrentRouteContext.Provider, {
    value: node,
    children
  });
}
export {
  Route,
  useContextKey,
  useRouteNode
};
//# sourceMappingURL=Route.js.map
