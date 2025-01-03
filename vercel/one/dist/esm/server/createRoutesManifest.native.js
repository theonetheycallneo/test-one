import { getRoutes } from "../getRoutes";
import { getServerManifest } from "./getServerManifest";
function createMockModuleWithContext() {
  var map = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], contextModule = function(key) {
    return {
      default() {
      }
    };
  };
  return Object.defineProperty(contextModule, "keys", {
    value: function() {
      return map;
    }
  }), contextModule;
}
function createRoutesManifest(paths, options) {
  var routeTree = getRoutes(createMockModuleWithContext(paths), {
    ...options,
    preserveApiRoutes: !0,
    ignoreRequireErrors: !0,
    ignoreEntryPoints: !0,
    platform: "web"
  });
  if (!routeTree)
    throw new Error(`No route tree found in paths: ${JSON.stringify(paths)}`);
  return getServerManifest(routeTree);
}
export {
  createRoutesManifest
};
//# sourceMappingURL=createRoutesManifest.js.map
