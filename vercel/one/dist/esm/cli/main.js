import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { run } from "./run";
async function getLatestVersion(packageName) {
  const currentVersion = createRequire(import.meta.url)("one/package.json").version;
  try {
    const latest = (await (await fetch(`https://registry.npmjs.org/${packageName}`)).json())["dist-tags"].latest;
    latest && currentVersion !== latest && (console.info(`
\u2776 Update available: ${currentVersion} \u2192 ${latest}`), console.info(`Run "npx one@latest" or "npm install -g one@latest" to update globally.
`));
  } catch (error) {
    console.error("Failed to fetch the latest version:", error);
  }
}
async function cliMain(args = {}) {
  getLatestVersion("one"), existsSync("vite.config.ts") && (await run({}), process.exit(0));
  const { create } = await import("create-vxrn/create");
  await create(args);
}
export {
  cliMain
};
//# sourceMappingURL=main.js.map
