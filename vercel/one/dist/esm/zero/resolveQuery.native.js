async function resolveZeroQuery(query) {
  var view = query.materialize(), tm = setTimeout(function() {
    console.warn(" Warning: query slow to resolve, ensure Zero server is running", JSON.stringify(query.ast, null, 2));
  }, 2e3);
  return new Promise(function(res, rej) {
    try {
      var unsubscribe = view.addListener(function(snapshot) {
        unsubscribe(), clearTimeout(tm), res(snapshot);
      });
      view.hydrate();
    } catch (err) {
      clearTimeout(tm), rej(err);
    }
  });
}
export {
  resolveZeroQuery
};
//# sourceMappingURL=resolveQuery.js.map
