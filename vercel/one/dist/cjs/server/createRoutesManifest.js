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
var createRoutesManifest_exports = {};
__export(createRoutesManifest_exports, {
  createRoutesManifest: () => createRoutesManifest
});
module.exports = __toCommonJS(createRoutesManifest_exports);
var import_getRoutes = require("../getRoutes"), import_getServerManifest = require("./getServerManifest");
function createMockModuleWithContext(map = []) {
  const contextModule = (key) => ({ default() {
  } });
  return Object.defineProperty(contextModule, "keys", {
    value: () => map
  }), contextModule;
}
function createRoutesManifest(paths, options) {
  const routeTree = (0, import_getRoutes.getRoutes)(createMockModuleWithContext(paths), {
    ...options,
    preserveApiRoutes: !0,
    ignoreRequireErrors: !0,
    ignoreEntryPoints: !0,
    platform: "web"
  });
  if (!routeTree)
    throw new Error(`No route tree found in paths: ${JSON.stringify(paths)}`);
  return (0, import_getServerManifest.getServerManifest)(routeTree);
}
//# sourceMappingURL=createRoutesManifest.js.map
