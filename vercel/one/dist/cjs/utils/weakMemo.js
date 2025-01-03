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
const cache = /* @__PURE__ */ new WeakMap();
function weakMemoObject(obj) {
  if (!cache.has(obj)) {
    const memoizedObj = {};
    for (const key of Object.keys(obj))
      cache.has(obj[key]) || cache.set(obj[key], obj[key]), memoizedObj[key] = cache.get(obj[key]);
    cache.set(obj, memoizedObj);
  }
  return cache.get(obj);
}
//# sourceMappingURL=weakMemo.js.map
