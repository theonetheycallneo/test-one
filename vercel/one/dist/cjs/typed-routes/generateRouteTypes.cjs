var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: !0
  }) : target, mod)),
  __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: !0
  }), mod);
var generateRouteTypes_exports = {};
__export(generateRouteTypes_exports, {
  generateRouteTypes: () => generateRouteTypes
});
module.exports = __toCommonJS(generateRouteTypes_exports);
var import_fs_extra = __toESM(require("fs-extra"), 1),
  import_promises = require("node:fs/promises"),
  import_node_path = require("node:path"),
  import_useViteRoutes = require("../useViteRoutes.cjs"),
  import_globDir = require("../utils/globDir.cjs"),
  import_getTypedRoutesDeclarationFile = require("./getTypedRoutesDeclarationFile.cjs");
async function generateRouteTypes(outFile) {
  const routes = (0, import_globDir.globDir)("app").reduce((acc, cur) => (acc[cur] = {}, acc), {}),
    context = (0, import_useViteRoutes.globbedRoutesToRouteContext)(routes),
    declarations = (0, import_getTypedRoutesDeclarationFile.getTypedRoutesDeclarationFile)(context);
  await import_fs_extra.default.ensureDir((0, import_node_path.dirname)(outFile)), await (0, import_promises.writeFile)(outFile, declarations);
}