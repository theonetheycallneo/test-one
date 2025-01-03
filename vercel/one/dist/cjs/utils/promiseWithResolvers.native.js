"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var promiseWithResolvers_exports = {};
__export(promiseWithResolvers_exports, {
  promiseWithResolvers: () => promiseWithResolvers
});
module.exports = __toCommonJS(promiseWithResolvers_exports);
function promiseWithResolvers() {
  var a, b, c = new Promise(function(resolve, reject) {
    a = resolve, b = reject;
  });
  return {
    resolve: a,
    reject: b,
    promise: c
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  promiseWithResolvers
});
//# sourceMappingURL=promiseWithResolvers.js.map
