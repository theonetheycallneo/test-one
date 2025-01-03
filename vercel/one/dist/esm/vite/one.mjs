import { resolvePath } from "@vxrn/resolve";
import events from "node:events";
import path, { dirname, resolve } from "node:path";
import { loadConfigFromFile } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { autoPreBundleDepsForSsrPlugin, getOptimizeDeps, getOptionsFilled, isWebEnvironment, loadEnv } from "vxrn";
import { CACHE_KEY } from "../constants.mjs";
import "../polyfills-server.mjs";
import { existsAsync } from "../utils/existsAsync.mjs";
import { ensureTSConfig } from "./ensureTsConfig.mjs";
import { clientTreeShakePlugin } from "./plugins/clientTreeShakePlugin.mjs";
import { createFileSystemRouterPlugin } from "./plugins/fileSystemRouterPlugin.mjs";
import { fixDependenciesPlugin } from "./plugins/fixDependenciesPlugin.mjs";
import { generateFileSystemRouteTypesPlugin } from "./plugins/generateFileSystemRouteTypesPlugin.mjs";
import { createReactCompilerPlugin } from "./plugins/reactCompilerPlugin.mjs";
import { SSRCSSPlugin } from "./plugins/SSRCSSPlugin.mjs";
import { createVirtualEntry, virtualEntryId } from "./plugins/virtualEntryPlugin.mjs";
events.setMaxListeners(1e3);
globalThis.__vxrnEnableNativeEnv = !0;
function one(options = {}) {
  oneOptions = options, options.config?.ensureTSConfig !== !1 && ensureTSConfig(), globalThis.__vxrnPluginConfig__ = options;
  const {
      optimizeDeps
    } = getOptimizeDeps("build"),
    optimizeIds = optimizeDeps.include,
    optimizeIdRegex = new RegExp(
    // santize ids for regex
    // https://stackoverflow.com/questions/6300183/sanitize-string-of-regex-characters-before-regexp-build
    `${optimizeIds.map(id => id.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&")).join("|")}`);
  let tsConfigPathsPlugin = null;
  const vxrnOptions = getOptionsFilled(),
    root = vxrnOptions?.root || process.cwd(),
    {
      clientEnvDefine
    } = loadEnv(vxrnOptions?.mode ?? "development"),
    devAndProdPlugins = [{
      name: "one-define-env",
      config() {
        return {
          define: clientEnvDefine
        };
      }
    }, ...(options.ssr?.disableAutoDepsPreBundling ? [] : [autoPreBundleDepsForSsrPlugin({
      root
    })]),
    // proxy because you cant add a plugin inside a plugin
    new Proxy({
      name: "one:tsconfig-paths",
      config(configIncoming) {
        const pathsConfig = options.config?.tsConfigPaths;
        pathsConfig !== !1 && (configIncoming.plugins?.flat().some(p => p && p.name === "vite-tsconfig-paths") || (tsConfigPathsPlugin = tsconfigPaths(pathsConfig && typeof pathsConfig == "object" ? pathsConfig : {})));
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
              tslib: resolvePath("@vxrn/tslib-lite", process.cwd())
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
          return id && path.relative(server.config.root, id).split(path.sep)[0] === "app" && (m.acceptedHmrExports = /* @__PURE__ */new Set()), m;
        });
      }
    }];
  options.react?.compiler && devAndProdPlugins.push(createReactCompilerPlugin(root));
  const scan = options.react?.scan;
  return globalThis.__vxrnAddNativePlugins = [clientTreeShakePlugin()], globalThis.__vxrnAddWebPluginsProd = devAndProdPlugins, [...devAndProdPlugins, {
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
  createFileSystemRouterPlugin(options), generateFileSystemRouteTypesPlugin(options), clientTreeShakePlugin(), fixDependenciesPlugin(options.deps), createVirtualEntry({
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
          "process.env.ONE_CACHE_KEY": JSON.stringify(CACHE_KEY),
          "import.meta.env.ONE_CACHE_KEY": JSON.stringify(CACHE_KEY)
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
          // this started erroring for no reason..
        }
      };
    }
  }, {
    name: "one:optimize-deps-load-web-extensions-web-only",
    enforce: "pre",
    applyToEnvironment(environment) {
      return isWebEnvironment(environment);
    },
    async resolveId(id, importer = "") {
      if (optimizeIdRegex.test(importer)) {
        const absolutePath = resolve(dirname(importer), id),
          webPath = absolutePath.replace(/(.m?js)/, "") + ".web.js";
        if (webPath === id) return;
        try {
          const directoryPath = absolutePath + "/index.web.js";
          if (await existsAsync(directoryPath)) return directoryPath;
          if (await existsAsync(webPath)) return webPath;
        } catch (err) {
          console.warn("error probably fine", err);
        }
      }
    }
  }, SSRCSSPlugin({
    entries: [virtualEntryId]
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
  if (!(await loadConfigFromFile({
    mode: "prod",
    command
  }))) throw new Error(`No config found in ${process.cwd()}. Is this the correct directory?`);
  const foundOptions = getUserOneOptions();
  if (!foundOptions) throw new Error("No One plugin found in this vite.config");
  return foundOptions;
}
export { loadUserOneOptions, one };
//# sourceMappingURL=one.mjs.map
