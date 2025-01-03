import * as swc from "@swc/core";
import { extname } from "node:path";
function useDOMPlugin() {
  return {
    name: "one-vite-dom-plugin",
    async transform(code, id, options) {
      if (code.includes("use dom"))
        for (var ext = extname(id), mod = swc.parseSync(code, parseOpts(ext)), hasUseDom = !1, i = 0; i < mod.body.length; ++i) {
          var item = mod.body[i];
          if (item.type === "ExpressionStatement" && item.expression.type === "StringLiteral" && item.expression.value === "use dom") {
            hasUseDom = !0;
            break;
          }
        }
    }
  };
}
var parseOpts = function(ext) {
  return ext === ".ts" || ext === ".tsx" ? {
    syntax: "typescript",
    tsx: ext.endsWith("x")
  } : {
    syntax: "ecmascript",
    jsx: ext.endsWith("x")
  };
};
export {
  useDOMPlugin
};
//# sourceMappingURL=useDomPlugin.js.map
