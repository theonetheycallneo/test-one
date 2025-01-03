async function resolveZeroQuery(query) {
  const view = query.materialize(), tm = setTimeout(() => {
    console.warn(
      " Warning: query slow to resolve, ensure Zero server is running",
      JSON.stringify(query.ast, null, 2)
    );
  }, 2e3);
  return new Promise((res, rej) => {
    try {
      const unsubscribe = view.addListener((snapshot) => {
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
