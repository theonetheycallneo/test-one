function replaceLoader(param) {
  var { code, loaderData } = param, stringifiedData = JSON.stringify(loaderData), out = function() {
    return code.includes("__vxrn__loader__") ? code.replace(
      /["']__vxrn__loader__['"]/,
      // make sure this ' ' is added in front,
      // minifiers will do `return"something"
      // but if its null then it becomes returnnull
      " " + stringifiedData.replace(/\$/g, "$$$$")
    ) : code + `
export const loader = () => (${stringifiedData})`;
  }();
  return out;
}
export {
  replaceLoader
};
//# sourceMappingURL=replaceLoader.js.map
