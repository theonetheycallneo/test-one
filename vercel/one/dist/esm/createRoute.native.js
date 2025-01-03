import { useActiveParams, useParams } from "./hooks";
function createRoute() {
  return {
    useParams: function() {
      return useParams();
    },
    useActiveParams: function() {
      return useActiveParams();
    },
    createLoader: function(a) {
      return a;
    }
  };
}
var defaults = createRoute(), getProxy = function() {
  return new Proxy({}, {
    get(target, key) {
      return Reflect.has(defaults, key) ? Reflect.get(defaults, key) : getProxy();
    }
  });
}, postIdRoute = createRoute(), route = getProxy();
export {
  createRoute,
  route
};
//# sourceMappingURL=createRoute.js.map
