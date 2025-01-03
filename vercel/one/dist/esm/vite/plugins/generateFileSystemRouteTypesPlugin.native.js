import { join } from "node:path";
import { debounce } from "perfect-debounce";
import { generateRouteTypes } from "../../typed-routes/generateRouteTypes";
function generateFileSystemRouteTypesPlugin(options) {
  return {
    name: "one-generate-fs-route-types",
    enforce: "post",
    apply: "serve",
    configureServer(server) {
      var appDir = join(process.cwd(), "app"), outFile = join(process.cwd(), "routes.d.ts"), fileWatcherChangeListener = debounce(async function(type, path) {
        (type === "add" || type === "delete") && path.startsWith(appDir) && generateRouteTypes(outFile);
      }, 100);
      return server.watcher.addListener("all", fileWatcherChangeListener), function() {
        generateRouteTypes(outFile);
      };
    }
  };
}
export {
  generateFileSystemRouteTypesPlugin
};
//# sourceMappingURL=generateFileSystemRouteTypesPlugin.js.map
