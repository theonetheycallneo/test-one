function findFocusedRoute(state) {
  let current = state;
  for (; current?.routes[current.index ?? 0].state != null; )
    current = current.routes[current.index ?? 0].state;
  return current?.routes[current?.index ?? 0];
}
export {
  findFocusedRoute
};
//# sourceMappingURL=findFocusedRoute.js.map
