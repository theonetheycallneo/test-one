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
var zero_exports = {};
__export(zero_exports, {
  isZeroQuery: () => import_isZeroQuery.isZeroQuery,
  resolveZeroQuery: () => import_resolveQuery.resolveZeroQuery,
  useQuery: () => import_useQuery.useQuery
});
module.exports = __toCommonJS(zero_exports);
var import_useQuery = require("./zero/useQuery.cjs"),
  import_resolveQuery = require("./zero/resolveQuery.cjs"),
  import_isZeroQuery = require("./zero/isZeroQuery.cjs");