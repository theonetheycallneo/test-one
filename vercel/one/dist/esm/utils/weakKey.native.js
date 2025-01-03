var w = /* @__PURE__ */ new WeakMap(), weakKey = function(item) {
  var _w_get;
  return (_w_get = w.get(item)) !== null && _w_get !== void 0 ? _w_get : function() {
    var k = `${Math.random()}`;
    return w.set(item, k), k;
  }();
};
export {
  weakKey
};
//# sourceMappingURL=weakKey.js.map
