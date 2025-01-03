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
var useDomPlugin_exports = {};
__export(useDomPlugin_exports, {
  useDOMPlugin: () => useDOMPlugin
});
module.exports = __toCommonJS(useDomPlugin_exports);
var swc = __toESM(require("@swc/core"), 1), import_node_path = require("node:path");
function useDOMPlugin() {
  return {
    name: "one-vite-dom-plugin",
    async transform(code, id, options) {
      if (code.includes("use dom"))
        for (var ext = (0, import_node_path.extname)(id), mod = swc.parseSync(code, parseOpts(ext)), hasUseDom = !1, i = 0; i < mod.body.length; ++i) {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useDOMPlugin
});
//# sourceMappingURL=useDomPlugin.js.map
