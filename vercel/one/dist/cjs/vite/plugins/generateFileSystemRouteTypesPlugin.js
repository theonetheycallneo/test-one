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
var generateFileSystemRouteTypesPlugin_exports = {};
__export(generateFileSystemRouteTypesPlugin_exports, {
  generateFileSystemRouteTypesPlugin: () => generateFileSystemRouteTypesPlugin
});
module.exports = __toCommonJS(generateFileSystemRouteTypesPlugin_exports);
var import_node_path = require("node:path"), import_perfect_debounce = require("perfect-debounce"), import_generateRouteTypes = require("../../typed-routes/generateRouteTypes");
function generateFileSystemRouteTypesPlugin(options) {
  return {
    name: "one-generate-fs-route-types",
    enforce: "post",
    apply: "serve",
    configureServer(server) {
      const appDir = (0, import_node_path.join)(process.cwd(), "app"), outFile = (0, import_node_path.join)(process.cwd(), "routes.d.ts"), fileWatcherChangeListener = (0, import_perfect_debounce.debounce)(async (type, path) => {
        (type === "add" || type === "delete") && path.startsWith(appDir) && (0, import_generateRouteTypes.generateRouteTypes)(outFile);
      }, 100);
      return server.watcher.addListener("all", fileWatcherChangeListener), () => {
        (0, import_generateRouteTypes.generateRouteTypes)(outFile);
      };
    }
  };
}
//# sourceMappingURL=generateFileSystemRouteTypesPlugin.js.map
