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
var one_exports = {};
__export(one_exports, {
  loadUserOneOptions: () => loadUserOneOptions,
  one: () => one
});
module.exports = __toCommonJS(one_exports);
var import_resolve = require("@vxrn/resolve"),
  import_node_events = __toESM(require("node:events"), 1),
  import_node_path = __toESM(require("node:path"), 1),
  import_vite = require("vite"),
  import_vite_tsconfig_paths = __toESM(require("vite-tsconfig-paths"), 1),
  import_vxrn = require("vxrn"),
  import_constants = require("../constants.cjs"),
  import_polyfills_server = require("../polyfills-server.cjs"),
  import_existsAsync = require("../utils/existsAsync.cjs"),
  import_ensureTsConfig = require("./ensureTsConfig.cjs"),
  import_clientTreeShakePlugin = require("./plugins/clientTreeShakePlugin.cjs"),
  import_fileSystemRouterPlugin = require("./plugins/fileSystemRouterPlugin.cjs"),
  import_fixDependenciesPlugin = require("./plugins/fixDependenciesPlugin.cjs"),
  import_generateFileSystemRouteTypesPlugin = require("./plugins/generateFileSystemRouteTypesPlugin.cjs"),
  import_reactCompilerPlugin = require("./plugins/reactCompilerPlugin.cjs"),
  import_SSRCSSPlugin = require("./plugins/SSRCSSPlugin.cjs"),
  import_virtualEntryPlugin = require("./plugins/virtualEntryPlugin.cjs");
