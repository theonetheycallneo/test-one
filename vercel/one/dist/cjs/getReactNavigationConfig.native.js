"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var getReactNavigationConfig_exports = {};
__export(getReactNavigationConfig_exports, {
  getReactNavigationConfig: () => getReactNavigationConfig
});
module.exports = __toCommonJS(getReactNavigationConfig_exports);
var import_matchers = require("./matchers");
function convertDynamicRouteToReactNavigation(segment) {
  if (segment === "index")
    return "";
  if (segment === "+not-found")
    return "*not-found";
  var rest = (0, import_matchers.matchDeepDynamicRouteName)(segment);
  if (typeof rest == "string")
    return "*" + rest;
  var dynamicName = (0, import_matchers.matchDynamicName)(segment);
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
  var path = parseRouteSegments(node.route);
  if (!node.children.length)
    return metaOnly ? path : {
      path,
      screens: {},
      _route: node
    };
  var screens = getReactNavigationScreensConfig(node.children, metaOnly), screen = {
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
  return Object.fromEntries(nodes.map(function(node) {
    return [
      node.route,
      convertRouteNodeToScreen(node, metaOnly)
    ];
  }));
}
function getReactNavigationConfig(routes, metaOnly) {
  return {
    initialRouteName: routes.initialRouteName,
    screens: getReactNavigationScreensConfig(routes.children, metaOnly)
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getReactNavigationConfig
});
//# sourceMappingURL=getReactNavigationConfig.js.map
