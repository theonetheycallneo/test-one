import BabelGenerate from "@babel/generator";
import { parse } from "@babel/parser";
import BabelTraverse from "@babel/traverse";
import { deadCodeElimination, findReferencedIdentifiers } from "babel-dead-code-elimination";
import { EMPTY_LOADER_STRING } from "../constants";
const traverse = BabelTraverse.default, generate = BabelGenerate.default, clientTreeShakePlugin = () => ({
  name: "one-client-tree-shake",
  enforce: "pre",
  applyToEnvironment(env) {
    return env.name === "client" || env.name === "ios" || env.name === "android";
  },
  async transform(code, id, settings) {
    if (this.environment.name !== "ssr")
      return await transformTreeShakeClient(code, id);
  }
});
async function transformTreeShakeClient(code, id) {
  if (id.includes("node_modules") || !/generateStaticParams|loader/.test(code))
    return;
  const ast = parse(code, { sourceType: "module", plugins: ["typescript", "jsx"] }), referenced = findReferencedIdentifiers(ast), removed = {
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
  const removedFunctions = Object.keys(removed).filter((key) => removed[key]);
  if (removedFunctions.length) {
    deadCodeElimination(ast, referenced);
    const out = generate(ast);
    return {
      code: out.code + `

` + removedFunctions.map((key) => key === "loader" ? EMPTY_LOADER_STRING : "export function generateStaticParams() {};").join(`
`),
      map: out.map
    };
  }
}
export {
  clientTreeShakePlugin,
  transformTreeShakeClient
};
//# sourceMappingURL=clientTreeShakePlugin.js.map
