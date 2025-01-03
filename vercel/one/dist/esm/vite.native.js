import { resolvePath } from "@vxrn/resolve";
import { clientTreeShakePlugin } from "./vite/plugins/clientTreeShakePlugin";
import { removeReactNativeWebAnimatedPlugin } from "./vite/plugins/removeReactNativeWebAnimatedPlugin";
import { SSRCSSPlugin } from "./vite/plugins/SSRCSSPlugin";
import { createFileSystemRouterPlugin } from "./vite/plugins/fileSystemRouterPlugin";
import { makePluginWebOnly } from "./vite/makePluginWebOnly";
import { setCurrentRequestHeaders } from "./vite/headers";
import { build } from "./vite/build";
import { one } from "./vite/one";
export {
  SSRCSSPlugin,
  build,
  clientTreeShakePlugin,
  createFileSystemRouterPlugin,
  makePluginWebOnly,
  one,
  removeReactNativeWebAnimatedPlugin,
  resolvePath,
  setCurrentRequestHeaders
};
//# sourceMappingURL=vite.js.map
