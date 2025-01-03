var lastUserRouteAction = Date.now(), getLastAction = function() {
  return lastUserRouteAction;
}, setLastAction = function() {
  lastUserRouteAction = Date.now();
};
export {
  getLastAction,
  setLastAction
};
//# sourceMappingURL=lastAction.js.map
