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
var getManifest_exports = {};
__export(getManifest_exports, {
  getManifest: () => getManifest
});
module.exports = __toCommonJS(getManifest_exports);
var import_createRoutesManifest = require("../server/createRoutesManifest"), import_globDir = require("../utils/globDir");
function getManifest() {
  const routePaths = (0, import_globDir.globDir)("app");
  return (0, import_createRoutesManifest.createRoutesManifest)(routePaths, {
    platform: "web"
  });
}
//# sourceMappingURL=getManifest.js.map
