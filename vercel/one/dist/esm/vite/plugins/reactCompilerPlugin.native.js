import babel from "@babel/core";
import { relative } from "node:path";
var createReactCompilerPlugin = function(root) {
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
        var result = await babel.transformAsync(codeIn, {
          filename: id,
          ...babelConfig
        }), _result_code, code = (_result_code = result?.code) !== null && _result_code !== void 0 ? _result_code : "";
        return code.includes("react/compiler-runtime") && console.info(` \u{1FA84} ${relative(root, id)}`), {
          code,
          map: result?.map
        };
      }
    }
  };
};
export {
  createReactCompilerPlugin
};
//# sourceMappingURL=reactCompilerPlugin.js.map
