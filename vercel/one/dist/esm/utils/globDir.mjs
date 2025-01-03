import Glob from "fast-glob";
function globDir(cwd) {
  return Glob.sync("**/*.@(ts|tsx|js|jsx)", {
    cwd
  }).map(p => "./" + normalizePaths(p));
}
function normalizePaths(p) {
  return p.replace(/\\/g, "/");
}
export { globDir };
//# sourceMappingURL=globDir.mjs.map
