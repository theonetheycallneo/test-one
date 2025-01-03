import BabelGenerate from "@babel/generator";
import { parse } from "@babel/parser";
import BabelTraverse from "@babel/traverse";
import { deadCodeElimination, findReferencedIdentifiers } from "babel-dead-code-elimination";
import { EMPTY_LOADER_STRING } from "../constants";
var traverse = BabelTraverse.default, generate = BabelGenerate.default, clientTreeShakePlugin = function() {
  return {
    name: "one-client-tree-shake",
    enforce: "pre",
    applyToEnvironment(env) {
      return env.name === "client" || env.name === "ios" || env.name === "android";
    },
    async transform(code, id, settings) {
      if (this.environment.name !== "ssr")
        return await transformTreeShakeClient(code, id);
    }
  };
};
async function transformTreeShakeClient(code, id) {
  if (!id.includes("node_modules") && /generateStaticParams|loader/.test(code)) {
    var ast = parse(code, {
      sourceType: "module",
      plugins: [
        "typescript",
        "jsx"
      ]
    }), referenced = findReferencedIdentifiers(ast), removed = {
      loader: !1,
      generateStaticParams: !1
    };
    traverse(ast, {
      ExportNamedDeclaration(path) {
        if (path.node.declaration && path.node.declaration.type === "FunctionDeclaration") {
          if (!path.node.declaration.id) return;
          var functionName = path.node.declaration.id.name;
          (functionName === "loader" || functionName === "generateStaticParams") && (path.remove(), removed[functionName] = !0);
        } else path.node.declaration && path.node.declaration.type === "VariableDeclaration" && path.node.declaration.declarations.forEach(function(declarator, index) {
          if (declarator.id.type === "Identifier" && (declarator.id.name === "loader" || declarator.id.name === "generateStaticParams")) {
            var declaration = path.get("declaration.declarations." + index);
            Array.isArray(declaration) || (declaration.remove(), removed[declarator.id.name] = !0);
          }
        });
      }
    });
    var removedFunctions = Object.keys(removed).filter(function(key) {
      return removed[key];
    });
    if (removedFunctions.length) {
      deadCodeElimination(ast, referenced);
      var out = generate(ast), codeOut = out.code + `

` + removedFunctions.map(function(key) {
        return key === "loader" ? EMPTY_LOADER_STRING : "export function generateStaticParams() {};";
      }).join(`
`);
      return {
        code: codeOut,
        map: out.map
      };
    }
  }
}
export {
  clientTreeShakePlugin,
  transformTreeShakeClient
};
//# sourceMappingURL=clientTreeShakePlugin.js.map
