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
var build_exports = {};
__export(build_exports, {
  build: () => build
});
module.exports = __toCommonJS(build_exports);
var constants = __toESM(require("../constants"), 1), import_fs_extra = __toESM(require("fs-extra"), 1), import_micromatch = __toESM(require("micromatch"), 1), import_node_module = require("node:module"), import_node_path = __toESM(require("node:path"), 1), import_rollup_plugin_node_externals = require("rollup-plugin-node-externals"), import_vite = require("vite"), import_vxrn = require("vxrn"), import_cleanUrl = require("../cleanUrl"), import_label_process = require("../cli/label-process"), import_getManifest = require("./getManifest"), import_one = require("./one"), import_replaceLoader = require("./replaceLoader");
const import_meta = {}, { ensureDir, readFile, outputFile } = import_fs_extra.default;
process.on("uncaughtException", (err) => {
  console.error(err?.message || err);
});
async function build(args) {
  (0, import_label_process.labelProcess)("build");
  const userOptions = await (0, import_one.loadUserOneOptions)("build"), serverOutputFormat = userOptions.build?.server?.outputFormat ?? "esm";
  process.env.VXRN_REACT_19 = "1", process.env.ONE_SERVER_URL || console.warn(
    "\u26A0\uFE0F No ONE_SERVER_URL environment set, set it in your .env to your target deploy URL"
  );
  const vxrnOutput = await (0, import_vxrn.build)(
    {
      server: userOptions.server,
      build: {
        analyze: !0,
        server: {
          outputFormat: serverOutputFormat
        }
      }
    },
    args
  ), options = await (0, import_vxrn.fillOptions)(vxrnOutput.options), toAbsolute = (p) => import_node_path.default.resolve(options.root, p), manifest = (0, import_getManifest.getManifest)(), { optimizeDeps } = (0, import_vxrn.getOptimizeDeps)("build"), apiBuildConfig = (0, import_vite.mergeConfig)(
    // feels like this should build off the *server* build config not web
    vxrnOutput.webBuildConfig,
    {
      configFile: !1,
      appType: "custom",
      optimizeDeps
    }
  );
  if (manifest.apiRoutes.length) {
    console.info(`
 \u{1F528} build api routes
`);
    const processEnvDefines = Object.fromEntries(
      Object.entries(process.env).map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
    ), apiRouteExternalRegex = buildRegexExcludingDeps(optimizeDeps.include), apiEntryPoints = manifest.apiRoutes.reduce((entries, { page, file }) => (entries[page.slice(1) + ".js"] = (0, import_node_path.join)("app", file), entries), {}), apiOutputFormat = userOptions?.build?.api?.outputFormat ?? serverOutputFormat, treeshake = userOptions?.build?.api?.treeshake;
    await (0, import_vite.build)(
      (0, import_vite.mergeConfig)(apiBuildConfig, {
        appType: "custom",
        configFile: !1,
        plugins: [
          (0, import_rollup_plugin_node_externals.nodeExternals)({
            exclude: optimizeDeps.include
          })
        ],
        define: {
          ...processEnvDefines
        },
        ssr: {
          noExternal: !0,
          // we patched them to switch to react 19
          external: ["react", "react-dom"],
          optimizeDeps
        },
        build: {
          ssr: !0,
          emptyOutDir: !1,
          outDir: "dist/api",
          copyPublicDir: !1,
          minify: !1,
          rollupOptions: {
            treeshake: treeshake ?? {
              moduleSideEffects: !1
            },
            plugins: [
              // otherwise rollup is leaving commonjs-only top level imports...
              apiOutputFormat === "esm" ? import_vxrn.rollupRemoveUnusedImportsPlugin : null
            ].filter(Boolean),
            // too many issues
            // treeshake: {
            //   moduleSideEffects: false,
            // },
            // prevents it from shaking out the exports
            preserveEntrySignatures: "strict",
            input: apiEntryPoints,
            external: apiRouteExternalRegex,
            output: {
              entryFileNames: "[name]",
              exports: "auto",
              ...apiOutputFormat === "esm" ? {
                format: "esm",
                esModule: !0
              } : {
                format: "cjs",
                // Preserve folder structure and use .cjs extension
                entryFileNames: (chunkInfo) => chunkInfo.name.replace(/\.js$/, ".cjs"),
                chunkFileNames: (chunkInfo) => {
                  const dir = import_node_path.default.dirname(chunkInfo.name), name = import_node_path.default.basename(chunkInfo.name, import_node_path.default.extname(chunkInfo.name));
                  return import_node_path.default.join(dir, `${name}-[hash].cjs`);
                },
                assetFileNames: (assetInfo) => {
                  const name = assetInfo.name ?? "", dir = import_node_path.default.dirname(name), baseName = import_node_path.default.basename(name, import_node_path.default.extname(name)), ext = import_node_path.default.extname(name);
                  return import_node_path.default.join(dir, `${baseName}-[hash]${ext}`);
                }
              }
            }
          }
        }
      })
    );
  }
  globalThis.require = (0, import_node_module.createRequire)((0, import_node_path.join)(import_meta.url, ".."));
  const assets = [], builtRoutes = [];
  console.info(`
 \u{1F528} build static routes
`);
  let render = null;
  const entryServer = vxrnOutput.serverEntry;
  try {
    const serverImport = await import(entryServer);
    render = serverImport.default.render || // for an unknown reason this is necessary
    serverImport.default.default?.render, typeof render != "function" && (console.error("\u274C Error: didn't find render function in entry", serverImport), process.exit(1));
  } catch (err) {
    console.error("\u274C Error importing the root entry:"), console.error(`  This error happened in the built file: ${entryServer}`), console.error(err.stack), process.exit(1);
  }
  const staticDir = (0, import_node_path.join)("dist/static"), clientDir = (0, import_node_path.join)("dist/client");
  await ensureDir(staticDir);
  const outputEntries = [...vxrnOutput.serverOutput.entries()];
  for (const [index, output] of outputEntries) {
    let collectImports = function({ imports = [], css }, { type = "js" } = {}) {
      return [
        ...new Set(
          [
            ...type === "js" ? imports : css || [],
            ...imports.flatMap((name) => {
              const found = vxrnOutput.clientManifest[name];
              return found || console.warn("No found imports", name, vxrnOutput.clientManifest), collectImports(found, { type });
            })
          ].flat().filter((x) => x && (type === "css" || x.endsWith(".js"))).map((x) => type === "css" || x.startsWith("assets/") ? x : `assets/${x.slice(1)}`)
        )
      ];
    };
    if (output.type === "asset") {
      assets.push(output);
      continue;
    }
    const id = output.facadeModuleId || "", file = import_node_path.default.basename(id);
    if (!id || file[0] === "_" || file.includes("entry-server") || id.includes("+api") || !id.includes("/app/"))
      continue;
    const relativeId = (0, import_node_path.relative)(process.cwd(), id).replace("app/", "/"), onlyBuild = vxrnOutput.buildArgs?.only;
    if (onlyBuild && !import_micromatch.default.contains(relativeId, onlyBuild))
      continue;
    const clientManifestKey = Object.keys(vxrnOutput.clientManifest).find((key) => id.endsWith(key)) || "";
    if (!clientManifestKey)
      continue;
    const clientManifestEntry = vxrnOutput.clientManifest[clientManifestKey], findMatchingRoute = (route) => route.file && clientManifestKey.endsWith(route.file.slice(1)), foundRoute = manifest.pageRoutes.find(findMatchingRoute);
    if (!foundRoute) {
      clientManifestKey.startsWith("app") && (console.error(" No html route found!", { id, clientManifestKey }), console.error(" In manifest", manifest), process.exit(1));
      continue;
    }
    clientManifestEntry || console.warn(
      `No client manifest entry found: ${clientManifestKey} in manifest ${JSON.stringify(
        vxrnOutput.clientManifest,
        null,
        2
      )}`
    );
    const entryImports = collectImports(clientManifestEntry || {}), layoutEntries = foundRoute.layouts?.flatMap((layout) => {
      const clientKey = `app${layout.contextKey.slice(1)}`;
      return vxrnOutput.clientManifest[clientKey];
    }) ?? [], layoutImports = layoutEntries.flatMap((entry) => [entry.file, ...collectImports(entry)]), preloadSetupFilePreloads = (() => {
      if (userOptions.setupFile) {
        const needle = userOptions.setupFile.replace(/^\.\//, "");
        for (const file2 in vxrnOutput.clientManifest)
          if (file2 === needle)
            return [
              vxrnOutput.clientManifest[file2].file
              // getting 404s for preloading the imports as well?
              // ...(entry.imports as string[])
            ];
      }
      return [];
    })(), preloads = [
      .../* @__PURE__ */ new Set([
        ...preloadSetupFilePreloads,
        // add the route entry js (like ./app/index.ts)
        clientManifestEntry.file,
        // add the virtual entry
        vxrnOutput.clientManifest["virtual:one-entry"].file,
        ...entryImports,
        ...layoutImports
      ])
    ].map((path) => `/${path}`), allEntries = [clientManifestEntry, ...layoutEntries], allCSS = allEntries.flatMap((entry) => collectImports(entry, { type: "css" })).map((path) => `/${path}`);
    process.env.DEBUG && console.info("[one] building routes", { foundRoute, layoutEntries, allEntries, allCSS });
    const serverJsPath = toAbsolute((0, import_node_path.join)("dist/server", output.fileName));
    let exported;
    try {
      exported = await import(serverJsPath);
    } catch (err) {
      throw console.error("Error importing page (original error)", err), new Error(`Error importing page: ${serverJsPath}`, {
        cause: err
      });
    }
    const isDynamic = !!Object.keys(foundRoute.routeKeys).length;
    if (foundRoute.type !== "ssr" && isDynamic && !foundRoute.page.includes("+not-found") && !foundRoute.page.includes("_sitemap") && !exported.generateStaticParams)
      throw new Error(`[one] Error: Missing generateStaticParams

  Route ${foundRoute.page} of type ${foundRoute.type} must export generateStaticParams so build can complete.

  See docs on generateStaticParams:
    https://onestack.dev/docs/routing-exports#generatestaticparams

`);
    const paramsList = await exported.generateStaticParams?.() ?? [{}];
    console.info(`
 [build] page ${relativeId} (with ${paramsList.length} routes)
`), process.env.DEBUG && console.info("paramsList", JSON.stringify(paramsList, null, 2));
    for (const params of paramsList) {
      const cleanId = relativeId.replace(/\+(spa|ssg|ssr)\.tsx?$/, ""), path = getPathnameFromFilePath(cleanId, params, foundRoute.type === "ssg"), htmlPath = `${path.endsWith("/") ? `${removeTrailingSlash(path)}/index` : path}.html`, clientJsPath = (0, import_node_path.join)("dist/client", clientManifestEntry.file), htmlOutPath = toAbsolute((0, import_node_path.join)(staticDir, htmlPath));
      let loaderData = {};
      try {
        console.info(`  \u21A6 route ${path}`);
        const cleanPath = path === "/" ? path : removeTrailingSlash(path), preloadPath = (0, import_cleanUrl.getPreloadPath)(path);
        if (await import_fs_extra.default.writeFile(
          (0, import_node_path.join)(clientDir, preloadPath),
          preloads.map((preload) => `import "${preload}"`).join(`
`)
        ), builtRoutes.push({
          type: foundRoute.type,
          cleanPath,
          preloadPath,
          clientJsPath,
          serverJsPath,
          htmlPath,
          loaderData,
          params,
          path,
          preloads
        }), foundRoute.type !== "ssr") {
          const loaderProps = { path, params };
          if (globalThis.__vxrnLoaderProps__ = loaderProps, globalThis.__vxrnresetState?.(), exported.loader) {
            loaderData = await exported.loader?.({ path, params }) ?? null;
            const code = await readFile(clientJsPath, "utf-8"), withLoader = (0, import_replaceLoader.replaceLoader)({
              code,
              loaderData
            }), loaderPartialPath = (0, import_node_path.join)(clientDir, (0, import_cleanUrl.getLoaderPath)(path));
            await outputFile(loaderPartialPath, withLoader);
          }
          if (foundRoute.type === "ssg") {
            const html = await render({ path, preloads, loaderProps, loaderData, css: allCSS });
            await outputFile(htmlOutPath, html);
            continue;
          }
          foundRoute.type === "spa" && await outputFile(
            htmlOutPath,
            `<html><head>
              <script>globalThis['global'] = globalThis</script>
              <script>globalThis['__vxrnIsSPA'] = true</script>
              ${preloads.map((preload) => `   <script type="module" src="${preload}"></script>`).join(`
`)}
              ${allCSS.map((file2) => `    <link rel="stylesheet" href=${file2} />`).join(`
`)}
            </head></html>`
          );
        }
      } catch (err) {
        const errMsg = err instanceof Error ? `${err.message}
${err.stack}` : `${err}`;
        console.error(
          `Error building static page at ${path} with id ${relativeId}:

${errMsg}

  loaderData:
  
${JSON.stringify(loaderData || null, null, 2)}
  params:
  
${JSON.stringify(params || null, null, 2)}`
        ), console.error(err), process.exit(1);
      }
    }
  }
  await moveAllFiles(staticDir, clientDir), await import_fs_extra.default.rm(staticDir, { force: !0, recursive: !0 });
  const buildInfoForWriting = {
    routeMap: builtRoutes.reduce((acc, { cleanPath, htmlPath }) => (acc[cleanPath] = htmlPath, acc), {}),
    builtRoutes,
    constants: JSON.parse(JSON.stringify({ ...constants }))
  }, buildInfo = {
    ...buildInfoForWriting,
    ...vxrnOutput
  };
  await import_fs_extra.default.writeJSON(toAbsolute("dist/buildInfo.json"), buildInfoForWriting);
  let postBuildLogs = [];
  (userOptions.web?.deploy ?? options.server?.platform) === "vercel" && (await import_fs_extra.default.writeFile(
    (0, import_node_path.join)(options.root, "dist", "index.js"),
    `import { serve } from 'one/serve'
const handler = await serve()
export const { GET, POST, PUT, PATCH, OPTIONS } = handler`
  ), postBuildLogs.push(`wrote vercel entry to: ${(0, import_node_path.join)(".", "dist", "index.js")}`), postBuildLogs.push("point vercel outputDirectory to dist")), userOptions?.afterBuild && await userOptions?.afterBuild?.(buildInfo), process.env.VXRN_ANALYZE_BUNDLE && postBuildLogs.push(`client build report: ${toAbsolute("dist/report.html")}`), postBuildLogs.length && (console.info(`

`), postBuildLogs.forEach((log) => {
    console.info(`  \xB7 ${log}`);
  })), console.info(`

  \u{1F49B} build complete

`);
}
function removeTrailingSlash(path) {
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path;
}
async function moveAllFiles(src, dest) {
  try {
    await import_fs_extra.default.copy(src, dest, { overwrite: !0, errorOnExist: !1 });
  } catch (err) {
    console.error("Error moving files:", err);
  }
}
function getPathnameFromFilePath(path, params = {}, strict = !1) {
  const dirname = import_node_path.default.dirname(path).replace(/\([^\/]+\)/gi, ""), fileName = import_node_path.default.basename(path).replace(/\.[a-z]+$/, ""), nameWithParams = (() => {
    if (fileName === "index")
      return "/";
    if (fileName.startsWith("[...")) {
      const part = fileName.replace("[...", "").replace("]", "");
      return params[part] || console.warn(`couldn't resolve ${fileName} segment in path ${path}`), `/${params[part]}`;
    }
    return `/${fileName.split("/").map((part) => {
      if (part[0] === "[") {
        const found = params[part.slice(1, part.length - 1)];
        if (!found) {
          if (strict)
            throw new Error(
              `[one] Params doesn't fit route:
                
                - path: ${path} 
                - part: ${part}
                - fileName: ${fileName}
                - params:
  
  ${JSON.stringify(params, null, 2)}`
            );
          return ":" + part.replace("[", "").replace("]", "");
        }
        return found;
      }
      return part;
    }).join("/")}`;
  })();
  return `${dirname}${nameWithParams}`.replace(/\/\/+/gi, "/");
}
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function buildRegexExcludingDeps(deps) {
  const regexPattern = `node_modules/(?!(${deps.map((dep) => escapeRegex(dep)).join("|")})).*`;
  return new RegExp(regexPattern);
}
//# sourceMappingURL=build.js.map
