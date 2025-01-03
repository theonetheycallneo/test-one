import { virtualEntryIdNative } from "../vite/plugins/virtualEntryPlugin";
import { labelProcess } from "./label-process";
async function run(args) {
  labelProcess("dev");
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
      native: virtualEntryIdNative
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
export {
  run
};
//# sourceMappingURL=run.js.map
