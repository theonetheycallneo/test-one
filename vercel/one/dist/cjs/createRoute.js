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
var createRoute_exports = {};
__export(createRoute_exports, {
  createRoute: () => createRoute,
  route: () => route
});
module.exports = __toCommonJS(createRoute_exports);
var import_hooks = require("./hooks");
function createRoute() {
  return {
    useParams: () => (0, import_hooks.useParams)(),
    useActiveParams: () => (0, import_hooks.useActiveParams)(),
    createLoader: (a) => a
  };
}
const defaults = createRoute(), getProxy = () => new Proxy(
  {},
  {
    get(target, key) {
      return Reflect.has(defaults, key) ? Reflect.get(defaults, key) : getProxy();
    }
  }
), postIdRoute = createRoute(), route = getProxy();
//# sourceMappingURL=createRoute.js.map
