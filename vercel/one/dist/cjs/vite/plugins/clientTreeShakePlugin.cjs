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
var clientTreeShakePlugin_exports = {};
__export(clientTreeShakePlugin_exports, {
  clientTreeShakePlugin: () => clientTreeShakePlugin,
  transformTreeShakeClient: () => transformTreeShakeClient
});
module.exports = __toCommonJS(clientTreeShakePlugin_exports);
var import_generator = __toESM(require("@babel/generator"), 1),
  import_parser = require("@babel/parser"),
  import_traverse = __toESM(require("@babel/traverse"), 1),
  import_babel_dead_code_elimination = require("babel-dead-code-elimination"),
  import_constants = require("../constants.cjs");
const traverse = import_traverse.default.default,
  generate = import_generator.default.default,
  clientTreeShakePlugin = () => ({
    name: "one-client-tree-shake",
    enforce: "pre",
    applyToEnvironment(env) {
      return env.name === "client" || env.name === "ios" || env.name === "android";
    },
    async transform(code, id, settings) {
      if (this.environment.name !== "ssr") return await transformTreeShakeClient(code, id);
    }
  });
async function transformTreeShakeClient(code, id) {
  if (id.includes("node_modules") || !/generateStaticParams|loader/.test(code)) return;
  const ast = (0, import_parser.parse)(code, {
      sourceType: "module",
      plugins: ["typescript", "jsx"]
    }),
    referenced = (0, import_babel_dead_code_elimination.findReferencedIdentifiers)(ast),
    removed = {
      loader: !1,
      generateStaticParams: !1
    };
  traverse(ast, {
    ExportNamedDeclaration(path) {
      if (path.node.declaration && path.node.declaration.type === "FunctionDeclaration") {
        if (!path.node.declaration.id) return;
        const functionName = path.node.declaration.id.name;
        (functionName === "loader" || functionName === "generateStaticParams") && (path.remove(), removed[functionName] = !0);
      } else path.node.declaration && path.node.declaration.type === "VariableDeclaration" && path.node.declaration.declarations.forEach((declarator, index) => {
        if (declarator.id.type === "Identifier" && (declarator.id.name === "loader" || declarator.id.name === "generateStaticParams")) {
          const declaration = path.get("declaration.declarations." + index);
          Array.isArray(declaration) || (declaration.remove(), removed[declarator.id.name] = !0);
        }
      });
    }
  });
  const removedFunctions = Object.keys(removed).filter(key => removed[key]);
  if (removedFunctions.length) {
    (0, import_babel_dead_code_elimination.deadCodeElimination)(ast, referenced);
    const out = generate(ast);
    return {
      code: out.code + `

` + removedFunctions.map(key => key === "loader" ? import_constants.EMPTY_LOADER_STRING : "export function generateStaticParams() {};").join(`
`),
      map: out.map
    };
  }
}