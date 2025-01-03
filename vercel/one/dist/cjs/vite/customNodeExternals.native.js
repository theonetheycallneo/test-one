"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var customNodeExternals_exports = {};
__export(customNodeExternals_exports, {
  nodeExternals: () => nodeExternals
});
module.exports = __toCommonJS(customNodeExternals_exports);
var import_node_module = require("node:module"), import_node_path = __toESM(require("node:path"), 1);
function nodeExternals() {
  return {
    name: "node-externals",
    enforce: "pre",
    resolveId: {
      order: "pre",
      async handler(specifier, importer, param) {
        var { isEntry } = param;
        if (isEntry || // Ignore entry points (they should always be resolved)
        /^(?:\0|\.{1,2}\/)/.test(specifier) || // Ignore virtual modules and relative imports
        import_node_path.default.isAbsolute(specifier))
          return null;
        if ((0, import_node_module.isBuiltin)(specifier)) {
          var stripped = specifier.replace(/^node:/, "");
          return {
            id: (0, import_node_module.isBuiltin)(stripped) ? stripped : "node:" + stripped,
            external: !0,
            moduleSideEffects: !1
          };
        }
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  nodeExternals
});
//# sourceMappingURL=customNodeExternals.js.map
