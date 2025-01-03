function subscribeToZeroQuery(query, onUpdate) {
  var view = query.materialize();
  view.hydrate();
  var unsubscribe = view.addListener(onUpdate);
  return function() {
    unsubscribe(), view.destroy();
  };
}
export {
  subscribeToZeroQuery
};
//# sourceMappingURL=subscribeToQuery.js.map
