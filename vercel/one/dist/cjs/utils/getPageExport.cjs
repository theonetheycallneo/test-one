var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var getPageExport_exports = {};
__export(getPageExport_exports, {
  getPageExport: () => getPageExport
});
module.exports = __toCommonJS(getPageExport_exports);
const getPageLikeExports = x => x !== "loader" && x[0].toUpperCase() === x[0],
  getPageExport = exported => exported.default ||
  // because HMR fails with default exports, allow exporting something else
  // we just find the first non-loader export for now...
  (() => {
    const keys = Object.keys(exported);
    process.env.NODE_ENV === "development" && keys.filter(getPageLikeExports).length > 1 && console.warn(`Warning: You've exported more than one uppercase non-default export.

If there is no default export, One uses the first capitalized non-default export.
This is because React Refresh, the hot reloading library, does not work on default
exports, so you may prefer to use non-default exports. But exporting multiple can
cause issues, as browser clients and server runtimes may not sort the export keys
the same.

Be sure to only export a single capitalized non-default export per-route.
            `);
    const nonLoader = keys.find(getPageLikeExports);
    if (nonLoader) return exported[nonLoader];
  })();