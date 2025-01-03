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
var clientLoaderResolver_exports = {};
__export(clientLoaderResolver_exports, {
  onClientLoaderResolve: () => onClientLoaderResolve,
  resolveClientLoader: () => resolveClientLoader
});
module.exports = __toCommonJS(clientLoaderResolver_exports);
let clientLoaderResolver = null, didRun = !1;
function onClientLoaderResolve(resolver) {
  if (didRun)
    throw new Error(
      process.env.NODE_ENV === "production" ? "Error 002" : "Error: You called onClientLoaderResolve after it was run, register it in your root _layout.tsx"
    );
  clientLoaderResolver = resolver;
}
async function resolveClientLoader(props) {
  didRun = !0, clientLoaderResolver && await clientLoaderResolver(props);
}
//# sourceMappingURL=clientLoaderResolver.js.map
