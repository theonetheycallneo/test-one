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
var virtualEntryPlugin_exports = {};
__export(virtualEntryPlugin_exports, {
  createVirtualEntry: () => createVirtualEntry,
  virtalEntryIdClient: () => virtalEntryIdClient,
  virtualEntryId: () => virtualEntryId,
  virtualEntryIdName: () => virtualEntryIdName,
  virtualEntryIdNative: () => virtualEntryIdNative
});
module.exports = __toCommonJS(virtualEntryPlugin_exports);
var import_vxrn = require("vxrn"), virtualEntryIdName = "one-entry", virtualEntryId = `virtual:${virtualEntryIdName}`, virtalEntryIdClient = `/@id/__x00__virtual:${virtualEntryIdName}`, resolvedVirtualEntryId = "\0" + virtualEntryId, virtualEntryIdNativeName = `${virtualEntryIdName}-native`, virtualEntryIdNative = `virtual:${virtualEntryIdNativeName}`, resolvedVirtualEntryIdNative = "\0" + virtualEntryIdNativeName, USE_ONE_SETUP_FILE = `
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
        var prependCode = (0, import_vxrn.isNativeEnvironment)(this.environment) ? "" : (
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
        var prependCode1 = (0, import_vxrn.isNativeEnvironment)(this.environment) ? "" : (
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createVirtualEntry,
  virtalEntryIdClient,
  virtualEntryId,
  virtualEntryIdName,
  virtualEntryIdNative
});
//# sourceMappingURL=virtualEntryPlugin.js.map
