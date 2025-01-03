import { virtualEntryIdNative } from "../vite/plugins/virtualEntryPlugin";
import { labelProcess } from "./label-process";
async function run(args) {
  labelProcess("dev");
  var { dev } = await import("vxrn"), { start, stop } = await dev({
    mode: args.mode,
    clean: args.clean,
    root: process.cwd(),
    server: {
      https: args.https,
      host: args.host,
      port: args.port ? +args.port : void 0
    },
    entries: {
      native: virtualEntryIdNative
    }
  }), { closePromise } = await start();
  process.on("beforeExit", function() {
    stop();
  }), process.on("SIGINT", function() {
    stop();
  }), process.on("uncaughtException", function(err) {
    console.error(err?.message || err);
  }), await closePromise;
}
export {
  run
};
//# sourceMappingURL=run.js.map
