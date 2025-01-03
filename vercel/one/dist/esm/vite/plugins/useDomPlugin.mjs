import * as swc from "@swc/core";
import { extname } from "node:path";
function useDOMPlugin() {
  return {
    name: "one-vite-dom-plugin",
    async transform(code, id, options) {
      if (!code.includes("use dom")) return;
      const ext = extname(id),
        mod = swc.parseSync(code, parseOpts(ext));
      let hasUseDom = !1;
      for (let i = 0; i < mod.body.length; ++i) {
        const item = mod.body[i];
        if (item.type === "ExpressionStatement" && item.expression.type === "StringLiteral" && item.expression.value === "use dom") {
          hasUseDom = !0;
          break;
        }
      }
    }
  };
}
const parseOpts = ext => ext === ".ts" || ext === ".tsx" ? {
  syntax: "typescript",
  tsx: ext.endsWith("x")
} : {
  syntax: "ecmascript",
  jsx: ext.endsWith("x")
};
export { useDOMPlugin };
//# sourceMappingURL=useDomPlugin.mjs.map
