"use strict";
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
var fixDependenciesPlugin_exports = {};
__export(fixDependenciesPlugin_exports, {
  fixDependenciesPlugin: () => fixDependenciesPlugin
});
module.exports = __toCommonJS(fixDependenciesPlugin_exports);
var import_vxrn = require("vxrn"), hasApplied = !1;
function fixDependenciesPlugin(options) {
  var patches = [];
  for (var key in options) {
    var value = options[key];
    patches.push({
      module: key,
      patchFiles: value && typeof value == "object" ? value : {
        optimize: value
      }
    });
  }
  return {
    name: "one-fix-dependencies",
    async config(config) {
      !hasApplied && patches.length && (hasApplied = !0, await (0, import_vxrn.applyOptimizePatches)(patches, config));
    },
    async configResolved(config) {
      patches.length && await (0, import_vxrn.applyDependencyPatches)(patches, config);
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fixDependenciesPlugin
});
//# sourceMappingURL=fixDependenciesPlugin.js.map
