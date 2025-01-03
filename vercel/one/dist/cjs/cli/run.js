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
var run_exports = {};
__export(run_exports, {
  run: () => run
});
module.exports = __toCommonJS(run_exports);
var import_virtualEntryPlugin = require("../vite/plugins/virtualEntryPlugin"), import_label_process = require("./label-process");
async function run(args) {
  (0, import_label_process.labelProcess)("dev");
  const { dev } = await import("vxrn"), { start, stop } = await dev({
    mode: args.mode,
    clean: args.clean,
    root: process.cwd(),
    server: {
      https: args.https,
      host: args.host,
      port: args.port ? +args.port : void 0
    },
    entries: {
      native: import_virtualEntryPlugin.virtualEntryIdNative
    }
  }), { closePromise } = await start();
  process.on("beforeExit", () => {
    stop();
  }), process.on("SIGINT", () => {
    stop();
  }), process.on("uncaughtException", (err) => {
    console.error(err?.message || err);
  }), await closePromise;
}
//# sourceMappingURL=run.js.map
