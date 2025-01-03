let lastUserRouteAction = Date.now();
const getLastAction = () => lastUserRouteAction,
  setLastAction = () => {
    lastUserRouteAction = Date.now();
  };
export { getLastAction, setLastAction };
//# sourceMappingURL=lastAction.mjs.map
