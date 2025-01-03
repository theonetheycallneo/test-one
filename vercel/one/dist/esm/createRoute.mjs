import { useActiveParams, useParams } from "./hooks.mjs";
function createRoute() {
  return {
    useParams: () => useParams(),
    useActiveParams: () => useActiveParams(),
    createLoader: a => a
  };
}
const defaults = createRoute(),
  getProxy = () => new Proxy({}, {
    get(target, key) {
      return Reflect.has(defaults, key) ? Reflect.get(defaults, key) : getProxy();
    }
  }),
  postIdRoute = createRoute(),
  route = getProxy();
export { createRoute, route };
//# sourceMappingURL=createRoute.mjs.map
