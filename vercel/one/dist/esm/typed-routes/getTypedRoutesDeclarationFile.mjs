import { getRoutes } from "../getRoutes.mjs";
import { isTypedRoute, removeSupportedExtensions } from "../matchers.mjs";
const CATCH_ALL = /\[\.\.\..+?\]/g,
  SLUG = /\[.+?\]/g;
function getTypedRoutesDeclarationFile(ctx) {
  const staticRoutes = /* @__PURE__ */new Set(),
    dynamicRoutes = /* @__PURE__ */new Set(),
    dynamicRouteContextKeys = /* @__PURE__ */new Set();
  return walkRouteNode(getRoutes(ctx, {
    platformRoutes: !1,
    // We don't need to generate platform specific routes
    ignoreEntryPoints: !0,
    ignoreRequireErrors: !0
    // importMode: 'async',
  }), "", staticRoutes, dynamicRoutes, dynamicRouteContextKeys), `
import type { OneRouter } from 'one'

declare module 'one' {
  export namespace OneRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: ${setToUnionType(staticRoutes)}
      DynamicRoutes: ${setToUnionType(dynamicRoutes)}
      DynamicRouteTemplate: ${setToUnionType(dynamicRouteContextKeys)}
      IsTyped: true
    }
  }
}
`.trim();
}
function walkRouteNode(routeNode, parentRoutePath, staticRoutes, dynamicRoutes, dynamicRouteContextKeys) {
  if (routeNode) {
    addRouteNode(routeNode, parentRoutePath, staticRoutes, dynamicRoutes, dynamicRouteContextKeys), parentRoutePath = `${removeSupportedExtensions(`${parentRoutePath}/${routeNode.route}`).replace(/\/?index$/, "")}`;
    for (const child of routeNode.children) walkRouteNode(child, parentRoutePath, staticRoutes, dynamicRoutes, dynamicRouteContextKeys);
  }
}
function addRouteNode(routeNode, parentRoutePath, staticRoutes, dynamicRoutes, dynamicRouteContextKeys) {
  if (!routeNode?.route || !isTypedRoute(routeNode.route)) return;
  let routePath = `${parentRoutePath}/${removeSupportedExtensions(routeNode.route).replace(/\/?index$/, "")}`;
  if (routePath.startsWith("/") || (routePath = `/${routePath}`), routeNode.dynamic) for (const path of generateCombinations(routePath)) dynamicRouteContextKeys.add(path), dynamicRoutes.add(`${path.replaceAll(CATCH_ALL, "${string}").replaceAll(SLUG, "${OneRouter.SingleRoutePart<T>}")}`);else for (const combination of generateCombinations(routePath)) staticRoutes.add(combination);
}
const setToUnionType = set => set.size > 0 ? [...set].sort().map(s => `\`${s}\``).join(" | ") : "never";
function generateCombinations(pathname) {
  const groups = pathname.split("/").filter(part => part.startsWith("(") && part.endsWith(")")),
    combinations = [];
  function generate(currentIndex, currentPath) {
    if (currentIndex === groups.length) {
      combinations.push(currentPath.replace(/\/{2,}/g, "/"));
      return;
    }
    const group = groups[currentIndex],
      withoutGroup = currentPath.replace(`/${group}`, "");
    generate(currentIndex + 1, withoutGroup), generate(currentIndex + 1, currentPath);
  }
  return generate(0, pathname), combinations;
}
export { getTypedRoutesDeclarationFile };
//# sourceMappingURL=getTypedRoutesDeclarationFile.mjs.map
