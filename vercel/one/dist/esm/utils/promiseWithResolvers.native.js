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
export {
  promiseWithResolvers
};
//# sourceMappingURL=promiseWithResolvers.js.map
