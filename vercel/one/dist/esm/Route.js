import React, { useContext } from "react";
import { getContextKey } from "./matchers";
import { jsx } from "react/jsx-runtime";
const CurrentRouteContext = React.createContext(null);
process.env.NODE_ENV !== "production" && (CurrentRouteContext.displayName = "RouteNode");
function useRouteNode() {
  return useContext(CurrentRouteContext);
}
function useContextKey() {
  const node = useRouteNode();
  if (node == null)
    throw new Error("No filename found. This is likely a bug in router.");
  return getContextKey(node.contextKey);
}
function Route({ children, node }) {
  return /* @__PURE__ */ jsx(CurrentRouteContext.Provider, { value: node, children });
}
export {
  Route,
  useContextKey,
  useRouteNode
};
//# sourceMappingURL=Route.js.map
