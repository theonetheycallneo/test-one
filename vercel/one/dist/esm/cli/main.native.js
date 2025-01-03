import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { run } from "./run";
async function getLatestVersion(packageName) {
  var require2 = createRequire(import.meta.url), _confuseDepCheck = require2, packageJson = _confuseDepCheck("one/package.json"), currentVersion = packageJson.version;
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
  getLatestVersion("one"), existsSync("vite.config.ts") && (await run({}), process.exit(0));
  var { create } = await import("create-vxrn/create");
  await create(args);
}
export {
  cliMain
};
//# sourceMappingURL=main.js.map
