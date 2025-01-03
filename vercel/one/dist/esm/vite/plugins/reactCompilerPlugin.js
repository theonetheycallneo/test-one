import babel from "@babel/core";
import { relative } from "node:path";
const createReactCompilerPlugin = (root) => {
  const babelConfig = {
    babelrc: !1,
    configFile: !1,
    presets: ["@babel/preset-typescript"],
    plugins: [["babel-plugin-react-compiler", { target: "19" }]]
  }, filter = /.*(.tsx?)$/;
  return {
    name: "one:react-compiler",
    enforce: "pre",
    async transform(codeIn, id) {
      if (!filter.test(id)) return;
      const result = await babel.transformAsync(codeIn, { filename: id, ...babelConfig }), code = result?.code ?? "";
      return code.includes("react/compiler-runtime") && console.info(` \u{1FA84} ${relative(root, id)}`), { code, map: result?.map };
    }
    // this is only useful for deps optimization but in general we just want app
    // config() {
    //   return {
    //     optimizeDeps: {
    //       esbuildOptions: {
    //         plugins: [
    //           {
    //             name: 'babel',
    //             setup(build) {
    //               build.onLoad({ filter }, async (args) => {
    //                 const ext = extname(args.path)
    //                 const contents = await fs.promises.readFile(args.path, 'utf8')
    //                 const babelOptions = babel.loadOptions({
    //                   filename: args.path,
    //                   ...babelConfig,
    //                   caller: {
    //                     name: 'esbuild-plugin-babel',
    //                     supportsStaticESM: true,
    //                   },
    //                 })
    //                 if (!babelOptions) {
    //                   throw new Error(`invali`)
    //                 }
    //                 const result = await babel.transformAsync(contents, babelOptions)
    //                 return {
    //                   contents: result?.code ?? '',
    //                   loader: ext === 'tsx' ? 'tsx' : 'ts',
    //                 }
    //               })
    //             },
    //           },
    //         ],
    //       },
    //     },
    //   }
    // },
  };
};
export {
  createReactCompilerPlugin
};
//# sourceMappingURL=reactCompilerPlugin.js.map
