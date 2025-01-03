const w = /* @__PURE__ */ new WeakMap(), weakKey = (item) => w.get(item) ?? (() => {
  const k = `${Math.random()}`;
  return w.set(item, k), k;
})();
export {
  weakKey
};
//# sourceMappingURL=weakKey.js.map
