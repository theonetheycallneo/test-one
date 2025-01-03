import { isWebServer } from "./constants";
var CLIENT_RENDER_MODE = process.env.ONE_DEFAULT_RENDER_MODE, getDefaultRenderMode = function() {
  var _serverConfig_web, serverConfig = globalThis.__vxrnPluginConfig__;
  if (isWebServer && !serverConfig)
    throw new Error("Internal one error: should call setServerConfig before createManifest");
  var _ref;
  return (_ref = CLIENT_RENDER_MODE ?? (serverConfig == null || (_serverConfig_web = serverConfig.web) === null || _serverConfig_web === void 0 ? void 0 : _serverConfig_web.defaultRenderMode)) !== null && _ref !== void 0 ? _ref : "ssg";
};
export {
  getDefaultRenderMode
};
//# sourceMappingURL=config.js.map
