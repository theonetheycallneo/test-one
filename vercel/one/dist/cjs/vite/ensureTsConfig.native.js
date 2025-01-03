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
var ensureTsConfig_exports = {};
__export(ensureTsConfig_exports, {
  ensureTSConfig: () => ensureTSConfig
});
module.exports = __toCommonJS(ensureTsConfig_exports);
var import_promises = require("node:fs/promises"), import_polyfills_server = require("../polyfills-server"), import_existsAsync = require("../utils/existsAsync");
function ensureTSConfig() {
  (0, import_existsAsync.existsAsync)("tsconfig.json").then(function(hasTsConfig) {
    hasTsConfig || (console.info("[one] adding default tsconfig.json. to disable set one/vite { config: { tsConfigPaths: false } }"), (0, import_promises.writeFile)("tsconfig.json", `{
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "~/*": ["./*"]
  },
  "strict": true,
  "rootDir": ".",
  "noEmit": true,
  "module": "Preserve",
  // allows react-native style imports without path extensions, for compat with platform-specific files
  "moduleResolution": "Bundler",
  "preserveSymlinks": true,
  "skipLibCheck": true,
  "jsx": "react-jsx",
  "noImplicitAny": false,
  "types": [
    "node",
    "react",
    "vite/client"
  ],
  "lib": [
    "dom",
    "esnext"
  ]
},
"exclude": [
  "node_modules",
  ".expo",
  "**/test",
  "**/dist",
  "**/types",
  "**/__tests__"
],
}
`));
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ensureTSConfig
});
//# sourceMappingURL=ensureTsConfig.js.map
