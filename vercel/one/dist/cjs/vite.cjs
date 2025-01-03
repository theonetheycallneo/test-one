var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var vite_exports = {};
__export(vite_exports, {
  SSRCSSPlugin: () => import_SSRCSSPlugin.SSRCSSPlugin,
  build: () => import_build.build,
  clientTreeShakePlugin: () => import_clientTreeShakePlugin.clientTreeShakePlugin,
  createFileSystemRouterPlugin: () => import_fileSystemRouterPlugin.createFileSystemRouterPlugin,
  makePluginWebOnly: () => import_makePluginWebOnly.makePluginWebOnly,
  one: () => import_one.one,
  removeReactNativeWebAnimatedPlugin: () => import_removeReactNativeWebAnimatedPlugin.removeReactNativeWebAnimatedPlugin,
  resolvePath: () => import_resolve.resolvePath,
  setCurrentRequestHeaders: () => import_headers.setCurrentRequestHeaders
});
module.exports = __toCommonJS(vite_exports);
var import_resolve = require("@vxrn/resolve"),
  import_clientTreeShakePlugin = require("./vite/plugins/clientTreeShakePlugin.cjs"),
  import_removeReactNativeWebAnimatedPlugin = require("./vite/plugins/removeReactNativeWebAnimatedPlugin.cjs"),
  import_SSRCSSPlugin = require("./vite/plugins/SSRCSSPlugin.cjs"),
  import_fileSystemRouterPlugin = require("./vite/plugins/fileSystemRouterPlugin.cjs"),
  import_makePluginWebOnly = require("./vite/makePluginWebOnly.cjs"),
  import_headers = require("./vite/headers.cjs"),
  import_build = require("./vite/build.cjs"),
  import_one = require("./vite/one.cjs");