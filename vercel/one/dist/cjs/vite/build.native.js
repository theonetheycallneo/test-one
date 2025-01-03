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
var build_exports = {};
__export(build_exports, {
  build: () => build
});
module.exports = __toCommonJS(build_exports);
var constants = __toESM(require("../constants"), 1), import_fs_extra = __toESM(require("fs-extra"), 1), import_micromatch = __toESM(require("micromatch"), 1), import_node_module = require("node:module"), import_node_path = __toESM(require("node:path"), 1), import_rollup_plugin_node_externals = require("rollup-plugin-node-externals"), import_vite = require("vite"), import_vxrn = require("vxrn"), import_cleanUrl = require("../cleanUrl"), import_label_process = require("../cli/label-process"), import_getManifest = require("./getManifest"), import_one = require("./one"), import_replaceLoader = require("./replaceLoader");
const import_meta = {};
var { ensureDir, readFile, outputFile } = import_fs_extra.default;
process.on("uncaughtException", function(err) {
  console.error((err == null ? void 0 : err.message) || err);
});
async function build(args) {
  var _userOptions_build_server, _userOptions_build, _userOptions_web, _options_server;
  (0, import_label_process.labelProcess)("build");
  var userOptions = await (0, import_one.loadUserOneOptions)("build"), _userOptions_build_server_outputFormat, serverOutputFormat = (_userOptions_build_server_outputFormat = (_userOptions_build = userOptions.build) === null || _userOptions_build === void 0 || (_userOptions_build_server = _userOptions_build.server) === null || _userOptions_build_server === void 0 ? void 0 : _userOptions_build_server.outputFormat) !== null && _userOptions_build_server_outputFormat !== void 0 ? _userOptions_build_server_outputFormat : "esm";
  process.env.VXRN_REACT_19 = "1", process.env.ONE_SERVER_URL || console.warn("\u26A0\uFE0F No ONE_SERVER_URL environment set, set it in your .env to your target deploy URL");
  var vxrnOutput = await (0, import_vxrn.build)({
    server: userOptions.server,
    build: {
      analyze: !0,
      server: {
        outputFormat: serverOutputFormat
      }
    }
  }, args), options = await (0, import_vxrn.fillOptions)(vxrnOutput.options), toAbsolute = function(p) {
    return import_node_path.default.resolve(options.root, p);
  }, manifest = (0, import_getManifest.getManifest)(), { optimizeDeps } = (0, import_vxrn.getOptimizeDeps)("build"), apiBuildConfig = (0, import_vite.mergeConfig)(
    // feels like this should build off the *server* build config not web
    vxrnOutput.webBuildConfig,
    {
      configFile: !1,
      appType: "custom",
      optimizeDeps
    }
  );
  if (manifest.apiRoutes.length) {
    var _userOptions_build_api, _userOptions_build1, _userOptions_build_api1, _userOptions_build2;
    console.info(`
 \u{1F528} build api routes
`);
    var processEnvDefines = Object.fromEntries(Object.entries(process.env).map(function(param) {
      var [key, value] = param;
      return [
        `process.env.${key}`,
        JSON.stringify(value)
      ];
    })), apiRouteExternalRegex = buildRegexExcludingDeps(optimizeDeps.include), apiEntryPoints = manifest.apiRoutes.reduce(function(entries, param) {
      var { page, file } = param;
      return entries[page.slice(1) + ".js"] = (0, import_node_path.join)("app", file), entries;
    }, {}), _userOptions_build_api_outputFormat, apiOutputFormat = (_userOptions_build_api_outputFormat = userOptions == null || (_userOptions_build1 = userOptions.build) === null || _userOptions_build1 === void 0 || (_userOptions_build_api = _userOptions_build1.api) === null || _userOptions_build_api === void 0 ? void 0 : _userOptions_build_api.outputFormat) !== null && _userOptions_build_api_outputFormat !== void 0 ? _userOptions_build_api_outputFormat : serverOutputFormat, treeshake = userOptions == null || (_userOptions_build2 = userOptions.build) === null || _userOptions_build2 === void 0 || (_userOptions_build_api1 = _userOptions_build2.api) === null || _userOptions_build_api1 === void 0 ? void 0 : _userOptions_build_api1.treeshake;
    await (0, import_vite.build)((0, import_vite.mergeConfig)(apiBuildConfig, {
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
        external: [
          "react",
          "react-dom"
        ],
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
              entryFileNames: function(chunkInfo) {
                var name = chunkInfo.name.replace(/\.js$/, ".cjs");
                return name;
              },
              chunkFileNames: function(chunkInfo) {
                var dir = import_node_path.default.dirname(chunkInfo.name), name = import_node_path.default.basename(chunkInfo.name, import_node_path.default.extname(chunkInfo.name));
                return import_node_path.default.join(dir, `${name}-[hash].cjs`);
              },
              assetFileNames: function(assetInfo) {
                var _assetInfo_name, name = (_assetInfo_name = assetInfo.name) !== null && _assetInfo_name !== void 0 ? _assetInfo_name : "", dir = import_node_path.default.dirname(name), baseName = import_node_path.default.basename(name, import_node_path.default.extname(name)), ext = import_node_path.default.extname(name);
                return import_node_path.default.join(dir, `${baseName}-[hash]${ext}`);
              }
            }
          }
        }
      }
    }));
  }
  globalThis.require = (0, import_node_module.createRequire)((0, import_node_path.join)(import_meta.url, ".."));
  var assets = [], builtRoutes = [];
  console.info(`
 \u{1F528} build static routes
`);
  var render = null, entryServer = vxrnOutput.serverEntry;
  try {
    var _serverImport_default_default, serverImport = await import(entryServer);
    render = serverImport.default.render || ((_serverImport_default_default = serverImport.default.default) === null || _serverImport_default_default === void 0 ? void 0 : _serverImport_default_default.render), typeof render != "function" && (console.error("\u274C Error: didn't find render function in entry", serverImport), process.exit(1));
  } catch (err) {
    console.error("\u274C Error importing the root entry:"), console.error(`  This error happened in the built file: ${entryServer}`), console.error(err.stack), process.exit(1);
  }
  var staticDir = (0, import_node_path.join)("dist/static"), clientDir = (0, import_node_path.join)("dist/client");
  await ensureDir(staticDir);
  var outputEntries = [
    ...vxrnOutput.serverOutput.entries()
  ], _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
  try {
    for (var _loop = async function() {
      var [index, output] = _step.value, _vxrnOutput_buildArgs, _foundRoute_layouts, _exported_generateStaticParams;
      if (output.type === "asset")
        return assets.push(output), "continue";
      var id = output.facadeModuleId || "", file = import_node_path.default.basename(id);
      if (!id || file[0] === "_" || file.includes("entry-server") || id.includes("+api") || !id.includes("/app/"))
        return "continue";
      var relativeId = (0, import_node_path.relative)(process.cwd(), id).replace("app/", "/"), onlyBuild = (_vxrnOutput_buildArgs = vxrnOutput.buildArgs) === null || _vxrnOutput_buildArgs === void 0 ? void 0 : _vxrnOutput_buildArgs.only;
      if (onlyBuild && !import_micromatch.default.contains(relativeId, onlyBuild))
        return "continue";
      var clientManifestKey = Object.keys(vxrnOutput.clientManifest).find(function(key) {
        return id.endsWith(key);
      }) || "";
      if (!clientManifestKey)
        return "continue";
      var clientManifestEntry = vxrnOutput.clientManifest[clientManifestKey], findMatchingRoute = function(route) {
        return route.file && clientManifestKey.endsWith(route.file.slice(1));
      }, foundRoute = manifest.pageRoutes.find(findMatchingRoute);
      if (!foundRoute)
        return clientManifestKey.startsWith("app") && (console.error(" No html route found!", {
          id,
          clientManifestKey
        }), console.error(" In manifest", manifest), process.exit(1)), "continue";
      function collectImports(param) {
        var { imports = [], css } = param, { type = "js" } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return [
          ...new Set([
            ...type === "js" ? imports : css || [],
            ...imports.flatMap(function(name) {
              var found = vxrnOutput.clientManifest[name];
              return found || console.warn("No found imports", name, vxrnOutput.clientManifest), collectImports(found, {
                type
              });
            })
          ].flat().filter(function(x) {
            return x && (type === "css" || x.endsWith(".js"));
          }).map(function(x) {
            return type === "css" || x.startsWith("assets/") ? x : `assets/${x.slice(1)}`;
          }))
        ];
      }
      clientManifestEntry || console.warn(`No client manifest entry found: ${clientManifestKey} in manifest ${JSON.stringify(vxrnOutput.clientManifest, null, 2)}`);
      var entryImports = collectImports(clientManifestEntry || {}), _foundRoute_layouts_flatMap, layoutEntries = (_foundRoute_layouts_flatMap = (_foundRoute_layouts = foundRoute.layouts) === null || _foundRoute_layouts === void 0 ? void 0 : _foundRoute_layouts.flatMap(function(layout) {
        var clientKey = `app${layout.contextKey.slice(1)}`;
        return vxrnOutput.clientManifest[clientKey];
      })) !== null && _foundRoute_layouts_flatMap !== void 0 ? _foundRoute_layouts_flatMap : [], layoutImports = layoutEntries.flatMap(function(entry) {
        return [
          entry.file,
          ...collectImports(entry)
        ];
      }), preloadSetupFilePreloads = function() {
        if (userOptions.setupFile) {
          var needle = userOptions.setupFile.replace(/^\.\//, "");
          for (var file2 in vxrnOutput.clientManifest)
            if (file2 === needle) {
              var entry = vxrnOutput.clientManifest[file2];
              return [
                entry.file
              ];
            }
        }
        return [];
      }(), preloads = [
        .../* @__PURE__ */ new Set([
          ...preloadSetupFilePreloads,
          // add the route entry js (like ./app/index.ts)
          clientManifestEntry.file,
          // add the virtual entry
          vxrnOutput.clientManifest["virtual:one-entry"].file,
          ...entryImports,
          ...layoutImports
        ])
      ].map(function(path2) {
        return `/${path2}`;
      }), allEntries = [
        clientManifestEntry,
        ...layoutEntries
      ], allCSS = allEntries.flatMap(function(entry) {
        return collectImports(entry, {
          type: "css"
        });
      }).map(function(path2) {
        return `/${path2}`;
      });
      process.env.DEBUG && console.info("[one] building routes", {
        foundRoute,
        layoutEntries,
        allEntries,
        allCSS
      });
      var serverJsPath = toAbsolute((0, import_node_path.join)("dist/server", output.fileName)), exported = void 0;
      try {
        exported = await import(serverJsPath);
      } catch (err) {
        throw console.error("Error importing page (original error)", err), new Error(`Error importing page: ${serverJsPath}`, {
          cause: err
        });
      }
      var isDynamic = !!Object.keys(foundRoute.routeKeys).length;
      if (foundRoute.type !== "ssr" && isDynamic && !foundRoute.page.includes("+not-found") && !foundRoute.page.includes("_sitemap") && !exported.generateStaticParams)
        throw new Error(`[one] Error: Missing generateStaticParams

  Route ${foundRoute.page} of type ${foundRoute.type} must export generateStaticParams so build can complete.

  See docs on generateStaticParams:
    https://onestack.dev/docs/routing-exports#generatestaticparams

`);
      var _ref, paramsList = (_ref = await ((_exported_generateStaticParams = exported.generateStaticParams) === null || _exported_generateStaticParams === void 0 ? void 0 : _exported_generateStaticParams.call(exported))) !== null && _ref !== void 0 ? _ref : [
        {}
      ];
      console.info(`
 [build] page ${relativeId} (with ${paramsList.length} routes)
`), process.env.DEBUG && console.info("paramsList", JSON.stringify(paramsList, null, 2));
      var _iteratorNormalCompletion2 = !0, _didIteratorError2 = !1, _iteratorError2 = void 0;
      try {
        for (var _iterator2 = paramsList[Symbol.iterator](), _step1; !(_iteratorNormalCompletion2 = (_step1 = _iterator2.next()).done); _iteratorNormalCompletion2 = !0) {
          var params = _step1.value, cleanId = relativeId.replace(/\+(spa|ssg|ssr)\.tsx?$/, ""), path = getPathnameFromFilePath(cleanId, params, foundRoute.type === "ssg"), htmlPath = `${path.endsWith("/") ? `${removeTrailingSlash(path)}/index` : path}.html`, clientJsPath = (0, import_node_path.join)("dist/client", clientManifestEntry.file), htmlOutPath = toAbsolute((0, import_node_path.join)(staticDir, htmlPath)), loaderData = {};
          try {
            console.info(`  \u21A6 route ${path}`);
            var cleanPath = path === "/" ? path : removeTrailingSlash(path), preloadPath = (0, import_cleanUrl.getPreloadPath)(path);
            if (await import_fs_extra.default.writeFile((0, import_node_path.join)(clientDir, preloadPath), preloads.map(function(preload) {
              return `import "${preload}"`;
            }).join(`
`)), builtRoutes.push({
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
              var _globalThis___vxrnresetState, _globalThis, loaderProps = {
                path,
                params
              };
              if (globalThis.__vxrnLoaderProps__ = loaderProps, (_globalThis___vxrnresetState = (_globalThis = globalThis).__vxrnresetState) === null || _globalThis___vxrnresetState === void 0 || _globalThis___vxrnresetState.call(_globalThis), exported.loader) {
                var _exported_loader, _ref1;
                loaderData = (_ref1 = await ((_exported_loader = exported.loader) === null || _exported_loader === void 0 ? void 0 : _exported_loader.call(exported, {
                  path,
                  params
                }))) !== null && _ref1 !== void 0 ? _ref1 : null;
                var code = await readFile(clientJsPath, "utf-8"), withLoader = (0, import_replaceLoader.replaceLoader)({
                  code,
                  loaderData
                }), loaderPartialPath = (0, import_node_path.join)(clientDir, (0, import_cleanUrl.getLoaderPath)(path));
                await outputFile(loaderPartialPath, withLoader);
              }
              if (foundRoute.type === "ssg") {
                var html = await render({
                  path,
                  preloads,
                  loaderProps,
                  loaderData,
                  css: allCSS
                });
                await outputFile(htmlOutPath, html);
                continue;
              }
              foundRoute.type === "spa" && await outputFile(htmlOutPath, `<html><head>
              <script>globalThis['global'] = globalThis</script>
              <script>globalThis['__vxrnIsSPA'] = true</script>
              ${preloads.map(function(preload) {
                return `   <script type="module" src="${preload}"></script>`;
              }).join(`
`)}
              ${allCSS.map(function(file2) {
                return `    <link rel="stylesheet" href=${file2} />`;
              }).join(`
`)}
            </head></html>`);
            }
          } catch (err) {
            var errMsg = err instanceof Error ? `${err.message}
${err.stack}` : `${err}`;
            console.error(`Error building static page at ${path} with id ${relativeId}:

${errMsg}

  loaderData:
  
${JSON.stringify(loaderData || null, null, 2)}
  params:
  
${JSON.stringify(params || null, null, 2)}`), console.error(err), process.exit(1);
          }
        }
      } catch (err) {
        _didIteratorError2 = !0, _iteratorError2 = err;
      } finally {
        try {
          !_iteratorNormalCompletion2 && _iterator2.return != null && _iterator2.return();
        } finally {
          if (_didIteratorError2)
            throw _iteratorError2;
        }
      }
    }, _iterator = outputEntries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) await _loop();
  } catch (err) {
    _didIteratorError = !0, _iteratorError = err;
  } finally {
    try {
      !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
    } finally {
      if (_didIteratorError)
        throw _iteratorError;
    }
  }
  await moveAllFiles(staticDir, clientDir), await import_fs_extra.default.rm(staticDir, {
    force: !0,
    recursive: !0
  });
  var routeMap = builtRoutes.reduce(function(acc, param) {
    var { cleanPath, htmlPath } = param;
    return acc[cleanPath] = htmlPath, acc;
  }, {}), buildInfoForWriting = {
    routeMap,
    builtRoutes,
    constants: JSON.parse(JSON.stringify({
      ...constants
    }))
  }, buildInfo = {
    ...buildInfoForWriting,
    ...vxrnOutput
  };
  await import_fs_extra.default.writeJSON(toAbsolute("dist/buildInfo.json"), buildInfoForWriting);
  var postBuildLogs = [], _userOptions_web_deploy, platform = (_userOptions_web_deploy = (_userOptions_web = userOptions.web) === null || _userOptions_web === void 0 ? void 0 : _userOptions_web.deploy) !== null && _userOptions_web_deploy !== void 0 ? _userOptions_web_deploy : (_options_server = options.server) === null || _options_server === void 0 ? void 0 : _options_server.platform;
  if (platform === "vercel" && (await import_fs_extra.default.writeFile((0, import_node_path.join)(options.root, "dist", "index.js"), `import { serve } from 'one/serve'
const handler = await serve()
export const { GET, POST, PUT, PATCH, OPTIONS } = handler`), postBuildLogs.push(`wrote vercel entry to: ${(0, import_node_path.join)(".", "dist", "index.js")}`), postBuildLogs.push("point vercel outputDirectory to dist")), userOptions != null && userOptions.afterBuild) {
    var _userOptions_afterBuild;
    await (userOptions == null || (_userOptions_afterBuild = userOptions.afterBuild) === null || _userOptions_afterBuild === void 0 ? void 0 : _userOptions_afterBuild.call(userOptions, buildInfo));
  }
  process.env.VXRN_ANALYZE_BUNDLE && postBuildLogs.push(`client build report: ${toAbsolute("dist/report.html")}`), postBuildLogs.length && (console.info(`

`), postBuildLogs.forEach(function(log) {
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
    await import_fs_extra.default.copy(src, dest, {
      overwrite: !0,
      errorOnExist: !1
    });
  } catch (err) {
    console.error("Error moving files:", err);
  }
}
function getPathnameFromFilePath(path) {
  var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, strict = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, dirname = import_node_path.default.dirname(path).replace(/\([^\/]+\)/gi, ""), file = import_node_path.default.basename(path), fileName = file.replace(/\.[a-z]+$/, ""), nameWithParams = function() {
    if (fileName === "index")
      return "/";
    if (fileName.startsWith("[...")) {
      var part = fileName.replace("[...", "").replace("]", "");
      return params[part] || console.warn(`couldn't resolve ${fileName} segment in path ${path}`), `/${params[part]}`;
    }
    return `/${fileName.split("/").map(function(part2) {
      if (part2[0] === "[") {
        var found = params[part2.slice(1, part2.length - 1)];
        if (!found) {
          if (strict)
            throw new Error(`[one] Params doesn't fit route:
                
                - path: ${path} 
                - part: ${part2}
                - fileName: ${fileName}
                - params:
  
  ${JSON.stringify(params, null, 2)}`);
          return ":" + part2.replace("[", "").replace("]", "");
        }
        return found;
      }
      return part2;
    }).join("/")}`;
  }();
  return `${dirname}${nameWithParams}`.replace(/\/\/+/gi, "/");
}
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function buildRegexExcludingDeps(deps) {
  var sanitizedDeps = deps.map(function(dep) {
    return escapeRegex(dep);
  }), exclusionPattern = sanitizedDeps.join("|"), regexPattern = `node_modules/(?!(${exclusionPattern})).*`;
  return new RegExp(regexPattern);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  build
});
//# sourceMappingURL=build.js.map
