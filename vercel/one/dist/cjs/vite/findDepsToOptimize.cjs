var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: !0
  }) : target, mod)),
  __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: !0
  }), mod);
var findDepsToOptimize_exports = {};
__export(findDepsToOptimize_exports, {
  getAllDependencies: () => getAllDependencies
});
module.exports = __toCommonJS(findDepsToOptimize_exports);
var import_fs_extra = __toESM(require("fs-extra"), 1),
  import_promises = __toESM(require("node:fs/promises"), 1),
  import_node_path = __toESM(require("node:path"), 1),
  import_node_module = require("node:module");
async function getAllDependencies(root, depth = 20) {
  if (depth === 0) return [];
  const pkgJsonPath = await findClosestPkgJsonPath(root);
  if (!pkgJsonPath) throw new Error(`Cannot find package.json from ${root}`);
  return await crawl(pkgJsonPath, depth - 1);
}
async function crawl(pkgJsonPath, depth = 1 / 0) {
  const pkgJson = await import_fs_extra.default.readJson(pkgJsonPath).catch(e => {
    throw new Error(`Unable to read ${pkgJsonPath}`, {
      cause: e
    });
  });
  let dependencies = pkgJson.dependencies ? Object.keys(pkgJson.dependencies) : [];
  return await Promise.all(dependencies.map(async depName => {
    try {
      const resolved = (0, import_node_module.createRequire)((0, import_node_path.dirname)(pkgJsonPath)).resolve(depName),
        subDeps = await getAllDependencies(resolved, depth - 1);
      subDeps && (dependencies = [...dependencies, ...subDeps]);
    } catch {
      console.log("Couldn't resolve", depName);
    }
  })), [...new Set(dependencies)];
}
async function findClosestPkgJsonPath(dir, predicate) {
  for (dir.endsWith("package.json") && (dir = import_node_path.default.dirname(dir)); dir;) {
    const pkg = import_node_path.default.join(dir, "package.json");
    try {
      if ((await import_promises.default.stat(pkg)).isFile() && (!predicate || (await predicate(pkg)))) return pkg;
    } catch {}
    const nextDir = import_node_path.default.dirname(dir);
    if (nextDir === dir) break;
    dir = nextDir;
  }
}