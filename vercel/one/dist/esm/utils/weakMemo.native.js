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
export {
  weakMemoObject
};
//# sourceMappingURL=weakMemo.js.map
