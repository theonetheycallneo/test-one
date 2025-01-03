import FSExtra from "fs-extra";
import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import { createRequire } from "node:module";
async function getAllDependencies(root, depth = 20) {
  if (depth === 0)
    return [];
  const pkgJsonPath = await findClosestPkgJsonPath(root);
  if (!pkgJsonPath)
    throw new Error(`Cannot find package.json from ${root}`);
  return await crawl(pkgJsonPath, depth - 1);
}
async function crawl(pkgJsonPath, depth = 1 / 0) {
  const pkgJson = await FSExtra.readJson(pkgJsonPath).catch((e) => {
    throw new Error(`Unable to read ${pkgJsonPath}`, { cause: e });
  });
  let dependencies = pkgJson.dependencies ? Object.keys(pkgJson.dependencies) : [];
  return await Promise.all(
    dependencies.map(async (depName) => {
      try {
        const resolved = createRequire(dirname(pkgJsonPath)).resolve(depName), subDeps = await getAllDependencies(resolved, depth - 1);
        subDeps && (dependencies = [...dependencies, ...subDeps]);
      } catch {
        console.log("Couldn't resolve", depName);
      }
    })
  ), [...new Set(dependencies)];
}
async function findClosestPkgJsonPath(dir, predicate) {
  for (dir.endsWith("package.json") && (dir = path.dirname(dir)); dir; ) {
    const pkg = path.join(dir, "package.json");
    try {
      if ((await fs.stat(pkg)).isFile() && (!predicate || await predicate(pkg)))
        return pkg;
    } catch {
    }
    const nextDir = path.dirname(dir);
    if (nextDir === dir) break;
    dir = nextDir;
  }
}
export {
  getAllDependencies
};
//# sourceMappingURL=findDepsToOptimize.js.map