import_node_events.default.setMaxListeners(1e3);
globalThis.__vxrnEnableNativeEnv = !0;
function one(options = {}) {
  oneOptions = options, options.config?.ensureTSConfig !== !1 && (0, import_ensureTsConfig.ensureTSConfig)(), globalThis.__vxrnPluginConfig__ = options;
  const {
      optimizeDeps
    } = (0, import_vxrn.getOptimizeDeps)("build"),
    optimizeIds = optimizeDeps.include,
    optimizeIdRegex = new RegExp(
    // santize ids for regex
    // https://stackoverflow.com/questions/6300183/sanitize-string-of-regex-characters-before-regexp-build
    `${optimizeIds.map(id => id.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&")).join("|")}`);
  let tsConfigPathsPlugin = null;
  const vxrnOptions = (0, import_vxrn.getOptionsFilled)(),
    root = vxrnOptions?.root || process.cwd(),
    {
      clientEnvDefine
    } = (0, import_vxrn.loadEnv)(vxrnOptions?.mode ?? "development"),
    devAndProdPlugins = [{
      name: "one-define-env",
      config() {
        return {
          define: clientEnvDefine
        };
      }
    }, ...(options.ssr?.disableAutoDepsPreBundling ? [] : [(0, import_vxrn.autoPreBundleDepsForSsrPlugin)({
      root
    })]),
    // proxy because you cant add a plugin inside a plugin
    new Proxy({
      name: "one:tsconfig-paths",
      config(configIncoming) {
        const pathsConfig = options.config?.tsConfigPaths;
        pathsConfig !== !1 && (configIncoming.plugins?.flat().some(p => p && p.name === "vite-tsconfig-paths") || (tsConfigPathsPlugin = (0, import_vite_tsconfig_paths.default)(pathsConfig && typeof pathsConfig == "object" ? pathsConfig : {})));
      },
      configResolved() {},
      resolveId() {}
    }, {
      get(target, key, thisArg) {
        if (key === "config" || key === "name") return Reflect.get(target, key, thisArg);
        if (tsConfigPathsPlugin) return Reflect.get(tsConfigPathsPlugin, key, thisArg);
      }
    }), {
      name: "one-slim-deps",
      enforce: "pre",
      config() {
        return {
          resolve: {
            alias: {
              tslib: (0, import_resolve.resolvePath)("@vxrn/tslib-lite", process.cwd())
            }
            // [
            //   {
            //     find: /tslib/,
            //     replacement: resolvePath('@vxrn/tslib-lite'),
            //   },
            //   // not working but would save ~30Kb stat
            //   // {
            //   //   find: /@react-navigation\/core.*\/getStateFromPath/,
            //   //   replacement: join(forkPath, 'fork', 'getStateFromPath.mjs'),
            //   // },
            //   // {
            //   //   find: /@react-navigation\/core.*\/getPathFromState/,
            //   //   replacement: join(forkPath, 'fork', 'getPathFromState.mjs'),
            //   // },
            // ],
          }
        };
      }
    }, {
      name: "one:init-config",
      config() {
        return {
          define: {
            ...(options.web?.defaultRenderMode && {
              "process.env.ONE_DEFAULT_RENDER_MODE": JSON.stringify(options.web.defaultRenderMode),
              "import.meta.env.ONE_DEFAULT_RENDER_MODE": JSON.stringify(options.web.defaultRenderMode)
            }),
            ...(options.setupFile && {
              "process.env.ONE_SETUP_FILE": JSON.stringify(options.setupFile)
            }),
            ...(process.env.NODE_ENV !== "production" && vxrnOptions && {
              "process.env.ONE_SERVER_URL": JSON.stringify(vxrnOptions.server.url),
              "import.meta.env.ONE_SERVER_URL": JSON.stringify(vxrnOptions.server.url)
            })
          },
          environments: {
            client: {
              define: {
                "process.env.VITE_ENVIRONMENT": '"client"',
                "import.meta.env.VITE_ENVIRONMENT": '"client"'
              }
            },
            ssr: {
              define: {
                "process.env.VITE_ENVIRONMENT": '"ssr"',
                "import.meta.env.VITE_ENVIRONMENT": '"ssr"'
              }
            },
            ios: {
              define: {
                "process.env.VITE_ENVIRONMENT": '"ios"',
                "import.meta.env.VITE_ENVIRONMENT": '"ios"'
              }
            },
            android: {
              define: {
                "process.env.VITE_ENVIRONMENT": '"android"',
                "import.meta.env.VITE_ENVIRONMENT": '"android"'
              }
            }
          }
        };
      }
    }, {
      name: "one-zero",
      config() {
        if (options.zero) return {
          define: {
            "process.env.ZERO_ENABLED": "true",
            TESTING: "false",
            REPLICACHE_VERSION: '"15.2.1"',
            ZERO_VERSION: '"0.0.0"'
          }
        };
      }
    }, {
      name: "tamagui-react-19",
      config() {
        return {
          define: {
            // safe to set because it only affects web in tamagui, and one is always react 19
            "process.env.TAMAGUI_REACT_19": '"1"'
          }
        };
      }
    }, {
      name: "route-module-hmr-fix",
      hotUpdate({
        server,
        modules
      }) {
        return modules.map(m => {
          const {
            id
          } = m;
          return id && import_node_path.default.relative(server.config.root, id).split(import_node_path.default.sep)[0] === "app" && (m.acceptedHmrExports = /* @__PURE__ */new Set()), m;
        });
      }
    }];
  options.react?.compiler && devAndProdPlugins.push((0, import_reactCompilerPlugin.createReactCompilerPlugin)(root));
  const scan = options.react?.scan;
  return globalThis.__vxrnAddNativePlugins = [(0, import_clientTreeShakePlugin.clientTreeShakePlugin)()], globalThis.__vxrnAddWebPluginsProd = devAndProdPlugins, [...devAndProdPlugins, {
    name: "one:react-scan",
    config() {
      return {
        environments: {
          // only in client
          client: {
            define: {
              "process.env.ONE_ENABLE_REACT_SCAN": JSON.stringify(typeof scan == "boolean" ? `${scan}` : scan)
            }
          }
        }
      };
    }
  },
  /**
   * This is really the meat of one, where it handles requests:
   */
  (0, import_fileSystemRouterPlugin.createFileSystemRouterPlugin)(options), (0, import_generateFileSystemRouteTypesPlugin.generateFileSystemRouteTypesPlugin)(options), (0, import_clientTreeShakePlugin.clientTreeShakePlugin)(), (0, import_fixDependenciesPlugin.fixDependenciesPlugin)(options.deps), (0, import_virtualEntryPlugin.createVirtualEntry)({
    ...options,
    root: "app"
  }), {
    name: "one-define-environment",
    config() {
      return {
        define: {
          ...(options.app?.key && {
            "process.env.ONE_APP_NAME": JSON.stringify(options.app.key),
            "import.meta.env.ONE_APP_NAME": JSON.stringify(options.app.key)
          }),
          "process.env.ONE_CACHE_KEY": JSON.stringify(import_constants.CACHE_KEY),
          "import.meta.env.ONE_CACHE_KEY": JSON.stringify(import_constants.CACHE_KEY)
        }
      };
    }
  }, {
    name: "one-use-react-18-for-native",
    enforce: "pre",
    async config() {
      const sharedNativeConfig = {
        resolve: {
          alias: {
            react: (0, import_resolve.resolvePath)("one/react-18", process.cwd()),
            "react-dom": (0, import_resolve.resolvePath)("one/react-dom-18", process.cwd())
          }
        }
      };
      return {
        environments: {
          ios: {
            ...sharedNativeConfig
          },
          android: {
            ...sharedNativeConfig
          }
          // this started erroring for no reason..
        }
      };
    }
  }, {
    name: "one:optimize-deps-load-web-extensions-web-only",
    enforce: "pre",
    applyToEnvironment(environment) {
      return (0, import_vxrn.isWebEnvironment)(environment);
    },
    async resolveId(id, importer = "") {
      if (optimizeIdRegex.test(importer)) {
        const absolutePath = (0, import_node_path.resolve)((0, import_node_path.dirname)(importer), id),
          webPath = absolutePath.replace(/(.m?js)/, "") + ".web.js";
        if (webPath === id) return;
        try {
          const directoryPath = absolutePath + "/index.web.js";
          if (await (0, import_existsAsync.existsAsync)(directoryPath)) return directoryPath;
          if (await (0, import_existsAsync.existsAsync)(webPath)) return webPath;
        } catch (err) {
          console.warn("error probably fine", err);
        }
      }
    }
  }, (0, import_SSRCSSPlugin.SSRCSSPlugin)({
    entries: [import_virtualEntryPlugin.virtualEntryId]
  })];
}
let oneOptions = null;
async function getUserOneOptions(command) {
  if (!oneOptions) {
    if (!command) throw new Error("Options not loaded and no command given");
    await loadUserOneOptions(command);
  }
  if (!oneOptions) throw new Error("No One options were loaded");
  return oneOptions;
}
async function loadUserOneOptions(command) {
  if (!(await (0, import_vite.loadConfigFromFile)({
    mode: "prod",
    command
  }))) throw new Error(`No config found in ${process.cwd()}. Is this the correct directory?`);
  const foundOptions = getUserOneOptions();
  if (!foundOptions) throw new Error("No One plugin found in this vite.config");
  return foundOptions;
}