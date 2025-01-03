function promiseWithResolvers() {
  let a, b, c = new Promise((resolve, reject) => {
    a = resolve, b = reject;
  });
  return { resolve: a, reject: b, promise: c };
}
export {
  promiseWithResolvers
};
//# sourceMappingURL=promiseWithResolvers.js.map
