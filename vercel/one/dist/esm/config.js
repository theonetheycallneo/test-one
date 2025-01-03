import { isWebServer } from "./constants";
const CLIENT_RENDER_MODE = process.env.ONE_DEFAULT_RENDER_MODE, getDefaultRenderMode = () => {
  const serverConfig = globalThis.__vxrnPluginConfig__;
  if (isWebServer && !serverConfig)
    throw new Error("Internal one error: should call setServerConfig before createManifest");
  return CLIENT_RENDER_MODE ?? serverConfig?.web?.defaultRenderMode ?? "ssg";
};
export {
  getDefaultRenderMode
};
//# sourceMappingURL=config.js.map
