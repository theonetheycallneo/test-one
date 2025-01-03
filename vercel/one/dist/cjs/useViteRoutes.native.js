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
var useViteRoutes_exports = {};
__export(useViteRoutes_exports, {
  globbedRoutesToRouteContext: () => globbedRoutesToRouteContext,
  loadRoutes: () => loadRoutes,
  useViteRoutes: () => useViteRoutes
});
module.exports = __toCommonJS(useViteRoutes_exports);
var lastVersion = 0, context;
function useViteRoutes(routes, options, version) {
  return version && version > lastVersion && (context = null, lastVersion = version), context || loadRoutes(routes, options), context;
}
function loadRoutes(paths, options) {
  return context || (globalThis.__importMetaGlobbed = paths, context = globbedRoutesToRouteContext(paths, options), context);
}
function globbedRoutesToRouteContext(paths, options) {
  var routesSync = {}, promises = {}, loadedRoutes = {}, clears = {};
  Object.keys(paths).map(function(path) {
    var _options_routeModes;
    if (!paths[path]) {
      console.error(`Error: Missing route at path ${path}`);
      return;
    }
    var loadRouteFunction = paths[path], pathWithoutRelative = path.replace("/app/", "./"), originalPath = pathWithoutRelative.slice(1).replace(/\.[jt]sx?$/, "");
    (options == null || (_options_routeModes = options.routeModes) === null || _options_routeModes === void 0 ? void 0 : _options_routeModes[originalPath]) === "spa" ? (console.info(`Spa mode: ${originalPath}`), loadedRoutes[pathWithoutRelative] = function() {
      return null;
    }) : routesSync[pathWithoutRelative] = loadRouteFunction;
  });
  var moduleKeys = Object.keys(routesSync);
  function resolve(id) {
    if (clearTimeout(clears[id]), loadedRoutes[id])
      return loadedRoutes[id];
    if (typeof routesSync[id] != "function")
      return routesSync[id];
    throw promises[id] || (promises[id] = routesSync[id]().then(function(val) {
      return loadedRoutes[id] = val, delete promises[id], clears[id] = setTimeout(function() {
        delete loadedRoutes[id];
      }, 500), val;
    }).catch(function(err) {
      console.error("Error loading route", id, err, new Error().stack), loadedRoutes[id] = {
        default: function() {
          return null;
        }
      }, delete promises[id];
    }), process.env.NODE_ENV === "development" && (promises[id].stack = new Error().stack)), promises[id];
  }
  return resolve.keys = function() {
    return moduleKeys;
  }, resolve.id = "", resolve.resolve = function(id) {
    return id;
  }, resolve;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  globbedRoutesToRouteContext,
  loadRoutes,
  useViteRoutes
});
//# sourceMappingURL=useViteRoutes.js.map
