const getPageLikeExports = (x) => x !== "loader" && x[0].toUpperCase() === x[0], getPageExport = (exported) => exported.default || // because HMR fails with default exports, allow exporting something else
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
  if (nonLoader)
    return exported[nonLoader];
})();
export {
  getPageExport
};
//# sourceMappingURL=getPageExport.js.map
