import { getRoutes } from "../getRoutes.mjs";
import { getServerManifest } from "./getServerManifest.mjs";
function createMockModuleWithContext(map = []) {
  const contextModule = key => ({
    default() {}
  });
  return Object.defineProperty(contextModule, "keys", {
    value: () => map
  }), contextModule;
}
function createRoutesManifest(paths, options) {
  const routeTree = getRoutes(createMockModuleWithContext(paths), {
    ...options,
    preserveApiRoutes: !0,
    ignoreRequireErrors: !0,
    ignoreEntryPoints: !0,
    platform: "web"
  });
  if (!routeTree) throw new Error(`No route tree found in paths: ${JSON.stringify(paths)}`);
  return getServerManifest(routeTree);
}
export { createRoutesManifest };
//# sourceMappingURL=createRoutesManifest.mjs.map
