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
var replaceLoader_exports = {};
__export(replaceLoader_exports, {
  replaceLoader: () => replaceLoader
});
module.exports = __toCommonJS(replaceLoader_exports);
function replaceLoader({
  code,
  loaderData
}) {
  const stringifiedData = JSON.stringify(loaderData);
  return code.includes("__vxrn__loader__") ? code.replace(
    /["']__vxrn__loader__['"]/,
    // make sure this ' ' is added in front,
    // minifiers will do `return"something"
    // but if its null then it becomes returnnull
    " " + stringifiedData.replace(/\$/g, "$$$$")
  ) : code + `
export const loader = () => (${stringifiedData})`;
}
//# sourceMappingURL=replaceLoader.js.map
