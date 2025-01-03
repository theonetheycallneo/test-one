import { resolvePath } from "@vxrn/resolve";
import events from "node:events";
import path, { dirname, resolve } from "node:path";
import { loadConfigFromFile } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { autoPreBundleDepsForSsrPlugin, getOptimizeDeps, getOptionsFilled, isWebEnvironment, loadEnv } from "vxrn";
import { CACHE_KEY } from "../constants";
import "../polyfills-server";
import { existsAsync } from "../utils/existsAsync";
import { ensureTSConfig } from "./ensureTsConfig";
import { clientTreeShakePlugin } from "./plugins/clientTreeShakePlugin";
import { createFileSystemRouterPlugin } from "./plugins/fileSystemRouterPlugin";
import { fixDependenciesPlugin } from "./plugins/fixDependenciesPlugin";
import { generateFileSystemRouteTypesPlugin } from "./plugins/generateFileSystemRouteTypesPlugin";
import { createReactCompilerPlugin } from "./plugins/reactCompilerPlugin";
import { SSRCSSPlugin } from "./plugins/SSRCSSPlugin";
import { createVirtualEntry, virtualEntryId } from "./plugins/virtualEntryPlugin";
events.setMaxListeners(1e3);
globalThis.__vxrnEnableNativeEnv = !0;
function one() {
  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _options_config, _options_ssr, _options_react, _options_react1;
  oneOptions = options, ((_options_config = options.config) === null || _options_config === void 0 ? void 0 : _options_config.ensureTSConfig) !== !1 && ensureTSConfig(), globalThis.__vxrnPluginConfig__ = options;
  var { optimizeDeps } = getOptimizeDeps("build"), optimizeIds = optimizeDeps.include, optimizeIdRegex = new RegExp(
    // santize ids for regex
    // https://stackoverflow.com/questions/6300183/sanitize-string-of-regex-characters-before-regexp-build
    `${optimizeIds.map(function(id) {
      return id.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&");
    }).join("|")}`
  ), tsConfigPathsPlugin = null, vxrnOptions = getOptionsFilled(), root = vxrnOptions?.root || process.cwd(), _vxrnOptions_mode, { clientEnvDefine } = loadEnv((_vxrnOptions_mode = vxrnOptions?.mode) !== null && _vxrnOptions_mode !== void 0 ? _vxrnOptions_mode : "development"), devAndProdPlugins = [
    {
      name: "one-define-env",
      config() {
        return {
          define: clientEnvDefine
        };
      }
    },
    ...!((_options_ssr = options.ssr) === null || _options_ssr === void 0) && _options_ssr.disableAutoDepsPreBundling ? [] : [
      autoPreBundleDepsForSsrPlugin({
        root
      })
    ],
    // proxy because you cant add a plugin inside a plugin
    new Proxy({
      name: "one:tsconfig-paths",
      config(configIncoming) {
        var _options_config2, _configIncoming_plugins, pathsConfig = (_options_config2 = options.config) === null || _options_config2 === void 0 ? void 0 : _options_config2.tsConfigPaths;
        pathsConfig !== !1 && (!((_configIncoming_plugins = configIncoming.plugins) === null || _configIncoming_plugins === void 0) && _configIncoming_plugins.flat().some(function(p) {
          return p && p.name === "vite-tsconfig-paths";
        }) || (tsConfigPathsPlugin = tsconfigPaths(pathsConfig && typeof pathsConfig == "object" ? pathsConfig : {})));
      },
      configResolved() {
      },
      resolveId() {
      }
    }, {
      get(target, key, thisArg) {
        if (key === "config" || key === "name")
          return Reflect.get(target, key, thisArg);
        if (tsConfigPathsPlugin)
          return Reflect.get(tsConfigPathsPlugin, key, thisArg);
      }
    }),
    {
      name: "one-slim-deps",
      enforce: "pre",
      config() {
        return {
          resolve: {
            alias: {
              tslib: resolvePath("@vxrn/tslib-lite", process.cwd())
            }
          }
        };
      }
    },
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
    {
      name: "one:init-config",
      config() {
        var _options_web;
        return {
          define: {
            ...((_options_web = options.web) === null || _options_web === void 0 ? void 0 : _options_web.defaultRenderMode) && {
              "process.env.ONE_DEFAULT_RENDER_MODE": JSON.stringify(options.web.defaultRenderMode),
              "import.meta.env.ONE_DEFAULT_RENDER_MODE": JSON.stringify(options.web.defaultRenderMode)
            },
            ...options.setupFile && {
              "process.env.ONE_SETUP_FILE": JSON.stringify(options.setupFile)
            },
            ...process.env.NODE_ENV !== "production" && vxrnOptions && {
              "process.env.ONE_SERVER_URL": JSON.stringify(vxrnOptions.server.url),
              "import.meta.env.ONE_SERVER_URL": JSON.stringify(vxrnOptions.server.url)
            }
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
    },
    {
      name: "one-zero",
      config() {
        if (options.zero)
          return {
            define: {
              "process.env.ZERO_ENABLED": "true",
              TESTING: "false",
              REPLICACHE_VERSION: '"15.2.1"',
              ZERO_VERSION: '"0.0.0"'
            }
          };
      }
    },
    {
      name: "tamagui-react-19",
      config() {
        return {
          define: {
            // safe to set because it only affects web in tamagui, and one is always react 19
            "process.env.TAMAGUI_REACT_19": '"1"'
          }
        };
      }
    },
    {
      name: "route-module-hmr-fix",
      hotUpdate(param) {
        var { server, modules } = param;
        return modules.map(function(m) {
          var { id } = m;
          if (!id) return m;
          var relativePath = path.relative(server.config.root, id), rootDir = relativePath.split(path.sep)[0];
          return rootDir === "app" && (m.acceptedHmrExports = /* @__PURE__ */ new Set()), m;
        });
      }
    }
  ], compiler = (_options_react = options.react) === null || _options_react === void 0 ? void 0 : _options_react.compiler;
  compiler && devAndProdPlugins.push(createReactCompilerPlugin(root));
  var scan = (_options_react1 = options.react) === null || _options_react1 === void 0 ? void 0 : _options_react1.scan;
  return globalThis.__vxrnAddNativePlugins = [
    clientTreeShakePlugin()
  ], globalThis.__vxrnAddWebPluginsProd = devAndProdPlugins, [
    ...devAndProdPlugins,
    {
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
    createFileSystemRouterPlugin(options),
    generateFileSystemRouteTypesPlugin(options),
    clientTreeShakePlugin(),
    fixDependenciesPlugin(options.deps),
    createVirtualEntry({
      ...options,
      root: "app"
    }),
    {
      name: "one-define-environment",
      config() {
        var _options_app;
        return {
          define: {
            ...((_options_app = options.app) === null || _options_app === void 0 ? void 0 : _options_app.key) && {
              "process.env.ONE_APP_NAME": JSON.stringify(options.app.key),
              "import.meta.env.ONE_APP_NAME": JSON.stringify(options.app.key)
            },
            "process.env.ONE_CACHE_KEY": JSON.stringify(CACHE_KEY),
            "import.meta.env.ONE_CACHE_KEY": JSON.stringify(CACHE_KEY)
          }
        };
      }
    },
    {
      name: "one-use-react-18-for-native",
      enforce: "pre",
      async config() {
        var sharedNativeConfig = {
          resolve: {
            alias: {
              react: resolvePath("one/react-18", process.cwd()),
              "react-dom": resolvePath("one/react-dom-18", process.cwd())
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
          }
        };
      }
    },
    // this started erroring for no reason..
    {
      name: "one:optimize-deps-load-web-extensions-web-only",
      enforce: "pre",
      applyToEnvironment(environment) {
        return isWebEnvironment(environment);
      },
      async resolveId(id) {
        var importer = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", shouldOptimize = optimizeIdRegex.test(importer);
        if (shouldOptimize) {
          var absolutePath = resolve(dirname(importer), id), webPath = absolutePath.replace(/(.m?js)/, "") + ".web.js";
          if (webPath === id) return;
          try {
            var directoryPath = absolutePath + "/index.web.js";
            if (await existsAsync(directoryPath))
              return directoryPath;
            if (await existsAsync(webPath))
              return webPath;
          } catch (err) {
            console.warn("error probably fine", err);
          }
        }
      }
    },
    SSRCSSPlugin({
      entries: [
        virtualEntryId
      ]
    })
  ];
}
var oneOptions = null;
async function getUserOneOptions(command) {
  if (!oneOptions) {
    if (!command) throw new Error("Options not loaded and no command given");
    await loadUserOneOptions(command);
  }
  if (!oneOptions)
    throw new Error("No One options were loaded");
  return oneOptions;
}
async function loadUserOneOptions(command) {
  var found = await loadConfigFromFile({
    mode: "prod",
    command
  });
  if (!found)
    throw new Error(`No config found in ${process.cwd()}. Is this the correct directory?`);
  var foundOptions = getUserOneOptions();
  if (!foundOptions)
    throw new Error("No One plugin found in this vite.config");
  return foundOptions;
}
export {
  loadUserOneOptions,
  one
};
//# sourceMappingURL=one.js.map
