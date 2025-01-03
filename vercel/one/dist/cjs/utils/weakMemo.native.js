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
var weakMemo_exports = {};
__export(weakMemo_exports, {
  weakMemoObject: () => weakMemoObject
});
module.exports = __toCommonJS(weakMemo_exports);
var cache = /* @__PURE__ */ new WeakMap();
function weakMemoObject(obj) {
  if (!cache.has(obj)) {
    var memoizedObj = {}, _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
    try {
      for (var _iterator = Object.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
        var key = _step.value;
        cache.has(obj[key]) || cache.set(obj[key], obj[key]), memoizedObj[key] = cache.get(obj[key]);
      }
    } catch (err) {
      _didIteratorError = !0, _iteratorError = err;
    } finally {
      try {
        !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
      } finally {
        if (_didIteratorError)
          throw _iteratorError;
      }
    }
    cache.set(obj, memoizedObj);
  }
  return cache.get(obj);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  weakMemoObject
});
//# sourceMappingURL=weakMemo.js.map
