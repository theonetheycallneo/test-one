"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var config_exports = {};
__export(config_exports, {
  getDefaultRenderMode: () => getDefaultRenderMode
});
module.exports = __toCommonJS(config_exports);
var import_constants = require("./constants"), CLIENT_RENDER_MODE = process.env.ONE_DEFAULT_RENDER_MODE, getDefaultRenderMode = function() {
  var _serverConfig_web, serverConfig = globalThis.__vxrnPluginConfig__;
  if (import_constants.isWebServer && !serverConfig)
    throw new Error("Internal one error: should call setServerConfig before createManifest");
  var _ref;
  return (_ref = CLIENT_RENDER_MODE ?? (serverConfig == null || (_serverConfig_web = serverConfig.web) === null || _serverConfig_web === void 0 ? void 0 : _serverConfig_web.defaultRenderMode)) !== null && _ref !== void 0 ? _ref : "ssg";
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDefaultRenderMode
});
//# sourceMappingURL=config.js.map
