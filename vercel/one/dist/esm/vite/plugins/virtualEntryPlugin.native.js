import { isNativeEnvironment } from "vxrn";
var virtualEntryIdName = "one-entry", virtualEntryId = `virtual:${virtualEntryIdName}`, virtalEntryIdClient = `/@id/__x00__virtual:${virtualEntryIdName}`, resolvedVirtualEntryId = "\0" + virtualEntryId, virtualEntryIdNativeName = `${virtualEntryIdName}-native`, virtualEntryIdNative = `virtual:${virtualEntryIdNativeName}`, resolvedVirtualEntryIdNative = "\0" + virtualEntryIdNativeName, USE_ONE_SETUP_FILE = `
if (process.env.ONE_SETUP_FILE) {
  import(/* @vite-ignore */ process.env.ONE_SETUP_FILE)
}
`;
function createVirtualEntry(options) {
  var appDirGlob = `/${options.root}/**/*.tsx`;
  return {
    name: "one-virtual-entry",
    enforce: "pre",
    resolveId(id) {
      if (id === virtualEntryId)
        return resolvedVirtualEntryId;
      if (id === virtualEntryIdNative)
        return resolvedVirtualEntryIdNative;
    },
    load(id) {
      if (id === resolvedVirtualEntryId) {
        var prependCode = isNativeEnvironment(this.environment) ? "" : (
          /* `import()` will not work on native */
          USE_ONE_SETUP_FILE
        );
        return `
${prependCode}

import { createApp } from 'one'

// globbing ${appDirGlob}
export default createApp({
  routes: import.meta.glob('${appDirGlob}'),
})
        `;
      }
      if (id === resolvedVirtualEntryIdNative) {
        var prependCode1 = isNativeEnvironment(this.environment) ? "" : (
          /* `import()` will not work on native */
          USE_ONE_SETUP_FILE
        );
        return `
${prependCode1}

import { createApp } from 'one'

// globbing ${appDirGlob}
export default createApp({
  routes: import.meta.glob('${appDirGlob}'),
})
        `;
      }
    }
  };
}
export {
  createVirtualEntry,
  virtalEntryIdClient,
  virtualEntryId,
  virtualEntryIdName,
  virtualEntryIdNative
};
//# sourceMappingURL=virtualEntryPlugin.js.map
