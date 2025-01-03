import FSExtra from "fs-extra";
import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import { createRequire } from "node:module";
async function getAllDependencies(root) {
  var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 20;
  if (depth === 0)
    return [];
  var pkgJsonPath = await findClosestPkgJsonPath(root);
  if (!pkgJsonPath)
    throw new Error(`Cannot find package.json from ${root}`);
  return await crawl(pkgJsonPath, depth - 1);
}
async function crawl(pkgJsonPath) {
  var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1 / 0, pkgJson = await FSExtra.readJson(pkgJsonPath).catch(function(e) {
    throw new Error(`Unable to read ${pkgJsonPath}`, {
      cause: e
    });
  }), dependencies = pkgJson.dependencies ? Object.keys(pkgJson.dependencies) : [];
  return await Promise.all(dependencies.map(async function(depName) {
    try {
      var resolved = createRequire(dirname(pkgJsonPath)).resolve(depName), subDeps = await getAllDependencies(resolved, depth - 1);
      subDeps && (dependencies = [
        ...dependencies,
        ...subDeps
      ]);
    } catch {
      console.log("Couldn't resolve", depName);
    }
  })), [
    ...new Set(dependencies)
  ];
}
async function findClosestPkgJsonPath(dir, predicate) {
  for (dir.endsWith("package.json") && (dir = path.dirname(dir)); dir; ) {
    var pkg = path.join(dir, "package.json");
    try {
      var stat = await fs.stat(pkg);
      if (stat.isFile() && (!predicate || await predicate(pkg)))
        return pkg;
    } catch {
    }
    var nextDir = path.dirname(dir);
    if (nextDir === dir) break;
    dir = nextDir;
  }
}
export {
  getAllDependencies
};
//# sourceMappingURL=findDepsToOptimize.js.map
