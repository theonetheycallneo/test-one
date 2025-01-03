import { matchDeepDynamicRouteName, matchDynamicName } from "./matchers";
function convertDynamicRouteToReactNavigation(segment) {
  if (segment === "index")
    return "";
  if (segment === "+not-found")
    return "*not-found";
  const rest = matchDeepDynamicRouteName(segment);
  if (typeof rest == "string")
    return "*" + rest;
  const dynamicName = matchDynamicName(segment);
  return typeof dynamicName == "string" ? `:${dynamicName}` : segment;
}
function parseRouteSegments(segments) {
  return (
    // NOTE: When there are nested routes without layouts
    // the node.route will be something like `app/home/index`
    // this needs to be split to ensure each segment is parsed correctly.
    segments.split("/").map(convertDynamicRouteToReactNavigation).filter(Boolean).join("/")
  );
}
function convertRouteNodeToScreen(node, metaOnly) {
  const path = parseRouteSegments(node.route);
  if (!node.children.length)
    return metaOnly ? path : {
      path,
      screens: {},
      _route: node
    };
  const screens = getReactNavigationScreensConfig(node.children, metaOnly), screen = {
    path,
    screens,
    // NOTE: This is bad because it forces all Layout Routes
    // to be loaded into memory. We should move towards a system where
    // the initial route name is either loaded asynchronously in the Layout Route
    // or defined via a file system convention.
    initialRouteName: node.initialRouteName
  };
  return metaOnly || (screen._route = node), screen;
}
function getReactNavigationScreensConfig(nodes, metaOnly) {
  return Object.fromEntries(
    nodes.map((node) => [node.route, convertRouteNodeToScreen(node, metaOnly)])
  );
}
function getReactNavigationConfig(routes, metaOnly) {
  return {
    initialRouteName: routes.initialRouteName,
    screens: getReactNavigationScreensConfig(routes.children, metaOnly)
  };
}
export {
  getReactNavigationConfig
};
//# sourceMappingURL=getReactNavigationConfig.js.map
