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
var getNormalizedStatePath_exports = {};
__export(getNormalizedStatePath_exports, {
  getNormalizedStatePath: () => getNormalizedStatePath
});
module.exports = __toCommonJS(getNormalizedStatePath_exports);
var import_getStateFromPath = require("../fork/getStateFromPath.cjs");
function getNormalizedStatePath({
  path: statePath,
  params
}, baseUrl) {
  const [pathname] = statePath.split("?");
  return {
    // Strip empty path at the start
    segments: (0, import_getStateFromPath.stripBaseUrl)(pathname, baseUrl).split("/").filter(Boolean).map(decodeURIComponent),
    // TODO: This is not efficient, we should generate based on the state instead
    // of converting to string then back to object
    params: Object.entries(params).reduce((prev, [key, value]) => {
      if (Array.isArray(value)) prev[key] = value.map(v => {
        try {
          return decodeURIComponent(v);
        } catch {
          return v;
        }
      });else try {
        prev[key] = decodeURIComponent(value);
      } catch {
        prev[key] = value;
      }
      return prev;
    }, {})
  };
}