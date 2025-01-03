import { resolvePath } from "@vxrn/resolve";
import { clientTreeShakePlugin } from "./vite/plugins/clientTreeShakePlugin.mjs";
import { removeReactNativeWebAnimatedPlugin } from "./vite/plugins/removeReactNativeWebAnimatedPlugin.mjs";
import { SSRCSSPlugin } from "./vite/plugins/SSRCSSPlugin.mjs";
import { createFileSystemRouterPlugin } from "./vite/plugins/fileSystemRouterPlugin.mjs";
import { makePluginWebOnly } from "./vite/makePluginWebOnly.mjs";
import { setCurrentRequestHeaders } from "./vite/headers.mjs";
import { build } from "./vite/build.mjs";
import { one } from "./vite/one.mjs";
export { SSRCSSPlugin, build, clientTreeShakePlugin, createFileSystemRouterPlugin, makePluginWebOnly, one, removeReactNativeWebAnimatedPlugin, resolvePath, setCurrentRequestHeaders };
//# sourceMappingURL=vite.mjs.map
