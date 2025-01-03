import { applyDependencyPatches, applyOptimizePatches } from "vxrn";
var hasApplied = !1;
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
      !hasApplied && patches.length && (hasApplied = !0, await applyOptimizePatches(patches, config));
    },
    async configResolved(config) {
      patches.length && await applyDependencyPatches(patches, config);
    }
  };
}
export {
  fixDependenciesPlugin
};
//# sourceMappingURL=fixDependenciesPlugin.js.map
