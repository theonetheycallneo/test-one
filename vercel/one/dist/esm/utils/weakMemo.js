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
export {
  weakMemoObject
};
//# sourceMappingURL=weakMemo.js.map
