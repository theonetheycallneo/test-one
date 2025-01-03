import Glob from "fast-glob";
function globDir(cwd) {
  return Glob.sync("**/*.@(ts|tsx|js|jsx)", {
    cwd
  }).map(function(p) {
    return "./" + normalizePaths(p);
  });
}
function normalizePaths(p) {
  return p.replace(/\\/g, "/");
}
export {
  globDir
};
//# sourceMappingURL=globDir.js.map