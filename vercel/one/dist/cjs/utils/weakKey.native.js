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
var weakKey_exports = {};
__export(weakKey_exports, {
  weakKey: () => weakKey
});
module.exports = __toCommonJS(weakKey_exports);
var w = /* @__PURE__ */ new WeakMap(), weakKey = function(item) {
  var _w_get;
  return (_w_get = w.get(item)) !== null && _w_get !== void 0 ? _w_get : function() {
    var k = `${Math.random()}`;
    return w.set(item, k), k;
  }();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  weakKey
});
//# sourceMappingURL=weakKey.js.map
