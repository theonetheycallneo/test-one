function findFocusedRoute(state) {
  for (var current = state, _current_index; current?.routes[(_current_index = current.index) !== null && _current_index !== void 0 ? _current_index : 0].state != null; ) {
    var _current_index1;
    current = current.routes[(_current_index1 = current.index) !== null && _current_index1 !== void 0 ? _current_index1 : 0].state;
  }
  var _current_index2, route = current?.routes[(_current_index2 = current?.index) !== null && _current_index2 !== void 0 ? _current_index2 : 0];
  return route;
}
export {
  findFocusedRoute
};
//# sourceMappingURL=findFocusedRoute.js.map
