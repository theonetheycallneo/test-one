function removeUndefined(obj) {
  var result = {};
  for (var key in obj)
    obj[key] !== void 0 && (result[key] = obj[key]);
  return result;
}
export {
  removeUndefined
};
//# sourceMappingURL=removeUndefined.js.map
