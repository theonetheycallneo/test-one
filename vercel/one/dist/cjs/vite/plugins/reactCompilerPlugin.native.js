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
var reactCompilerPlugin_exports = {};
__export(reactCompilerPlugin_exports, {
  createReactCompilerPlugin: () => createReactCompilerPlugin
});
module.exports = __toCommonJS(reactCompilerPlugin_exports);
var import_core = __toESM(require("@babel/core"), 1), import_node_path = require("node:path"), createReactCompilerPlugin = function(root) {
  var babelConfig = {
    babelrc: !1,
    configFile: !1,
    presets: [
      "@babel/preset-typescript"
    ],
    plugins: [
      [
        "babel-plugin-react-compiler",
        {
          target: "19"
        }
      ]
    ]
  }, filter = /.*(.tsx?)$/;
  return {
    name: "one:react-compiler",
    enforce: "pre",
    async transform(codeIn, id) {
      var shouldTransform = filter.test(id);
      if (shouldTransform) {
        var result = await import_core.default.transformAsync(codeIn, {
          filename: id,
          ...babelConfig
        }), _result_code, code = (_result_code = result == null ? void 0 : result.code) !== null && _result_code !== void 0 ? _result_code : "";
        return code.includes("react/compiler-runtime") && console.info(` \u{1FA84} ${(0, import_node_path.relative)(root, id)}`), {
          code,
          map: result == null ? void 0 : result.map
        };
      }
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createReactCompilerPlugin
});
//# sourceMappingURL=reactCompilerPlugin.js.map
