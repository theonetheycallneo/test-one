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
var sortRoutes_exports = {};
__export(sortRoutes_exports, {
  sortRoutes: () => sortRoutes,
  sortRoutesWithInitial: () => sortRoutesWithInitial
});
module.exports = __toCommonJS(sortRoutes_exports);
var import_matchers = require("./matchers");
function sortDynamicConvention(a, b) {
  return a.deep && !b.deep ? 1 : !a.deep && b.deep ? -1 : 0;
}
function sortRoutes(a, b) {
  if (a.dynamic && !b.dynamic)
    return 1;
  if (!a.dynamic && b.dynamic)
    return -1;
  if (a.dynamic && b.dynamic) {
    if (a.dynamic.length !== b.dynamic.length)
      return b.dynamic.length - a.dynamic.length;
    for (var i = 0; i < a.dynamic.length; i++) {
      var aDynamic = a.dynamic[i], bDynamic = b.dynamic[i];
      if (aDynamic.notFound && bDynamic.notFound) {
        var s = sortDynamicConvention(aDynamic, bDynamic);
        if (s)
          return s;
      }
      if (aDynamic.notFound && !bDynamic.notFound)
        return 1;
      if (!aDynamic.notFound && bDynamic.notFound)
        return -1;
      var s1 = sortDynamicConvention(aDynamic, bDynamic);
      if (s1)
        return s1;
    }
    return 0;
  }
  var aIndex = a.route === "index" || (0, import_matchers.matchGroupName)(a.route) != null, bIndex = b.route === "index" || (0, import_matchers.matchGroupName)(b.route) != null;
  return aIndex && !bIndex ? -1 : !aIndex && bIndex ? 1 : a.route.length - b.route.length;
}
function sortRoutesWithInitial(initialRouteName) {
  return function(a, b) {
    if (initialRouteName) {
      if (a.route === initialRouteName)
        return -1;
      if (b.route === initialRouteName)
        return 1;
    }
    return sortRoutes(a, b);
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sortRoutes,
  sortRoutesWithInitial
});
//# sourceMappingURL=sortRoutes.js.map
