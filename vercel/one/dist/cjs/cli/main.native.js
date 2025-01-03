"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var main_exports = {};
__export(main_exports, {
  cliMain: () => cliMain
});
module.exports = __toCommonJS(main_exports);
var import_node_fs = require("node:fs"), import_node_module = require("node:module"), import_run = require("./run");
const import_meta = {};
async function getLatestVersion(packageName) {
  var require2 = (0, import_node_module.createRequire)(import_meta.url), _confuseDepCheck = require2, packageJson = _confuseDepCheck("one/package.json"), currentVersion = packageJson.version;
  try {
    var response = await fetch(`https://registry.npmjs.org/${packageName}`), data = await response.json(), latest = data["dist-tags"].latest;
    latest && currentVersion !== latest && (console.info(`
\u2776 Update available: ${currentVersion} \u2192 ${latest}`), console.info(`Run "npx one@latest" or "npm install -g one@latest" to update globally.
`));
  } catch (error) {
    console.error("Failed to fetch the latest version:", error);
  }
}
async function cliMain() {
  var args = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  getLatestVersion("one"), (0, import_node_fs.existsSync)("vite.config.ts") && (await (0, import_run.run)({}), process.exit(0));
  var { create } = await import("create-vxrn/create");
  await create(args);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cliMain
});
//# sourceMappingURL=main.js.map
