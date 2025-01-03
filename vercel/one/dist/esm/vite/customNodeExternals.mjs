import { isBuiltin } from "node:module";
import path from "node:path";
function nodeExternals() {
  return {
    name: "node-externals",
    enforce: "pre",
    resolveId: {
      order: "pre",
      async handler(specifier, importer, {
        isEntry
      }) {
        if (isEntry ||
        // Ignore entry points (they should always be resolved)
        /^(?:\0|\.{1,2}\/)/.test(specifier) ||
        // Ignore virtual modules and relative imports
        path.isAbsolute(specifier)) return null;
        if (isBuiltin(specifier)) {
          const stripped = specifier.replace(/^node:/, "");
          return {
            id: isBuiltin(stripped) ? stripped : "node:" + stripped,
            external: !0,
            moduleSideEffects: !1
          };
        }
      }
    }
  };
}
export { nodeExternals };
//# sourceMappingURL=customNodeExternals.mjs.map
