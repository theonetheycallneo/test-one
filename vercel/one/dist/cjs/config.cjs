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
var config_exports = {};
__export(config_exports, {
  getDefaultRenderMode: () => getDefaultRenderMode
});
module.exports = __toCommonJS(config_exports);
var import_constants = require("./constants.cjs");
const CLIENT_RENDER_MODE = process.env.ONE_DEFAULT_RENDER_MODE,
  getDefaultRenderMode = () => {
    const serverConfig = globalThis.__vxrnPluginConfig__;
    if (import_constants.isWebServer && !serverConfig) throw new Error("Internal one error: should call setServerConfig before createManifest");
    return CLIENT_RENDER_MODE ?? serverConfig?.web?.defaultRenderMode ?? "ssg";
  };