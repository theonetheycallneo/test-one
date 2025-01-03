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
let lastVersion = 0, context;
function useViteRoutes(routes, options, version) {
  return version && version > lastVersion && (context = null, lastVersion = version), context || loadRoutes(routes, options), context;
}
function loadRoutes(paths, options) {
  return context || (globalThis.__importMetaGlobbed = paths, context = globbedRoutesToRouteContext(paths, options), context);
}
function globbedRoutesToRouteContext(paths, options) {
  const routesSync = {}, promises = {}, loadedRoutes = {}, clears = {};
  Object.keys(paths).map((path) => {
    if (!paths[path]) {
      console.error(`Error: Missing route at path ${path}`);
      return;
    }
    const loadRouteFunction = paths[path], pathWithoutRelative = path.replace("/app/", "./"), originalPath = pathWithoutRelative.slice(1).replace(/\.[jt]sx?$/, "");
    options?.routeModes?.[originalPath] === "spa" ? (console.info(`Spa mode: ${originalPath}`), loadedRoutes[pathWithoutRelative] = () => null) : routesSync[pathWithoutRelative] = loadRouteFunction;
  });
  const moduleKeys = Object.keys(routesSync);
  function resolve(id) {
    if (clearTimeout(clears[id]), loadedRoutes[id])
      return loadedRoutes[id];
    if (typeof routesSync[id] != "function")
      return routesSync[id];
    throw promises[id] || (promises[id] = routesSync[id]().then((val) => (loadedRoutes[id] = val, delete promises[id], clears[id] = setTimeout(() => {
      delete loadedRoutes[id];
    }, 500), val)).catch((err) => {
      console.error("Error loading route", id, err, new Error().stack), loadedRoutes[id] = {
        default: () => null
        // <View
        //   style={{
        //     position: 'absolute',
        //     top: 0,
        //     left: 0,
        //     right: 0,
        //     bottom: 0,
        //     alignItems: 'center',
        //     justifyContent: 'center',
        //     backgroundColor: '#000',
        //     gap: 20,
        //   }}
        // >
        //   <Text style={{ fontSize: 24, color: '#fff' }}>Error loading route</Text>
        //   <Text style={{ fontSize: 16, color: '#fff' }}>{id}</Text>
        //   <Text style={{ fontSize: 18, color: '#fff', maxWidth: 800 }}>{`${err}`}</Text>
        // </View>
      }, delete promises[id];
    }), process.env.NODE_ENV === "development" && (promises[id].stack = new Error().stack)), promises[id];
  }
  return resolve.keys = () => moduleKeys, resolve.id = "", resolve.resolve = (id) => id, resolve;
}
//# sourceMappingURL=useViteRoutes.js.map
