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
var Redirect_exports = {};
__export(Redirect_exports, {
  Redirect: () => Redirect
});
module.exports = __toCommonJS(Redirect_exports);
var import_hooks = require("../hooks"), import_useFocusEffect = require("../useFocusEffect");
function Redirect({ href }) {
  const router = (0, import_hooks.useRouter)();
  return (0, import_useFocusEffect.useFocusEffect)(() => {
    try {
      router.replace(href);
    } catch (error) {
      console.error(error);
    }
  }), null;
}
//# sourceMappingURL=Redirect.js.map
