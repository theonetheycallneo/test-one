function subscribeToZeroQuery(query, onUpdate) {
  const view = query.materialize();
  view.hydrate();
  const unsubscribe = view.addListener(onUpdate);
  return () => {
    unsubscribe(), view.destroy();
  };
}
export { subscribeToZeroQuery };
//# sourceMappingURL=subscribeToQuery.mjs.map
